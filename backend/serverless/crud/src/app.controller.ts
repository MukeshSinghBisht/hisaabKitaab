import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './models/item.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  list(): Promise<Item[]> {
    return this.appService.list();
  }
}
