import { useState } from 'react'

export const useField = (type, val='', ...fields) => {
  const [value, setValue] = useState(val)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onClick = (event) => {
    if(type === "reset") fields.forEach(f => f.setValue(''))
  }
  
  let spread
  if(type === "reset"){
    spread = { 
      type,
      value,
      onClick,
    }
  } else {
    spread = { 
      type,
      value,
      onChange,
    }
  }

  return {
    spread,
    type,
    value,
    setValue
  }
}