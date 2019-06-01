import jwt from "jsonwebtoken";

const algorithm = process.env.JWT_ALGORITHM;
let secret: string;
const issuer = process.env.JWT_ISSUER;
let expiresIn: number;

if (process.env.JWT_EXPIRES_IN) {
  expiresIn = parseInt(process.env.JWT_EXPIRES_IN, 10);
}
if (process.env.JWT_SECRET) {
  secret = process.env.JWT_SECRET;
}

export function sign(subject: string): string {
  if (subject) {
    return jwt.sign({}, secret, {
      algorithm,
      issuer,
      subject,
      expiresIn,
    });
  }
  return "";
}

export function verify(token: string): JWT {
  if (token) {
    const result = jwt.verify(token, secret, { issuer });
    if (result && result instanceof Object) {
      return result;
    }
  }
  return {};
}

interface JWT {
  sub?: string;
}
