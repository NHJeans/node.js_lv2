/**
 * @swagger
 * paths:
 *   /api/posts:
 *     post:
 *       tags:
 *         - 게시글
 *       summary: 게시글 생성
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 password:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       responses:
 *         201:
 *           description: 성공적으로 게시글이 생성됨
 *         400:
 *           description: 필요한 데이터가 누락됨
 *       
 *     get:
 *       tags:
 *         - 게시글
 *       summary: 게시글 목록 조회
 *       responses:
 *         200:
 *           description: 성공적으로 게시글 목록을 가져옴
 *           content:
 *             application/json:
 *               example:
 *                 - id: "postId1"
 *                   title: "게시글 제목 1"
 *                   content: "게시글 내용 1"
 *                 - id: "postId2"
 *                   title: "게시글 제목 2"
 *                   content: "게시글 내용 2"
 *         400:
 *           description: 게시글이 없음
 *       
 *   /api/posts/{postId}:
 *     get:
 *       tags:
 *         - 게시글
 *       summary: 특정 게시글 상세 조회
 *       parameters:
 *         - name: postId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: 성공적으로 게시글을 가져옴
 *           content:
 *             application/json:
 *               example:
 *                 id: "postId1"
 *                 title: "게시글 제목 1"
 *                 content: "게시글 내용 1"
 *         400:
 *           description: 게시글이 없음
 *       
 *     put:
 *       tags:
 *         - 게시글
 *       summary: 특정 게시글 수정
 *       parameters:
 *         - name: postId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: 성공적으로 게시글이 수정됨
 *         400:
 *           description: 필요한 데이터가 누락됨
 *         404:
 *           description: 게시글을 찾을 수 없음
 *         401:
 *           description: 비밀번호가 일치하지 않음
 *       
 *     delete:
 *       tags:
 *         - 게시글
 *       summary: 특정 게시글 삭제
 *       parameters:
 *         - name: postId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: 성공적으로 게시글이 삭제됨
 *         400:
 *           description: 필요한 데이터가 누락됨
 *         404:
 *           description: 게시글을 찾을 수 없음
 *         401:
 *           description: 비밀번호가 일치하지 않음
 */
