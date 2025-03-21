import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthorService } from './authors.service';
import { AuthorModel } from './authors.model';
import { CreateAuthorDto, UpdateAuthorDto } from './authors.dto';
import { AuthorId } from '../database/entities/author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  public async getAuthors(): Promise<AuthorModel[]> {
    return this.authorService.getAuthors();
  }

  @Post()
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<AuthorModel> {
    return this.authorService.createAuthor(input);
  }

  @Put(':id')
  public async updateAuthor(
    @Param('id') id: AuthorId,
    @Body() input: UpdateAuthorDto,
  ): Promise<AuthorModel> {
    return this.authorService.updateAuthor(id, input);
  }

  @Delete(':id')
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    return this.authorService.deleteAuthor(id);
  }
}
