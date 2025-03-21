import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BooksModule } from './modules/books/books.module';
import { AuthorModule } from './modules/authors/authors.module';

@Module({
  imports: [AuthorModule, DatabaseModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
