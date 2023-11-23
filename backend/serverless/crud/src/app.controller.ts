import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { Item } from './models/item.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('item')
  list(@Req() req: Request, res: Response): Promise<Item[]> {
    console.log({req, res})
    return this.appService.list();
  }

  @Post('item')
  create(@Body() data: any, res: Response): Promise<Item> {
    return this.appService.create(data);
  }

  @Patch('item/:id')
  update(@Param('id') id, @Body() data: any, res: Response): Promise<[affectedCount: number, affectedRows: Item[]]> {
    return this.appService.update(+id, data);
  }

  @Delete('item/:id')
  delete(@Param('id') id, res: Response): Promise<number> {
    return this.appService.delete(+id);
  }
}
