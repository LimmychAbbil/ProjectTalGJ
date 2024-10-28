const injectedTabs = new Set();

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    const url = details.url;

    if (url.match(/https:\/\/github\.com\/Talend\/.*\/pull\/.*/) || url.match(/https:\/\/github\.com\/Talend\/.*\/commit\/.*/)) {
    // Only inject if not already injected for this tab and URL
        if (!injectedTabs.has(`${details.tabId}-${url}`)) {
            injectedTabs.add(`${details.tabId}-${url}`);
            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                files: ["controls/commonTalGJ.js", "controls/handlePR.js", "controls/handleCommit.js"]
            });
        }
    } else {
        injectedTabs.clear();
    }
}, { url: [{ hostEquals: "github.com" }] });