import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import _ from "lodash";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");

  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const allGenres = _.uniq(_.flatMap(books, "genres"));

  let filteredBooks = [...books];
  if (genre !== "all genres")
    filteredBooks = filteredBooks.filter((b) => b.genres.indexOf(genre) !== -1);
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
          {filteredBooks.map((a) => (
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
