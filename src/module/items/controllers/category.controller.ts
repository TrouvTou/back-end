import { Controller, Post, Body, HttpCode, HttpStatus, Get, Delete, Param, Put } from '@nestjs/common';
import { CreateCategoryUseCase } from '../application/use-cases/create-category.use-case';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ListCategoryUseCase } from '../application/use-cases/list-category.use-case';
import { DeleteCategoryUseCase } from '../application/use-cases/delete-category.use-case';
import { UpdateCategoryUseCase } from '../application/use-cases/update-category.use-case';
import { Category } from '../infrastructure/entities/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';


@Controller('categories')
export class CategoryController {
  // use case 
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoryUseCase: ListCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.createCategoryUseCase.execute(createCategoryDto);
    return result;
  }

  //list
  @Get("list")
  @HttpCode(HttpStatus.OK)
  async list() {
    const result = await this.listCategoryUseCase.execute();
    return result;
  }
  // delete
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string) {
    const result = await this.deleteCategoryUseCase.execute(id);
    return result;
  }
  // update
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const result = await this.updateCategoryUseCase.execute(id, updateCategoryDto);
    return result;
  }

}
