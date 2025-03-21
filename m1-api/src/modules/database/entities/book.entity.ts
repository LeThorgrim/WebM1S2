import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AuthorEntity } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @ManyToOne(() => AuthorEntity, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: AuthorEntity;

  @Column({ nullable: false, type: 'uuid' })
  authorId: string;
}
