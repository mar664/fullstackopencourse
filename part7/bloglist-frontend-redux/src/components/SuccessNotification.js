import { useSelector } from "react-redux";

const SuccessNotification = () => {
  const success = useSelector((state) => state.successNotification);

  const messageStyle = {
    color: "green",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 3,
    border: "2px solid green",
    fontSize: 16,
  };
  return (
    <div
      id="success-message"
      style={success ? messageStyle : { display: "none" }}
    >
      {success}
    </div>
  );
};

export default SuccessNotification;
