import { IsArray, IsInt } from 'class-validator';

export class DeleteMany<%= classify(name) %>Dto {
  @IsArray()
  @IsInt({ each: true })
  ids: number[];
}
