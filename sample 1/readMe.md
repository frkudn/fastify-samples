# 🚀 Deno TypeScript Server Project

## 📦 Project Initialization

### 🐧 Linux Installation

#### Quick Install Options

1. **Using Snap:**
```bash
sudo snap install deno
```

2. **Using Curl:**
```bash
curl -fsSL https://deno.land/install.sh | sh
```

#### Verify Installation
```bash
deno --version
```

#### Project Setup
```bash
# Add Fastify dependency
deno add npm:fastify

# Run the server
deno run --allow-net src/server.ts
```

### 🪟 Windows Installation

#### PowerShell Install:
```powershell
irm https://deno.land/install.ps1 | iex
```

#### Verify Installation
```powershell
deno --version
```

#### Project Setup
```powershell
# Add Fastify dependency
deno add npm:fastify

# Run the server
deno run --allow-net src/server.ts
```

## 🛠 Project Commands

- **Start Server:** `deno run --allow-net src/server.ts`
- **Development Mode:** `deno run --watch --allow-net src/server.ts`
- **Format Code:** `deno fmt`
- **Lint Code:** `deno lint`

## 🔒 Permissions

The server uses `--allow-net` to enable network access. Adjust permissions as needed for your specific use case.

## 📝 Prerequisites

- Deno 1.40.0 or higher
- Basic understanding of TypeScript
- Network access enabled

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

---

**Happy Coding!** 💻✨