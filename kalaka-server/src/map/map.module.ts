import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
