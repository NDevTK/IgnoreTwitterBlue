chrome.runtime.onInstalled.addListener(() => {
	chrome.scripting.registerContentScripts([{id: "script", js: ["script.js"], matches: ["https://twitter.com/*"], runAt: "document_start", world: "MAIN"}]);
});