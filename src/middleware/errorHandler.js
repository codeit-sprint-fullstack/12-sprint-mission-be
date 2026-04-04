const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Prisma 에러 처리 (404)
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: "상품을 찾을 수 없습니다",
    });
  }

  // 커스텀 에러
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
    });
  }

  // 그 외 서버 에러
  res.status(500).json({
    success: false,
    error: "서버에서 오류가 발생했습니다",
  });
};

export default errorHandler;
