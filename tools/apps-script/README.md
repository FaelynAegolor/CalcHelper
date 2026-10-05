# Sending the activity summary to a Google Sheet

About 10 minutes, once. Until you finish step 5 nothing is sent anywhere and the
site behaves exactly as it did before.

## 1. Make the Sheet

Create a new Google Sheet in your own Drive. Call it whatever you like. Don't share
it with anyone — its Google permissions are the thing keeping it private, so leave it
as "Only you".

You don't need to add any tabs or headers. The script creates `Summary`, `Daily` and
`Sections` the first time data arrives.

## 2. Add the script

In that Sheet: **Extensions → Apps Script**. Delete the sample `myFunction` stub,
paste in the whole of [`Code.gs`](Code.gs), and save.

## 3. Set a token

At the top of the script, replace

```js
var TOKEN = 'change-me-to-a-long-random-string';
```

with a long random string of your own — mash the keyboard, 30+ characters. Keep a
copy; you need the identical string in step 5.

The token stops anyone who finds the endpoint from dropping junk rows into your
Sheet. It is **not** a secret: it ends up in the site's JavaScript, which is public.
That's fine — the endpoint can only ever write. Nobody can read your Sheet with it.

## 4. Deploy it

**Deploy → New deployment**, then:

- the gear next to "Select type" → **Web app**
- *Execute as*: **Me**
- *Who has access*: **Anyone**  ← it has to be this, or the browser can't post to it
- **Deploy**

Google will ask you to authorise it. You'll get an "unverified app" warning, because
it's your own private script — **Advanced → Go to (your project)** → **Allow**.

Copy the **Web app URL** it gives you. It ends in `/exec`.

> "Anyone" sounds alarming. It means anyone can *send* to this URL, not that anyone
> can see your Sheet. The script only appends rows; there is no code path that reads
> anything back out.

## 5. Point the site at it

Edit [`js/sync-config.js`](../../js/sync-config.js) in this repo:

```js
window.CH.syncConfig = {
  ENDPOINT: 'https://script.google.com/macros/s/AKfy...../exec',
  TOKEN: 'the-same-long-random-string-from-step-3',
  MIN_INTERVAL_MIN: 10
};
```

Commit and push. GitHub Pages redeploys in a minute or two.

## 6. Check it works

Open the site, do one exercise, then open the activity view (type `kestrel`) and
press **Sync now**. It will tell you what happened:

| It says | What it means |
|---|---|
| Sheet updated. | Working. Go and look at the Sheet. |
| The Sheet refused it: bad token | The token in `sync-config.js` doesn't match `Code.gs`. |
| Sent — check the Sheet. | It went, but the reply wasn't readable. Normal for some setups — look at the Sheet to confirm. |
| Could not reach the endpoint. | Wrong URL, or the deployment isn't set to "Anyone". |

## What actually gets sent

Counts and ids only:

- minutes, sittings, streaks, active days
- exercises attempted / marked right, hints used, solutions revealed
- first-try accuracy, per section
- which exercises she is stuck on, by id
- the last 14 days of daily minutes

**Never** an answer she typed, never her written working, never anything else from
the device. Those stay in the browser.

## Changing or stopping it

- **Stop sending:** set `ENDPOINT` back to `''` and push. Nothing more is sent.
- **Change what's collected:** `payload()` in [`js/sync.js`](../../js/sync.js) builds
  the object field by field, on purpose — edit there and add the matching column to
  the headers in `Code.gs`.
- **Update the script:** after editing `Code.gs`, you must **Deploy → Manage
  deployments → edit (pencil) → Version: New version → Deploy**. Saving alone does
  not update the live URL.

## How often it sends

At most once every `MIN_INTERVAL_MIN` minutes while she is working, plus once when
the tab is closed or backgrounded, and only when something has actually changed. A
sync is a single small POST; it is fire-and-forget and never blocks or interrupts
anything on the page, including when the device is offline.
