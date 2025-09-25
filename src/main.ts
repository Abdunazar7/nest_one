import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function start() {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "verbose"],
  });

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT ?? 3000, () => {
    console.log(`Server started at  http://localhost:${PORT}`);
  });
}
start();
