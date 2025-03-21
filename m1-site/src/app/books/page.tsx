"use client";

import { useState } from "react";
import BookList from "../../components/BookList";
import { Modal } from "../../components/Modal";
import { Book } from "../../models/Book";

export default function BooksPage() {
  // Données temporaires (à remplacer par un fetch API plus tard)
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "Book 1", year: 2020, author: "Author 1" },
    { id: 2, title: "Book 2", year: 2019, author: "Author 2" },
  ]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrer les livres par titre
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  // Trier les livres par titre
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div>
      <h1 className="text-2xl mb-4">Library</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Book
        </button>
      </div>
      <BookList books={sortedBooks} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl mb-4">Add a New Book</h2>
        <form>
          <div className="mb-2">
            <label>Title:</label>
            <input type="text" className="p-2 border rounded w-full" />
          </div>
          <div className="mb-2">
            <label>Year:</label>
            <input type="number" className="p-2 border rounded w-full" />
          </div>
          <div className="mb-2">
            <label>Author:</label>
            <input type="text" className="p-2 border rounded w-full" />
          </div>
          <button type="submit" className="p-2 bg-green-500 text-white rounded">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}