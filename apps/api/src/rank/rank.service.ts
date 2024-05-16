import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RankEntityList, rank_entity } from "./entity/rank.entity";

@Injectable()
export class RankService {
  private readonly logger = new Logger(RankService.name);

  constructor(
    @InjectModel('DevRank') private readonly devRankModel: Model<rank_entity>,
    @InjectModel('DesignRank') private readonly designRankModel: Model<rank_entity>,
  ) {}

  async find_dev(): Promise<RankEntityList> {
    this.logger.log("[GET] dev_Rank");
    return this.devRankModel.find().sort({ score: -1 }).exec();
  }

  async find_design(): Promise<RankEntityList> {
    this.logger.log("[GET] design_Rank");
    return this.designRankModel.find().sort({ score: -1 }).exec();
  }

  private async getCountOfNames(name: string, model: Model<any>): Promise<number> {
    return model.countDocuments({ name }).exec();
  }

  async dev_create(name: string, score: number): Promise<void> {
    this.logger.log(`[POST] dev_Rank name: ${name} score: ${score}`);
    try {
      const num = await this.getCountOfNames(name, this.devRankModel);
      await this.devRankModel.create({ name, score, same_name: num });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async design_create(name: string, score: number): Promise<void> {
    this.logger.log(`[POST] design_Rank name: ${name} score: ${score}`);
    try {
      const num = await this.getCountOfNames(name, this.designRankModel);
      await this.designRankModel.create({ name, score, same_name: num });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
