import lodash from "lodash";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Card,
} from "@mui/material";

const Users = ({ blogs }) => {
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <b>blogs created</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(lodash.groupBy(blogs, (b) => b.user.id)).map(
              (b) => (
                <TableRow key={b[0]}>
                  <TableCell>
                    <Link to={`/users/${b[0]}`}>{b[1][0].user.name}</Link>
                  </TableCell>
                  <TableCell>{b[1].length}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
