import React, { useEffect, useState } from "react";
import { searchBooks } from "../api/openLibrary";
import BookCard from "./BookCard";
import RecentSearch from "./RecentSearch";

const BookList = ({ title, onSearch, recentSearches }) => {
  // state to hold list of books
  const [books, setBooks] = useState([]);
  // manage loading status
  const [loading, setLoading] = useState(true);
  // store error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Effect to fetch books based on the provided title when component mounts or title changes
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setErrorMessage("");

      // Check if data is cached in localStorage
      const cachedData = localStorage.getItem(title);
      if (cachedData) {
        // set cached top 10 books to state
        setBooks(JSON.parse(cachedData).slice(0, 10));
        setLoading(false);
        return;
      }

      try {
        // Fetch books from the API
        const fetchedBooks = await searchBooks(title);

        // Filter out books missing critical information
        const filteredBooks = fetchedBooks.filter(
          (book) =>
            book.title &&
            book.author_name &&
            book.first_publish_year &&
            book.publish_place &&
            book.publisher
        );

        // Limit results to top 10 after filtering
        setBooks(filteredBooks.slice(0, 10));

        // Cache the data in localStorage
        localStorage.setItem(title, JSON.stringify(filteredBooks));
        setLoading(false);
      } catch (error) {
        setErrorMessage("Failed to fetch books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [title]);

  if (loading) {
    return <p className="loading-message">Loading books... Please wait.</p>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  return (
    <>
      <div className="box">
        <div className="left-container">
          <section id={title.toLowerCase().replace(" ", "-")}>
            <div className="heading-box">
              <h2>{title}</h2>
            </div>
            {books.length === 0 ? (
              <p>No books found.</p>
            ) : (
              <BookCard books={books} onSearch={onSearch} />
            )}
          </section>
        </div>
        
        {/*sidebar for recent searches */}
        <div className="side-bar">
          <RecentSearch onSearch={onSearch} recentSearches={recentSearches} />
        </div>
      </div>
    </>
  );
};

export default BookList;
