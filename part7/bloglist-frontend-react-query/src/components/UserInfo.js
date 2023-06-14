import { useUserDispatch, useUserValue } from "../contexts/userContext";

const UserInfo = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const handleLogout = async () => {
    userDispatch({ type: "CLEAR_USER" });
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <p>
      {user.name} logged in <br />
      <button onClick={() => handleLogout()}>logout</button>
    </p>
  );
};

export default UserInfo;
