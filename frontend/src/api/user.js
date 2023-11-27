import instance from "./config";

const user_register = (user) => {
  return instance.post("/register", user);
};

const user_login = (user) => {
  return instance.post("/login", user, { withCredentials: true });
};
const get_user = async () => {
  return await instance.get("/get_user", { withCredentials: true });
};
export { user_register, user_login, get_user };
