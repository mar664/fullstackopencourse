import lodash from "lodash";

const Users = ({ blogs }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {Object.entries(lodash.groupBy(blogs, (b) => b.user.id)).map((b) => (
            <tr key={b[0]}>
              <td>{b[1][0].user.name}</td>
              <td>{b[1].length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
