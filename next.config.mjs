/** @type {import('next').NextConfig} */
const proxyUrl = "http://localhost:8000";
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/todos",
        destination: `${proxyUrl}/api/todos`,
      },
      {
        source: "/api/todos/:todoId",
        destination: `${proxyUrl}/api/todos/:todoId`,
      },
    ];
  },
};

export default nextConfig;
