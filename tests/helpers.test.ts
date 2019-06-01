import { sign, verify } from "../src/helpers/jwt";
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

  it("should verify jwt", async (): Promise<void> => {
    const user = await createUser();
    const jwt = sign(user.id);
    const verified = verify(jwt);
    expect(verified.sub).toBeTruthy();
  });

  it("should fail to verify with empty token", async (): Promise<void> => {
    const verified = verify("");
    expect(verified).toEqual({});
  });
});
