-- CreateTable
CREATE TABLE `chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `content` VARCHAR(255) NULL,
    `room_id` VARCHAR(50) NULL,
    `date` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `code` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(50) NULL,
    `expired` DATETIME(0) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `pass_word` VARCHAR(255) NULL,
    `face_app_id` VARCHAR(255) NULL,
    `role` VARCHAR(50) NULL,
    `refresh_token` TEXT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `video_id` INTEGER NULL,
    `date_create` DATETIME(0) NULL,
    `content` TEXT NULL,
    `reply_list` VARCHAR(255) NULL,
    `timestamp` TIMESTAMP(0) NULL,

    INDEX `user_id`(`user_id`),
    INDEX `video_id`(`video_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video_like` (
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `video_id` INTEGER NULL,
    `date_create` DATETIME(0) NULL,
    `dis_like` BOOLEAN NULL,

    INDEX `user_id`(`user_id`),
    INDEX `video_id`(`video_id`),
    PRIMARY KEY (`like_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video_type` (
    `type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255) NULL,
    `icon` VARCHAR(255) NULL,

    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `video` (
    `video_id` INTEGER NOT NULL AUTO_INCREMENT,
    `video_name` VARCHAR(255) NULL,
    `thumbnail` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `views` INTEGER NULL,
    `source` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,
    `type_id` INTEGER NULL,

    INDEX `type_id`(`type_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `video_comment` ADD CONSTRAINT `video_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `video_comment` ADD CONSTRAINT `video_comment_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video`(`video_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `video_like` ADD CONSTRAINT `video_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `video_like` ADD CONSTRAINT `video_like_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video`(`video_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `video` ADD CONSTRAINT `video_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `video_type`(`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
