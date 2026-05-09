chrome.alarms.create("keepAlive", { periodInMinutes: 0.4 });
chrome.alarms.onAlarm.addListener(() => {});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== "NEW_MESSAGE") return;

  const notifId = `messenger-${Date.now()}`;
  
  console.log("[Background] Creating notification:", msg);

  chrome.notifications.create(notifId, {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icon.png"),
    title: "New Message",
    message: msg.preview || "You have a new message",
    priority: 2
  }, (id) => {
    if (chrome.runtime.lastError) {
      console.error("[Background] Notification error:", chrome.runtime.lastError);
      return;
    }
    console.log("[Background] Notification created:", id);
    chrome.storage.local.set({ [id]: msg.conversationId });
  });
});

// When notification is clicked, open/focus the conversation
chrome.notifications.onClicked.addListener((notifId) => {
  chrome.storage.local.get(notifId, (data) => {
    const conversationId = data[notifId];
    const url = conversationId
      ? `https://www.messenger.com/t/${conversationId}`
      : "https://www.messenger.com";

    // Focus existing Messenger tab or open a new one
    chrome.tabs.query({ url: "https://www.messenger.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { active: true, url });
        chrome.windows.update(tabs[0].windowId, { focused: true });
      } else {
        chrome.tabs.create({ url });
      }
    });

    chrome.notifications.clear(notifId);
    chrome.storage.local.remove(notifId);
  });
});