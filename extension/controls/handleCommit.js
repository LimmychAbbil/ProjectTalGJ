
addJiraLink();

function addJiraLink() {
	var divsWithCommitMessage = document.getElementsByClassName("commit-title markdown-title");
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

function createImageButton(ticketName) {
	var nodeButton = document.createElement("a");
	nodeButton.href = "https://jira.talendforge.org/browse/" + ticketName;
	nodeButton.style = "vertical-align: middle";
	var imgNode = document.createElement("img");
	imgNode.src = chrome.runtime.getURL('icons/TalJ_16.png');
	
	nodeButton.appendChild(imgNode);
	
	return nodeButton;
}