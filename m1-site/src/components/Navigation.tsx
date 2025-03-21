import Link from 'next/link';

export const Navigation: React.FC = () => (
  <nav className="bg-gray-800 text-white p-4">
    <ul className="flex space-x-4">
      <li>
        <Link href="/">Accueil</Link>
      </li>
      <li>
        <Link href="/books">Livres</Link>
      </li>
      <li>
        <Link href="/authors">Auteurs</Link>
      </li>
    </ul>
  </nav>
);