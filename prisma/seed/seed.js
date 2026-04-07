import { PrismaClient } from "@prisma/client";
import { articlesSeedData, productSeedData } from "./seedData.js";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 정리
  await prisma.article.deleteMany();

  // product seedData 생성
  await prisma.article.createMany({
    data: articlesSeedData,
  });

  console.log("시드 데이터 입력 완료!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
