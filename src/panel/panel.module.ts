import { Module } from '@nestjs/common';
import { PanelController } from './panel.controller';
import { PanelService } from './panel.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Panel } from './entities/panel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Panel])],
  controllers: [PanelController],
  providers: [PanelService],
})
export class PanelModule { }