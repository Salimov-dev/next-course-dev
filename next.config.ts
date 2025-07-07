import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yandex.ru" // Разрешаем yandex.ru
      },
      {
        protocol: "https",
        hostname: "eda.ru" // Разрешаем eda.ru
      }
    ]
  }
};

export default nextConfig;
