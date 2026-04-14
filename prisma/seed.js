import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 초기화
  await prisma.articleComment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();

  // Product 판매글 시드
  const products = [
    {
      name: "고성능 게이밍 마우스",
      description: "0.1ms 응답 속도를 자랑하는 마우스",
      price: 129000,
      tags: ["IT", "게이밍"],
      images: ["https://picsum.photos/id/1/600/400"],
      favoriteCount: 5,
    },
    {
      name: "미니멀리스트 스탠드 조명",
      description: "푸른 색의 LED 조명",
      price: 45000,
      tags: ["인테리어", "조명"],
      images: ["https://picsum.photos/id/2/600/400"],
      favoriteCount: 12,
    },
    {
      name: "친환경 에코백",
      description: "친환경 에코백 입니다.",
      price: 15000,
      tags: ["패션", "에코"],
      images: ["https://picsum.photos/id/3/600/400"],
      favoriteCount: 8,
    },
    {
      name: "핸드드립 커피 세트",
      description: "집에서도 커피를 즐길 수 있는 핸드드립 풀세트",
      price: 45000,
      tags: ["홈카페", "커피"],
      images: ["https://picsum.photos/id/1060/600/400"],
      favoriteCount: 0,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  // article 글, 댓글 시드
  await prisma.article.create({
    data: {
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      content: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      image: "https://picsum.photos/id/0/600/400",
      comments: {
        create: [
          {
            nickname: "똑똑한판다1",
            content: "혹시 사용기간이 어떻게 되실까요?",
          },
          {
            nickname: "똑똑한판다2",
            content:
              "배터리 사이클 횟수도 알려주시면 정확한 시세 파악이 가능합니다.",
          },
          {
            nickname: "똑똑한판다3",
            content: "상판이나 하판에 스크래치 여부도 중요해요!",
          },
        ],
      },
    },
  });

  console.log("시딩 데이터 생성 완료");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
