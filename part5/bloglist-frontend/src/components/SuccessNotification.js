  const SuccessNotification = ({ message }) => {
    const messageStyle = {
      color: 'green'
    }
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }

  export default SuccessNotification