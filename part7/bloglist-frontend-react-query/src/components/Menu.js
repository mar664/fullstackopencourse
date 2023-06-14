import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

const Menu = () => {
  const divStyle = {
    backgroundColor: "lightgray",
  };

  const spanStyle = {
    padding: 10,
  };
  return (
    <div style={divStyle}>
      <span style={spanStyle}>
        <Link to="/">blogs</Link>
      </span>
      <span style={spanStyle}>
        <Link to="/users">users</Link>
      </span>
      <UserInfo />
    </div>
  );
};

export default Menu;
