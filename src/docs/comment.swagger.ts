/**
 * @swagger
 * /articles/{id}/comments:
 *   get:
 *     summary: 게시글 댓글 목록 조회
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Comment"
 */

/**
 * @swagger
 * /products/{id}/comments:
 *   get:
 *     summary: 상품 댓글 목록 조회
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 */

/**
 * @swagger
 * /articles/{id}/comments:
 *   post:
 *     summary: 게시글 댓글 작성
 *     tags:
 *       - Comment
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: 좋은 글 감사합니다.
 *     responses:
 *       201:
 *         description: 댓글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Comment"
 */

/**
 * @swagger
 * /products/{id}/comments:
 *   post:
 *     summary: 상품 댓글 작성
 *     tags:
 *       - Comment
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: 상품 후기입니다.
 *     responses:
 *       201:
 *         description: 댓글 작성 성공
 */

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: 댓글 수정
 *     tags:
 *       - Comment
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: 수정된 댓글
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags:
 *       - Comment
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 댓글 삭제 성공
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: 좋은 게시글입니다.
 *         articleId:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         productId:
 *           type: integer
 *           nullable: true
 *           example: null
 *         authorId:
 *           type: integer
 *           example: 1
 *         authorNickname:
 *           type: string
 *           example: 테스터
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export {};
