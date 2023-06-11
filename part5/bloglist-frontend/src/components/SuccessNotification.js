  const SuccessNotification = ({ message }) => {
    const messageStyle = {
        color: 'red',
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 3,
        border: '2px solid red',
        fontSize: 16
      }
    return (
      <div style={message ? messageStyle : {display: 'none'}}>
        {message}
      </div>
    )
  }

  export default SuccessNotification