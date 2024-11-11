import React from "react";
import BookCard from "./BookCard";
import RecentSearch from "./RecentSearch";

const BookSearch = ({
  loading,
  books,
  errorMessage,
  onSearch,
  recentSearches,
}) => {
  return (
    <>
      {loading && (
        <p className="loading-message">Loading books, please wait...</p>
      )}

      <div className="box">
        {/* Only render the main content once loading is complete */}
        {!loading && (
          <>
            <div className="left-container">
              {errorMessage && <p>{errorMessage}</p>}

              {books.length > 0 ? (
                <div className="book-list">
                  <div className="heading-box">
                    <h2>Search Results</h2>
                  </div>
                  <BookCard books={books.slice(0, 10)} onSearch={onSearch} />
                </div>
              ) : (
                <p className="loading-message">
                  No books found matching your query.
                </p>
              )}
            </div>

            {/* Sidebar for recent searches */}
            <div className="side-bar">
              <RecentSearch
                onSearch={onSearch}
                recentSearches={recentSearches}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookSearch;
