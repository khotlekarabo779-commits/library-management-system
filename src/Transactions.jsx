
import { useState, useEffect } from 'react';

function Transactions() {
  const [transactions, setTransactions] = useState(
    () => JSON.parse(localStorage.getItem('transactions')) || []
  );

  const [books, setBooks] = useState(
    () => JSON.parse(localStorage.getItem('books')) || []
  );

  const [student, setStudent] = useState('');
  const [bookId, setBookId] = useState('');
  const [type, setType] = useState('Borrow');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  function saveTransaction(e) {
    e.preventDefault();

    const selectedBook = books.find(
      book => book.id === Number(bookId)
    );

    if (!selectedBook) {
      alert('Please select a book.');
      return;
    }

    const quantity = Number(selectedBook.quantity);

    if (type === 'Borrow' && quantity < 1) {
      alert('This book is out of stock.');
      return;
    }

    const updatedBooks = books.map(book => {
      if (book.id === selectedBook.id) {
        return {
          ...book,
          quantity: type === 'Borrow' ? quantity - 1 : quantity + 1
        };
      }
      return book;
    });

    const newTransaction = {
      id: Date.now(),
      student,
      book: selectedBook.title,
      type,
      date: new Date().toLocaleDateString()
    };

    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    setTransactions([...transactions, newTransaction]);
    setStudent('');
    setBookId('');
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter(item => item.id !== id));
  }

  return (
    <div>
      <h1>Book Transactions</h1>
      <p>Record borrowed and returned books.</p>

      <form className="book-form" onSubmit={saveTransaction}>
        <input
          placeholder="Student name"
          value={student}
          onChange={e => setStudent(e.target.value)}
          required
        />

        <select
          value={bookId}
          onChange={e => setBookId(e.target.value)}
          required
        >
          <option value="">Select a book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.title} ({book.quantity} available)
            </option>
          ))}
        </select>

        <select value={type} onChange={e => setType(e.target.value)}>
          <option>Borrow</option>
          <option>Return</option>
        </select>

        <button type="submit">Save Transaction</button>
      </form>

      <h2>Transaction History</h2>

      {transactions.map(item => (
        <div className="card" key={item.id}>
          <p>Student: {item.student}</p>
          <p>Book: {item.book}</p>
          <p>Type: {item.type}</p>
          <p>Date: {item.date}</p>
          <button onClick={() => deleteTransaction(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Transactions;