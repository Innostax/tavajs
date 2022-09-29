const { handleAnswersEvaluator } = require("../src/answersEvaluator");
describe("mock usage", () => {
  it("should use the mock", async () => {
    const result = await handleAnswersEvaluator();
    console.log("result ---->", result);
    //   expect(result).toBe('test@test.com');
  });
});
