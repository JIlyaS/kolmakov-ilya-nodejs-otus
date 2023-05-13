import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';

import { CreateLinkDto, UpdateLinkDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import Link from 'src/models/Link.entity';
@Controller('links')
export class LinksController {
  // constructor(private linkService: LinkService) {}
  constructor(@InjectRepository(Link) private linksRepository: Repository<Link>) {}

    @Get()
    getAllLinks() {
      const id = 2;
      const query: FindManyOptions<Link> = {
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

    @Post()
    async createLink(@Body() link: Link) {
      const data = await this.linksRepository.save(link);
      console.log('data', data, link);
      return data;
    }

    @Get(':id')
    getLinkById(@Param() params: Record<string, number>) { // "Param('id') id: string"
      const { id } = params;
      // return id;
      return this.linksRepository.findOneBy({ id });
    }

    @Put(':id')
    async updateLink(
      @Param('id') id: string,
      @Body() link: Link
    ) {
      const data = await this.linksRepository.update(id, link);
      return data;
    }

    @Delete(':id')
    async deleteLink(@Param('id') id: number) {
      await this.linksRepository.delete({ id });   
      return id;
    }

}
