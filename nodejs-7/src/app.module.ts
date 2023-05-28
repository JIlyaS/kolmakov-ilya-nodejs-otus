import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksController } from './links/links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import LinkEntity from './links/entities/link.entity';
import { UserEntity } from './users/entities/user.entity';
import { FoldersModule } from './folders/folders.module';
import { LinksService } from './links/links.service';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './links/links.module';
import FolderEntity from './folders/entities/folder.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT) || 5432,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qw12345678',
      database: 'link-service',
      entities: [LinkEntity, UserEntity, FolderEntity],
      migrationsTableName: '__migrations'
    }),
    TypeOrmModule.forFeature([LinkEntity, UserEntity, FolderEntity]),
    AuthModule,
    UsersModule,
    FoldersModule,
    LinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
