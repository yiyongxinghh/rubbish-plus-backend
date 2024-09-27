/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80300
 Source Host           : 107.191.60.197:3307
 Source Schema         : rubbishPlus

 Target Server Type    : MySQL
 Target Server Version : 80300
 File Encoding         : 65001

 Date: 20/05/2024 12:19:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int(0) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '可回收物');
INSERT INTO `category` VALUES (2, '厨余垃圾');
INSERT INTO `category` VALUES (3, '其他垃圾');
INSERT INTO `category` VALUES (4, '有害垃圾');

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code`  (
  `code_id` int(0) NOT NULL AUTO_INCREMENT,
  `code_verification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code_time` datetime(0) NOT NULL,
  `code_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`code_id`) USING BTREE,
  INDEX `FK_2c4a681bc6a5fa9f5d4149f86bf`(`user_id`) USING BTREE,
  CONSTRAINT `FK_2c4a681bc6a5fa9f5d4149f86bf` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of code
-- ----------------------------

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `collection_id` int(0) NOT NULL AUTO_INCREMENT,
  `collection_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`collection_id`) USING BTREE,
  INDEX `FK_4f925485b013b52e32f43d430f6`(`user_id`) USING BTREE,
  CONSTRAINT `FK_4f925485b013b52e32f43d430f6` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collection
-- ----------------------------

-- ----------------------------
-- Table structure for collection_to_garbage
-- ----------------------------
DROP TABLE IF EXISTS `collection_to_garbage`;
CREATE TABLE `collection_to_garbage`  (
  `collection_to_garbage_id` int(0) NOT NULL AUTO_INCREMENT,
  `collectionCollectionId` int(0) NULL DEFAULT NULL,
  `garbageGarbageId` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`collection_to_garbage_id`) USING BTREE,
  INDEX `FK_259f861ac85edaf5ced4501b76c`(`collectionCollectionId`) USING BTREE,
  INDEX `FK_c020b1959c2c115b60611b9bfa6`(`garbageGarbageId`) USING BTREE,
  CONSTRAINT `FK_259f861ac85edaf5ced4501b76c` FOREIGN KEY (`collectionCollectionId`) REFERENCES `collection` (`collection_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_c020b1959c2c115b60611b9bfa6` FOREIGN KEY (`garbageGarbageId`) REFERENCES `garbage` (`garbage_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collection_to_garbage
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `comment_id` int(0) NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comment_score` int(0) NOT NULL,
  `comment_time` datetime(0) NOT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `garbage_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE,
  INDEX `FK_bbfe153fa60aa06483ed35ff4a7`(`user_id`) USING BTREE,
  INDEX `FK_2df8f2c85b7fc9d2abc69380853`(`garbage_id`) USING BTREE,
  CONSTRAINT `FK_2df8f2c85b7fc9d2abc69380853` FOREIGN KEY (`garbage_id`) REFERENCES `garbage` (`garbage_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_bbfe153fa60aa06483ed35ff4a7` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for garbage
-- ----------------------------
DROP TABLE IF EXISTS `garbage`;
CREATE TABLE `garbage`  (
  `garbage_id` int(0) NOT NULL AUTO_INCREMENT,
  `garbage_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `garbage_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `garbage_amount` int(0) NOT NULL,
  `garbage_price` double NOT NULL,
  `garbage_score` smallint(0) NOT NULL DEFAULT 0,
  `garbage_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category_id` int(0) NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `pic_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`garbage_id`) USING BTREE,
  UNIQUE INDEX `REL_c6ebdfedc1e0127e750212bc09`(`pic_id`) USING BTREE,
  INDEX `FK_aad36a933fd7910e2013a6104f2`(`category_id`) USING BTREE,
  INDEX `FK_bab5e8a9b2a5bab8a9b4bcde5e3`(`user_id`) USING BTREE,
  CONSTRAINT `FK_aad36a933fd7910e2013a6104f2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_bab5e8a9b2a5bab8a9b4bcde5e3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_c6ebdfedc1e0127e750212bc099` FOREIGN KEY (`pic_id`) REFERENCES `pic` (`pic_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of garbage
-- ----------------------------
INSERT INTO `garbage` VALUES (11, '玻璃瓶', '玻璃', 100, 10, 0, '废玻璃瓶子，可以用于回收', 1, 1, 16);
INSERT INTO `garbage` VALUES (12, '玻璃球', '玻璃', 1000, 1, 0, '玻璃球，可以熔炼', 1, 1, 17);
INSERT INTO `garbage` VALUES (13, '废灯泡', '玻璃', 200, 5, 0, '废灯泡，玻璃制品', 1, 1, 18);
INSERT INTO `garbage` VALUES (14, '废电池', '电子产品', 100, 1, 0, '有害废物', 4, 1, 19);
INSERT INTO `garbage` VALUES (15, '废汽油桶', '塑料', 100, 50, 0, '塑料制品', 1, 1, 20);
INSERT INTO `garbage` VALUES (16, '果皮', '厨余', 5000, 1, 0, '厨余垃圾，化肥配料', 2, 1, 21);
INSERT INTO `garbage` VALUES (17, '骨头', '厨余', 5000, 1, 0, '厨余垃圾，化肥配料', 2, 1, 22);
INSERT INTO `garbage` VALUES (18, '旧电线', '电子产品', 1000, 1, 0, '电子垃圾，有害废物', 4, 1, 23);
INSERT INTO `garbage` VALUES (19, '碎石砂', '工业', 1000, 50, 0, '工业品', 3, 1, 24);
INSERT INTO `garbage` VALUES (20, '废轴承', '机械', 999, 5, 0, '机械品', 1, 1, 25);
INSERT INTO `garbage` VALUES (21, '旧冰箱', '机械', 100, 200, 0, '家具', 3, 1, 26);
INSERT INTO `garbage` VALUES (22, '过期药品', '医疗废物', 5000, 1, 0, '过期药品，医疗废物', 4, 1, 27);
INSERT INTO `garbage` VALUES (23, '混凝土', '工业', 1000, 2, 0, '工业品', 3, 1, 28);
INSERT INTO `garbage` VALUES (24, '破图书', '纸', 1000, 2, 0, '纸制品', 1, 1, 29);
INSERT INTO `garbage` VALUES (25, '老收音机', '机械', 10, 500, 0, '老物件', 3, 1, 30);
INSERT INTO `garbage` VALUES (26, '杀虫剂', '医疗废物', 200, 5, 0, '过期有害物', 4, 1, 31);
INSERT INTO `garbage` VALUES (27, '水泥', '工业', 1000, 1, 0, '工业品', 3, 1, 32);
INSERT INTO `garbage` VALUES (28, '餐盒', '厨余', 2000, 1, 0, '厨余垃圾', 2, 1, 33);
INSERT INTO `garbage` VALUES (29, '塑料瓶', '塑料', 5000, 1, 0, '塑料，可回收', 1, 1, 34);
INSERT INTO `garbage` VALUES (30, '塑料盆', '塑料', 200, 2, 0, '塑料，可回收', 1, 1, 35);
INSERT INTO `garbage` VALUES (31, '剩饭', '厨余', 1000, 1, 0, '厨余垃圾，化肥配料', 2, 1, 36);
INSERT INTO `garbage` VALUES (32, '易拉罐', '金属', 2000, 1, 0, '金属制品', 1, 1, 37);
INSERT INTO `garbage` VALUES (33, '纸盒', '纸', 200, 1, 0, '纸制品', 1, 1, 38);
INSERT INTO `garbage` VALUES (34, '破毛衣', '纺织品', 100, 5, 0, '纺织废物', 3, 1, 39);

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `message_id` int(0) NOT NULL AUTO_INCREMENT,
  `message_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `message_time` datetime(0) NOT NULL,
  `message_is_read` tinyint(0) NOT NULL DEFAULT 0,
  `senderUserId` int(0) NULL DEFAULT NULL,
  `recipientUserId` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE,
  INDEX `FK_bd31eecc47806fe4d4f27991b76`(`senderUserId`) USING BTREE,
  INDEX `FK_1aeabd7e6863125c2e056dccd4e`(`recipientUserId`) USING BTREE,
  CONSTRAINT `FK_1aeabd7e6863125c2e056dccd4e` FOREIGN KEY (`recipientUserId`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_bd31eecc47806fe4d4f27991b76` FOREIGN KEY (`senderUserId`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES (3, '你好', '2024-04-08 12:51:14', 0, 1, 2);
INSERT INTO `message` VALUES (17, '23', '2024-05-13 14:15:19', 0, 1, 1);
INSERT INTO `message` VALUES (18, '', '2024-05-13 14:15:19', 0, 1, 1);
INSERT INTO `message` VALUES (19, '33', '2024-05-13 14:15:19', 0, 1, 1);
INSERT INTO `message` VALUES (20, '123', '2024-05-15 05:42:12', 0, 1, 2);
INSERT INTO `message` VALUES (21, '123456', '2024-05-15 05:47:37', 0, 1, 2);
INSERT INTO `message` VALUES (22, '你好', '2024-05-15 05:56:48', 0, 1, 3);
INSERT INTO `message` VALUES (23, '123', '2024-05-15 06:05:25', 0, 1, 3);
INSERT INTO `message` VALUES (24, '123', '2024-05-15 06:12:51', 0, 1, 13);
INSERT INTO `message` VALUES (25, '2', '2024-05-15 06:38:06', 0, 13, 1);

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `order_id` int(0) NOT NULL AUTO_INCREMENT,
  `order_date` datetime(0) NOT NULL,
  `order_is_sign` tinyint(0) NOT NULL,
  `order_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_money` double NOT NULL,
  `order_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `recipientUserId` int(0) NULL DEFAULT NULL,
  `deliverymanUserId` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `FK_4db57fdbb338343df266f8a1663`(`recipientUserId`) USING BTREE,
  INDEX `FK_08e94c9db1a901782550726937c`(`deliverymanUserId`) USING BTREE,
  CONSTRAINT `FK_08e94c9db1a901782550726937c` FOREIGN KEY (`deliverymanUserId`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_4db57fdbb338343df266f8a1663` FOREIGN KEY (`recipientUserId`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (6, '2024-05-15 06:12:40', 0, '', 60, '', 1, NULL);
INSERT INTO `order` VALUES (7, '2024-05-15 06:13:45', 0, '123', 100, '回收', 1, NULL);
INSERT INTO `order` VALUES (8, '2024-05-15 06:14:04', 0, '123', 100, '回收', 1, NULL);
INSERT INTO `order` VALUES (9, '2024-05-15 06:16:41', 0, '', 48, '', 13, NULL);
INSERT INTO `order` VALUES (10, '2024-05-15 06:16:52', 0, '123', 100, '回收', 13, NULL);
INSERT INTO `order` VALUES (11, '2024-05-19 05:16:46', 0, '', 5, '', 1, NULL);

-- ----------------------------
-- Table structure for order_to_garbage
-- ----------------------------
DROP TABLE IF EXISTS `order_to_garbage`;
CREATE TABLE `order_to_garbage`  (
  `order_garbage_id` int(0) NOT NULL AUTO_INCREMENT,
  `garbage_quantity` int(0) NOT NULL,
  `orderOrderId` int(0) NULL DEFAULT NULL,
  `garbageGarbageId` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`order_garbage_id`) USING BTREE,
  INDEX `FK_ab86d7262a34c87d3232c57095a`(`orderOrderId`) USING BTREE,
  INDEX `FK_45e790c2e0c462cf53edbe8829c`(`garbageGarbageId`) USING BTREE,
  CONSTRAINT `FK_45e790c2e0c462cf53edbe8829c` FOREIGN KEY (`garbageGarbageId`) REFERENCES `garbage` (`garbage_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_ab86d7262a34c87d3232c57095a` FOREIGN KEY (`orderOrderId`) REFERENCES `order` (`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_to_garbage
-- ----------------------------
INSERT INTO `order_to_garbage` VALUES (7, 1, 11, 20);

-- ----------------------------
-- Table structure for panel
-- ----------------------------
DROP TABLE IF EXISTS `panel`;
CREATE TABLE `panel`  (
  `panel_id` int(0) NOT NULL AUTO_INCREMENT,
  `panel_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `panel_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `panel_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`panel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of panel
-- ----------------------------
INSERT INTO `panel` VALUES (1, '回收', '/pagesMember/recovery/recovery', 'https://server.rubbish-plus.top/files/icon_line_delete.png');
INSERT INTO `panel` VALUES (2, '推荐', '/pages/hot/hot?id=0', 'https://server.rubbish-plus.top/files/icon_line_thumb-up.png');
INSERT INTO `panel` VALUES (3, '收藏', '/pages/hot/hot?id=1', 'https://server.rubbish-plus.top/files/icon_line_star.png');
INSERT INTO `panel` VALUES (4, '商家', '/pagesMember/business/business', 'https://server.rubbish-plus.top/files/line_usergroup.png');

-- ----------------------------
-- Table structure for pic
-- ----------------------------
DROP TABLE IF EXISTS `pic`;
CREATE TABLE `pic`  (
  `pic_id` int(0) NOT NULL AUTO_INCREMENT,
  `pic_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pic_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'userPic',
  PRIMARY KEY (`pic_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pic
-- ----------------------------
INSERT INTO `pic` VALUES (11, 'https://server.rubbish-plus.top/files/1715603527857.png', 'userPic');
INSERT INTO `pic` VALUES (12, 'https://server.rubbish-plus.top/files/1715603604540.png', 'userPic');
INSERT INTO `pic` VALUES (13, 'https://server.rubbish-plus.top/files/1715752133437.png', 'userPic');
INSERT INTO `pic` VALUES (16, 'https://server.rubbish-plus.top/files/1716094591402.png', 'userPic');
INSERT INTO `pic` VALUES (17, 'https://server.rubbish-plus.top/files/1716094686029.png', 'userPic');
INSERT INTO `pic` VALUES (18, 'https://server.rubbish-plus.top/files/1716094738693.png', 'userPic');
INSERT INTO `pic` VALUES (19, 'https://server.rubbish-plus.top/files/1716094826035.png', 'userPic');
INSERT INTO `pic` VALUES (20, 'https://server.rubbish-plus.top/files/1716094865641.png', 'userPic');
INSERT INTO `pic` VALUES (21, 'https://server.rubbish-plus.top/files/1716094909261.png', 'userPic');
INSERT INTO `pic` VALUES (22, 'https://server.rubbish-plus.top/files/1716094949965.png', 'userPic');
INSERT INTO `pic` VALUES (23, 'https://server.rubbish-plus.top/files/1716094998234.png', 'userPic');
INSERT INTO `pic` VALUES (24, 'https://server.rubbish-plus.top/files/1716095027097.png', 'userPic');
INSERT INTO `pic` VALUES (25, 'https://server.rubbish-plus.top/files/1716095062346.png', 'userPic');
INSERT INTO `pic` VALUES (26, 'https://server.rubbish-plus.top/files/1716095153561.png', 'userPic');
INSERT INTO `pic` VALUES (27, 'https://server.rubbish-plus.top/files/1716095343077.png', 'userPic');
INSERT INTO `pic` VALUES (28, 'https://server.rubbish-plus.top/files/1716095369635.png', 'userPic');
INSERT INTO `pic` VALUES (29, 'https://server.rubbish-plus.top/files/1716095411827.png', 'userPic');
INSERT INTO `pic` VALUES (30, 'https://server.rubbish-plus.top/files/1716095484797.png', 'userPic');
INSERT INTO `pic` VALUES (31, 'https://server.rubbish-plus.top/files/1716095520297.png', 'userPic');
INSERT INTO `pic` VALUES (32, 'https://server.rubbish-plus.top/files/1716095554497.png', 'userPic');
INSERT INTO `pic` VALUES (33, 'https://server.rubbish-plus.top/files/1716095588244.png', 'userPic');
INSERT INTO `pic` VALUES (34, 'https://server.rubbish-plus.top/files/1716095613493.png', 'userPic');
INSERT INTO `pic` VALUES (35, 'https://server.rubbish-plus.top/files/1716095637435.png', 'userPic');
INSERT INTO `pic` VALUES (36, 'https://server.rubbish-plus.top/files/1716095664146.png', 'userPic');
INSERT INTO `pic` VALUES (37, 'https://server.rubbish-plus.top/files/1716095719579.png', 'userPic');
INSERT INTO `pic` VALUES (38, 'https://server.rubbish-plus.top/files/1716095742117.png', 'userPic');
INSERT INTO `pic` VALUES (39, 'https://server.rubbish-plus.top/files/1716095785932.png', 'userPic');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(0) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_rank` int(0) NOT NULL DEFAULT 0 COMMENT '0普通用户,1配送员,2管理员',
  `user_amount` double NOT NULL DEFAULT 0,
  `pic_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `IDX_923ba15e95fbedcb8c44dace8a`(`user_phone`) USING BTREE,
  UNIQUE INDEX `IDX_65d72a4b8a5fcdad6edee8563b`(`user_email`) USING BTREE,
  UNIQUE INDEX `REL_f93f843977172efe56ac87b303`(`pic_id`) USING BTREE,
  CONSTRAINT `FK_f93f843977172efe56ac87b303c` FOREIGN KEY (`pic_id`) REFERENCES `pic` (`pic_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'zhang', '$2b$10$YT9Qhtd8xLjJM/6X/cNyk.fIzeP/JV615M6zuxXdkBaFZ3jJdBs/i', '13840695632', '2972802701@qq.com', 'beijing', 2, 9935, 12);
INSERT INTO `user` VALUES (2, 'djoksa', '$2b$10$IL4Ks6yD3pJQDO0ak84stuajy43dTTgQfCYMo8bq1Etfw3WjfcfPm', '13524569874', '123456@qq.com', '56', 2, 99800, NULL);
INSERT INTO `user` VALUES (3, '56569', '$2b$10$RWJjyAgSr95Q.pDUrJh3fucIP.BiZLvAmMjIm9zv/jaY2NRiKwdmG', '13845697896', '123456789@qq.com', '55', 1, 0, NULL);
INSERT INTO `user` VALUES (4, 'cxhqwe', '$2b$10$Fnhwcgby7CpxZtwg367DCu6YE.o0qAi9HmUh5TgwcAqSLd12lz5Fa', '15633209265', '2479551131@qq.com', 'yudusi', 0, 9999399, NULL);
INSERT INTO `user` VALUES (12, 'ceshi', '$2b$10$yGVT7lNeXyp4C2WyHMmoY.RthrF1Sx44.koQUHxJBMie7GNi4OWAy', '13845697854', '12345678@qq.com', 'ceshi', 0, 0, NULL);
INSERT INTO `user` VALUES (13, 'ceshi123', '$2b$10$34cj65oCoe3CI8sLcDqXy.MCOE2ube86RdIPuGiE8Fk1.fp5YDs8q', '13841254521', '123@qq.com', 'ceshi123', 0, 999952, NULL);

SET FOREIGN_KEY_CHECKS = 1;
