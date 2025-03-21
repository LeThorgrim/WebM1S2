import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './authors.model';
import { AuthorRepository } from './authors.repository';
import { AuthorId } from '../database/entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAuthors();
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(input);
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorModel> {
    return this.authorRepository.getAuthorById(id);
  }

  public async updateAuthor(
    id: AuthorId,
    input: Partial<CreateAuthorModel>,
  ): Promise<AuthorModel> {
    return this.authorRepository.updateAuthor(id, input);
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    return this.authorRepository.deleteAuthor(id);
  }
}
