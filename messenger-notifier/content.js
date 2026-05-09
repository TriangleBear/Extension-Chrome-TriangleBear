let intervalId = null;
let wasUnread = false;
let lastPreview = "";

function getCurrentConversationId() {
  const match = location.href.match(/\/t\/(\d+)/);
  return match ? match[1] : null;
}

function isConversationUnread(link) {
  // Messenger adds 'xudqn12' class to the name span only when unread
  const nameSpan = link.querySelector('span.xudqn12');
  return !!nameSpan;
}

function checkForNewMessages() {
  try {
    chrome.storage.sync.get("watchedId", ({ watchedId }) => {
      if (chrome.runtime.lastError) { clearInterval(intervalId); return; }
      if (!watchedId) return;

      const links = document.querySelectorAll('a[href*="/t/"]');

      for (const link of links) {
        const href = link.href || "";
        const match = href.match(/\/t\/(\d+)/);
        if (!match || match[1] !== watchedId) continue;

        const isUnread = isConversationUnread(link);
        const currentConvId = getCurrentConversationId();
        const isViewingConv = currentConvId === watchedId;

        const spans = [...link.querySelectorAll("span")].filter(s => s.textContent.trim());
        const name = spans[0]?.textContent.trim() || "Someone";
        const preview = spans[2]?.textContent.trim() || spans[1]?.textContent.trim() || "";

        const OWN_PREFIXES = ["You:", "You sent", "You reacted", "You shared", "You missed"];
        const isOwn = OWN_PREFIXES.some(p => preview.startsWith(p));

        console.log("[Notifier] isUnread:", isUnread, "wasUnread:", wasUnread, "isOwnMessage:", isOwn, "viewingConv:", isViewingConv);

        // Detect new message if unread badge appears, or preview text changes
        if ((isUnread && !wasUnread && !isOwn) || (!isViewingConv && preview && preview !== lastPreview && !isOwn)) {
          console.log("[Notifier] Firing:", name, preview);
          try {
            chrome.runtime.sendMessage({ 
                type: "NEW_MESSAGE", 
                name, 
                preview,
                message: preview,
                conversationId: watchedId
            });
          } catch (e) {
            location.reload();
          }
        }

        wasUnread = isUnread;
        lastPreview = preview;
        break;
      }
    });
  } catch (e) {
    console.log("[Notifier] Error:", e.message);
    clearInterval(intervalId);
    location.reload();
  }
}

intervalId = setInterval(checkForNewMessages, 3000);