import randColor from "../../server/utils/randColor.js";

test("produces a random color", () => {
  expect(randColor()).toBeTruthy();
});
