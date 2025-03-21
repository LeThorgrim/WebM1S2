import { Module } from '@nestjs/common';
import { AuthorController } from './authors.controller';
import { AuthorRepository } from './authors.repository';
import { AuthorService } from './authors.service';

@Module({
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
})
export class AuthorModule {}
