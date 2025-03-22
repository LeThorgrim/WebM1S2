import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Book } from './book.entity';

export type AuthorId = string & { __brand: 'Author' };

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @OneToMany(() => Book, book => book.author)
  books: Book[];
}
