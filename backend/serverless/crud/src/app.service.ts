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
  }
  create(data: any): Promise<Item> {
    return this.itemModel.create(data, {returning: true});
  }
  update(id: number, data: any): Promise<[affectedCount: number, affectedRows: Item[]]> {
    return this.itemModel.update(data, { where: { id } , returning: true});
  }
  async delete(id: number): Promise<number> {
    const deletedCount = await this.itemModel.destroy({ where: { id } });
    return deletedCount;
  }
  async  getItemById(id: number): Promise<Item | null> {
    return Item.findByPk(id);
  }
}
