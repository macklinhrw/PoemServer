import Poem, { PoemClass } from "../models/Poem";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(PoemClass)
export class PoemResolver {
  @Query(() => PoemClass, { nullable: true })
  async getPoem(@Arg("id") id: string) {
    const poem = Poem.findById(id);
    return poem;
  }

  @Query(() => PoemClass, { nullable: true })
  async getPoemBySlug(@Arg("slug") slug: string) {
    const poem = Poem.findOne({ slug: slug });
    return poem;
  }

  @Query(() => [PoemClass], { nullable: true })
  async getAllPoems() {
    const poems = Poem.find({});
    return poems;
  }

  @Mutation(() => PoemClass, { nullable: true })
  async createPoem(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("isDraft") isDraft: boolean,
    @Arg("hasTitle") hasTitle: boolean,
    @Arg("slug") slug: string
  ) {
    const post = await Poem.create({
      title: title,
      content: content,
      isDraft: isDraft,
      hasTitle: hasTitle,
      slug: slug,
    });

    return post;
  }
}
