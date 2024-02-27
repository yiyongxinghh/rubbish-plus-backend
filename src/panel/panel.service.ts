import { Injectable } from '@nestjs/common';
import { CreatePanelDto } from './dto/create-panel.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Panel} from './entities/panel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PanelService {
  constructor(@InjectRepository(Panel) private readonly pic: Repository<Panel>) {}

  async getAll(){
    return await this.pic.createQueryBuilder().getMany();
  }
}