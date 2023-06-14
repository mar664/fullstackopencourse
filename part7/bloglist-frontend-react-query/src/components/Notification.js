import { useNotificationValue } from "../contexts/notificationContext";
import ErrorNotification from "./ErrorNotification";
import SuccessNotification from "./SuccessNotification";

const Notification = () => {
  const notification = useNotificationValue();
  if (!notification) return;
  if (notification.type === "error") {
    return <ErrorNotification message={notification.message} />;
  } else {
    return <SuccessNotification message={notification.message} />;
  }
};

export default Notification;
