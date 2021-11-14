import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@ModelOptions({
  options: { automaticName: false, customName: "poem" },
  schemaOptions: { timestamps: true, autoIndex: false },
})
export class PoemClass {
  @Field()
  id?: string;

  @Field()
  @prop()
  title?: string;

  @Field()
  @prop({ unique: true })
  slug: string;

  @Field()
  @prop()
  content: string;

  @Field()
  @prop()
  isDraft: boolean;

  @Field()
  @prop()
  hasTitle: boolean;

  // TODO: add image
}

const Poem = getModelForClass(PoemClass);

export default Poem;
