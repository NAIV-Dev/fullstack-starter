/*M!999999\- enable the sandbox mode */ 
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  PRIMARY KEY (`id`),
  KEY `FK_bbd99aa2cf39612a59b71c71ee6` (`pengguna_id`),
  CONSTRAINT `FK_bbd99aa2cf39612a59b71c71ee6` FOREIGN KEY (`pengguna_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `User` VALUES
(1,'admin','$2a$10$rVi6Wtr71U0p6p4Lmbfqt.E8lDUEU5i0xBagMRiLrAVswWfMtvF8e','Super Admin','Admin',1,'2020-02-02 00:00:00',NULL);
commit;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
set autocommit=0;
INSERT INTO `migrations` VALUES
(1,1761306969128,'Init1761306969128');
commit;
