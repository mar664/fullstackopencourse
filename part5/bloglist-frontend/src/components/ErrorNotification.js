const ErrorNotification = ({ message }) => {
    const messageStyle = {
      color: 'red'
    }
    return (
      <div id='error-message' style={messageStyle}>
        {message}
      </div>
    )
  }
  
export default ErrorNotification