import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJenisPengeluaran1761391216434 implements MigrationInterface {
    name = 'AddJenisPengeluaran1761391216434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`JenisPengeluaran\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(500) NOT NULL, \`deskripsi\` text NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Pengeluaran\` ADD \`id_jenis_pengeluaran\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` CHANGE \`sudah_lunas\` \`sudah_lunas\` tinyint NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` CHANGE \`sudah_diambil\` \`sudah_diambil\` tinyint NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE \`Layanan\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE \`Pengeluaran\` ADD CONSTRAINT \`FK_b984b53d42307356a548712bcad\` FOREIGN KEY (\`id_jenis_pengeluaran\`) REFERENCES \`JenisPengeluaran\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Pengeluaran\` DROP FOREIGN KEY \`FK_b984b53d42307356a548712bcad\``);
        await queryRunner.query(`ALTER TABLE \`Layanan\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` CHANGE \`sudah_diambil\` \`sudah_diambil\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Transaksi\` CHANGE \`sudah_lunas\` \`sudah_lunas\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`Pengeluaran\` DROP COLUMN \`id_jenis_pengeluaran\``);
        await queryRunner.query(`DROP TABLE \`JenisPengeluaran\``);
    }

}
