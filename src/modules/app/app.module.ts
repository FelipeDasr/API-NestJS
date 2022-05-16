import { Module } from '@nestjs/common';

import { ProductsModule } from 'src/modules/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
