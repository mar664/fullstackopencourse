import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";
import Notify from "./components/Notify";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = (e) => {
    localStorage.clear();
    setToken(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    setToken(token);
  }, []);

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <Link to="/authors">
          <button>authors</button>
        </Link>
        <Link to="/">
          <button>books</button>
        </Link>
        {token ? (
          <>
            <Link to="/add">
              <button>add book</button>
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>login</button>
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/authors" element={<Authors setError={notify} />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setError={notify} />}
        />
        <Route path="/" element={<Books setError={notify} />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
      </Routes>{" "}
    </div>
  );
};

export default App;
