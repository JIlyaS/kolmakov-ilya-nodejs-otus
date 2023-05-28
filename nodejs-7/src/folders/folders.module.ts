import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import FolderEntity from './entities/folder.entity';

@Module({
  controllers: [FoldersController],
  providers: [FoldersService],
  imports: [TypeOrmModule.forFeature([FolderEntity])]
})
export class FoldersModule {}
