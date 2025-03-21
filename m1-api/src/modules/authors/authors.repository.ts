import { DataSource } from 'typeorm';
import { AuthorModel, CreateAuthorModel } from './authors.model';
import { AuthorEntity, AuthorId } from '../database/entities/author.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async getAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  public async createAuthor(input: CreateAuthorModel) {
    return this.authorRepository.save(this.authorRepository.create(input));
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorModel> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  public async updateAuthor(
    id: AuthorId,
    input: Partial<CreateAuthorModel>,
  ): Promise<AuthorModel> {
    const author = await this.getAuthorById(id); // Vérifie que l'auteur existe
    await this.authorRepository.update(id, input);
    return { ...author, ...input };
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.getAuthorById(id); // Vérifie que l'auteur existe
    await this.authorRepository.delete(id);
  }
}
