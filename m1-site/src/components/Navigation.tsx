
import Link from "next/link";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/books" className="hover:underline">
            Books
          </Link>
        </li>
        <li>
          <Link href="/authors" className="hover:underline">
            Authors
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;