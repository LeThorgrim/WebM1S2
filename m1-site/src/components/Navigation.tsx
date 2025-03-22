'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `px-4 py-2 rounded transition duration-200 ${
      pathname === href
        ? 'bg-blue-600 text-white'
        : 'text-gray-200 hover:bg-blue-500 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2 text-white text-xl font-bold">
        <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
        <span>la Librairie d'Augustin et Marco</span>
      </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={linkClasses('/')}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/books" className={linkClasses('/books')}>
              Livres
            </Link>
          </li>
          <li>
            <Link href="/authors" className={linkClasses('/authors')}>
              Auteurs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
