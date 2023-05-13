import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksController } from './links/links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import Link from './models/Link.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qw12345678',
      database: 'link-service',
      entities: [Link],
      migrationsTableName: '__migrations'
    }),
    TypeOrmModule.forFeature([Link]),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, LinksController],
  providers: [AppService],
})
export class AppModule {}
