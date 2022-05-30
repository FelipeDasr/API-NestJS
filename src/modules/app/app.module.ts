import { Module } from '@nestjs/common';

import { ProductsModule } from 'src/modules/products/products.module';
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [ProductsModule, PhotosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
