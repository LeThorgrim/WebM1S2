import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { Book } from '../database/entities/book.entity';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Get()
    findAll(): Promise<Book[]> {
      return this.booksService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Book | null> {
      return this.booksService.findOne(id);
    }
  
    @Post()
    create(@Body() book: Partial<Book>): Promise<Book> {
      console.log("Données reçues par l'API :", book); // DEBUG
    
      if (!book.authorId || typeof book.authorId !== 'string') {
        console.error("ERREUR: authorId doit être un UUID !");
        throw new Error("L'ID de l'auteur est obligatoire et doit être un UUID !");
      }
    
      return this.booksService.create(book);
    }
    
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() book: Book,
    ): Promise<Book> {
      return this.booksService.update(id, book);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.booksService.delete(id);
    }
  }
  