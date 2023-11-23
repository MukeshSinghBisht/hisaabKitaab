import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Item } from './models/item.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}
  list(): Promise<Item[]> {
    return this.itemModel.findAll();
    // return 'Hello World!';
  }
}
