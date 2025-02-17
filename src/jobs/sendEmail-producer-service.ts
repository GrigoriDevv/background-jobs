import { InjectQueue } from "@nestjs/bullmq";
import {  Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import CreateUserDto from "src/create-user/create-user.dto";

@Injectable()
class SendMailProducerService {
    constructor(@InjectQueue('sendMail-queue') private Queue: Queue) {}

    async sendMail(createUserDto: CreateUserDto) {
        await this.Queue.add('sendMail-job', createUserDto);
    }
}

export{ SendMailProducerService}