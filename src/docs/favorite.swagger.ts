/**
 * @swagger
 * /articles/{id}/favorite:
 *   post:
 *     summary: 게시글 좋아요 추가
 *     tags:
 *       - Favorite
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: 좋아요 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Favorite"
 */

/**
 * @swagger
 * /products/{id}/favorite:
 *   post:
 *     summary: 상품 좋아요 추가
 *     tags:
 *       - Favorite
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: 좋아요 추가 성공
 */

/**
 * @swagger
 * /articles/{id}/favorite:
 *   delete:
 *     summary: 게시글 좋아요 취소
 *     tags:
 *       - Favorite
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
 *         description: 좋아요 취소 성공
 */

/**
 * @swagger
 * /products/{id}/favorite:
 *   delete:
 *     summary: 상품 좋아요 취소
 *     tags:
 *       - Favorite
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
 *         description: 좋아요 취소 성공
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         isLiked:
 *           type: boolean
 *           example: true
 */

export {};
