import { Controller, Get, Post, Body, Response } from "@nestjs/common";
import { RankService } from "./rank.service";
import { rankDTO } from "./dto/rank.dto";
import Express from "express";

@Controller()
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get("/get_dev")
  async findindev(@Response() response: Express.Response): Promise<any> {
    return response
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ success: true, data: await this.rankService.find_dev() });
  }

  @Post("/post_dev")
  async createindev(
    @Body() body: rankDTO,
    @Response() response: Express.Response
  ): Promise<void> {
    const { name, score } = body;
    if (!name || (!score && score != 0)) {
      throw new Error("Name and score are required.");
    }
    await this.rankService.dev_create(name, score);

    response
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ success: true });
  }

  @Get("/get_design")
  async findindesign(@Response() response: Express.Response): Promise<any> {
    return response
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ success: true, data: await this.rankService.find_design() });
  }

  @Post("/post_design")
  async createindesign(
    @Body() body: rankDTO,
    @Response() response: Express.Response
  ): Promise<void> {
    const { name, score } = body;
    if (!name || (!score && score != 0)) {
      throw new Error("Name and score are required.");
    }
    await this.rankService.design_create(name, score);

    response
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ success: true });
  }
}
