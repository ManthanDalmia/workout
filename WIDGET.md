# GodSpeed — iOS Home Screen widget

iOS only lets **native apps** publish Home Screen widgets, so a PWA can't add one
directly. The easy workaround is the free **Scriptable** app, which runs a small
JavaScript widget on your Home Screen. The script is [`godspeed-widget.js`](godspeed-widget.js).

## Install (~2 min)

1. Install **Scriptable** from the App Store.
2. Open Scriptable → tap **+** (new script) → paste everything from
   `godspeed-widget.js` → name it **GodSpeed** → Done.
3. Long-press the Home Screen → **+** → search **Scriptable** → add a **small**
   (or medium) widget.
4. Long-press the new widget → **Edit Widget** → **Script → GodSpeed**.

Tapping the widget opens GodSpeed. It shows the logo, a rotating tagline, the
date, and a "Tap to log" prompt, refreshing about hourly.

## Want live stats on the widget? (streak / this week / muscles due)

That needs the widget to read your data, which is private behind Google sign-in —
so it requires a tiny bit of backend so the widget can fetch a **read-only summary**
without logging in. Two options:

- **Cloud Function + token** — the app publishes a small summary
  (`{streak, weekSessions, dueMuscles}`) to a public, unguessable URL; the widget
  fetches that JSON. Needs a Firebase Function (Blaze plan) or any tiny endpoint.
- **Public summary doc + Firestore rules** — the app writes the summary to a doc at
  an unguessable path and a rule allows public read of *only* that doc; the widget
  reads it via the Firestore REST API.

Ask and I'll scaffold whichever you prefer and walk you through the setup.
