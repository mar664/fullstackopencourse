import { Button } from "@mui/material";
import { useUserDispatch, useUserValue } from "../contexts/userContext";

const UserInfo = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const handleLogout = async () => {
    userDispatch({ type: "CLEAR_USER" });
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <span>
      {user.name} logged in{" "}
      <Button color="inherit" onClick={() => handleLogout()}>
        logout
      </Button>
    </span>
  );
};

export default UserInfo;
