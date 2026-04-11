import { useState } from 'react';
import { books, type Book } from '../data/sampleData';

function BookSpine({ book, index, isSelected, onClick }: { book: Book; index: number; isSelected: boolean; onClick: () => void }) {
  const width = 30 + (index % 4) * 4;
  return (
    <div
      className={`book-spine ${isSelected ? 'book-spine--selected' : ''}`}
      style={{
        width: `${width}px`,
        height: `${book.height}px`,
        background: `linear-gradient(135deg, ${book.color}18, ${book.color}08)`,
        borderLeft: `2px solid ${book.color}`,
        boxShadow: isSelected ? `0 0 20px ${book.color}30` : 'none',
      }}
      onClick={onClick}
    >
      <span className="book-spine-title" style={{ color: book.color }}>
        {book.title.length > 20 ? book.title.slice(0, 18) + '...' : book.title}
      </span>
    </div>
  );
}

function BookDetail({ book }: { book: Book }) {
  return (
    <div className="book-detail" style={{ borderColor: book.color + '30' }}>
      <div className="book-detail-accent" style={{ background: book.color }} />
      <h4 className="book-detail-title">{book.title}</h4>
      <p className="book-detail-author">{book.author}</p>
      <p className="book-detail-summary">{book.summary}</p>
      <span className="book-detail-year" style={{ color: book.color }}>{book.year}</span>
    </div>
  );
}

export default function Bookshelf() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="card bookshelf-card">
      <div className="card-header">
        <div className="card-icon" style={{ color: 'var(--accent-amber)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <h3 className="card-title">Library</h3>
        <span className="card-count">{books.length} books</span>
      </div>

      <div className="bookshelf-shelf">
        <div className="bookshelf-books">
          {books.map((book, i) => (
            <BookSpine
              key={book.id}
              book={book}
              index={i}
              isSelected={selectedBook?.id === book.id}
              onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
            />
          ))}
        </div>
        <div className="bookshelf-base" />
      </div>

      {selectedBook && <BookDetail book={selectedBook} />}
    </div>
  );
}
