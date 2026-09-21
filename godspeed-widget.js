// GodSpeed — iOS Home Screen widget (Scriptable)
// -------------------------------------------------------------
// Setup (2 min, free, no App Store account for the app needed):
//  1. Install "Scriptable" from the App Store.
//  2. Open Scriptable → tap + (new script) → paste ALL of this → name it "GodSpeed".
//  3. Long-press your Home Screen → + → search "Scriptable" → add a small
//     or medium widget.
//  4. Long-press the new widget → Edit Widget → Script: GodSpeed.
//  Tapping the widget opens the app. It also refreshes its tagline/date daily.
// -------------------------------------------------------------

const APP_URL  = "https://manthandalmia.github.io/workout/";
const LOGO_URL = "https://manthandalmia.github.io/workout/icon-512.v2.png";

const TAGLINES = [
  "Onwards & upwards ↑",
  "Log it. Own it.",
  "Small reps, big compounding.",
  "Show up today.",
  "Progress > perfection.",
  "Godspeed — go.",
];

(async () => {
  const w = new ListWidget();
  w.url = APP_URL;                       // tap opens the PWA

  const g = new LinearGradient();
  g.colors = [new Color("#16231F"), new Color("#0A0D0C")];
  g.locations = [0, 1];
  w.backgroundGradient = g;
  w.setPadding(16, 16, 16, 16);

  // header: logo + name
  const head = w.addStack();
  head.centerAlignContent();
  try {
    const img = await new Request(LOGO_URL).loadImage();
    const li = head.addImage(img);
    li.imageSize = new Size(30, 30);
    li.cornerRadius = 7;
    head.addSpacer(8);
  } catch (e) { /* offline: skip the logo */ }
  const name = head.addText("GodSpeed");
  name.font = Font.heavySystemFont(17);
  name.textColor = Color.white();

  w.addSpacer(8);

  const now = new Date();
  const tag = w.addText(TAGLINES[now.getDate() % TAGLINES.length]);
  tag.font = Font.mediumSystemFont(12);
  tag.textColor = new Color("#74E8DC");
  tag.minimumScaleFactor = 0.6;
  tag.lineLimit = 2;

  w.addSpacer();

  const df = new DateFormatter();
  df.dateFormat = "EEE d MMM";
  const date = w.addText(df.string(now));
  date.font = Font.systemFont(11);
  date.textColor = new Color("#9CB0AC");

  w.addSpacer(3);
  const cta = w.addText("Tap to log →");
  cta.font = Font.semiboldSystemFont(13);
  cta.textColor = new Color("#FF9C7C");

  // refresh roughly hourly
  w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000);

  if (config.runsInWidget) {
    Script.setWidget(w);
  } else {
    await w.presentSmall();
  }
  Script.complete();
})();
