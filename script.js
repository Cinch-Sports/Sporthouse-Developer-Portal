const copyButton = document.querySelector("#copy-code");
copyButton?.addEventListener("click", async () => {
  await navigator.clipboard.writeText(document.querySelector("#code-sample").textContent);
  copyButton.textContent = "Copied";
  window.setTimeout(() => { copyButton.textContent = "Copy"; }, 1800);
});
