import { Schema, model } from "dynamoose";

const schema = new Schema(
  {
    id: {
      type: Number,
      hashKey: true,
    },
    name: { type: String, required: true },
  },
  {
    saveUnknown: false,
    timestamps: true,
  }
);

export const User = model(process.env.TABLE_USER as string, schema);
