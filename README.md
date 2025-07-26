## Medical Chain ID
We're building for a future where your health data belongs to you

## Overview
Medical Chain ID is an innovative Web3 healthcare platform that empowers patients with full control over their medical data using blockchain and Internet Computer Protocol (ICP). The system addresses critical fragmentation issues in healthcare by consolidating records across providers and enabling encrypted, permissioned data sharing between patients and doctors.
This project was developed as a full-stack decentralized application with a clear focus on user ownership, interoperability, and real-world healthcare impact. It represents a novel use case of Web3 by applying blockchain not just for asset transfer, but for secure digital identity and medical data governance.

## Value Proposition
- Unique Use Case: Patient-centric medical data ownership using decentralized Web3 technologies.
- Real-World Impact: Reduces diagnostic errors and delays through unified, controlled access to records.
- Monetization Potential: Future revenue through B2B SaaS model for healthcare institutions and premium identity integrations.

## Features
Security & Authentication
- Internet Identity Integration: Passwordless authentication using biometric/passkey.
- Audit Trail: Transparent access logs for compliance and trust.

## Health Data Management
- Unified Records: Includes diagnoses, prescriptions, lab results, and more.
- Granular Access Control: Patients control what data is shared, with whom, and for how long.
- Real-Time Updates: Modify sharing permissions instantly from the dashboard.
System Interoperability
- Modular Architecture: Built to support integration with hospital systems and third-party apps.

## Technical Architecture
### Frontend – User Interface (React + TailwindCSS)

Language: JavaScript (React) + TailwindCSS

Key Components:
App.jsx
- Root component managing page routing and layout structure
main.jsx
- Application root file, responsible for rendering App.jsx
index.css & tailwind.config.js
- TailwindCSS styling
- Responsive and modern UI design

Frontend Responsibilities:
- Interact with the backend canister using JavaScript bindings
- Provide smooth UX for login, viewing, creating, and managing access to records

Configuration & Integration
dfx.json
- Canister configuration for Internet Computer (defines canisters, language, etc.)
package.json
- Dependency management for React frontend and TailwindCSS


### Backend – Smart Contract (Motoko)

Language: Motoko

Key Components:
main.mo – Core Smart Contract:
- Stores all data in a StableBTreeMap (persistence across upgrades/restarts)
- Handles access authorization using Internet Computer’s Principal ID
- Exposes interface to frontend via .did (Candid interface)

Core Responsibilities:
- Secure storage and retrieval of patient medical records
- CRUD operations for medical data
- Access control system based on Principal ID (Internet Identity)

![image alt](https://github.com/sirioes/medchain/blob/cd61bc9c2633384494b72d2b1706256e347ee185/My%20First%20Board%20-%20Frame%201.jpg)

![image alt](https://github.com/sirioes/medchain/blob/cd61bc9c2633384494b72d2b1706256e347ee185/My%20First%20Board%20-%20Frame%202.jpg)

## Getting Started
Before you begin, ensure you have the following installed on your system:
1. Node.js and npm Installation

First, install Node.js which includes npm package manager:
- Visit [Node.js official website](https://nodejs.org/en) and download the LTS version
- Verify installation:
```bash
node --version
npm --version
```
2. DFX (Internet Computer SDK) Setup

We will be using Dfinity's dfx for our development environment.
1.Install DFX: Follow the instructions on [Dfinity's SDK documentation.](https://internetcomputer.org/docs/building-apps/getting-started/install)
2.Verify DFX installation:
```bash
dfx --version
```

## Project Setup
1. Clone the Repository
```bash
git clone <your-repository-url>
cd medical-chain-id
```
2. Install Dependencies
Install all necessary Node.js packages for the frontend:
```bash
npm install
```
3. Start DFX Local Network
... (50 lines left)
