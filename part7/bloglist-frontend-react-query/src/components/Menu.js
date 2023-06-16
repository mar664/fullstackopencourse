import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import { AppBar, Button, Toolbar } from "@mui/material";

const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <UserInfo />
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
