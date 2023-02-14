import { PostRepository } from "../../../shared/Repositorys/PostRepository/implementations/PostRepository";

export class GetAllPostService {
  constructor(private PostRepository: PostRepository) {}

  async execute() {
    const result = await this.PostRepository.getAllPost();

    return result;
  }
}
