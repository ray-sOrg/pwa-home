# =================== Step 1: Install dependencies ===================
FROM oven/bun:1-debian AS deps
WORKDIR /app

# 拷贝 package.json 和 bun.lock
COPY package.json bun.lock ./

# 安装依赖 (GitHub Runner 网络好，直接用官方源)
RUN bun install --frozen-lockfile

# =================== Step 2: Build project ==========================
FROM oven/bun:1-debian AS builder
WORKDIR /app

ENV NODE_ENV=production

# 拷贝 deps 阶段的依赖
COPY --from=deps /app/node_modules ./node_modules

# 拷贝项目源码
COPY . .

# 执行 Next.js 构建
RUN bun run build

# =================== Step 3: Production runtime ====================
FROM oven/bun:1-debian AS runner
WORKDIR /app

ENV NODE_ENV=production

# 拷贝 standalone 构建产物（包含所有必要的依赖）
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# 使用 Bun 启动 standalone server
CMD ["bun", "run", "server.js"]
