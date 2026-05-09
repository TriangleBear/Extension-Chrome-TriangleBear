chrome.storage.sync.get("watchedId", ({ watchedId }) => {
  if (watchedId) {
    document.getElementById("idInput").value = watchedId;
    document.getElementById("status").textContent = `Watching ID: ${watchedId}`;
  }
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const id = document.getElementById("idInput").value.trim();
  if (!id) return;
  chrome.storage.sync.set({ watchedId: id }, () => {
    document.getElementById("status").textContent = `Now watching: ${id}`;
  });
});