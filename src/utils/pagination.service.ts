import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Doshuffle } from './utils';
import { PrismaService } from 'src/database/prisma.service';
// import _ from 'lodash';

export type PaginateOptions = {
  page?: number;
  limit?: number;
  select?: Prisma.SelectAndInclude;
  conditions?: Record<string, any>;
  orderBy?: Record<string, any>;
};

export type SearchOptions = {
  search?: string;
  limit?: number;
  wheres: string[];
};
@Injectable()
export class FunctionService {
  constructor(private readonly prisma: PrismaService) {}

  async paginate<T>({
    model,
    page,
    limit,
    selectAndInclude,
    conditions,
    orderBy,
    shuffle,
  }: {
    model: Prisma.ModelName;
    page: number;
    limit: number;
    selectAndInclude?: Prisma.SelectAndInclude;
    conditions?: Record<string, any>;
    orderBy?: Record<string, any>;
    shuffle?: boolean;
  }) {
    const skip = page > 0 ? (page - 1) * limit : 0;
    const total = await this.prisma[model].count({
      where: { ...conditions },
    });
    if (selectAndInclude != null) {
      let data: T[] = await this.prisma[model].findMany({
        skip,
        take: limit,
        where: { ...conditions },
        orderBy: { ...orderBy },
        ...selectAndInclude,
      });
      data = shuffle ? Doshuffle(data) : data;
      return {
        status: true,
        total,
        page,
        limit,
        data,
      };
    }

    let data: T[] = await this.prisma[model].findMany({
      skip,
      take: limit,
      where: { ...conditions },
      orderBy: { ...orderBy },
    });
    data = shuffle ? Doshuffle(data) : data;
    return {
      status: true,
      total,
      page,
      limit,
      data,
    };
  }
  async search<T>({
    model,
    search,
    limit,
    selectAndInclude,
    conditions,
    wheres,
  }: {
    model: Prisma.ModelName;
    search: string;
    limit: number;
    selectAndInclude?: Prisma.SelectAndInclude;
    conditions?: Record<string, any>;
    wheres: string[];
  }) {
    const queries = wheres.map((key) => ({
      [key]: {
        contains: search,
        mode: 'insensitive',
      },
    }));

    if (selectAndInclude != null) {
      return {
        limit,
        data: await this.prisma[model].findMany({
          take: limit <= 15 ? limit : 15,
          where: {
            OR: queries,
            ...conditions,
          },
          ...selectAndInclude,
        }),
      };
    }
    if (!search)
      return {
        limit,
        data: [],
      };

    const data = await this.prisma[model].findMany({
      take: limit <= 15 ? limit : 15,
      where: {
        OR: queries,
      },
    });
    return {
      limit,
      data,
    };
  }
}
