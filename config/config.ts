import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DATABASE_URL", "PORT"];

// 필수 환경 변수 확인
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ 환경 변수 ${envVar}가 설정되지 않았습니다`);
    process.exit(1);
  }
});

const config = {
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  postgresql: {
    url: process.env.DATABASE_URL,
  },
  server: {
    port: parseInt(process.env.PORT!) || 8080,
    env: process.env.NODE_ENV || "development",
  },
};

export default config;
