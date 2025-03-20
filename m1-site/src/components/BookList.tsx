
import Link from "next/link";
import { Book } from "../models/Book";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li key={book.id} className="p-4 border rounded">
          <Link href={`/books/${book.id}`}>
            <h2 className="text-lg font-bold">{book.title}</h2>
          </Link>
          <p>Year: {book.year}</p>
          <p>Author: {book.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookList;