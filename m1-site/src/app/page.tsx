'use client';
import './App.css';

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50 text-gray-800 px-4">
      <div className="text-center max-w-xl">
        <div className="flex justify-center items-center mb-4">
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-3xl font-bold text-blue-700">la Librairie d'Augustin et Marco</h1>
        </div>

        <p className="text-lg text-gray-600 mb-6">
          Gérez vos livres et leurs auteurs dans une interface simple.
        </p>

        <div className="flex justify-center space-x-4">
          <a
            href="/books"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Voir les livres
          </a>
          <a
            href="/authors"
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Voir les auteurs
          </a>
        </div>
      </div>
    </div>
  );
}
