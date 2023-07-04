import React from "react";

interface NotificationProps {
  message: string | null;
}
const Notification = ({ message }: NotificationProps) => {
  const style = { color: "red" };
  if (!message) return null;
  return <div style={style}>{message}</div>;
};

export default Notification;
