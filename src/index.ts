import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

server.tool(
  "get_weather",
  "Get the current weather for a city",
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    const weatherData: Record<string, { temp: number; condition: string }> = {
      "boston": { temp: 45, condition: "Cloudy" },
      "san francisco": { temp: 62, condition: "Foggy" },
      "new york": { temp: 50, condition: "Rainy" },
      "seattle": { temp: 48, condition: "Overcast" },
      "miami": { temp: 82, condition: "Sunny" },
    };

    const cityLower = city.toLowerCase();
    const weather = weatherData[cityLower];

    if (!weather) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Weather data not available for "${city}". Available cities: ${Object.keys(weatherData).join(", ")}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: `Weather in ${city}: ${weather.temp}°F, ${weather.condition}`,
        },
      ],
    };
  }
);

server.resource(
  "cities-list",
  "weather://cities",
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/plain",
          text: "Available cities: Boston, San Francisco, New York, Seattle, Miami",
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Weather MCP Server running on stdio");
