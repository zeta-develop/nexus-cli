# Nexus CLI Tool

A command-line interface tool for managing NexusBilling and its modules.

## Installation

```bash
npx nexus
```

## Usage

When you run the CLI, you'll need:
1. Your API key
2. Your user ID

Example API keys:
- User 1: user1-api-key-example
- User 2: user2-api-key-example

The CLI will present a menu with the following options:
- Install NexusBilling
- Install Modules
- Update NexusBilling
- Update Modules

When selecting module installation or updates, the CLI will fetch available modules based on your user credentials.

## API Documentation

The CLI uses the following API endpoint:
- Base URL: https://kzmfs7kn0ovlpqiubhw4.lite.vusercontent.net
- Endpoint: /api/user-modules
- Method: GET
- Required Query Parameter: userId
- Required Header: x-api-key