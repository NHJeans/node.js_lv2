import express from 'express';
import PostsRouter from './routes/posts.router.js';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
const PORT = 3017;

app.use(express.json());
app.use((req, res, next) => {
  res.locals.messages = {
    succeed: "게시글을 생성하였습니다.",
    edit: "게시글을 수정하였습니다.",
    noData: "데이터 형식이 올바르지 않습니다.",
    notFound: "게시글 조회에 실패하였습니다.",
    doesntMatch: "비밀번호가 일치하지 않습니다.",
    serverError: "서버 내부 오류가 발생했습니다.",
    deleted: "게시글이 삭제되었습니다."
  };
  next();
});

app.use('/api', [PostsRouter]);


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});