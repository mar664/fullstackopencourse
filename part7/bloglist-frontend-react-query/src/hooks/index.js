import { useState } from "react";

export const useField = ({
  type = "text",
  val = "",
  fields = [],
  placeholder = "",
}) => {
  const [value, setValue] = useState(val);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClick = (_event) => {
    if (type === "reset") fields.forEach((f) => f.setValue(""));
  };

  let spread;
  if (type === "reset") {
    spread = {
      type,
      value,
      onClick,
    };
  } else {
    spread = {
      type,
      value,
      onChange,
      placeholder,
    };
  }

  return {
    spread,
    type,
    value,
    setValue,
    clear: () => setValue(""),
  };
};
