
import { useState, useEffect } from "react";

function Books() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function saveBook(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !genre.trim() ||
        !isbn.trim() || quantity === "" || Number(quantity) < 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    if (editId !== null) {
      setBooks(books.map(book =>
        book.id === editId
          ? { ...book, title, author, genre, isbn, quantity: Number(quantity) }
          : book
      ));
      setEditId(null);
    } else {
      setBooks([...books, {
        id: Date.now(),
        title,
        author,
        genre,
        isbn,
        quantity: Number(quantity)
      }]);
    }

    clearForm();
  }

  function clearForm() {
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");
    setEditId(null);
  }

  function editBook(book) {
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setIsbn(book.isbn);
    setQuantity(String(book.quantity));
    setEditId(book.id);
  }

  function deleteBook(id) {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter(book => book.id !== id));
    }
  }

  return (
    <div className="books-page">
      <h1>Book Management</h1>
      <p>Add and manage books in your community library.</p>

      <form onSubmit={saveBook} className="book-form">
        <input
          placeholder="Book Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />

        <input
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          required
        />

        <input
          placeholder="ISBN"
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Initial Quantity"
          min="0"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />

        <button type="submit">
          {editId !== null ? "Update Book" : "Add Book"}
        </button>

        {editId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Book List ({books.length})</h2>

      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <button onClick={() => editBook(book)}>
                      Update
                    </button>

                    <button onClick={() => deleteBook(book.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Books;