import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { CreateItemUseCase } from '../application/use-cases/create-item.use-case';
import { CreateItemDto } from '../dto/create-item.dto';
import { ListItemUseCase } from '../application/use-cases/list-item.use-case';

@Controller('items')
export class ItemController {
  // use case 
  constructor(
    private readonly createUseCase: CreateItemUseCase,
    private readonly listItemUseCase: ListItemUseCase,
  ) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createItemDto: CreateItemDto) {
    return this.createUseCase.execute(createItemDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.listItemUseCase.execute();
  }
}
