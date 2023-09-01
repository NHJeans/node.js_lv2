import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router({ mergeParams: true });


// 댓글 생성 API
router.post("/", async (req, res, next) => {
  const { postId } = req.params;
  const { user, password, content } = req.body;

  if (!user || !password || !content) {
    return res.status(400).json({ message: res.locals.messages.noData });
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { postId: postId },
    });

    if (!existingPost) {
      return res.status(404).json({ message: res.locals.messages.notFound });
    }

    await prisma.comment.create({
      data: {
        postId: postId,
        user,
        password,
        content,
      },
    });

    return res.status(200).json({ message: "댓글을 생성하였습니다." });

  } catch (err) {
    next(err);
  }
});

// 댓글 조회 API
router.get("/", async (req, res, next) => {
  const { postId } = req.params;

  try {
    // 댓글을 데이터베이스에서 검색
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      select: {
        commentId: true,
        user: true,
        content: true,
        createdAt: true,
      },
    });


    const commentsPrint = comments.map((comment) => ({
      commentId: comment.commentId,
      user: comment.user,
      content: comment.content,
      createdAt: comment.createdAt,
    }));

    if (commentsPrint.length === 0) {
      return res.status(400).json({ message: "댓글이 존재하지 않습니다." });
    }

    return res.status(200).json({ data: commentsPrint });
  } catch (err) {
    next(err);
  }
});


router.put("/:commentId", async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { password, content } = req.body;

    // 게시글 조회 (게시글이 있는지 확인)
    const post = await prisma.post.findUnique({
      where: { postId },
    });

    // 게시글이 없는 경우
    if (!post) {
      return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    }

    // 댓글 조회
    const comment = await prisma.comment.findUnique({
      where: { commentId },
    });

    // 댓글이 없는 경우
    if (!comment) {
      return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
    }

    // 비밀번호 확인
    if (password !== comment.password) {
      return res.status(401).json({ message: "비밀번호가 다릅니다." });
    }

    // 댓글 수정
    await prisma.comment.update({
      where: { commentId: commentId },
      data: { content: content },
    });

    return res.status(200).json({ message: "댓글을 수정하였습니다." });
  } catch (err) {
    console.error(err);
    next(err); // 에러를 처리하는 미들웨어로 넘김
  }
});

// 댓글 삭제 API
router.delete("/:commentId", async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { password } = req.body;

    // 게시글 조회
    const post = await prisma.post.findUnique({
      where: { postId },
    });

    // 게시글이 없는 경우
    if (!post) {
      return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
    }

    // 댓글 조회
    const comment = await prisma.comment.findUnique({
      where: { commentId },
    });

    // 댓글이 없는 경우 또는 댓글의 postId와 주어진 postId가 일치하지 않는 경우
    if (!comment || comment.postId !== postId) {
      return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
    }

    // 비밀번호 확인
    if (password !== comment.password) {
      return res.status(401).json({ message: "비밀번호가 다릅니다." });
    }

    // 댓글 삭제
    await prisma.comment.delete({
      where: { commentId },
    });

    return res.status(200).json({ message: "댓글을 삭제하였습니다." });
  } catch (err) {
    console.error(err);
    next(err); // 에러를 처리하는 미들웨어로 넘김
  }
});


export default router;
