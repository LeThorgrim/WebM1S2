import { AuthorId } from '../database/entities/author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
};
