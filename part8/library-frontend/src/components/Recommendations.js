import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = (props) => {
  const me = useQuery(ME);

  const favouriteGenre = me?.data?.me?.favoriteGenre;

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favouriteGenre },
    skip: !props.show && !favouriteGenre,
  });

  if (me.loading) {
    return <div>loading...</div>;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre <b>{favouriteGenre}</b>
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
    </div>
  );
};

export default Recommendations;
