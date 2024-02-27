import { Controller, Get, Post,UseInterceptors,UploadedFile,Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PanelService } from './panel.service';
import { Public } from '../common/public.decorator';
@Controller('panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Public()
  @Post()
  getPanelList () {
    return this.panelService.getAll()
  }
}
