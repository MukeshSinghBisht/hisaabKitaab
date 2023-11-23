import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './models/item.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Item]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db.olsuhufpdhrjxiobqvxm.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'bZh663@d4%Zc9yS',
      database: 'postgres',
      models: [Item],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
