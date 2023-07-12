import { Alert } from "@mui/material";

const SuccessNotification = ({ message }) => {
  return (
    <Alert severity="success" id="success-message">
      {message}
    </Alert>
  );
};

export default SuccessNotification;
