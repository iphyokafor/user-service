import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfiguration } from 'config/env.configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: ['.env'],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(envConfiguration.MONGODB_URI),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: false,
      }),
      inject: [ConfigService],
    }),

    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService],

})

export class AppModule {}
