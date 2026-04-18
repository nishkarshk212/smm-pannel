import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import readline from "readline";

const API_ID = 30521437;
const API_HASH = "9b01f57a7511278377202d843c9bfc34";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

async function generateSessionString() {
  console.log("Starting Telegram session generation...\n");

  const stringSession = new StringSession("");
  const client = new TelegramClient(stringSession, API_ID, API_HASH, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await askQuestion("Please enter your phone number (with country code, e.g., +1234567890): "),
    password: async () => await askQuestion("Please enter your 2FA password (if enabled): "),
    phoneCode: async () => await askQuestion("Please enter the code you received from Telegram: "),
    onError: (err) => console.log(err),
  });

  console.log("\n✅ Successfully authenticated!");
  console.log(`\n📋 Your Session String:\n${client.session.save()}`);
  console.log("\n⚠️  Save this session string securely. It provides access to your Telegram account!");
  
  rl.close();
}

generateSessionString().catch(console.error);
