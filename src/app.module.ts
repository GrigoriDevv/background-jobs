import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user/create-user.controller';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { RedisConnection } from 'bullmq';
import { SendMailProducerService } from './jobs/sendEmail-producer-service';
import { sendMailConsumer } from './jobs/sendEmail-consumer';


@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      useFactory: () => ({
        connection: {
          syscall: 'connect',
          address: '127.0.0.1',
          host: 'localhost',
          port: 6379,
       } ,
      }),
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',}),


    MailerModule.forRoot({
    transport: {
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }}
    
  

    })
       
     
  ],
  controllers: [ CreateUserController],
  providers: [SendMailProducerService, sendMailConsumer],
})
export class AppModule {}  
