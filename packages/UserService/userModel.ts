import { Schema, model } from "dynamoose";
import {IUser} from "datatypes";

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
  },
);

export const User = model<IUser>(process.env.TABLE_USER as string, schema);

