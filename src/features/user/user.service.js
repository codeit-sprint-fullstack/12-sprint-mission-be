import * as userRepository from "./user.repository.js";

export const getMe = async (userId) => {
  const user = await userRepository.findById(userId);
  return user;
};
