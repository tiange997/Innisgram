-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: sample_db
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentID` int NOT NULL,
  `picID` int NOT NULL,
  `content` char(255) DEFAULT NULL,
  `username` char(255) DEFAULT NULL,
  PRIMARY KEY (`commentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'TEST MSG','admin'),(2,1,'TEST MSG2','admin'),(3,2,'TEST MSG3','admin'),(4,2,'Last test!!!','letian123'),(5,3,'Nice picture!!','user10'),(6,4,'FINISHED!','user10'),(7,1,'I love this flower!','letian123');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `picId` int NOT NULL,
  `URL` varchar(255) NOT NULL,
  `picName` varchar(255) DEFAULT NULL,
  `uploader` varchar(255) DEFAULT NULL,
  `uploadingDate` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  PRIMARY KEY (`picId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (1,'/upload/flower.png','flower.png','admin','Tue Apr 18 2020',24),(2,'/upload/maze.jpg','maze.jpg','admin','Tue Apr 18 2020',8),(3,'/upload/touxiang.jpg','touxiang.jpg','tiange1234','Tue Apr 18 2020',9),(4,'/upload/CUCN.jpg','CUCN.jpg','letian123','Tue Apr 18 2020',0),(5,'/upload/CU.gif','CU.gif','letian123','Tue Apr 18 2020',1),(6,'/upload/NYU_Shanghai_Logo.jpg','NYU_Shanghai_Logo.jpg','letian123','Tue Apr 18 2020',0),(7,'/upload/Phoenix.jpg','Phoenix.jpg','letian123','Fri Apr 24 2020',0),(8,'/upload/Wallpaper_acnh_1920_1080.jpg','Wallpaper_acnh_1920_1080.jpg','letian123','Fri Apr 24 2020',3);
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(30) DEFAULT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user01','Gráine','Mhaol','5zXRfA!Y^W'),('user02','Constance','Markiewicz','6D8?T@hTGB'),('user03','Maud','Gonne','d28&M!H4~?'),('user04','Queen','Medb','3T~4sBCy~@'),('user05','Hanna','Sheehy-Skeffington','HRq8pvPk8+'),('user06','Eva','Gore-Booth','>k5jN6#88r'),('user07','Augusta','Lady Gregory','ABC123'),('user08','Anna','Parnell','G3>gY&yUZv'),('user09','Peig','Sayers','B2jRa%!Gd&'),('user10','Alice','Perry','Ehz2Hq2^K&'),('user01','Gráine','Mhaol','5zXRfA!Y^W'),('user02','Constance','Markiewicz','6D8?T@hTGB'),('user03','Maud','Gonne','d28&M!H4~?'),('user04','Queen','Medb','3T~4sBCy~@'),('user05','Hanna','Sheehy-Skeffington','HRq8pvPk8+'),('user06','Eva','Gore-Booth','>k5jN6#88r'),('user07','Augusta','Lady Gregory','ABC123'),('user08','Anna','Parnell','G3>gY&yUZv'),('user09','Peig','Sayers','B2jRa%!Gd&'),('user10','Alice','Perry','Ehz2Hq2^K&'),('tiange1234','Letian','Wang','YOURPASSWORD'),('letian123','Letian','Wang','123456');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-24 21:40:12
