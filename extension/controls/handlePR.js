
function addJiraLinkToPR() {
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


if (window.location.pathname.includes("/pull/")) {
    addJiraLinkToPR();
}