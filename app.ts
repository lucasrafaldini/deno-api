import { Drash } from "./deps.ts";
import HomeResource from "./resources/home_resource.ts";

const server = new Drash.Http.Server({
  directory: Deno.realPathSync("./"),
  response_output: "application/json",
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: false,
    level: "debug",
  }),
  resources: [
    HomeResource,
  ],
});

await server.run({
  hostname: "0.0.0.0",
  port: 1667,
});

console.log(`Server listening: http://${server.hostname}:${server.port}`);
