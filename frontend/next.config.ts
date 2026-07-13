import type { NextConfig } from "next";
import path from "node:path";

const repositoryRoot = path.resolve(process.cwd(), "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: repositoryRoot,
  poweredByHeader: false,
  turbopack: {
    root: repositoryRoot,
  },
};

export default nextConfig;

