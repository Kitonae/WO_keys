---
title: "Asset Transfer"
author: Karol
editor: Jacquie
quality-check: JME
---


## Asset Transfer

When going online, optimized assets must be transferred to display servers. WATCHOUT manages this automatically.

### Transfer Process

- **Comparison** – Producer compares local and remote asset versions

- **Queue** – Changed or new assets are queued for transfer

- **Transfer** – Files are sent over the network to each server

- **Verification** – Checksums confirm successful transfer

- **Ready** – Server signals ready when all assets are loaded

### Transfer Status

Monitor transfer progress in the Network window:

- **Blue progress bar** – Transfer in progress

- **Percentage** – Completion status per server

- **Green check** – All assets transferred successfully

- **Red X** – Transfer error occurred

### Optimizing Transfer Speed

- **Use Gigabit or faster** – 1Gbps minimum, 10Gbps recommended

- **Quality switches** – Avoid consumer-grade network equipment

- **Dedicated network** – Separate WATCHOUT traffic from other data

- **Pre-stage assets** – Copy large files manually before going online

### Pre-Staging Assets

For very large shows, pre-stage assets on display servers:

- Copy optimized asset folder to display server

- Place in the designated asset cache location

- When going online, existing assets are used without transfer

### Managing Disk Space

- **Optimized cache** – Located in the show's asset folder

- **Server cache** – Stored on each display server's local drive

- **Cleanup** – Remove unused optimized assets via File menu
