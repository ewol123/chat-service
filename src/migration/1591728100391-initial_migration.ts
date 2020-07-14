import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1591728100391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE public.room
        (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            identifier uuid NOT NULL,
            CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY (id),
            CONSTRAINT "UQ_37fce998ad9d7f9c15fb4e162cc" UNIQUE (identifier)
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;

        ALTER TABLE public.room
            OWNER to postgres;`);
    await queryRunner.query(`CREATE TABLE public."user"
        (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            name character varying COLLATE pg_catalog."default" NOT NULL,
            avatar character varying COLLATE pg_catalog."default",
            "roomId" uuid,
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
            CONSTRAINT "FK_9a5b6e98e76999b2c6778a30eec" FOREIGN KEY ("roomId")
                REFERENCES public.room (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;

        ALTER TABLE public."user"
            OWNER to postgres;`);
    await queryRunner.query(`CREATE TABLE public.message
        (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            text character varying COLLATE pg_catalog."default" NOT NULL,
            stamp timestamp without time zone NOT NULL DEFAULT now(),
            "userId" uuid,
            "roomId" uuid,
            CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY (id),
            CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId")
                REFERENCES public."user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId")
                REFERENCES public.room (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;

        ALTER TABLE public.message
            OWNER to postgres;`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE public.user CASCADE");
    await queryRunner.query("DROP TABLE public.room CASCADE");
    await queryRunner.query("DROP TABLE public.message CASCADE");
  }
}
