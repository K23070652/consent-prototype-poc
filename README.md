# Consent Prototype — React Proof of Concept

A working implementation of a pre-post consent feature for user-to-user consent in social media content sharing. Accompanies a Figma prototype and thematic analysis as part of a final-year Computer Science dissertation at King's College London.

---

## Purpose and Scope

This implementation serves as a **technical probe**: a working demonstration that the proposed consent interaction can be realised in practice beyond static mockups. It is deliberately narrow in scope, implementing only one feature — the Pre-Post Consent Request — from a broader five-feature Figma prototype.

The purpose of the proof of concept is twofold:

1. To demonstrate that the core design feature from the thematic analysis can be implemented as working software
2. To surface implementation-level insights that static design artefacts cannot reveal — such as state management, interaction timing, and the two-sided nature of the consent flow

The primary design contribution of the dissertation is the thematic analysis and the Figma prototype. This React implementation is a complementary technical artefact, not the main deliverable.

---

## Feature Implemented

**Pre-Post Consent Request** — a feature that allows a user posting a photo involving others to send a private consent request to each tagged user. The post only publishes once all tagged users have responded. Subjects can approve, decline with a pre-written reason, or request changes to the content.

The feature directly addresses one of the most consistent findings from fourteen semi-structured interviews conducted for this dissertation: eight of fourteen participants independently proposed some version of a pre-post consent mechanism when asked how platforms could better support user-to-user consent.

---

## Running the Project

**Requirements:** Node.js v18 or higher, npm.

Clone the repository and run:

```
npm install
npm run dev
```

The development server will start at `http://localhost:5173` (or the next available port). Open the URL in a modern browser to view the prototype.

To stop the development server, press `Ctrl + C` in the terminal.

---

## Using the Prototype

At the top of the interface, a toggle switches between two views:

- **Poster (Manav)** — the user who wants to publish a photo involving others
- **Subject (Sarah)** — a user tagged in that photo whose consent is being requested

State is shared between the two views, so actions taken on one side update the other in real time. This design choice was made to allow the two-sided nature of the feature to be demonstrated within a single browser window, which would otherwise require two separate user accounts.

### Demonstration Flow

1. On the Poster view, compose a post and tap **Send Request**
2. Switch to the Subject view using the toggle at the top — the incoming consent request will be visible
3. Open the request, review the post, and select a response (Approve, Decline, or Request Change)
4. Switch back to the Poster view — the response is reflected in the pending status
5. Repeat for remaining subjects to see the full flow through to either all-approved (post published) or declined (fallback options)

---

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** as the build tool
- **Tailwind CSS** for styling
- **Local state management** using React's built-in `useState` and `useReducer` hooks
- **No backend, database, or external APIs**

The stack was chosen to prioritise clarity and demonstrability. More complex state management, routing, or backend infrastructure would have added scope without contributing to the research thesis.

---

## Scope Limitations

The following are deliberately out of scope for this proof of concept, either because they fall outside the dissertation's research focus or because they would add engineering complexity without contributing to the design contribution:

- **No persistence** — application state resets on page refresh
- **No authentication** — users are hardcoded as Manav (Poster) and Sarah (Subject)
- **No real face detection** — the "3 people detected" count is static; in a production implementation this would be handled by computer vision
- **No backend or server** — all data is mocked and lives in the browser
- **Mobile viewport only** — desktop responsiveness is not implemented, as the prototype targets mobile social media contexts
- **Only one of five prototype features is implemented** — the remaining four features (Consent Withdrawal & Post-Hoc Editing, Proportionate Response Options, Memory Re-Consent, and Consent Bar States) are demonstrated in the Figma prototype rather than in code

These scope choices are discussed in greater depth in the Implementation and Conclusions chapters of the dissertation report.

---

## Project Structure

```
src/
├── App.tsx                    Main app component, state management, view toggle
├── types.ts                   TypeScript type definitions
├── data/
│   └── mockData.ts            Hardcoded subjects, sample content
├── components/
│   ├── ViewToggle.tsx         Toggle between Poster and Subject views
│   ├── shared/                Reusable UI components
│   ├── poster/                Screens for the Poster view
│   └── subject/               Screens for the Subject view
└── index.css                  Global styles and Tailwind imports
```

Each component has a single clear responsibility and is designed to be readable without extensive commentary.

---

## Development Approach

This prototype was developed using an empirical, research-led approach. The technical implementation began as a direct translation of the core themes identified during the literature review and user interviews. Instead of adopting a heavy, top-down engineering methodology, the coding process was iterative and exploratory—allowing the early conceptual work and human-centric design goals to dictate the state management and UI flow. This ensured that the final codebase remained deeply grounded in solving the social complexities of digital consent.

---

## Related Artefacts

This proof of concept is one of three artefacts produced by the dissertation:

1. **Thematic analysis** of fourteen semi-structured interviews, producing four themes and twelve sub-themes on user-to-user consent in social media
2. **Figma prototype** demonstrating five proposed consent-supporting features in a high-fidelity interactive mobile prototype
3. **React proof of concept** (this repository) demonstrating technical feasibility of the core feature

The full dissertation report, design rationale, and evaluation discussion are provided as the primary submission.

---

## Author

**Manav Sukheja** (K23070652)
BSc Computer Science
King's College London

Supervisor: Dr Kovila Coopamootoo
Academic Year 2025–26

---
