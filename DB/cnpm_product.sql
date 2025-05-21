-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: cnpm
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productID` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `img` text,
  `quantity` int NOT NULL,
  `categoryID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  KEY `FK_0682887721c4045868fb8104e2a` (`categoryID`),
  CONSTRAINT `FK_0682887721c4045868fb8104e2a` FOREIGN KEY (`categoryID`) REFERENCES `category` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('prod1','Cheese Burger',5.99,'Burger with melted cheese','../images/hamburger.jpg',100,'cate1'),('prod2','Beef Burger',6.99,'Juicy beef patty','../images/beef.jpg',80,'cate1'),('prod3','Coca Cola',1.50,'Refreshing drink','../images/coca.jpg',200,'cate2'),('prod4','Grilled Onion',5.99,'Burger with grilled onion','../images/grilled_onion.jpg',100,'cate1'),('prod5','Fanta',2.00,'Fanta Soda','../images/fanta.jpg',50,'cate2'),('prod6','7Up',2.00,'Lemon Soda','../images/7up.jpg',50,'cate2'),('prod7','Chocolate Cupcake',3.50,'Delicious chocolate cupcake with creamy frosting.','../images/chocolate_cupcake.jpg',50,'cate3'),('prod8','Vanilla Cupcake',3.00,'Classic vanilla cupcake with buttercream icing.','../images/vanilla_cupcake.jpg',40,'cate3'),('prod9','Red Velvet Cupcake',4.00,'Rich red velvet cupcake topped with cream cheese frosting.','../images/red_velvet_cupcake.jpg',30,'cate3');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-21  9:34:28
