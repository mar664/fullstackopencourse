const SuccessNotification = ({ message }) => {
  const messageStyle = {
    color: "green",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 3,
    border: "2px solid green",
    fontSize: 16,
  };
  return (
    <div id="success-message" style={messageStyle}>
      {message}
    </div>
  );
};

export default SuccessNotification;
