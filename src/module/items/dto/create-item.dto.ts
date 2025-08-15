import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus, ItemType } from '@prisma/client';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: ItemStatus })
  @IsNotEmpty()
  status: ItemStatus;

  @ApiProperty({ enum: ItemType })
  @IsNotEmpty()
  type: ItemType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  lostFoundAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty({ required: false, type: Object, nullable: true })
  @IsOptional()
  attributes?: any | null;

  @ApiProperty({ required: false, type: Number, nullable: true })
  @IsOptional()
  latitude?: number | null;

  @ApiProperty({ required: false, type: Number, nullable: true })
  @IsOptional()
  longitude?: number | null;

  @ApiProperty({ required: false, type: Number, nullable: true })
  @IsOptional()
  radius?: number | null;

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  color?: string | null;

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  brand?: string | null;

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  size?: string | null;

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  material?: string | null;

  @ApiProperty({ required: false, type: Date, nullable: true })
  @IsOptional()
  expiresAt?: Date | null;
}
