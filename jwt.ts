import jwt from "jsonwebtoken";
import { User } from "./types/model/table/User";
import { UserRole } from "./types/model/enum/UserRole";
import { IsNull } from "typeorm";

export function signJWT(user_id: number) {
  return jwt.sign(String(user_id), process.env.JWT_SECRET_KEY ?? "sample-jwt");
}

export async function extractJWT(token: string) {
  return new Promise<string>((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY ?? "sample-jwt",
      async (err: any, data: any) => {
        if (err) {
          reject(err.toString());
        }
        resolve(data);
      }
    );
  });
}

export async function getKasirFromAuthHeader(
  authorization: string
): Promise<User> {
  const [_, token] = authorization.split(" ");
  if (!token) {
    throw new Error(`Data tidak ditemukan`);
  }

  const id = await extractJWT(token);
  if (!id && isNaN(parseInt(id))) {
    throw new Error(`Data tidak ditemukan.`);
  }

  const pengguna: User | null = await User.findOne({
    where: {
      id: parseInt(id),
      role: UserRole.Kasir,
      deleted_at: IsNull(),
      is_active: true
    }
  });
  if (!pengguna) {
    throw new Error(`data tidak ditemukan.`);
  }
  return pengguna;
}

export async function getAdminFromAuthHeader(
  authorization: string
): Promise<User> {
  const [_, token] = authorization.split(" ");
  if (!token) {
    throw new Error(`Data tidak ditemukan`);
  }

  const id = await extractJWT(token);
  if (!id && isNaN(parseInt(id))) {
    throw new Error(`Data tidak ditemukan.`);
  }

  const pengguna: User | null = await User.findOne({
    where: {
      id: parseInt(id),
      role: UserRole.Admin,
      deleted_at: IsNull(),
      is_active: true
    }
  });
  if (!pengguna) {
    throw new Error(`data tidak ditemukan.`);
  }
  return pengguna;
}
