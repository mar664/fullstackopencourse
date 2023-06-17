import { useQuery } from "@apollo/client";
import { ALL_BOOKS_AND_GENRES } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");

  const result = useQuery(ALL_BOOKS_AND_GENRES, {
    variables: { genre: genre === "all genres" ? null : genre },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const allGenres = result.data.allGenres;

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
