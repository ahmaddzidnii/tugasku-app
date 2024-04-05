-- CreateEnum
CREATE TYPE "Badge" AS ENUM ('PEMULA', 'MENENGAH', 'SEPUH');

-- CreateEnum
CREATE TYPE "CategoryUser" AS ENUM ('SISWA', 'MAHASISWA');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "imageUrl" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class" (
    "classId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bannerImageUrl" TEXT NOT NULL,
    "description" TEXT,
    "teacherName" TEXT NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "point" TEXT NOT NULL,
    "badge" "Badge" NOT NULL DEFAULT 'PEMULA',

    CONSTRAINT "statistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT,
    "category" "CategoryUser",

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "instagramUrl" TEXT,
    "tiktokUrl" TEXT,
    "facebookUrl" TEXT,
    "whatsappNumber" TEXT,
    "githubUrl" TEXT,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_userId_key" ON "user"("email", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "task_taskId_key" ON "task"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "statistic_userId_key" ON "statistic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_userId_key" ON "social_media"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "website_userId_key" ON "website"("userId");

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "class"("classId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistic" ADD CONSTRAINT "statistic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website" ADD CONSTRAINT "website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
