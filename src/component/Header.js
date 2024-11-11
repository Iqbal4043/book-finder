import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ onSearch }) {
  // state to control search input visibility
  const [isInputVisible, setIsInputVisible] = useState(false);
  // state to hold the search term
  const [searchTerm, setSearchTerm] = useState("");
  // state to detect mobile view
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Function to update mobile view state based on screen width
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    // Add an event listener to detect window resizing
    window.addEventListener("resize", handleResize);

    // Run on initial render to set the initial view state
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchIconClick = () => {
    // Toggle input visibility on icon click
    if (!isInputVisible) {
      setIsInputVisible(true);
    } else {
      // Trigger search if input is already visible and search term is valid
      if (searchTerm.trim()) {
        onSearch(searchTerm);
      }
      // Clear the search term after search is triggered
      setSearchTerm("");
    }
  };

  const handleInputChange = (e) => {
    // Update search term as user types
    setSearchTerm(e.target.value);
  };

  return (
    <header>
      {/* Logo */}
      <Link to="/" className="logo">
        Book Finder
      </Link>

      {/* Navigation links */}
      <nav>
        <Link to="/">Home</Link>
      </nav>

      {/* Search form */}
      <form onSubmit={(e) => e.preventDefault()}>
        {(isMobileView || isInputVisible) && (
          <input
            type="text"
            className="search-input"
            name="search"
            placeholder="Search for books"
            value={searchTerm}
            onChange={handleInputChange}
          />
        )}
        <button
          type="button"
          className="search-icon"
          onClick={handleSearchIconClick}
        >
          🔍
        </button>
      </form>
    </header>
  );
}

export default Header;
