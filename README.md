# MCP Weather Server

A simple MCP (Model Context Protocol) server built with TypeScript that exposes a weather tool and a cities resource. Created as part of the CSYE6225 Lecture 14 lab on Linux Containers, Docker, Docker Compose, and Devcontainers.

## Overview

The MCP server communicates over stdio and provides:

- **`get_weather` tool** — returns simulated weather data for a given city
- **`weather://cities` resource** — lists all supported cities (Boston, San Francisco, New York, Seattle, Miami)

## Prerequisites

- Node.js v18+
- Docker Desktop
- VS Code with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension

## Getting Started

### Local Development

```bash
npm install
npm run build
npm run start
```

### Run with Docker

```bash
docker build -t mcp-weather-server .
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | docker run -i --rm mcp-weather-server
```

### Run with Docker Compose

```bash
docker compose up --build
```

This builds the server and runs a test client that lists tools/resources and calls `get_weather` for Boston, Miami, and London.

### Devcontainer

Open the project in VS Code and run **Dev Containers: Reopen in Container** from the Command Palette. The devcontainer includes Docker-in-Docker support, so you can build images and run Compose from inside the container.

## Project Structure

```
mcp-weather-server/
├── .devcontainer/
│   └── devcontainer.json
├── src/
│   └── index.ts
├── test-client/
│   ├── client.js
│   └── package.json
├── .dockerignore
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.test
├── package.json
├── tsconfig.json
└── README.md
```
