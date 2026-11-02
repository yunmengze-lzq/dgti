import { resolve } from "node:path";
import { openStore } from "../server/store.js";

const store = openStore(process.env.DGTI_DB_PATH || resolve("var/dgti.sqlite"));
try { console.log(JSON.stringify({ statistics: store.statistics(), feedback: store.exportFeedback() }, null, 2)); }
finally { store.close(); }
