import { Body, Controller, Get, Injectable, OnModuleInit, Post } from '@nestjs/common';
import CreateUserDto from './create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailProducerService } from 'src/jobs/sendEmail-producer-service';
import { create } from 'domain';

@Controller('create-user')
export class CreateUserController {

  constructor( private sendMailService: SendMailProducerService) {}

  @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
     await this.sendMailService.sendMail(createUserDto);

    return createUserDto;
  }
}


