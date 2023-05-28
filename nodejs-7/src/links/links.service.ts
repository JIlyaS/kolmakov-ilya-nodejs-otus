import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import LinkEntity from './entities/link.entity';
import { FindManyOptions, Repository } from 'typeorm';
// import { CreateFolderDto } from './dto/create-folder.dto';
// import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class LinksService {
  constructor(@InjectRepository(LinkEntity) private linksRepository: Repository<LinkEntity>) {}
  async create(@Body() link: LinkEntity) { // createFolderDto: CreateFolderDto
    const data = await this.linksRepository.save(link);
      console.log('data', data, link);
      return data;
    // return 'This action adds a new folder';
  }

  findAll() {
    const id = 2;
      const query: FindManyOptions<LinkEntity> = {
        // where: { id }
        // select: {
        //   name: true
        // }
        // take: 1
        order: {
          name: 'DESC'
        }
      };
      return this.linksRepository.find(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number) { // , updateFolderDto: UpdateFolderDto
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
