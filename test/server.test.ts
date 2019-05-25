import { createTestClient } from "apollo-server-testing";
import server from "../src/app";

const { query } = createTestClient(server);

describe("sample test", () => {
  let book: { author: string; title: string };

  beforeAll(async () => {
    const result = await query({
      query: `
{
  books {
    title
    author
  }
}
`
    });
    book = result.data!.books[0];
  });

  it("should be equal", () => {
    expect(book).toEqual({
      author: "J.K. Rowling",
      title: "Harry Potter and the Chamber of Secrets"
    });
  });
  it("shouldn't mismatch author", () => {
    expect(book).not.toEqual({
      author: "J.K. Rowling2",
      title: "Harry Potter and the Chamber of Secrets"
    });
  });
  it("shouldn't mismatch title", () => {
    expect(book).not.toEqual({
      author: "J.K. Rowling2",
      title: "Harry Potter and the Chamber of Secrets2"
    });
  });
});
