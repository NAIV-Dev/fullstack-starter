import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761306969128 implements MigrationInterface {
    name = 'Init1761306969128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`nama\` varchar(200) NOT NULL, \`role\` enum ('Admin', 'Kasir') NOT NULL DEFAULT 'Kasir', \`is_active\` tinyint NOT NULL DEFAULT true, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Pelanggan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nama\` varchar(200) NOT NULL, \`nomor_hp\` varchar(500) NULL, \`alamat\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Transaksi\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pelanggan_id\` int NULL, \`nomor_transaksi\` varchar(50) NOT NULL, \`pengguna_id\` int NOT NULL, \`tanggal_transaksi\` timestamp NOT NULL, \`sudah_lunas\` tinyint NULL DEFAULT false, \`sudah_diambil\` tinyint NULL DEFAULT false, \`total_harga\` bigint NOT NULL, \`catatan\` text NULL, \`metode_pembayaran\` enum ('QRIS', 'Tunai', 'TransferBank') NOT NULL DEFAULT 'Tunai', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Pengeluaran\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nomor_pengeluaran\` varchar(50) NOT NULL, \`tanggal\` timestamp NOT NULL, \`pengguna_id\` int NOT NULL, \`deskripsi\` varchar(255) NOT NULL, \`jumlah\` bigint NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Layanan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nama\` varchar(200) NOT NULL, \`label_satuan\` varchar(500) NULL, \`harga_satuan\` bigint NOT NULL, \`deskripsi\` text NULL, \`is_active\` tinyint NOT NULL DEFAULT true, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TransaksiDetail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`transaksi_id\` int NOT NULL, \`layanan_id\` int NOT NULL, \`jumlah\` decimal(10,4) NULL, \`harga_satuan\` bigint NOT NULL, \`subtotal\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` ADD CONSTRAINT \`FK_ea9befcfe99dec0fbbdf9ebbe9c\` FOREIGN KEY (\`pelanggan_id\`) REFERENCES \`Pelanggan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` ADD CONSTRAINT \`FK_5b6248b23300b4595aff742d5ca\` FOREIGN KEY (\`pengguna_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Pengeluaran\` ADD CONSTRAINT \`FK_bbd99aa2cf39612a59b71c71ee6\` FOREIGN KEY (\`pengguna_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TransaksiDetail\` ADD CONSTRAINT \`FK_0126c9b275fb21bbb0cae740b35\` FOREIGN KEY (\`transaksi_id\`) REFERENCES \`Transaksi\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TransaksiDetail\` ADD CONSTRAINT \`FK_141c5b5572163a2c2ad89b09c09\` FOREIGN KEY (\`layanan_id\`) REFERENCES \`Layanan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`TransaksiDetail\` DROP FOREIGN KEY \`FK_141c5b5572163a2c2ad89b09c09\``);
        await queryRunner.query(`ALTER TABLE \`TransaksiDetail\` DROP FOREIGN KEY \`FK_0126c9b275fb21bbb0cae740b35\``);
        await queryRunner.query(`ALTER TABLE \`Pengeluaran\` DROP FOREIGN KEY \`FK_bbd99aa2cf39612a59b71c71ee6\``);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` DROP FOREIGN KEY \`FK_5b6248b23300b4595aff742d5ca\``);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` DROP FOREIGN KEY \`FK_ea9befcfe99dec0fbbdf9ebbe9c\``);
        await queryRunner.query(`DROP TABLE \`TransaksiDetail\``);
        await queryRunner.query(`DROP TABLE \`Layanan\``);
        await queryRunner.query(`DROP TABLE \`Pengeluaran\``);
        await queryRunner.query(`DROP TABLE \`Transaksi\``);
        await queryRunner.query(`DROP TABLE \`Pelanggan\``);
        await queryRunner.query(`DROP TABLE \`User\``);
    }

}
