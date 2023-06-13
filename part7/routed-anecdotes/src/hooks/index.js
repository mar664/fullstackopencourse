import { useState } from 'react'

export const useField = (type, val='', ...fields) => {
  const [value, setValue] = useState(val)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}