import { applications } from "../data/content.js";

export function createApplicationNumber() {
  const seed = Math.floor(1200 + Math.random() * 380);
  return `OPC202600${seed}`;
}

export function filterApplications(status) {
  if (!status || status === "全部状态") {
    return applications;
  }

  return applications.filter((application) => application.status === status);
}

export const reservedApiModules = [
  "auth.sms",
  "applications.draft",
  "applications.submit",
  "materials.uploadToken",
  "admin.review",
  "admin.export",
  "notifications.emailSms",
  "audit.logs"
];
