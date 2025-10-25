CREATE TABLE `JenisPengeluaran` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(500) NOT NULL, `deskripsi` text NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `deleted_at` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
ALTER TABLE `Pengeluaran` ADD `id_jenis_pengeluaran` int NULL;
ALTER TABLE `User` CHANGE `is_active` `is_active` tinyint NOT NULL DEFAULT true;
ALTER TABLE `Transaksi` CHANGE `sudah_lunas` `sudah_lunas` tinyint NULL DEFAULT false;
ALTER TABLE `Transaksi` CHANGE `sudah_diambil` `sudah_diambil` tinyint NULL DEFAULT false;
ALTER TABLE `Layanan` CHANGE `is_active` `is_active` tinyint NOT NULL DEFAULT true;
ALTER TABLE `Pengeluaran` ADD CONSTRAINT `FK_b984b53d42307356a548712bcad` FOREIGN KEY (`id_jenis_pengeluaran`) REFERENCES `JenisPengeluaran`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
