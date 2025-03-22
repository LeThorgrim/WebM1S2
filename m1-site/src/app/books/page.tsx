'use client';

import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList';
import { Modal } from '../../components/Modal';
import { Book } from '../../models/Book';
import { AuthorEntity } from '../../models/Author';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<AuthorEntity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'title-asc' | 'title-desc' | 'year-asc' | 'year-desc' | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({ title: '', year: 0, authorId: '' });

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/books');
      if (!response.ok) throw new Error('Erreur lors du chargement des livres');
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3001/authors');
      if (!response.ok) throw new Error('Erreur lors du chargement des auteurs');
      const data: AuthorEntity[] = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    if (!formData.authorId) return;

    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de la création');
      await fetchBooks();
      setIsCreateModalOpen(false);
      setFormData({ title: '', year: 0, authorId: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      year: book.year,
      authorId: (book.authorId || book.author?.id || '').toString(),
    });
    setIsEditModalOpen(true);
  };

  const handleEdit = async () => {
    if (!selectedBook) return;

    try {
      const response = await fetch(`http://localhost:3001/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de la modification');
      const updatedBook: Book = await response.json();
      setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
      setIsEditModalOpen(false);
      setSelectedBook(null);
      setFormData({ title: '', year: 0, authorId: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedBook) return;

    try {
      const response = await fetch(`http://localhost:3001/books/${selectedBook.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setBooks(books.filter((book) => book.id !== selectedBook.id));
      setIsDeleteModalOpen(false);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔍 Recherche locale
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔡 Tri
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'year-asc':
        return a.year - b.year;
      case 'year-desc':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des livres</h1>

      {/* 🔍 Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
      />

      {/* 🔘 Boutons de tri */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setSortOption('title-asc')}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Trier A → Z
        </button>
        <button
          onClick={() => setSortOption('title-desc')}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Trier Z → A
        </button>
        <button
          onClick={() => setSortOption('year-asc')}
          className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Année ↑
        </button>
        <button
          onClick={() => setSortOption('year-desc')}
          className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Année ↓
        </button>
      </div>

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Ajouter un livre
      </button>

      <BookList
        books={sortedBooks}
        onEdit={openEditModal}
        onDelete={(book) => {
          setSelectedBook(book);
          setIsDeleteModalOpen(true);
        }}
      />

      {/* Modal de création / modification */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
        }}
        onConfirm={isCreateModalOpen ? handleCreate : handleEdit}
        title={isCreateModalOpen ? "Ajouter un livre" : "Modifier le livre"}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Titre"
          />
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            placeholder="Année"
          />
          <select
            value={formData.authorId}
            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionner un auteur</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.firstName} {author.lastName}
              </option>
            ))}
          </select>
        </div>
      </Modal>

      {/* Modal de suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
      >
        <p>Êtes-vous sûr de vouloir supprimer "{selectedBook?.title}" ?</p>
      </Modal>
    </div>
  );
};

export default BooksPage;
