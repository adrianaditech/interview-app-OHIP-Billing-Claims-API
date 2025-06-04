<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <h1>🏥 Ontario Medical Billing Claims API</h1>

  <p>
    <a class="badge" href="https://nestjs.com/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/NestJS-Active-red?logo=nestjs" alt="NestJS" />
    </a>
    <a class="badge" href="https://www.prisma.io/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma" alt="Prisma" />
    </a>
    <a class="badge" href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Node.js-v18.x-green?logo=node.js" alt="Node.js" />
    </a>
  </p>

  <hr />

  <h2>📋 Overview</h2>
  <p>
    This backend service manages <strong>Ontario medical billing claims</strong> for clinics using <strong>OHIP service codes</strong> and their corresponding <strong>OMA-approved pricing</strong>.
  </p>
  <p>
    Built with <strong>NestJS</strong>, <strong>Prisma</strong>, and <strong>SQLite/MySQL</strong> (configurable), it exposes REST APIs to:
  </p>
  <ul>
    <li>Create billing claims</li>
    <li>List/filter claims</li>
    <li>Update claim statuses</li>
    <li>Retrieve OHIP service codes</li>
    <li>Generate daily summary reports</li>
  </ul>

  <hr />

  <h2>🚀 Features</h2>
  <ul>
    <li>✅ Clean modular architecture with Repository/Service patterns</li>
    <li>✅ Input validation with <code>class-validator</code> and DTOs</li>
    <li>✅ Auto-generated API docs with <strong>Swagger</strong></li>
    <li>✅ Database schema using Prisma ORM</li>
    <li>✅ Seeded OHIP codes with OMA pricing</li>
    <li>✅ Error handling and meaningful HTTP responses</li>
  </ul>

  <hr />

  <h2>🛠️ Setup &amp; Installation</h2>

  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js v18+</li>
    <li>npm or yarn</li>
    <li>(Optional) MySQL server if you want to switch from SQLite</li>
  </ul>

  <h3>Clone repo</h3>
  <pre><code>git clone https://github.com/pSkywalker/interview-app-OHIP-Billing-Claims-API.git
cd interview-app-OHIP-Billing-Claims-API
</code></pre>

  <h3>Install dependencies</h3>
  <pre><code>npm install
# or
yarn install
</code></pre>

  <h3>Configure environment</h3>
  <p>Create <code>.env</code> in root with:</p>
  <pre><code>DATABASE_URL="file:./dev.db"       # For SQLite (default)
# or
# DATABASE_URL="mysql://user:password@localhost:3306/dbname"  # For MySQL
PORT=3000
</code></pre>

  <h3>Run migrations &amp; seed data</h3>
  <pre><code>npx prisma migrate dev --name init
npm run seed
</code></pre>

  <h3>Start development server</h3>
  <pre><code>npm run start:dev
</code></pre>
  <p>Access API at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a><br />
  Swagger UI at <a href="http://localhost:3000/api" target="_blank">http://localhost:3000/api</a></p>

  <hr />

  <h2>📚 API Endpoints</h2>
  <table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>POST</td><td><code>/claims</code></td><td>Create a new billing claim</td></tr>
    <tr><td>GET</td><td><code>/claims</code></td><td>List claims with optional filters</td></tr>
    <tr><td>PATCH</td><td><code>/claims/:id/status</code></td><td>Update status of a claim</td></tr>
    <tr><td>GET</td><td><code>/service-codes</code></td><td>Retrieve OHIP service codes</td></tr>
    <tr><td>GET</td><td><code>/service-codes/{code}</code></td><td>Retrieve details of a specific OHIP service code</td></tr>
    <tr><td>GET</td><td><code>/reports/summary</code></td><td>Get daily summary report</td></tr>
  </tbody>
</table>

  <hr />

  <h2>🧩 Project Structure</h2>
  <pre><code>src/
├── claims/                # Claim module (controller, service, dto, repo)
├── ohip-codes/            # OHIP codes module
├── reports/               # Report generation module
├── common/                # Shared utilities, exceptions, pipes
├── main.ts                # App bootstrap with validation and Swagger
├── app.module.ts          # Root module
prisma/
├── schema.prisma          # Prisma schema file
</code></pre>

  <hr />

  <h2>📝 Design Decisions</h2>
  <ul>
    <li><strong>Repository/Service Pattern</strong> for clear separation of concerns</li>
    <li><strong>DTOs + Validation Pipes</strong> for robust input validation</li>
    <li>Prisma for <strong>type-safe database access</strong> and easy migrations</li>
    <li>Swagger to keep API docs always up to date</li>
    <li>SQLite default for quick dev, easily switched to MySQL or Postgres</li>
  </ul>

  <hr />

  <h2>📄 License</h2>
  <p>MIT License © 2024 pSkywalker</p>

  <hr />

  <h2>🙋‍♂️ Author</h2>
  <p>pSkywalker</p>

  <hr />
