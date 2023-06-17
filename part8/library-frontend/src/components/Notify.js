const Notify = ({ errorMessage, successMessage }) => {
  if (!errorMessage && !successMessage) {
    return null;
  }
  if (errorMessage) return <div style={{ color: "red" }}>{errorMessage}</div>;
  if (successMessage)
    return <div style={{ color: "green" }}>{successMessage}</div>;
};

export default Notify;
