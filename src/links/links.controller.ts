import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateLinkDto, UpdateLinkDto } from './dto';

@Controller('links')
export class LinksController {
  // constructor(private linkService: LinkService) {}

    @Get()
    getAllLinks(): string {
      return 'Поиск всех ссылок';
    }

    @Post()
    createLink(@Body() createLinkDto: CreateLinkDto) {
      return 'Новый пост';
    }

    @Get(':id')
    getLinkById(@Param() params: Record<string, string>) { // "Param('id') id: string"
      const { id } = params;
      return id;
    }

    @Put(':id')
    updateLink(
      @Param('id') id: string,
      @Body() updateLinkDto: UpdateLinkDto
    ) {
      return `Обновленная ссылка с идентификатором ${id}`
    }

    @Delete(':id')
    deleteLink(@Param('id') id: string) {
      console.log(`Удаленная ссылка с идентификатором ${id}`);
    }

}
