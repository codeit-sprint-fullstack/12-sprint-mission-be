import prisma from "../src/lib/prisma.js";

async function main() {
  await prisma.article.createMany({
    data: [
      {
        title: "첫 번째 글",
        content: "내용입니다",
      },
      {
        title: "두 번째 글",
        content: "내용입니다",
      },
      {
        title: "세 번째 글",
        content: "내용입니다",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
