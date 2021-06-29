import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();
    // Incluindo o # na frente do nome da tag #tag
    //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));
    // Será realizado através da biblioteca class-transformer

    return classToPlain(tags);
  }
}

export { ListTagsService };
