import { IPostContract } from "../../shared/Repositorys/PostRepository/create-post-contract";

export class GetAllPostService {
  constructor(private PostRepository: IPostContract) {}

  async execute() {
    const result = await this.PostRepository.getAllPost();

    return result;
  }
}
