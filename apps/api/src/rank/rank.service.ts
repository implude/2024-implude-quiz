import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RankEntityList, rank_entity } from "./entity/rank.entity";
import { the_last } from "./type/rank.type";
import { _return } from "./type/rank.type";
@Injectable()
export class RankService {
  private readonly logger = new Logger(RankService.name);

  constructor(
    @InjectModel("DevRank") private readonly devRankModel: Model<rank_entity>,
    @InjectModel("DesignRank")
    private readonly designRankModel: Model<rank_entity>
  ) {}

  private make_new_array(rank_list: _return): the_last {
    let res: the_last = [];
    for (let i of rank_list) {
      console.log(i);
      res.push({
        id: i.id,
        name: i.name,
        score: Math.round((i.score * (300 - i.sec)) / 100),
        same_name: i.same_name,
        sec: i.sec,
      });
    }

    return res;
  }
  async find_dev(): Promise<the_last> {
    this.logger.log("[GET] dev_Rank");
    return await this.make_new_array(
      await await this.devRankModel.find().sort({ score: -1 }).exec()
    );
  }

  async find_design(): Promise<the_last> {
    this.logger.log("[GET] design_Rank");
    return await this.make_new_array(
      await this.designRankModel.find().sort({ score: -1 }).exec()
    );
  }

  private async getCountOfNames(
    name: string,
    model: Model<any>
  ): Promise<number> {
    return model.countDocuments({ name }).exec();
  }

  async dev_create(name: string, score: number, sec: number): Promise<void> {
    this.logger.log(
      `[POST] dev_Rank name: ${name} score: ${score} sec: ${sec}`
    );
    try {
      const num: number = await this.getCountOfNames(name, this.devRankModel);
      await this.devRankModel.create({ name, score, same_name: num, sec });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async design_create(name: string, score: number, sec: number): Promise<void> {
    this.logger.log(
      `[POST] design_Rank name: ${name} score: ${score} sec: ${sec}`
    );
    try {
      const num: number = await this.getCountOfNames(
        name,
        this.designRankModel
      );
      await this.designRankModel.create({ name, score, same_name: num, sec });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
