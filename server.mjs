// Hostinger / shared-hosting wrapper — guarantees HOST=0.0.0.0 binding.
// Keep this file at the project root and point Hostinger's
// "Application startup file" to: server.mjs

if (!process.env.HOST) process.env.HOST = '0.0.0.0';
if (!process.env.PORT) process.env.PORT = '3000';

await import('./dist/server/entry.mjs');
