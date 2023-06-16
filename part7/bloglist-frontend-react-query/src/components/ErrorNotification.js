import { Alert } from "@mui/material";

const ErrorNotification = ({ message }) => {
  return (
    <Alert severity="error" id="error-message">
      {message}
    </Alert>
  );
};

export default ErrorNotification;
