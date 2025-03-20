
import Link from "next/link";
import { Author } from "../models/Author";

interface AuthorListProps {
  authors: Author[];
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
  return (
    <ul className="space-y-4">
      {authors.map((author) => (
        <li key={author.id} className="p-4 border rounded flex items-center space-x-4">
          <img
            src={author.photo}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <Link href={`/authors/${author.id}`}>
              <h2 className="text-lg font-bold">{author.name}</h2>
            </Link>
            <p>Books: {author.books?.length ?? 0}</p>
            {/* La moyenne des notes sera ajoutée plus tard */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AuthorList;