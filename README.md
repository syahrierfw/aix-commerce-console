# AIX Commerce Console

Standalone interactive mockup for the AIX Phase III kiosk journey:

- Thailand traveller bundle: consent → authorised decision → eSIM fulfilment → voucher → metering → settlement
- Account takeover prevention: buyer intent → sovereign network signals → trusted risk outcome → metering → settlement
- Journey Builder: a northbound buyer composes approved supplier products into one governed API or SDK integration. Consent, policy, evidence, metering and settlement are enforced at runtime.

## What the console demonstrates

- **Southbound onboarding:** suppliers register a sovereign gateway, governed product contract, sandbox, rate card and settlement profile.
- **Northbound onboarding:** buyers register an accountable application, declared purpose, consent experience, wallet and publish target.
- **Journey Builder:** only approved decision and action products can be composed; raw operator data cannot be added to a flow.
- **Evidence and metering:** the demonstrator records accepted decision/action outcomes, rather than charging for every technical API call.

## Run locally

```bash
npm install
npm run dev
```

Open the localhost URL shown by Vite. Use the scenario selector in the upper-right corner and the left navigation to guide the demo.

This is a front-end demonstrator only. All commercial values and transaction records are illustrative sandbox data.
