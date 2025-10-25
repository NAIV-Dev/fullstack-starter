/*M!999999\- enable the sandbox mode */ 
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `JenisPengeluaran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(500) NOT NULL,
  `deskripsi` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `JenisPengeluaran` VALUES
(1,'Sewa Ruko','lorem ipsum','2025-10-25 11:24:41',NULL),
(2,'Gaji Karyawan','','2025-10-25 11:25:26',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Layanan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(200) NOT NULL,
  `label_satuan` varchar(500) DEFAULT NULL,
  `harga_satuan` bigint NOT NULL,
  `deskripsi` text,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `Layanan` VALUES
(1,'Satuan biasa','Pcs',5000,'Lalala 123',1,'2025-10-25 06:30:31','2025-10-25 13:31:09'),
(2,'Ekspres','Kg',6000,'lalala',1,'2025-10-25 06:30:51',NULL),
(3,'Regular','Kg',4500,'',1,'2025-10-25 07:42:14',NULL),
(4,'satuan','pcs',10000,'',1,'2025-10-25 07:42:24',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pelanggan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(200) NOT NULL,
  `nomor_hp` varchar(500) DEFAULT NULL,
  `alamat` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `Pelanggan` VALUES
(1,'Budi','081231724125','Jakarta','2025-10-25 06:23:48',NULL),
(2,'Andi3','999','jakarta','2025-10-25 06:24:41','2025-10-25 13:24:59'),
(3,'Dedi','0817727277272','Jakarta','2025-10-25 06:24:49',NULL),
(4,'Dudung','081237648293','Jakarta Selatan','2025-10-25 09:17:16',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pengeluaran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_pengeluaran` varchar(50) NOT NULL,
  `tanggal` timestamp NOT NULL,
  `pengguna_id` int NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `jumlah` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `id_jenis_pengeluaran` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bbd99aa2cf39612a59b71c71ee6` (`pengguna_id`),
  KEY `FK_b984b53d42307356a548712bcad` (`id_jenis_pengeluaran`),
  CONSTRAINT `FK_b984b53d42307356a548712bcad` FOREIGN KEY (`id_jenis_pengeluaran`) REFERENCES `JenisPengeluaran` (`id`),
  CONSTRAINT `FK_bbd99aa2cf39612a59b71c71ee6` FOREIGN KEY (`pengguna_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `Pengeluaran` VALUES
(1,'PUR/20251025/1','2025-10-15 17:00:00',1,'test',5000,'2025-10-25 06:36:54',NULL,2),
(2,'PUR/20251025/2','2025-10-29 00:00:00',1,'',5000,'2025-10-25 06:37:06','2025-10-25 13:37:15',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transaksi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pelanggan_id` int DEFAULT NULL,
  `nomor_transaksi` varchar(50) NOT NULL,
  `pengguna_id` int NOT NULL,
  `tanggal_transaksi` timestamp NOT NULL,
  `sudah_lunas` tinyint DEFAULT '0',
  `sudah_diambil` tinyint DEFAULT '0',
  `total_harga` bigint NOT NULL,
  `catatan` text,
  `metode_pembayaran` enum('QRIS','Tunai','TransferBank') NOT NULL DEFAULT 'Tunai',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ea9befcfe99dec0fbbdf9ebbe9c` (`pelanggan_id`),
  KEY `FK_5b6248b23300b4595aff742d5ca` (`pengguna_id`),
  CONSTRAINT `FK_5b6248b23300b4595aff742d5ca` FOREIGN KEY (`pengguna_id`) REFERENCES `User` (`id`),
  CONSTRAINT `FK_ea9befcfe99dec0fbbdf9ebbe9c` FOREIGN KEY (`pelanggan_id`) REFERENCES `Pelanggan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `Transaksi` VALUES
(1,3,'TRX/Invalid date/1',1,'2025-10-25 00:00:00',1,0,153000,'','QRIS','2025-10-25 07:45:27','2025-10-25 14:47:18'),
(2,1,'TRX/Invalid date/2',1,'2025-10-25 00:00:00',1,0,245000,'','QRIS','2025-10-25 07:47:49','2025-10-25 14:48:01'),
(3,1,'',2,'2025-10-25 00:00:00',0,0,567000,'','QRIS','2025-10-25 07:48:20','2025-10-25 15:04:33'),
(4,1,'',4,'2025-10-24 17:00:00',1,1,84800,'','QRIS','2025-10-25 08:04:51','2025-10-25 08:39:00'),
(5,1,'TRX/Invalid date/5',2,'2025-10-24 17:00:00',0,0,88500,'','QRIS','2025-10-25 08:39:29','2025-10-25 08:40:58'),
(6,1,'TRX/251025/6',2,'2025-10-24 17:00:00',1,1,162000,'','QRIS','2025-10-25 08:41:56',NULL),
(7,4,'TRX/251025/7',2,'2025-10-24 17:00:00',1,0,104000,'','QRIS','2025-10-25 09:17:16',NULL),
(8,1,'TRX/251025/8',2,'2025-10-24 17:00:00',0,0,75000,'','QRIS','2025-10-25 10:41:04',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransaksiDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaksi_id` int NOT NULL,
  `layanan_id` int NOT NULL,
  `jumlah` decimal(10,4) DEFAULT NULL,
  `harga_satuan` bigint NOT NULL,
  `subtotal` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0126c9b275fb21bbb0cae740b35` (`transaksi_id`),
  KEY `FK_141c5b5572163a2c2ad89b09c09` (`layanan_id`),
  CONSTRAINT `FK_0126c9b275fb21bbb0cae740b35` FOREIGN KEY (`transaksi_id`) REFERENCES `Transaksi` (`id`),
  CONSTRAINT `FK_141c5b5572163a2c2ad89b09c09` FOREIGN KEY (`layanan_id`) REFERENCES `Layanan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `TransaksiDetail` VALUES
(1,1,2,8.0000,6000,48000),
(2,1,3,10.0000,4500,45000),
(3,1,4,6.0000,10000,60000),
(4,2,3,10.0000,4500,45000),
(5,2,4,20.0000,10000,200000),
(16,3,3,90.0000,4500,405000),
(17,3,4,15.0000,10000,150000),
(18,3,2,2.0000,6000,12000),
(29,5,2,8.0000,6000,48000),
(30,5,3,9.0000,4500,40500),
(35,6,2,9.0000,6000,54000),
(36,6,3,24.0000,4500,108000),
(37,7,3,12.0000,4500,54000),
(38,7,4,5.0000,10000,50000),
(39,8,2,8.0000,6000,48000),
(40,8,3,6.0000,4500,27000);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `role` enum('Admin','Kasir') NOT NULL DEFAULT 'Kasir',
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `User` VALUES
(1,'admin','$2a$10$rVi6Wtr71U0p6p4Lmbfqt.E8lDUEU5i0xBagMRiLrAVswWfMtvF8e','Super Admin','Admin',1,'2020-02-02 00:00:00',NULL),
(2,'coco','$2b$10$x0vqtUjRf1ziu9MpEsQniOsBuKYFpVevt2F1mpEOHPN2wDEsQMF2e','Coco','Kasir',1,'2025-10-25 03:00:22',NULL),
(3,'budi','$2b$10$IvGcsVVznYr07R1bsRO3zua3oA/edZ7KO57WD2yK0/V1iJW6lj0rW','Budi','Kasir',1,'2025-10-25 03:04:07','2025-10-25 10:11:48'),
(4,'andi','$2b$10$RH9Lb29w0ko9WOG9PHjRd.y1.tN9seZsFzF3U22Q/Xz68EUD84C/K','Andi','Kasir',1,'2025-10-25 03:05:58',NULL),
(5,'didi','$2b$10$XKMNQVDneYm1xnPQD/nwnO2O1BYJ4HHsorIdYF/fI02Dygg.rrKue','Didi','Kasir',1,'2025-10-25 03:06:06',NULL),
(6,'eko','$2b$10$5v7e7mF6SbNWpTU/gjShjepektuIzKg/lSIwbcGsgpcFoZj0tnnS2','Eko','Kasir',1,'2025-10-25 03:06:14','2025-10-25 10:11:41'),
(7,'gilang','$2b$10$nHWzXq6xHMj6q5pqvjztOumwYlPRA7qFPPr8KHsoi.bquAv8gF5xu','Gilang','Kasir',1,'2025-10-25 06:19:45',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `migrations` VALUES
(1,1761306969128,'Init1761306969128'),
(2,1761391216434,'AddJenisPengeluaran1761391216434');
commit;
