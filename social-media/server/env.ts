import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  DATABASE_URL: z.string().min(1).url(),
  JSON_WEB_TOKEN_SIGNATURE: z.string().min(1),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.log(
    "❌ Invalid environment variables : ",
    JSON.stringify(parsed.error.format(), null, 4)
  );
  process.exit(1);
}

type ISchema = z.infer<typeof schema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ISchema {}
  }
}
