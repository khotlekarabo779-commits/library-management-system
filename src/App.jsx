import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './App.css';
import Books from './Books';
import Transactions from './Transactions';
import Users from './Users';

function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
  }, []);

  const totalBooks = books.reduce(
    (total, book) => total + Number(book.quantity || 0), 0
  );

  return (
    <div>
      <h1>Library Dashboard</h1>
      <p>Welcome to your community library.</p>

      <div className="cards">
        <div className="card">
          <h3>Total Books</h3>
          <h2>{totalBooks}</h2>
        </div>

        <div className="card">
          <h3>Different Titles</h3>
          <h2>{books.length}</h2>
        </div>
      </div>

      <h2>Current Book Availability</h2>

      {books.length === 0 ? (
        <p>No books available yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>Available Copies</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.quantity}</td>
                  <td>
                    {Number(book.quantity) < 2
                      ? 'LOW STOCK'
                      : 'Available'}
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


function OldBooks() {
  const [books, setBooks] = useState(
    () => JSON.parse(localStorage.getItem('books')) || []
  );
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [quantity, setQuantity] = useState(1);

  function addBook(event) {
    event.preventDefault();

    const newBook = {
      id: Date.now(),
      title,
      author,
      genre,
      isbn,
      quantity: Number(quantity)
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    setTitle('');
    setAuthor('');
    setGenre('');
    setIsbn('');
    setQuantity(1);
  }

  function deleteBook(id) {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  }

  return (
    <div>
      <h1>Book Management</h1>

      <form onSubmit={addBook} className="book-form">
        <input
          placeholder="Book title"
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
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      <h2>Book List</h2>

      <div className="book-list">
        {books.map(book => (
          <div className="card" key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Quantity: {book.quantity}</p>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OldTransactions() {
  return (
    <div>
      <h1>Transactions</h1>
      <p>We will add borrowing and returning records here next.</p>
    </div>
  );
}

function OldUsers() {
  return (
    <div>
      <h1>User Management</h1>
      <p>We will add member registration and login here next.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <nav>
          <h2>My Library</h2>
          <Link to="/">Dashboard</Link>
          <Link to="/books">Books</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/users">Users</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;