# Candle Fort

Starter structure for the Candle Fort storefront and admin dashboard. The pages
are intentionally minimal; connect them to the Firebase services as the shop is
built out.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local` with the Firebase web app settings from your Firebase
project. These client settings are intended to be public; never put Firebase
Admin SDK credentials or other private secrets in this frontend.

## Firebase setup

Enable Email/Password sign-in, create a Firestore database, and enable Storage
in the Firebase console. Deploy `firestore.rules` and `storage.rules` before
using the app with real data. After installing and signing in to the Firebase
CLI, deploy the configured rules with:

```sh
firebase deploy --only firestore:rules,storage
```

Admin pages check the trusted `admin` custom claim, and Firebase rules enforce
the same claim for privileged reads and writes. Set that claim only from trusted
backend code using the Firebase Admin SDK; this project does not create admin
accounts or assign roles in the browser.

The storefront supports customer email/password accounts, a persistent cart,
and checkout with Cash on Delivery (`cod`) or manual payment (`manual`). Manual
payment requires a transaction reference and may include an image or PDF
receipt. Checkout saves delivery details and the order to Firestore. Customer
accounts must be enabled in Firebase Authentication before sign-up can be used.

## Project layout

- `src/pages/`: storefront and admin page components
- `src/components/layout/`: shared storefront and admin layouts
- `src/context/`: authentication and in-memory cart state
- `src/services/`: Firebase initialization and service operations
- `src/routes/`: protected admin route
- `firestore.rules`, `storage.rules`: starter security rules
