// article, product에서 findById 호출 시 넘기는 옵션
export type FindByIdOptions = {
  userId?: number;
  includeLike?: boolean;
};

// article, product에서 목록 조회 시 필요한 파라미터
export type ListQueryParams = {
  page: number;
  pageSize: number;
  orderBy: "recent" | "favorite";
  keyword: string;
};

// 어떤 타입이든 좋아요 여부(isLiked)를 붙인 형태로 변환
export type WithLike<T> = T & {
  isLiked: boolean;
};

// article, productd에서 findMany 함수의 공통 파라미터
// TWhere, TOrderBy는 각 도메인의 Prisma.XxxWhereInput, Prisma.XxxOrderByWithRelationInput을 넣어서 사용
export type FindManyParams<TWhere, TOrderBy> = {
  where: TWhere;
  orderBy: TOrderBy;
  skip: number;
  take: number;
};
