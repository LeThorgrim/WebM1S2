import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './authors.model';
import { AuthorRepository } from './authors.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAuthors();
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(input);
  }
}
