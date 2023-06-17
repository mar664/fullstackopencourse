import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from "../queries";
import { useNavigate } from "react-router-dom";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  // Update genres that have already been cached and are part of book added
  const queriesToRefetch = () => {
    let extraQueries = [];
    for (let g of props.genresSelected) {
      if (genres.indexOf(g) !== -1)
        extraQueries = extraQueries.concat({
          query: ALL_BOOKS,
          variables: { genre: g },
        });
    }
    return extraQueries;
  };
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_GENRES },
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
    ].concat(queriesToRefetch()),
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      props.setError(messages);
    },
    onCompleted: () => {
      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres([]);
      setGenre("");
      navigate("/");
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");

    addBook({
      variables: { title, author, published: Number(published), genres },
    });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
