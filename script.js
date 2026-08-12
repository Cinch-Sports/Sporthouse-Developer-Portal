const copyButton = document.querySelector("#copy-code");
copyButton?.addEventListener("click", async () => {
  await navigator.clipboard.writeText(document.querySelector("#code-sample").textContent);
  copyButton.textContent = "Copied";
  window.setTimeout(() => { copyButton.textContent = "Copy"; }, 1800);
});

const encoder = new TextEncoder();
const hex = (buffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
const tester = document.querySelector("#signature-tester");
tester?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const result = document.querySelector("#signature-result");
  try {
    const secret = document.querySelector("#webhook-secret").value;
    const timestamp = document.querySelector("#webhook-timestamp").value.trim();
    const payload = document.querySelector("#webhook-payload").value;
    const provided = document.querySelector("#webhook-signature").value.trim().toLowerCase();
    const signingKey = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
    const key = await crypto.subtle.importKey("raw", signingKey, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${payload}`));
    const matches = provided === `v1=${hex(signature)}`;
    result.textContent = matches ? "Signature verified" : "Signature does not match";
    result.className = matches ? "valid" : "invalid";
  } catch {
    result.textContent = "Signature could not be verified";
    result.className = "invalid";
  }
});
