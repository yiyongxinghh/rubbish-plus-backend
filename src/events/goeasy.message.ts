import { Injectable } from '@nestjs/common';
import * as http from 'https'

@Injectable()
export class GoEasyHttpService {

    constructor() {
    }

    async sendMessage(channel: string, content: string,message) {
        const options = {
            hostname: "rest-hz.goeasy.io", //新加坡rest-host：rest-singapore.goeasy.io
            path: "/v2/pubsub/publish",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        const data = {
            appkey: "BC-6febb09a75294669849fd6d7124c7e85",
            channel: channel,
            content: content,
        };

        let result:any = "";
        const req = http.request(options, (res) => {
            console.log(res.statusCode);

            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                result += chunk;
            });

            res.on("end", () => {
                console.log(result);
            });
        });

        req.on("error", (e) => {
            console.error(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    }
}
