import { MailerService } from "@nestjs-modules/mailer";
import { Process } from "@nestjs/bull";
import { Processor } from "@nestjs/bullmq";
import { Job } from "bullmq";
import CreateUserDto from "src/create-user/create-user.dto";

@Processor('sendMail-queue')
class sendMailConsumer{
constructor(private mailerService: MailerService) {}

    @Process('sendMail-job')
    async sendMailJob(job: Job<CreateUserDto>){
         await this.mailerService.sendMail({
            to: job.data.email,
            from: "Equipe Code/Drops",
            subject: "Seja bem-vindo",
            text: `Olá ${job.data.name} seja bem-vindo`,
        
    }); 
    console.log(job.data); 
    }
}

export{ sendMailConsumer}