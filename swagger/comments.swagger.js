/**
 * @swagger
 * paths:
 *   /posts/{postId}/comments:
 *     post:
 *       summary: 댓글 생성
 *       parameters:
 *         - in: path
 *           name: postId
 *           required: true
 *           description: 게시글의 ID
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 password:
 *                   type: string
 *                 content:
 *                   type: string
 *               required:
 *                 - user
 *                 - password
 *                 - content
 *       responses:
 *         201:
 *           description: 댓글 생성 성공
 *         400:
 *           description: 잘못된 데이터 입력
 *         
 *     get:
 *       summary: 게시글 별 댓글 전체 목록 조회
 *       parameters:
 *         - in: path
 *           name: postId
 *           required: true
 *           description: 게시글의 ID
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: 댓글 목록 조회 성공
 *         400:
 *           description: 잘못된 데이터 입력
 *         404:
 *           description: 댓글 없음
 * 
 *   /posts/{postId}/comments/{commentId}:
 *     put:
 *       summary: 댓글 수정
 *       parameters:
 *         - in: path
 *           name: postId
 *           required: true
 *           description: 게시글의 ID
 *           schema:
 *             type: string
 *         - in: path
 *           name: commentId
 *           required: true
 *           description: 댓글의 ID
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                 content:
 *                   type: string
 *               required:
 *                 - password
 *                 - content
 *       responses:
 *         200:
 *           description: 댓글 수정 성공
 *         400:
 *           description: 잘못된 데이터 입력
 *         404:
 *           description: 댓글 없음
 * 
 *     delete:
 *       summary: 댓글 삭제
 *       parameters:
 *         - in: path
 *           name: postId
 *           required: true
 *           description: 게시글의 ID
 *           schema:
 *             type: string
 *         - in: path
 *           name: commentId
 *           required: true
 *           description: 댓글의 ID
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *               required:
 *                 - password
 *       responses:
 *         200:
 *           description: 댓글 삭제 성공
 *         400:
 *           description: 잘못된 데이터 입력
 */
