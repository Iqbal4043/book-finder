import React from "react";

// function to truncate long text arrays
const truncateText = (textArray, maxLength = 150) => {
  const text = textArray.join(", ");
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const BookCard = ({ books, onSearch }) => {
  return (
    <div className="book-card">
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>First Published Year</th>
            <th>No Of Pages</th>
            <th>Publish Place</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over books array to render each book's details in a row */}
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              {/* fetch data according to the book title name not author name */}
              <td>
                <span
                  onClick={() => onSearch(book.author_name)}
                  className="clickable"
                >
                  {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </span>
              </td>
              <td>{book.first_publish_year || "N/A"}</td>
              <td>{book.number_of_pages_median || "N/A"}</td>
              {/* fetch data according to the book title name not publish place name */}
              <td>
                <span
                  onClick={() => onSearch(book.publish_place)}
                  className="clickable"
                >
                  {book.publish_place
                    ? truncateText(book.publish_place, 120)
                    : "N/A"}
                </span>
              </td>
              <td>
                {book.publisher ? truncateText(book.publisher, 120) : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookCard;
