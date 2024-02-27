import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CodeService } from './code.service';

@Injectable()
export class CodeExpirationTask {
  private readonly logger = new Logger(CodeExpirationTask.name);

  constructor(private readonly codeService: CodeService) {}

  /**
   * 清除过期code
   */
  @Cron('0 */30 * * * *') // 每30分执行一次
  async handleCodeExpiration() {
    this.logger.debug('Running code expiration task...');
    await this.codeService.deleteExpiredCodes();
  }
}