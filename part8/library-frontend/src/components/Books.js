import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = ({ setGenreSelected }) => {
  const [genre, setGenre] = useState("all genres");

  const resultAllBooks = useQuery(ALL_BOOKS, {
    variables: { genre: genre === "all genres" ? null : genre },
  });

  const resultAllGenres = useQuery(ALL_GENRES);

  if (resultAllBooks.loading || resultAllGenres.loading) {
    return <div>loading...</div>;
  }

  const books = resultAllBooks.data.allBooks;

  const allGenres = resultAllGenres.data.allGenres;

  return (
    <div>
      <h2>books</h2>
      in genre <b>{genre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((g) => (
        <button
          key={g}
          onClick={(e) => {
            setGenre(g);
            setGenreSelected(g);
          }}
        >
          {g}
        </button>
      ))}
      <button onClick={() => setGenre("all genres")}>all genres</button>
    </div>
  );
};

export default Books;
