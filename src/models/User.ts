import { types } from "mobx-state-tree";

export const User = types.model("User", {
  id: types.string,
  displayName: types.optional(types.string, "Anonymous"),
  avatarUrl: types.maybe(types.string),
});
