export const createUserSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
      required: ["id", "name"],
    },
  },
};
