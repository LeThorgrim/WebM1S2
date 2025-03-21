import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../database/entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOneBy({ id });
  }

  create(book: Partial<Book>): Promise<Book> {
    const newBook = this.booksRepository.create(book); 
    return this.booksRepository.save(newBook); 
  }
  

  async update(id: number, updated: Book): Promise<Book> {
    await this.booksRepository.update(id, updated);
    return this.booksRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
