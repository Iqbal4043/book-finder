import React from "react";

const RecentSearch = ({ recentSearches, onSearch }) => {
  // Function to handle clicks on a recent search term
  const handleSearchClick = (term) => {
    // Trigger a search using the clicked recent search term
    onSearch(term);
  };

  return (
    <div className="recent-searches">
      <div className="heading-box">
        <h2>Recent Searches</h2>
      </div>

      {/* Check if there are recent searches to display */}
      {recentSearches.length > 0 ? (
        <ul>
          {recentSearches.map((term, index) => (
            <li key={index} onClick={() => handleSearchClick(term)}>
              <p className="clickable">{term}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="loading-message">No recent searches found.</p>
      )}
    </div>
  );
};

export default RecentSearch;
