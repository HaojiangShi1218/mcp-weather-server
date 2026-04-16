import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  console.log("Starting MCP test client...\n");

  const transport = new StdioClientTransport({
    command: "node",
    args: ["/app/server/dist/index.js"],
  });

  const client = new Client({
    name: "test-client",
    version: "1.0.0",
  });

  await client.connect(transport);
  console.log("Connected to MCP server.\n");

  console.log("Available Tools:");
  const tools = await client.listTools();
  for (const tool of tools.tools) {
    console.log(`  - ${tool.name}: ${tool.description}`);
  }
  console.log();

  console.log("Available Resources:");
  const resources = await client.listResources();
  for (const resource of resources.resources) {
    console.log(`  - ${resource.uri}: ${resource.name}`);
  }
  console.log();

  console.log("Reading cities-list resource:");
  const citiesResource = await client.readResource({
    uri: "weather://cities",
  });
  console.log(`  ${citiesResource.contents[0].text}`);
  console.log();

  const testCities = ["Boston", "Miami", "London"];
  for (const city of testCities) {
    console.log(`Calling get_weather for "${city}":`);
    const result = await client.callTool({
      name: "get_weather",
      arguments: { city },
    });
    console.log(`  ${result.content[0].text}`);
    console.log();
  }

  await client.close();
  console.log("Test complete. Client disconnected.");
}

main().catch(console.error);
