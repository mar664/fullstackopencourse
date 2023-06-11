const ErrorNotification = ({ message }) => {
  const messageStyle = {
    color: 'red',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 3,
    border: '2px solid red',
    fontSize: 16
  }
  return (
    <div id='error-message' style={message ? messageStyle : { display: 'none' }}>
      {message}
    </div>
  )
}

export default ErrorNotification