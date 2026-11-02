import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const directory = dirname(process.env.DGTI_DB_PATH || resolve("var/dgti.sqlite"));
mkdirSync(directory, { recursive: true, mode: 0o700 });
const destination = join(directory, "admin-key.txt");
if (!existsSync(destination)) writeFileSync(destination, randomBytes(32).toString("hex"), { mode: 0o600, flag: "wx" });
console.log(`Management key file: ${destination}\nOpen this local file to sign in. The key was not printed or added to Git.`);
