import { Book } from "../models/Book";

interface BookListProps {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li key={book.id} className="p-4 border rounded shadow">
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p>Année : {book.year}</p>
          <p>Auteur : {book.author ? book.author.toString() : "Inconnu"}</p>
          <div className="mt-2 space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(book)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Modifier
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(book)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
