import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import LinkEntity from 'src/links/entities/link.entity';
import { LinksService } from './links.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@Controller('links')
@ApiTags('links')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LinksController {
  constructor(private linksService: LinksService) {}
  // constructor(@InjectRepository(LinkEntity) private linksRepository: Repository<LinkEntity>) {}

    @Get()
    findAll() {
      // const id = 2;
      // const query: FindManyOptions<LinkEntity> = {
      //   // where: { id }
      //   // select: {
      //   //   name: true
      //   // }
      //   // take: 1
      //   order: {
      //     name: 'DESC'
      //   }
      // };
      // return this.linksRepository.find(query);
      return this.linksService.findAll();
    }

    @Post()
    async create(@Body() link: LinkEntity) {
      return this.linksService.create(link);
      // const data = await this.linksRepository.save(link);
      // console.log('data', data, link);
      // return data;
    }

    @Get(':id')
    getLinkById(@Param() params: Record<string, number>) { // "Param('id') id: string"
      const { id } = params;
      // return id;
      // return this.linksRepository.findOneBy({ id });
    }

    @Put(':id')
    async updateLink(
      @Param('id') id: string,
      @Body() link: LinkEntity
    ) {
      // const data = await this.linksRepository.update(id, link);
      // return data;
    }

    @Delete(':id')
    async deleteLink(@Param('id') id: number) {
      // await this.linksRepository.delete({ id });   
      // return id;
    }

}
