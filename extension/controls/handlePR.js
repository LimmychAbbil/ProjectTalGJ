const talendJiraURL = "https://jira.talendforge.org/browse/";
const qlikJiraURL = "https://qlik-dev.atlassian.net/browse/";
const migrationDate = new Date("2024-10-25");

function getCreatedDate() {
    var prHeaderElement = document.getElementsByClassName("timeline-comment-header clearfix d-flex");
    if (prHeaderElement.length >= 1) {
        var createdDateTimestamp = prHeaderElement[0].getElementsByTagName("relative-time")[0].getAttribute("datetime");
        return new Date(createdDateTimestamp);
    } else {
        return;
    }
}
function addJiraLink() {
    var divLinesWithBranches = document.getElementsByClassName("flex-auto min-width-0 mb-2");
    var targetDiv = null;
    if (divLinesWithBranches.length >= 1) {
        targetDiv = divLinesWithBranches[0];
        var divWithBranchName = targetDiv.getElementsByClassName("commit-ref css-truncate user-select-contain expandable head-ref")[0];
        
        var branchName = divWithBranchName.textContent;
        
        var jiraIdFound = getJiraID(branchName)[0];
        
        if (jiraIdFound == null) return;
        
        var jiraId = jiraIdFound.replaceAll("/", "").replaceAll("_", "").replace(/-$/, "");
        
        var nodeButton = document.createElement("img");

        var jiraURL = 
        targetDiv.appendChild(createImageButton(jiraId));
    } else {
        return;
    }
}



function getJiraID(branchName) {
    const regex = /(\/|-|_)[A-Z,a-z]{3,}-\d{2,}(_|-|\/|$)/g;
    return branchName.match(regex);
    
}

function createImageButton(ticketName) {
    var nodeButton = document.createElement("a");
    nodeButton.style = "vertical-align: middle";
    var imgNode = document.createElement("img");
    if (getCreatedDate() < migrationDate || (ticketName.startsWith("TDI") || ticketName.startsWith("TUP"))) {
        imgNode.src = chrome.runtime.getURL('icons/TalJ_16.png');
        nodeButton.href = talendJiraURL + ticketName;
    } else {
        imgNode.src = chrome.runtime.getURL('icons/QlkJ_16.png');
        nodeButton.href = qlikJiraURL + ticketName;
    }
    
    nodeButton.appendChild(imgNode);
    
    return nodeButton;
}

addJiraLink();