import { Drash } from "../../deps.ts";
import { assertEquals } from "../../deps.ts";
import HomeResource from "../../resources/home_resource.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [
    HomeResource,
  ],
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: true,
    level: "all",
    tag_string: "{datetime} | {level} |",
    tag_string_fns: {
      datetime() {
        return new Date().toISOString().replace("T", " ");
      }
    }
  })
});

server.run({
  hostname: "localhost",
  port: 1557,
});
console.log(`Server listening: http://${server.hostname}:${server.port}`);

Deno.test({
    name: "HomeResource - GET error", 
    fn: async () => {
    const response = await fetch("http://localhost:1557", {
      method: "GET",
    });
    
    assertEquals(response.status, 400);
},
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "HomeResource - GET /fibonacci", 
  fn: async () => {
      server.logger.info('Testing fibonacci endpoint')
      const param = 12
      const response = await fetch(`http://localhost:1557/?fibonacci=${param}`, {
        method: "GET",
      });

      assertEquals(response.status, 200);
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "HomeResource - GET /pi", 
  fn: async () => {
      server.logger.info('Testing fibonacci endpoint')
      const param = 8
      const response = await fetch(`http://localhost:1557/?pi=${param}`, {
        method: "GET",
      });
      
      assertEquals(response.status, 200);
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "\b\b\b\b\b     \nStop the server",
  async fn() {
    await server.close();
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
