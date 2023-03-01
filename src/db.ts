import { Database, LocalDest, Store } from "@subsquid/file-store";
import { S3Dest } from "@subsquid/file-store-s3";
import { Transfers } from "./tables";

export const db = new Database({
  tables: {
    Transfers,
  },
  dest:
    process.env.DEST === "S3"
      ? new S3Dest("./matic-data", "csv-store", {
          region: "us-east-1",
          endpoint: "https://s3.filebase.com",
          credentials: {
            secretAccessKey: "FLxiMxX9MZCCByLReYJ9I5AFsnsgZ7y6527xSgHm",
            accessKeyId: "EA7CB2270DA25935F6DE",
          },
        })
      : new LocalDest("./data"),
  chunkSizeMb: 100,
  syncIntervalBlocks: 10000,
});
export type Store_ = typeof db extends Database<infer R, any>
  ? Store<R>
  : never;
