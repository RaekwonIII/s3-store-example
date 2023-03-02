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
          region: process.env.S3_REGION,
          endpoint: process.env.S3_ENDPOINT,
          credentials: {
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
            accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          },
        })
      : new LocalDest("./data"),
  chunkSizeMb: 100,
  syncIntervalBlocks: 10000,
});
export type Store_ = typeof db extends Database<infer R, any>
  ? Store<R>
  : never;
