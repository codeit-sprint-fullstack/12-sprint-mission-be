import prisma from "../src/lib/prisma.js";

async function reset() {
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();
}

async function seedArticles() {
  await prisma.article.create({
    data: {
      title: "첫 번째 글",
      content: "내용입니다",
      comments: {
        create: [{ content: "댓글1" }, { content: "댓글2" }],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: "두 번째 글",
      content: "내용입니다",
      comments: {
        create: [{ content: "댓글" }],
      },
    },
  });
}

async function seedProducts() {
  await prisma.product.createMany({
    data: [
      {
        name: "에어팟 프로",
        description: "2세대라 노이즈 캔슬링이 휼륭합니다",
        price: 329000,
        tags: ["전자제품", "에어팟", "애플"],
        favoriteCount: 15,
      },
      {
        name: "로지텍 마우스",
        description: "블루투스 마우스",
        price: 139000,
        tags: ["IT", "마우스"],
        favoriteCount: 8,
      },
      {
        name: "스탠리 텀블러",
        description: "보냉 잘 됩니다",
        price: 25000,
        tags: ["스탠리", "친환경"],
      },
    ],
  });
}

async function main() {
  await reset();
  await seedArticles();
  await seedProducts();
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
