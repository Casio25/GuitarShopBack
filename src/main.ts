/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from "body-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(bodyParser.json({limit: "15mb"}));
  app.use(bodyParser.urlencoded({limit: '15mb', extended: true}))
  await app.listen(process.env.PORT || 4000);
  console.log("port: ", process.env.PORT)
}
bootstrap();
