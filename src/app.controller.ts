import { Body, HttpStatus, Post } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Tweets } from '@prisma/client';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(CacheInterceptor) // automatically cache the response
  @CacheTTL(30)
  @Get()
  @Unprotected()
  getHello(): Promise<Tweets[]> {
    return this.appService.getHello();
  }

  @Post('')
  @Unprotected()
  async createTweet(
    @Body()
    tweetData: {
      content: string;
      published: boolean;
    },
  ): Promise<Tweets> {
    return this.appService.createTweet(tweetData);
  }

  @UseInterceptors(CacheInterceptor) // automatically cache the response
  @CacheTTL(30)
  @Get(':id/content')
  @Unprotected()
  @ApiOperation({ description: 'get content of tweet.' })
  @ApiNotFoundResponse({ description: 'No tweet found for id' })
  @ApiParam({ name: 'id', description: 'id of tweet', example: '2' })
  getContent(@Param('id') id: number): Promise<string> {
    return this.appService
      .getContent(id)
      .then((res) => {
        return res;
      })
      .catch(() => {
        throw new HttpException('No tweet found for id', HttpStatus.NOT_FOUND);
      });
  }

  @UseInterceptors(CacheInterceptor) // automatically cache the response
  @CacheTTL(30)
  @Get('/protected')
  @Roles({ roles: ['user'] })
  getProtectedContent(): Promise<Tweets[]> {
    return this.appService.getHello();
  }
}
