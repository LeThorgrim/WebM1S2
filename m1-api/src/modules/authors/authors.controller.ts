import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { AuthorModel } from './authors.model';
import { CreateAuthorDto } from './authors.dto';

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
}
