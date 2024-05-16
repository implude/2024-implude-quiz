import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RankService } from "./rank.service";
import { DesignRankSchema, DevRankSchema } from "./schema/rank.schema";
import { RankController } from "./rank.controller";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: "DevRank", schema: DevRankSchema },
      { name: "DesignRank", schema: DesignRankSchema },
    ]),
  ],
  providers: [RankService],
  controllers: [RankController],
})
export class RankModule {}
