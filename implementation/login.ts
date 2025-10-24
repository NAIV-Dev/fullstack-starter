import { signJWT } from "../jwt";
import { T_login } from "../types/api/login";
import { User } from "../types/model/table/User";
import bcrypt from 'bcrypt';

export const login: T_login = async req => {
  const user = await User.findOneBy({ username: req.body.username });
  if (!user) {
    throw new Error(`username not found`);
  }

  if (!await bcrypt.compare(req.body.password, user.password)) {
    throw new Error(`wrong password`);
  }

  return {
    token: signJWT(user.id),
    user
  };
}
