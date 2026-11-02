import { QUESTIONNAIRE_VERSION } from "../data/dgtiResearch.js";

const TOKEN_KEY = "dgti-anonymous-statistics-token";
function getToken() {
  let token = localStorage.getItem(TOKEN_KEY);
  if (!/^[a-f0-9]{64}$/.test(token || "")) {
    token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (v) => v.toString(16).padStart(2, "0")).join("");
    localStorage.setItem(TOKEN_KEY, token);
  }
  return token;
}

export function createSubmissionId() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (v) => v.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export async function callCommunityApi(endpoint, { method = "GET", data } = {}) {
  const base = new URL(import.meta.env.BASE_URL, window.location.href);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(new URL(`api/${endpoint}`, base), {
      method,
      headers: method === "GET" ? {} : { "Content-Type": "application/json" },
      body: method === "GET" ? undefined : JSON.stringify({ ...data, token: getToken(), version: QUESTIONNAIRE_VERSION }),
      signal: controller.signal
    });
    if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("统计服务暂未连接，请稍后再试。测试结果仍保存在本机。");
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "暂时未保存成功，请稍后再试");
    return result;
  } catch (error) {
    if (error.name === "AbortError" || error instanceof TypeError) throw new Error("暂时连接不上统计服务，请稍后重试。");
    throw error;
  } finally { window.clearTimeout(timeout); }
}
