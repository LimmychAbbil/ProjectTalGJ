const injectedTabs = new Set();

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    const url = details.url;

    if (url.match(/https:\/\/github\.com\/Talend\/.*\/pull\/.*/) || url.match(/https:\/\/github\.com\/Talend\/.*\/commit\/.*/)) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["controls/commonTalGJ.js", "controls/handlePR.js", "controls/handleCommit.js"]
        });
    }
}, { url: [{ hostEquals: "github.com" }] });