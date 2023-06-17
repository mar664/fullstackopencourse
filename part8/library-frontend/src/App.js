import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";
import Notify from "./components/Notify";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router-dom";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import { updateBookCache } from "./utils/books";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [genresSelected, setGenresSelected] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const client = useApolloClient();

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const notifySuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 10000);
  };

  const logout = (e) => {
    localStorage.clear();
    setToken(null);
    navigate("/");
  };

  const setGenreSelected = (genre) => {
    if (genresSelected.indexOf(genre) === -1)
      setGenresSelected(genresSelected.concat(genre));
  };

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    setToken(token);
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded;
      notifySuccess(`${bookAdded.title} added`);

      updateBookCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        bookAdded
      );

      // update already selected genres on books page
      for (let g of genresSelected) {
        if (bookAdded.genres.indexOf(g) !== -1)
          updateBookCache(
            client.cache,
            { query: ALL_BOOKS, variables: { genre: g } },
            bookAdded
          );
      }
    },
  });

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Notify successMessage={successMessage} />
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
            <Link to="/recommended">
              <button>recommended</button>
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
        <Route
          path="/"
          element={
            <Books setError={notifyError} setGenreSelected={setGenreSelected} />
          }
        />
        <Route path="/authors" element={<Authors setError={notifyError} />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setError={notifyError} />}
        />
        <Route
          path="/add"
          element={
            <NewBook setError={notifyError} genresSelected={genresSelected} />
          }
        />
        <Route path="/recommended" element={<Recommendations />} />
      </Routes>{" "}
    </div>
  );
};

export default App;
