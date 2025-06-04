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
  <p>Access API at <a href="http://localhost:4000" target="_blank">http://localhost:4000</a><br />
  Swagger UI at <a href="http://localhost:4000/api" target="_blank">http://localhost:4000/api</a></p>

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
    <tr><td>GET</td><td><code>claims/reports/summary</code></td><td>Get daily summary report</td></tr>
    <tr><td>GET</td><td><code>/service-codes</code></td><td>Retrieve OHIP service codes</td></tr>
    <tr><td>GET</td><td><code>/service-codes/{code}</code></td><td>Retrieve details of a specific OHIP service code</td></tr>
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

<h2>🧩 Scalability & Extensibility</h2>

<p>
  This backend is built with modularity and clean separation of concerns, enabling future billing enhancements with minimal friction. The architecture supports easy implementation of:
</p>

<h3>🔒 Private Pay Support</h3>
<p>
  Add private billing support by extending the <code>Claim</code> model with a <code>paymentType</code> field:
</p>

<pre><code>enum PaymentType {
  OHIP = 'OHIP',
  PRIVATE = 'PRIVATE',
}
</code></pre>

<pre><code>async createClaim(dto: CreateClaimDto, paymentType: PaymentType) {
  const adapter = this.factory.getAdapter(paymentType);
  return adapter.createClaim(dto);
}
</code></pre>

<p>This allows routing claims through different pricing or approval workflows.</p>

<h3>💰 Fee Modifiers (After-hours, Emergency, etc.)</h3>
<p>
  To support OHIP billing modifiers or premiums, a new relation model can be introduced:
</p>

<pre><code>model FeeModifier {
  id          Int     @id @default(autoincrement())
  claimId     Int
  description String
  amount      Float
  claim       Claim   @relation(fields: [claimId], references: [id])
}
</code></pre>

<p>
  Modifiers could be stacked and calculated dynamically during submission or reporting.
</p>

<h3>🧱 Modular Domain-Driven Design</h3>
<ul>
  <li>Each domain (<code>claims</code>, <code>ohip</code>, <code>reports</code>) has its own module, DTOs, repository, and service.</li>
  <li>Easy to introduce new billing domains (e.g. <code>insurance</code>, <code>invoice</code>, <code>patients</code>) as discrete modules.</li>
</ul>

<h3>🌐 API Contracts via DTOs</h3>
<ul>
  <li>DTOs ensure flexible request/response shaping.</li>
  <li>Validation pipes support seamless extension without weakening input constraints.</li>
</ul>

<hr />

<p><strong>💡 With this structure, it's easy to extend the system to support multiple payers, rule-based pricing, and future billing regulation changes.</strong></p>

<hr />

  <h2>🙋‍♂️ Author</h2>
  <p>pSkywalker</p>

  <hr />
