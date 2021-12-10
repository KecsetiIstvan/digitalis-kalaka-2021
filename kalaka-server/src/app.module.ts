import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig, jwtConfig } from '@config';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { SeedsModule } from './seeders/seeds.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    SeedsModule,
    MongooseModule.forRootAsync(databaseConfig),
    CommandModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
