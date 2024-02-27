import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

    private transporter: nodemailer.Transporter;

    constructor() {
        // 创建一个Nodemailer transporter实例
        this.transporter = nodemailer.createTransport({
            host: 'smtp.qq.com', // SMTP服务器主机
            port: 465, // SMTP服务器端口
            secure: true, // 使用 SSL
            auth: {
                user: '2972802701@qq.com', // 发件邮箱
                pass: 'ptawmdpqntnydegb', // 发件邮箱密码或授权码
            },
        });
    }

    async sendVerificationCode(email:string,code: string){
        const mailOptions: nodemailer.SendMailOptions = {
            from: '2972802701@qq.com', // 发件邮箱
            to: email, // 收件邮箱
            subject: 'Verification Code', // 邮件主题
            text: `Your verification code is: ${code}`, // 邮件正文
        };

        // 发送邮件
        await this.transporter.sendMail(mailOptions);
    }
}
