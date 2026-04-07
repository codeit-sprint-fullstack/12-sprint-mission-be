import { PrismaClient } from "@prisma/client";
import { productSeedData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 정리
  await prisma.product.deleteMany();

  // product seedData 생성
  await prisma.product.createMany({
    data: productSeedData,
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
