import { DataSource } from 'typeorm';
import { AuthorModel, CreateAuthorModel } from './authors.model';
import { AuthorEntity } from '../database/entities/author.entity';
import { Injectable } from '@nestjs/common';

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
}
