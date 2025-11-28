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
    var talendJiraURL = "https://talend-jira-dc-legacy.atlassian.net/browse/";
    var qlikJiraURL = "https://qlik-dev.atlassian.net/browse/";
    var migrationDate = new Date("2024-10-25");

    var nodeButton = document.createElement("a");
    nodeButton.id = "TalGJ_link";
    nodeButton.style = "vertical-align: middle";
    nodeButton.target="_blank";
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