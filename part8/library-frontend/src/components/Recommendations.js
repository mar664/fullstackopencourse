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
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
