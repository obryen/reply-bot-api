import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateRepliesTable1635176474346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        INSERT INTO replies(id,name,description,reply) VALUES ('34d7831e137a4016a55f98926800a643','Greeting','The visitor says hello.','Hello :) How can I help you?');
        INSERT INTO replies(id,name,description,reply) VALUES ('b6ec3deac5f94500aef55d9c410e37f7','Goodbye','The visitor says goodbye.','Goodbye, have a nice day!');
        INSERT INTO replies(id,name,description,reply) VALUES ('61e218983f8b49f79405e8cf22992e61','Affirmative','The visitor confirms that something is true / correct.','Great!');
        INSERT INTO replies(id,name,description,reply) VALUES ('5a13917dac654cfaa10619de37a673c4','Negative','The visitor confirms that they don''t need help / something is not true or similar.','Alright, please let me know if I can help you with anything else!');
        INSERT INTO replies(id,name,description,reply) VALUES ('629ebabd5d714900bbc7eb2c9eceb927','Thank you','The visitor says thank you.','It was a pleasure to be of help :)');
        INSERT INTO replies(id,name,description,reply) VALUES ('f83a8f67dd8e4eef8c743a0f324aeca0','Are you a bot?','The visitor wants to know if they are talking to a bot or a human.','I''m an AI bot, and I''m here to help you with your questions.');
        INSERT INTO replies(id,name,description,reply) VALUES ('f505432f6dcd40548983e4eab1675429','I want to speak with a human','The visitor wants to speak to a human agent.','Let me transfer you to the first available agent.');
        INSERT INTO replies(id,name,description,reply) VALUES ('0edf4a33873d482f857bfa0a5c16b7ce','Login Problems','The visitor has trouble logging in.','Oh no! Please give me your email and I will fix it.');
        INSERT INTO replies(id,name,description,reply) VALUES ('29a0d3b7cecc4fe5955f6c5c30fbcf6b','Open or close account','The visitor wants to create a new account or close an existing one.','Please follow these instructions "LINK" to open a new account.');
        
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
