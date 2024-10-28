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