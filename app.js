import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import { commentsRouter, postsRouter } from './routes/index.router.js';

const app = express();
const PORT = 3017;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));



app.use((req, res, next) => {
  res.locals.messages = {
    succeed: "게시글을 생성하였습니다.",
    edit: "게시글을 수정하였습니다.",
    editComment: "댓글을 수정하였습니다.",
    noData: "데이터 형식이 올바르지 않습니다.",
    noComment: "댓글 내용을 입력해주세요.",
    notFound: "게시글 조회에 실패하였습니다.",
    notFoundComment: "댓글 조회에 실패하였습니다.",
    doesntMatch: "비밀번호가 일치하지 않습니다.",
    serverError: "서버 내부 오류가 발생했습니다.",
    deleted: "게시글이 삭제되었습니다.",
    deletedComment: "댓글이 삭제되었습니다.",
  };
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// 'res.cookie()'를 이용하여 쿠키를 할당하는 API
// app.get("/set-cookie", (req, res) => {
//   let expires = new Date();
//   expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

//   res.cookie('name', 'sparta', {
//     expires: expires
//   });
//   return res.end();
// });
// // 'req.headers.cookie'를 이용하여 클라이언트의 모든 쿠키를 조회하는 API
// app.get('/get-cookie', (req, res) => {
//   const cookie = req.headers.cookie;
//   console.log(cookie); // name=sparta
//   return res.status(200).json({ cookie });
// });

app.use('/api/posts', postsRouter);
app.use('/api/posts/:postId/comments', commentsRouter);


app.use((err, req, res, next) => {
  console.error(err.stack); // 에러 스택 출력
  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});