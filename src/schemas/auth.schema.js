import { email, z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 형식이 올바르지 않습니다."),
  password: z
    .string()
    .trim()
    .min(1, "비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(20, "비밀번호는 20자 이하여야 합니다.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      "비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
  nickname: z
    .string()
    .trim()
    .min(1, "닉네임을 입력해주세요.")
    .max(20, "닉네임은 20자 이하여야 합니다.")
    .regex(
      /^[가-힣a-zA-Z0-9_-]+$/,
      "닉네임은 한글, 영문, 숫자, -, _만 사용할 수 있습니다.",
    )
    .refine((value) => !/[-_]{2}/.test(value), {
      message: "특수문자는 연속해서 사용할 수 없습니다.",
    })
    .refine((value) => !/^[-_]|[-_]$/.test(value), {
      message: "특수문자는 시작이나 끝에 사용할 수 없습니다.",
    }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 형식이 올바르지 않습니다."),
  password: z.string().trim().nonempty("비밀번호를 입력해주세요."),
});
