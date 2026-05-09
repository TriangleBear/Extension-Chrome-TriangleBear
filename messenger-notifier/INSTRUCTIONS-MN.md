# Messenger Notifier Extension - Usage Instructions

## Overview
The Messenger Notifier is a Chrome extension that monitors specific Facebook Messenger conversations for new messages and displays desktop notifications when new messages arrive.

## Setup and Usage

### Step 1: Configure the Conversation to Monitor
1. Click on the Messenger Notifier extension icon in your Chrome toolbar (it should show a small icon, possibly a default puzzle piece if no custom icon is set).
2. In the popup window that appears, you'll see a field labeled "Conversation ID to watch:".
3. You need to enter the Conversation ID of the chat you want to monitor for new messages.

### Step 2: Get the Conversation ID
1. Open Facebook Messenger in a new tab (https://www.messenger.com).
2. Navigate to the conversation you want to monitor.
3. Look at the URL in your browser's address bar. It should look something like: `https://www.messenger.com/t/1414667846933932`
4. The number after `/t/` (in this example, `1414667846933932`) is the Conversation ID.
5. Copy this number and paste it into the "Conversation ID to watch" field in the extension popup.

### Step 3: Save the Configuration
1. Click the "Save" button in the extension popup.
2. You should see a confirmation message like "Now watching: [ID]" indicating the ID has been saved.

### Step 4: Using the Extension
1. Keep the Messenger tab open in the background (the extension needs access to the Messenger page to monitor messages).
2. The extension will automatically check for new messages every 3 seconds.
3. When a new message arrives in the monitored conversation:
   - A desktop notification will appear with the sender's name and message preview.
   - The notification will have the title "New Message" and show the message preview.
4. Click on the notification to:
   - Open or focus the Messenger tab.
   - Navigate directly to the conversation.
   - Clear the notification.

## Important Notes
- The extension only monitors one conversation at a time. To monitor multiple conversations, you would need to modify the extension or use multiple instances.
- Make sure notifications are enabled for Chrome (in browser settings).
- The extension requires the Messenger tab to be open and loaded for monitoring to work.
- If you encounter issues, try refreshing the Messenger page or reloading the extension.
- The extension uses Chrome's storage API to remember your watched conversation ID between browser sessions.

## Troubleshooting
- **No notifications appearing**: Ensure the Messenger tab is open and the conversation ID is correctly set. Check that Chrome notifications are enabled.
- **Wrong conversation**: Double-check the Conversation ID from the URL.
- **Extension not working**: Try reloading the extension in `chrome://extensions/` or refreshing the Messenger page.
- **Permission issues**: Make sure the extension has the required permissions (notifications, storage, activeTab).

## Privacy
This extension only monitors the specific conversation ID you configure and does not access or store any other Messenger data beyond what's necessary for notifications.