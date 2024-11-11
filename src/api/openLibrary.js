import axios from "axios";

export const searchBooks = async (bookTitle) => {
  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${bookTitle}`
    );

    // Check if response is successful
    if (response.status === 200) {
      return response.data.docs;
    } else {
      throw new Error(`API returned status code ${response.status}`);
    }
  } catch (error) {
    // If there is an error (e.g., network failure, invalid response, etc.)
    console.error("Error fetching books:", error.message);
    throw new Error("Failed to fetch books. Please try again later.");
  }
};