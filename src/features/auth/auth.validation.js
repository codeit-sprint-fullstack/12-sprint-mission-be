export const validateSignup = ({ email, nickname, password }) => {
  if (!email || !nickname || !password) {
    const err = new Error("필수값이 누락되었습니다");
    err.status = 400;
    throw err;
  }

  if (password.length < 8) {
    const err = new Error("비밀번호는 8자 이상이어야 합니다");
    err.status = 400;
    throw err;
  }
};
