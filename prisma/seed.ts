import bcrypt from "bcrypt";
import type { User } from "@prisma/client";
import prisma from "../src/lib/prisma.js";

async function reset() {
await prisma.productLike.deleteMany();
await prisma.articleLike.deleteMany();
await prisma.comment.deleteMany();
await prisma.article.deleteMany();
await prisma.product.deleteMany();
await prisma.user.deleteMany();
}

async function seedUsers(): Promise<User> {
const encryptedPassword = await bcrypt.hash("12345678", 10);

return prisma.user.create({
data: {
email: "[test@test.com](mailto:test@test.com)",
nickname: "테스터",
encryptedPassword,
},
});
}

async function seedArticles(user: User) {
const article1 = await prisma.article.create({
data: {
title: "첫 번째 글",
content: "내용입니다",
favoriteCount: 0,
authorId: user.id,
},
});

const article2 = await prisma.article.create({
data: {
title: "두 번째 글",
content: "내용입니다",
favoriteCount: 0,
authorId: user.id,
},
});

await prisma.comment.createMany({
data: [
{
content: "게시글 댓글1",
articleId: article1.id,
authorId: user.id,
},
{
content: "게시글 댓글2",
articleId: article1.id,
authorId: user.id,
},
{
content: "게시글 댓글",
articleId: article2.id,
authorId: user.id,
},
],
});

await prisma.articleLike.create({
data: {
articleId: article1.id,
userId: user.id,
},
});
}

async function seedProducts(user: User) {
const product1 = await prisma.product.create({
data: {
name: "에어팟 프로",
description: "2세대라 노이즈 캔슬링이 훌륭합니다.",
price: 329000,
tags: ["전자제품", "에어팟", "애플"],
favoriteCount: 0,
authorId: user.id,
},
});

await prisma.product.create({
data: {
name: "로지텍 마우스",
description: "블루투스 마우스",
price: 139000,
tags: ["IT", "마우스"],
favoriteCount: 0,
authorId: user.id,
},
});

const product3 = await prisma.product.create({
data: {
name: "스탠리 텀블러",
description: "보냉 잘 됩니다",
price: 25000,
tags: ["스탠리", "친환경"],
favoriteCount: 0,
authorId: user.id,
},
});

await prisma.comment.createMany({
data: [
{
content: "상품 댓글1",
productId: product3.id,
authorId: user.id,
},
{
content: "상품 댓글2",
productId: product3.id,
authorId: user.id,
},
],
});

await prisma.productLike.create({
data: {
productId: product1.id,
userId: user.id,
},
});
}

async function main() {
await reset();

const user = await seedUsers();

await seedArticles(user);
await seedProducts(user);
}

main()
.then(async () => {
await prisma.$disconnect();
})
.catch(async (error) => {
console.error(error);
await prisma.$disconnect();
process.exit(1);
});
