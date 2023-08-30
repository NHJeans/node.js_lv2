import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

/** 게시글 생성 API **/
router.post("/posts", async (req, res, next) => {
  const { user, password, title, content } = req.body;

  // 데이터 누락 여부 검사
  if (!user || !title || !content || !password) {
    return res.status(400).json({ message: res.locals.messages.noData });
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

    return res.status(201).json({ message: res.locals.messages.succeed });
  } catch (error) {
    next(error); // 오류 핸들링을 위한 next 호출
  }
});

/** 게시글 전체 조회 API **/
router.get("/posts", async (req, res, next) => {
  const posts = await prisma.posts.findMany({
    select: {
      postId: true,
      user: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return res.status(200).json({ data: posts });
});

// routes/posts.router.js

/** 게시글 상세 조회 API **/
router.get("/posts/:postId", async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await prisma.posts.findFirst({
      where: { postId: { equals: postId } },
      select: {
        postId: true,
        user: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    if (!post) {
      // 데이터베이스에서 post를 찾지 못했을 때의 조건
      return res.status(400).json({ message: res.locals.messages.noData });
    }

    return res.status(200).json({ data: post });
  } catch (error) {
    next(error);
  }
});

// routes/posts.router.js

/** 게시글 수정 API **/
router.put("/posts/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, password } = req.body;

  // 데이터 유효성 검사
  if (!title || !content || !password) {
    return res.status(400).json({ message: res.locals.messages.noData });
  }
  try {
    const post = await prisma.posts.findUnique({
      where: { postId: postId },
    });

    if (!post)
      return res.status(404).json({ message: res.locals.messages.notFound });
    else if (post.password !== password)
      return res.status(401).json({ message: res.locals.messages.doesntMatch });

    await prisma.posts.update({
      data: { title, content },
      where: {
        postId: postId,
        password,
      },
    });

    return res.status(200).json({ data: res.locals.messages.edit });
  } catch (error) {
    next(error);
  }
});

/** 게시글 삭제 API **/
router.delete("/posts/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { password } = req.body;

  if (!postId || !password) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  try {
    const post = await prisma.posts.findUnique({
      where: { postId: postId },
    });
    if (!post) {
      return res.status(404).json({ message: res.locals.messages.notFound });
    }
    if (post.password !== password) {
      return res.status(401).json({ message: res.locals.messages.doesntMatch });
    }
    await prisma.posts.delete({ where: { postId: postId } });

    return res.status(200).json({ message: res.locals.messages.deleted });
  } catch (err) {
    next(err); // 오류를 미들웨어로 전달
  }
});

router.use((err, req, res, next) => {
  console.error(err.stack); // 오류 내용을 콘솔에 출력
  res.status(500).json({ message: res.locals.messages.serverError });
});

export default router;

