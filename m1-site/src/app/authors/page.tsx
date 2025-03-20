// app/authors/page.tsx
"use client"; // Nécessaire car nous utilisons useState

import { useState } from "react";
import AuthorList from "../../components/AuthorList";
import Modal from "../../components/Modal";
import { Author } from "../../models/Author";
export default function AuthorsPage() {
  // Données temporaires (à remplacer par un fetch API plus tard)
  const [authors, setAuthors] = useState<Author[]>([
    {
      id: 1,
      name: "Author 1",
      photo: "https://via.placeholder.com/150", // Image placeholder
      books: [{ id: 1, title: "Book 1", year: 2020, author: "Author 1" }],
    },
    {
      id: 2,
      name: "Author 2",
      photo: "https://via.placeholder.com/150", // Image placeholder
      books: [{ id: 2, title: "Book 2", year: 2019, author: "Author 2" }],
    },
  ]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrer les auteurs par nom
  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(search.toLowerCase())
  );

  // Trier les auteurs par nom
  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div>
      <h1 className="text-2xl mb-4">Authors</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search authors..."
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
          Add Author
        </button>
      </div>
      <AuthorList authors={sortedAuthors} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl mb-4">Add a New Author</h2>
        <form>
          <div className="mb-2">
            <label>Name:</label>
            <input type="text" className="p-2 border rounded w-full" />
          </div>
          <div className="mb-2">
            <label>Photo URL:</label>
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