import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleHide = {
    display: 'block'
  }

  return (
  <div style={notification ? style : styleHide}>
      {notification}
    </div>
  )
}

export default Notification