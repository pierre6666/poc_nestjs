import { Injectable } from '@nestjs/common';
import { Prisma, Tweets } from '@prisma/client';
import { PrismaService } from './services/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<Tweets[]> {
    return await this.prisma.tweets.findMany();
  }

  async createTweet(data: Prisma.TweetsCreateInput): Promise<Tweets> {
    return this.prisma.tweets.create({ data });
  }

  async getContent(idToFind: number): Promise<string> {
    return (
      await this.prisma.tweets.findUniqueOrThrow({ where: { id: +idToFind } })
    ).content;
  }
}
