/**
 * @swagger
 * /products:
 *   get:
 *     summary: 상품 목록 조회
 *     tags:
 *       - Product
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
 *           example: 에어팟
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ProductListItem"
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
 * /products/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 상품 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       404:
 *         description: 상품을 찾을 수 없음
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: 상품 등록
 *     tags:
 *       - Product
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: 에어팟 프로
 *               description:
 *                 type: string
 *                 example: 노이즈 캔슬링 블루투스 이어폰입니다.
 *               price:
 *                 type: number
 *                 example: 329000
 *               tags:
 *                 type: string
 *                 example: '["전자제품","애플"]'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: 상품 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       401:
 *         description: 인증되지 않은 사용자
 */

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: 상품 수정
 *     tags:
 *       - Product
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
 *           properties:
 *             name:
 *               type: string
 *               example: 수정된 상품명
 *             description:
 *               type: string
 *               example: 수정된 설명
 *             price:
 *               type: number
 *               example: 300000
 *             tags:
 *               type: string
 *               example: '["전자제품"]'
 *             existingImageUrls:
 *               type: string
 *               example: '["/uploads/image1.png"]'
 *             images:
 *               type: array
 *               items:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 상품 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       401:
 *         description: 인증되지 않은 사용자
 *       403:
 *         description: 작성자가 아님
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: 상품 삭제
 *     tags:
 *       - Product
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
 *         description: 상품 삭제 성공
 *       401:
 *         description: 인증되지 않은 사용자
 *       403:
 *         description: 작성자가 아님
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: 에어팟 프로
 *         price:
 *           type: number
 *           example: 329000
 *         favoriteCount:
 *           type: integer
 *           example: 10
 *         imageUrls:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - /uploads/image1.png
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: 에어팟 프로
 *         description:
 *           type: string
 *           example: 노이즈 캔슬링 기능이 뛰어난 이어폰입니다.
 *         price:
 *           type: number
 *           example: 329000
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - 전자제품
 *             - 애플
 *         favoriteCount:
 *           type: integer
 *           example: 10
 *         imageUrls:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - /uploads/image1.png
 *         authorId:
 *           type: integer
 *           example: 1
 *         authorNickname:
 *           type: string
 *           example: 테스터
 *         isLiked:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export {};
