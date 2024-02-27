import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}
}
