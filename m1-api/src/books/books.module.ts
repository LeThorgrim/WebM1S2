import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Book])], // Register the Book entity
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
