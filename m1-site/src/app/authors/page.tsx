'use client';

import React, { useState, useEffect } from 'react';
import { AuthorList } from '../../components/AuthorList';
import { Modal } from '../../components/Modal';
import { AuthorEntity as Author } from '../../models/Author';

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 Barre de recherche
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

  // Charger les auteurs depuis l'API
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3001/authors');
      if (!response.ok) throw new Error('Erreur lors du chargement des auteurs');
      const data: Author[] = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Créer un auteur
  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:3001/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Erreur lors de la création');
      const newAuthor: Author = await response.json();
      setAuthors([...authors, newAuthor]);
      setIsCreateModalOpen(false);
      setFormData({ firstName: '', lastName: '' });
    } catch (error) {
      console.error(error);
    }
  };

  // Modifier un auteur
  const handleEdit = async () => {
    if (!selectedAuthor) return;
    try {
      const response = await fetch(`http://localhost:3001/authors/${selectedAuthor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification');
      const updatedAuthor: Author = await response.json();
      setAuthors(authors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author,
      ));
      setIsEditModalOpen(false);
      setSelectedAuthor(null);
      setFormData({ firstName: '', lastName: '' });
    } catch (error) {
      console.error(error);
    }
  };

  // Supprimer un auteur
  const handleDelete = async () => {
    if (!selectedAuthor) return;
    try {
      const response = await fetch(`http://localhost:3001/authors/${selectedAuthor.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setAuthors(authors.filter((author) => author.id !== selectedAuthor.id));
      setIsDeleteModalOpen(false);
      setSelectedAuthor(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateModal = () => {
    setFormData({ firstName: '', lastName: '' });
    setIsCreateModalOpen(true);
  };

  const openEditModal = (author: Author) => {
    setSelectedAuthor(author);
    setFormData({ firstName: author.firstName, lastName: author.lastName });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (author: Author) => {
    setSelectedAuthor(author);
    setIsDeleteModalOpen(true);
  };

  // 🔍 Recherche locale
  const filteredAuthors = authors.filter(author =>
    `${author.firstName} ${author.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des auteurs</h1>

      {/* 🔍 Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un auteur..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
      />

      <button
        onClick={openCreateModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Ajouter un auteur
      </button>

      <AuthorList authors={filteredAuthors} onEdit={openEditModal} onDelete={openDeleteModal} />

      {/* Modal pour créer un auteur */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreate}
        title="Ajouter un auteur"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Prénom"
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Nom"
          />
        </div>
      </Modal>

      {/* Modal pour modifier un auteur */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEdit}
        title="Modifier l'auteur"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Prénom"
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Nom"
          />
        </div>
      </Modal>

      {/* Modal pour supprimer un auteur */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
      >
        <p>
          Êtes-vous sûr de vouloir supprimer {selectedAuthor?.firstName}{' '}
          {selectedAuthor?.lastName} ?
        </p>
      </Modal>
    </div>
  );
};

export default AuthorsPage;