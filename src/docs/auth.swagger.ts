/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 회원가입
 *     tags:
 *       - Auth
 *     description: 새로운 사용자를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nickname
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일
 *                 example: test@test.com
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임
 *                 example: 테스터
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/PublicUser"
 *       400:
 *         description: 잘못된 요청 데이터
 *       409:
 *         description: 이미 존재하는 이메일
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags:
 *       - Auth
 *     description: 이메일과 비밀번호로 로그인하고 Access Token과 Refresh Token을 Cookie로 발급합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly Cookie로 accessToken과 refreshToken이 저장됩니다.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/PublicUser"
 *       401:
 *         description: 이메일 또는 비밀번호가 올바르지 않음
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Access Token 재발급
 *     tags:
 *       - Auth
 *     description: Refresh Token Cookie를 이용하여 새로운 Access Token을 발급합니다.
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         description: 로그인 시 발급된 Refresh Token
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Access Token 재발급 성공
 *         headers:
 *           Set-Cookie:
 *             description: 새로운 accessToken이 HttpOnly Cookie로 저장됩니다.
 *             schema:
 *               type: string
 *       401:
 *         description: Refresh Token이 없거나 유효하지 않음
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: 로그아웃
 *     tags:
 *       - Auth
 *     description: 저장된 Refresh Token을 삭제하고 인증 Cookie를 제거합니다.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       204:
 *         description: 로그아웃 성공
 *       401:
 *         description: 인증되지 않은 사용자
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 *
 *   schemas:
 *     PublicUser:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - nickname
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: test@test.com
 *         nickname:
 *           type: string
 *           example: 테스터
 */

export {};
