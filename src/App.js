import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { searchBooks } from "./api/openLibrary";
import Header from "./component/Header";
import BookList from "./component/BookList";
import BookSearch from "./component/BookSearch";

const App = () => {
  // store the list of books from the search
  const [books, setBooks] = useState([]);
  // track loading status while fetching books
  const [loading, setLoading] = useState(false);
  // store error messages
  const [errorMessage, setErrorMessage] = useState("");
  // store recent search
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  // State for the search term input (debounced and actual)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    // Cleanup the timeout if searchTerm changes before 500ms
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch books whenever debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchBooksFromQuery(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // Function to fetch books based on the search query, Check if the search results are already in localStorage
  const fetchBooksFromQuery = async (query) => {
    const cachedData = localStorage.getItem(query);
    if (cachedData) {
      setBooks(JSON.parse(cachedData));
      return;
    }

    // Set loading state and clear error message before fetching
    setLoading(true);
    setErrorMessage("");

    try {
      const results = await searchBooks(query);
      if (results && results.length > 0) {
        // Store only top 10 books to display
        setBooks(results.slice(0, 10));
        // Cache the search results in localStorage
        localStorage.setItem(query, JSON.stringify(results));
      } else {
        setBooks([]);
        setErrorMessage("No books found.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch books. Please try again.");
    }
    setLoading(false);
  };

  // Function to handle search submissions from Header or Recent Searches
  const handleSearch = async (query) => {
    navigate(`/search/${query}`);
    setSearchTerm(query);

    // Update recent searches (max 10, remove duplicates)
    const updatedSearches = [
      query,
      ...recentSearches.filter((search) => search !== query),
    ].slice(0, 10);
    setRecentSearches(updatedSearches);

    // save updated searches in localStorage for persistence
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // load recent searches from localStorage on initial render
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    if (savedSearches) {
      setRecentSearches(savedSearches);
    }
  }, []);

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <BookList
              title="Top Books"
              onSearch={handleSearch}
              recentSearches={recentSearches}
            />
          }
        />
        <Route
          path="/search/:query"
          element={
            <BookSearch
              loading={loading}
              books={books}
              errorMessage={errorMessage}
              onSearch={handleSearch}
              recentSearches={recentSearches}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
