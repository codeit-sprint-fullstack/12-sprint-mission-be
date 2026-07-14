/**
 * @swagger
 * /articles:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags:
 *       - Article
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum:
 *             - recent
 *             - favorite
 *           example: recent
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: 여행
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Article"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 */

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags:
 *       - Article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 게시글 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Article"
 *       404:
 *         description: 게시글을 찾을 수 없음
 */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: 게시글 작성
 *     tags:
 *       - Article
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: 첫 번째 게시글
 *               content:
 *                 type: string
 *                 example: 게시글 내용입니다.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: 게시글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               data:
 *                 $ref: "#/components/schemas/Article"
 *       401:
 *         description: 인증되지 않은 사용자
 */

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: 게시글 수정
 *     tags:
 *       - Article
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 수정된 제목
 *               content:
 *                 type: string
 *                 example: 수정된 내용
 *               existingImageUrls:
 *                 type: string
 *                 example: '["/uploads/image1.png"]'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Article"
 *       401:
 *         description: 인증되지 않은 사용자
 *       403:
 *         description: 작성자가 아님
 */

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags:
 *       - Article
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
 *       204:
 *         description: 게시글 삭제 성공
 *       401:
 *         description: 인증되지 않은 사용자
 *       403:
 *         description: 작성자가 아님
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - content
 *         - favoriteCount
 *         - authorId
 *         - authorNickname
 *         - imageUrls
 *         - createdAt
 *         - updatedAt
 *         - isLiked
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: 첫 번째 게시글
 *         content:
 *           type: string
 *           example: 게시글 내용입니다.
 *         favoriteCount:
 *           type: integer
 *           example: 10
 *         authorId:
 *           type: integer
 *           example: 1
 *         authorNickname:
 *           type: string
 *           example: 테스터
 *         imageUrls:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - /uploads/image1.png
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-07-07T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-07-07T10:00:00.000Z
 *         isLiked:
 *           type: boolean
 *           example: false
 */

export {};
