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
      <button onClick={() => handleLogout()}>logout</button>
    </span>
  );
};

export default UserInfo;
