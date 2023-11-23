import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
@Table({
  timestamps: false,
  freezeTableName: true,
  tableName: 'item',
})
export class Item extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({ defaultValue: true })
  price: number;

  @Column({ defaultValue: true })
  unit: string;

  @Column({ defaultValue: true })
  image_url: string;

  @Column({ defaultValue: true })
  created_at: string;
}
