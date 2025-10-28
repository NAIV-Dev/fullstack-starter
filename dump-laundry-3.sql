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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `JenisPengeluaran` VALUES
(1,'Tabung Gas','','2025-10-25 11:24:41',NULL),
(2,'Listrik','','2025-10-25 11:25:26',NULL),
(3,'Gaji Karyawan','','2025-10-28 10:46:30',NULL),
(4,'Air','','2025-10-28 10:46:34',NULL),
(5,'Sampah','','2025-10-28 10:46:41',NULL),
(6,'Detergent','','2025-10-28 10:46:51',NULL),
(7,'Parfum Laundry','','2025-10-28 10:46:57',NULL),
(8,'Plastik Laundry','','2025-10-28 10:47:04',NULL),
(9,'Silica Gel','','2025-10-28 10:47:10',NULL),
(10,'Double Tape','','2025-10-28 10:47:17',NULL),
(11,'Bahan Kimia','keperluan laundry','2025-10-28 10:47:30',NULL),
(12,'Lainnya','','2025-10-28 10:47:35',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `Layanan` VALUES
(1,'Kiloan Regular (2 Hari) Full Service','Kg',7500,'Cuci Setrika Wangi',1,'2025-06-19 12:13:39',NULL),
(3,'Kiloan Reguler (2 Hari) - Kering Wangi','Kg',6500,'Baju dikeringkan dan diberikan pewangi',1,'2025-06-19 15:51:47',NULL),
(4,'Kiloan Regular (2 Hari) - Setrika Wangi','Kg',5500,'Baju hanya disetrika dan diberikan pewangi',1,'2025-06-19 15:54:59',NULL),
(5,'Kiloan Reguler (2 Hari) - Cuci','Kg',4000,'Baju hanya dicuci saja',1,'2025-06-19 15:55:43',NULL),
(6,'Kiloan Express (6 Jam) - Full Service','Kg',12500,'',1,'2025-06-19 15:56:43',NULL),
(7,'Kiloan Express (6 Jam) - Kering Wangi','Kg',10500,'',1,'2025-06-19 15:58:56',NULL),
(8,'Kiloan Express (6 Jam) - Cuci','Kg',7500,'',1,'2025-06-19 15:59:27',NULL),
(9,'Satuan Reguler (2 hari) - Celana Jeans Panjang/Pendek','Pcs',14000,'',1,'2025-06-19 16:00:29',NULL),
(10,'Satuan Reguler (2 hari) - Celana Panjang/Pendek','Pcs',12000,'',1,'2025-06-19 16:00:52',NULL),
(11,'Satuan Reguler (2 hari) - Kaos','Pcs',10000,'',1,'2025-06-19 16:01:46',NULL),
(12,'Satuan Reguler (2 hari) - Kemeja','Pcs',15000,'',1,'2025-06-19 16:02:08',NULL),
(13,'Satuan Reguler (2 hari) - Blazer','Pcs',22000,'',1,'2025-06-19 16:02:26',NULL),
(14,'Satuan Reguler (2 hari) - Jas','Pcs',25000,'',1,'2025-06-19 16:03:43',NULL),
(15,'Satuan Reguler (2 hari) - Gamis/Dress','Pcs',25000,'',1,'2025-06-19 16:04:03',NULL),
(16,'Kiloan Express (6 Jam) - Setrika Wangi','Kg',9500,'',1,'2025-06-19 16:05:53',NULL),
(17,'Satuan Express (6 Jam) - Celana Jeans Panjang/Pendek','Pcs',22000,'',1,'2025-06-19 16:06:31',NULL),
(18,'Satuan Express (6 Jam) - Kaos','Pcs',18000,'',1,'2025-06-19 16:19:27',NULL),
(19,'Satuan Express (6 Jam) - Kemeja','Pcs',23000,'',1,'2025-06-19 16:21:05',NULL),
(20,'Satuan Express (6 Jam) - Celana Panjang','Pcs',20000,'',1,'2025-06-19 16:21:52',NULL),
(21,'Satuan Express (6 Jam) - Blazer/Jaket kain','Pcs',32000,'',1,'2025-06-19 16:22:27',NULL),
(22,'Satuan Express (6 Jam) - Jas','Pcs',35000,'',1,'2025-06-19 16:22:42',NULL),
(23,'Satuan Express (6 Jam) - Gamis/Dress','Pcs',35000,'',1,'2025-06-19 16:22:57',NULL),
(24,'Bed Cover Single - Reguler 4 Hari','Pcs',25000,'',1,'2025-06-19 16:24:46',NULL),
(25,'Bed Cover Sedang - Reguler 4 Hari','Pcs',32000,'',1,'2025-06-19 16:25:46',NULL),
(26,'Bed Cover Queen - Reguler 4 Hari','Pcs',35500,'',1,'2025-06-19 16:26:13',NULL),
(27,'Bed Cover King - Reguler 4 Hari','Pcs',45000,'',1,'2025-06-19 16:27:32',NULL),
(28,'Selimut Tipis - Reguler 4 Hari','Pcs',15000,'',1,'2025-06-19 16:31:19',NULL),
(29,'Selimut Tebal - Reguler 4 Hari','Pcs',20000,'',1,'2025-06-19 16:31:36',NULL),
(30,'Sprei Besar 1 Set - Reguler 4 Hari','Pcs',30000,'',1,'2025-06-19 16:31:58',NULL),
(31,'Sprei Sedang 1 Set - Reguler 4 Hari','Pcs',28000,'',1,'2025-06-19 16:32:50',NULL),
(32,'Sprei Kecil 1 Set - Reguler 4 Hari','Pcs',25000,'',1,'2025-06-19 16:33:10',NULL),
(33,'Bed Cover Single - Express 2 Hari','Pcs',45000,'',1,'2025-06-19 16:34:41',NULL),
(34,'Bed Cover sedang - Express 2 Hari','Pcs',54000,'',1,'2025-06-19 16:34:53',NULL),
(35,'Bed Cover Queen - Express 2 Hari','Pcs',55500,'',1,'2025-06-19 16:36:37',NULL),
(36,'Bed Cover King - Express 2 Hari','Pcs',60000,'',1,'2025-06-19 16:40:00',NULL),
(37,'Selimut Tipis - Express 3 Hari','Pcs',30000,'',1,'2025-06-19 16:44:05',NULL),
(38,'Selimut Tebal - Express 2 Hari','Pcs',40000,'',1,'2025-06-19 16:44:21',NULL),
(39,'Sprei Besar 1 Set - Express 2 Hari','Pcs',50000,'',1,'2025-06-19 16:44:45',NULL),
(40,'Sprei Sedang 1 Set - Express 2 Hari','Pcs',45000,'',1,'2025-06-19 16:45:15',NULL),
(41,'Sprei Kecil 1 Set - Express 2 Hari','Pcs',35000,'',1,'2025-06-19 16:45:28',NULL),
(43,'Kiloan pakaian Baby - Reguler (2 hari) Full Service','Kg',25000,'',1,'2025-06-19 16:46:47',NULL),
(44,'Kiloan pakaian Baby - Reguler (2 hari) Kering','Kg',20000,'',1,'2025-06-19 16:47:29',NULL),
(45,'Kiloan pakaian Baby - Reguler (2 hari) Setrika Wangi','Kg',18000,'',1,'2025-06-19 16:48:05',NULL),
(46,'Kiloan pakaian Baby - Reguler (2 hari) Cuci','Kg',15000,'',1,'2025-06-19 16:48:23',NULL),
(47,'Kiloan Express (6 Jam) Pakaian Baby -  Full Service','Kg',40000,'',1,'2025-06-19 16:49:05',NULL),
(48,'Kiloan Express (6 Jam) pakaian Baby - Kering Wangi','Kg',35000,'',1,'2025-06-19 16:49:53',NULL),
(49,'Kiloan Express (6 Jam) pakaian Baby - Setrika Wangi','Kg',18000,'',1,'2025-06-19 16:50:23',NULL),
(50,'Kiloan Express (6 Jam) pakaian Baby - Cuci','Kg',18000,'',1,'2025-06-19 16:50:39',NULL),
(51,'Grand Opening Kiloan (2 hari)','Kg',5999,'Full service',1,'2025-06-21 05:59:48',NULL),
(52,'HAPPY DAY PROMO KAMIS Bed Cover - Reguler (4 Hari)','Pcs',19999,'',1,'2025-06-21 06:00:18',NULL),
(53,'Sprei Sedang (tanpa set) - Reguler 4 Hari','Pcs',20000,'',1,'2025-06-21 13:41:29',NULL),
(54,'Sprei Kecil (tanpa set) - Reguler 4 Hari','Pcs',15000,'',1,'2025-06-21 13:41:49',NULL),
(55,'Sprei Besar (tanpa set) - Reguler 4 Hari','Pcs',28000,'',1,'2025-06-21 13:42:22',NULL),
(56,'Sprei Sedang (tanpa set) - Express 2 Hari','Pcs',35000,'',1,'2025-06-21 13:44:38',NULL),
(57,'Sprei Kecil (tanpa set) - Express 2 Hari','Pcs',25000,'',1,'2025-06-21 13:45:39',NULL),
(58,'Sprei Besar (tanpa set) - Express 2 Hari','Pcs',47000,'',1,'2025-06-21 13:47:03',NULL),
(59,'Kiloan Express (3 Jam) -  Full Service','Kg',15500,NULL,1,'2025-06-21 22:24:40',NULL),
(60,'Satuan Gorden Sedang - Reguler 4 Hari','Pcs',18000,'',1,'2025-06-29 03:52:20',NULL),
(61,'Satuan Gorden Besar - Reguler 4 hari','Pcs',23500,'',1,'2025-06-29 03:52:42',NULL),
(62,'Satuan Gorden King - Reguler 4 Hari','Pcs',28000,'',1,'2025-06-29 03:53:50',NULL),
(63,'Satuan Boneka kecil - Reguler 5 hari','Pcs',20000,'',1,'2025-06-29 03:54:37',NULL),
(64,'Satuan Boneka sedang - 5 Hari','Pcs',25000,'',1,'2025-06-29 03:54:57',NULL),
(65,'Satuan boneka besar - 5 hari','Pcs',35000,'',1,'2025-06-29 03:55:16',NULL),
(66,'Satuan - keset kaki (Reguler 5 hari)','Pcs',8500,'',1,'2025-07-02 01:55:40',NULL),
(67,'Treatment noda (1-2 noda)','Pcs',5500,'',1,'2025-07-05 06:50:40',NULL),
(68,'Treatment noda (diatas 3 noda)','Pcs',10500,'',1,'2025-07-05 06:51:24',NULL),
(69,'Kiloan Express (3 Jam) - Kering Wangi','Kg',12500,NULL,1,'2025-07-05 20:41:55',NULL),
(71,'Kiloan Express 3 Jam - Setrika Wangi','Kg',15500,NULL,1,'2025-07-12 19:30:15',NULL),
(72,'Satuan bantal mini - 5 hari','Pcs',10000,NULL,1,'2025-07-12 23:54:27',NULL),
(73,'Bantal bayi kecil - 5 Hari','Pcs',15000,NULL,1,'2025-07-13 06:54:56',NULL),
(74,'Bantal bayi sedang - 5 hari','Pcs',45000,NULL,1,'2025-07-13 06:55:23',NULL),
(75,'Bantal bayi king - 5 hari','Pcs',60000,NULL,1,'2025-07-13 06:56:07',NULL),
(76,'Bantal bayi mini - 5 hari','Pcs',10000,NULL,1,'2025-07-13 06:58:39',NULL),
(81,'Satuan - Sleeping bag tipis (Reguler 4 hari)','Pcs',15000,NULL,1,'2025-07-23 10:40:45',NULL),
(82,'Satuan - Karpet Malaysia (estimasi 7 hari)','Meter',32000,NULL,1,'2025-08-01 06:30:07',NULL),
(83,'Satuan - Karpet Permadani (estimasi 7 hari)','Meter',28000,NULL,1,'2025-08-01 06:31:02',NULL),
(84,'Satuan - Karpet Bulu Tebal (estimasi 7 hari)','Meter',35000,NULL,1,'2025-08-01 06:31:26',NULL),
(85,'Satuan - Karpet Tipis/Masjid (estimasi 7 hari)','Meter',15000,NULL,1,'2025-08-01 06:31:42',NULL),
(86,'Satuan - Karpet Premium (estimasi 7 hari)','Meter',30000,NULL,1,'2025-08-01 06:31:55',NULL),
(87,'Satuan Gorden Besar - Express 2 hari','pcs',43000,NULL,1,'2025-09-02 11:51:32',NULL),
(88,'Satuan Gorden Sedang - Express 2 hari','pcs',28000,NULL,1,'2025-09-02 11:51:45',NULL),
(89,'Satuan Gorden King - Express 2 hari','pcs',48000,NULL,1,'2025-09-02 11:52:01',NULL),
(90,'HAPPY DAY PROMO KAMIS Selimut + Sprei - Reguler (4 Hari)','Pcs',14999,NULL,1,'2025-09-07 21:28:44',NULL),
(91,'Additional Charge - Kiloan','kg',2500,NULL,1,'2025-09-07 21:35:17',NULL),
(92,'HAPPY DAY PROMO SENIN Setrika Kiloan - Reguler (2 Hari)	','Kg',3999,NULL,1,'2025-09-08 04:31:33',NULL),
(93,'Setelan Celana & Blazer - Reguler 2 hari','Set',40000,NULL,1,'2025-09-16 00:09:26',NULL),
(94,'Express Sameday','kg',15500,NULL,1,'2025-09-21 02:34:07',NULL),
(95,'Sepatu Canvas, Polyester & Mesh','pcs',40000,NULL,1,'2025-09-23 11:39:18',NULL),
(96,'Sepatu (Leather, Suede & Nubuck)','pcs',50000,NULL,1,'2025-09-23 11:39:49',NULL),
(97,'Sepatu full Warna Putih','pcs',65000,NULL,1,'2025-09-23 11:40:19',NULL),
(98,'Sepatu Kids/Baby','pcs',45000,NULL,1,'2025-09-23 11:40:42',NULL),
(99,'Sepatu Gunung','pcs',95000,NULL,1,'2025-09-23 11:41:00',NULL),
(100,'Sepatu Boots','pcs',65000,NULL,1,'2025-09-23 11:41:19',NULL),
(101,'Stroller Mini - (estimasi 7 hari)','pcs',90000,NULL,1,'2025-09-23 11:41:36',NULL),
(102,'Stroller Medium - (estimasi 7 hari)','pcs',120000,NULL,1,'2025-09-23 11:41:46',NULL),
(103,'Stroller Besar - (estimasi 7 hari)','pcs',180000,NULL,1,'2025-09-23 11:42:15',NULL),
(104,'Setelan Celana & Blazer - Express 6 Jam',NULL,75000,NULL,1,'2025-10-03 08:33:16',NULL),
(105,'Setelan Celana & Blazer - Express 3 Jam',NULL,95000,NULL,1,'2025-10-03 08:33:29',NULL),
(106,'Klaim Royalti Club','Kiloan',0,NULL,1,'2025-10-17 03:42:24',NULL),
(107,'Bantal putih besar','Pcs',50000,NULL,1,'2025-10-23 06:24:23',NULL),
(108,'Treatment Noda Tinta /darah/karat/jamur/minyak/luntur- Medium Level (5 Hari)','pcs',35000,NULL,1,'2025-10-24 11:41:09',NULL),
(109,'Treatment Noda Tinta /darah/karat/jamur/minyak/luntur- High Level (5 hari)','pcs',50000,NULL,1,'2025-10-24 11:41:27',NULL),
(110,'Test','Kg',9999,'Test',1,'2025-10-26 15:56:41','2025-10-26 15:56:44');
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
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
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
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
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
) ENGINE=InnoDB AUTO_INCREMENT=481 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
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
) ENGINE=InnoDB AUTO_INCREMENT=683 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `User` VALUES
(2,'admin','$2b$10$1vw.hoIqYKcWNhAHroJBEuct2R44iixYmr.T6orvKnM3ClkGcs.7u','Admin','Admin',1,'2020-02-02 00:00:00',NULL),
(8,'kasir','$2b$10$8e9vDDM0rSWGHRRfRyAnf.Ga6mA6PUWewxF68EMCE5Xs098eZVMrG','Kasir','Kasir',1,'2025-10-28 10:50:41',NULL);
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
