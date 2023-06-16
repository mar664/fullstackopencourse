import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";
import Notify from "./components/Notify";
import { useState } from "react";
const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        <Link to="/add">
          <button>add book</button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books setError={notify} />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
      </Routes>
    </div>
  );
};

export default App;
