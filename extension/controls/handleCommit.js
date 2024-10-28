function addJiraLinkToCommit() {
    var divsWithCommitMessage = document.getElementsByClassName("CommitHeader-module__commit-message-container--nl1pf");
    if (divsWithCommitMessage.length >= 1) {
        var commitMessage = divsWithCommitMessage[0].textContent;
        
        var jiraIdFound = getJiraID(commitMessage);
        
        if (jiraIdFound == null || jiraIdFound[0] == null) return;
        
        var jiraId = jiraIdFound[0].replaceAll("(", "").replaceAll(")", "");
        
        var nodeButton = document.createElement("img");
        
        divsWithCommitMessage[0].insertBefore(createImageButton(jiraId), divsWithCommitMessage[0].firstChild);
    } else {
        return;
    }
}

function getJiraID(commitMessage) {
    const regex = /\([A-Z,a-z]{3,}-\d{2,}\)/g;
    return commitMessage.match(regex);
    
}

if (window.location.pathname.includes("/commit/")) {
    addJiraLinkToCommit();
}