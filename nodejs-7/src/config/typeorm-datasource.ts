import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qw12345678',
      database: 'link-service',
      entities: ['../**/*.entity.{ts, js}'],
      migrationsTableName: '__migrations',
      migrations: ['../**/migrations/*.{ts, js}'],
});