import { Module } from "@nestjs/common";
import { RankModule } from "./rank/rank.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
@Module({
  imports: [
    RankModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "ui", "dist"),
    }),
  ],
  providers: [],
})
export class AppModule {}
