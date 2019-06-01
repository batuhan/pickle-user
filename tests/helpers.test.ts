import { sign } from "../src/helpers/jwt";
import { createUser } from "./helpers";
import "./init";

describe("helper tests", (): void => {
  it("should sign jwt", async (): Promise<void> => {
    const user = await createUser();
    const jwt = sign(user.id);
    expect(jwt).not.toEqual("");
  });

  it("should fail to sign with empty subject", (): void => {
    const jwt = sign("");
    expect(jwt).toEqual("");
  });
});
