import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1565884994296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `versions` (`id` int NOT NULL AUTO_INCREMENT, `is_successed` tinyint NOT NULL DEFAULT 0, `started_at` datetime(0) NULL, `finished_at` datetime(0) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `animes` (`id` int NOT NULL, `title` varchar(255) NOT NULL, `link` varchar(255) NOT NULL, `keyvisual_url` varchar(255) NULL, `keyvisual_alt` varchar(255) NULL, `attibutes` varchar(255) NULL, `types` varchar(255) NULL, `mylist_count` int NULL, `favorite_count` int NULL, `episodes_count` int NULL, `created_year` int NULL, `season_name` varchar(255) NULL, `created_at` datetime(0) NOT NULL DEFAULT NOW(), `updated_at` datetime(0) NOT NULL DEFAULT NOW(), `version_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `animes` ADD CONSTRAINT `FK_21c215ba15680e2c3137c3be1ba` FOREIGN KEY (`version_id`) REFERENCES `versions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `animes` DROP FOREIGN KEY `FK_21c215ba15680e2c3137c3be1ba`");
        await queryRunner.query("DROP TABLE `animes`");
        await queryRunner.query("DROP TABLE `versions`");
    }

}
