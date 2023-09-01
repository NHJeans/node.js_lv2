import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { user, password, title, content } = req.body;

  if (!user || !title || !content || !password) {
    return res.status(400).json({ message: res.locals.messages.noData });
  }

  try {
    const post = await prisma.Post.create({
      data: {
        user,
        password,
        title,
        content,
      },
    });

    return res.status(200).json({ message: res.locals.messages.succeed });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const posts = await prisma.Post.findMany({
    select: {
      postId: true,
      user: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({ data: posts });
});

/** 게시글 상세 조회 API **/
router.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findFirst({
      where: { postId: postId },
      select: {
        postId: true,
        user: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    if (!post) {
      return res.status(400).json({ message: res.locals.messages.noData });
    }

    return res.status(200).json({ data: post });
  } catch (err) {
    next(err);
  }
});

/** 게시글 수정 API **/
router.put("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, password } = req.body;

  if (!title || !content || !password) {
    return res.status(400).json({ message: res.locals.messages.noData });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { postId: postId },
    });

    if (!post)
      return res.status(404).json({ message: res.locals.messages.notFound });
    else if (post.password !== password)
      return res.status(401).json({ message: res.locals.messages.doesntMatch });

    await prisma.post.update({
      where: { postId: postId },
      data: { title, content },
    });

    return res.status(200).json({ message: res.locals.messages.edit });
  } catch (err) {
    next(err);
  }
});

/** 게시글 삭제 API **/
router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { password } = req.body;

  if (!postId || !password) {
    return res.status(400).json({ message: res.locals.messages.noData });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { postId: postId },
    });

    if (!post) {
      return res.status(404).json({ message: res.locals.messages.notFound });
    }

    if (post.password !== password) {
      return res.status(401).json({ message: res.locals.messages.doesntMatch });
    }

    await prisma.post.delete({ where: { postId: postId } });

    return res.status(200).json({ message: res.locals.messages.deleted });
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: res.locals.messages.serverError });
});

export default router;
