import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.
const prisma = new PrismaClient({
  // Prisma를 이용해 데이터베이스를 접근할 때, SQL을 출력해줍니다.
  log: ['query', 'info', 'warn', 'error'],

  // 에러 메시지를 평문이 아닌, 개발자가 읽기 쉬운 형태로 출력해줍니다.
  errorFormat: 'pretty',
}); // PrismaClient 인스턴스를 생성합니다.

// 게시글 생성
router.post('/posts', async (req, res, next) => {
  const { user, password, title, content } = req.body;

  // 데이터 누락 여부 검사
  if (!user || !title || !content || !password) {
    return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  }

  try {
    const post = await prisma.posts.create({
      data: {
        user,
        password,
        title,
        content,
      },
    });

    return res.status(201).json({ "message": "게시글을 생성하였습니다." });
  } catch (error) {
    next(error); // 오류 핸들링을 위한 next 호출
  }
});


/** 게시글 전체 조회 API **/
router.get('/posts', async (req, res, next) => {
  const posts = await prisma.posts.findMany({
    select: {
      postId: true,
      user : true,
      title: true,
      createdAt: true,
    },
  });

  return res.status(200).json({ data: posts });
});



router.use((err, req, res, next) => {
  console.error(err.stack); // 오류 내용을 콘솔에 출력
  res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
});

export default router;