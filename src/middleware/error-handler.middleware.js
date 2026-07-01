const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Prisma 에러 처리 (404)
  // P2025: 레코드가 없음
  // P2003: 존재하지 않는 외래 키 참조
  if (err.code === "P2025" || err.code === "P2003") {
    const resource = req.resource || "리소스";

    return res.status(404).json({
      error: `${resource}을(를) 찾을 수 없습니다`,
    });
  }

  // 커스텀 에러
  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
    });
  }

  // 그 외 서버 에러
  res.status(500).json({
    error: "서버에서 오류가 발생했습니다",
  });
};

export default errorHandler;
