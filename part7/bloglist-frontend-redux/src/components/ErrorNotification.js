import { useSelector } from "react-redux";

const ErrorNotification = () => {
  const error = useSelector((state) => state.errorNotification);

  const messageStyle = {
    color: "red",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 3,
    border: "2px solid red",
    fontSize: 16,
  };
  return (
    <div id="error-message" style={error ? messageStyle : { display: "none" }}>
      {error}
    </div>
  );
};

export default ErrorNotification;
