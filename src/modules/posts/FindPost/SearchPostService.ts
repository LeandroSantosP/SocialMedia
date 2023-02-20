import { inject, injectable } from "tsyringe";
import { IPostContract } from "../infra/repositories/create-post-contract";

interface IRequest {
  search: string;
  take: number;
  skip: number;
}

@injectable()
export class SearchPostService {
  constructor(
    @inject("PostRepository")
    private PostRepository: IPostContract
  ) {}

  async execute({ search, skip, take }: IRequest) {
    const postForSearch = await this.PostRepository.GetAllPostForSearch(
      search,
      take,
      skip
    );

    return postForSearch;
  }
}
