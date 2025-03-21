import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type AuthorId = string & { __brand: 'Author' };

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;
}
