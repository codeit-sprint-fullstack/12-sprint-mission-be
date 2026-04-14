import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();

  const products = await prisma.product.createMany({
    data: [
      {
        name: "의자",
        description: "상태 좋은 원목 의자입니다.",
        price: 30000,
        tags: ["가구", "원목"],
      },
      {
        name: "책상",
        description: "사용감 적은 화이트 책상입니다.",
        price: 50000,
        tags: ["가구", "책상"],
      },
      {
        name: "거울",
        description: "전신 거울이며 상태가 아주 좋습니다.",
        price: 20000,
        tags: ["인테리어"],
      },
      {
        name: "스탠드",
        description: "밝기 조절 가능한 스탠드입니다.",
        price: 15000,
        tags: ["조명", "생활"],
      },
      {
        name: "수납장",
        description: "작은 공간에 두기 좋은 수납장입니다.",
        price: 40000,
        tags: ["가구", "수납"],
      },
    ],
  });

  const articles = await prisma.article.createMany({
    data: [
      {
        title: "첫 게시글",
        content: "자유게시판 첫 번째 글입니다.",
      },
      {
        title: "두 번째 글",
        content: "오늘 공부한 내용을 기록해봅니다.",
      },
      {
        title: "세 번째 글",
        content: "프로젝트 진행 상황을 공유합니다.",
      },
      {
        title: "네 번째 글",
        content: "좋은 자료가 있어서 남겨둡니다.",
      },
      {
        title: "다섯 번째 글",
        content: "질문이 있어 자유게시판에 남깁니다.",
      },
    ],
  });

  const productList = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  const articleList = await prisma.article.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.productComment.createMany({
    data: [
      {
        content: "상품 상태 괜찮아 보여요.",
        productId: productList[0].id,
      },
      {
        content: "직거래 가능할까요?",
        productId: productList[0].id,
      },
      {
        content: "가격 조정 가능한지 궁금합니다.",
        productId: productList[1].id,
      },
      {
        content: "사진 더 볼 수 있을까요?",
        productId: productList[2].id,
      },
      {
        content: "구매하고 싶습니다.",
        productId: productList[3].id,
      },
    ],
  });

  await prisma.articleComment.createMany({
    data: [
      {
        content: "좋은 글 감사합니다.",
        articleId: articleList[0].id,
      },
      {
        content: "저도 같은 생각입니다.",
        articleId: articleList[0].id,
      },
      {
        content: "도움이 많이 됐어요.",
        articleId: articleList[1].id,
      },
      {
        content: "프로젝트 응원합니다.",
        articleId: articleList[2].id,
      },
      {
        content: "질문에 답변 남겨봅니다.",
        articleId: articleList[4].id,
      },
    ],
  });

  console.log("Seed 완료");
  console.log(`Product ${products.count}개 생성`);
  console.log(`Article ${articles.count}개 생성`);
}

main()
  .catch((error) => {
    console.error("Seed 실패:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
