---
title: 'Why DNS Security Is the New Perimeter'
description: 'A technical primer on why DoH, DoT, and RPZ are the foundation of modern infrastructure security.'
pubDate: 2026-02-04
author: Head of Security
---

For decades, perimeter security meant firewalls. In a cloud-first, edge-first, BYOD world, that perimeter no longer exists in any meaningful sense.

The new perimeter is the **resolver**. Every request — every malware callback, every phishing redirect, every tracker — passes through DNS.

Three technologies make resolver-layer protection viable in 2025:

1. **DNS-over-HTTPS (DoH)** — encrypts queries in transit
2. **DNS-over-TLS (DoT)** — same protection over a dedicated port
3. **Response Policy Zones (RPZ)** — programmable response filtering

Combine these and you get a control plane that filters threats *before* they touch your network — without inspecting endpoint traffic, without installing agents, and without the surveillance tax.
