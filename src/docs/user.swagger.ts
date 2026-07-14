/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 내 정보 조회
 *     tags:
 *       - User
 *     description: 로그인한 사용자의 정보를 조회합니다.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/PublicUser"
 *       401:
 *         description: 인증되지 않은 사용자
 *       404:
 *         description: 사용자를 찾을 수 없음
 */

export {};
