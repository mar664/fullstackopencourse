import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorBirthYear = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const setAuthorBirthYear = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name, setBornTo: Number(born) },
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={setAuthorBirthYear}>
        name{" "}
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {props.authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <br />
        born{" "}
        <input
          type="text"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <input type="submit" value="update author" />
      </form>
    </div>
  );
};

export default AuthorBirthYear;
