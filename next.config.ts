import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // The user's home directory holds an unrelated package-lock.json, which
  // makes Turbopack guess the wrong workspace root. Pin it to this project.
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
