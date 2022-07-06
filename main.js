//--- date ----//
let currentDate = new Date();
let date = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();
document.getElementById("currentDate").innerHTML = date + "/" + month + "/" + year;

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueTaskName = document.getElementById('issueTaskNameInput').value;
    let issueDescription = document.getElementById('issueDescriptionInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueDueDate = document.getElementById('issueDueDateInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id =issueId,
        description =  issueDescription,
        assignedTo = issueAssignedTo,
        dueDate =  issueDueDate
       
    }
    if (localStorage.getItem('issues') == null) {
        let issues = []:
        issues.push(issues);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function fetchIssues() {
    let issues = JSON.parse(localStorage.getitem('issues'));
    let issueList = document.getElementById('issuesList');

    issueList.innerHTML = '';

    for  (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let taskName = issues[i].taskName;
        let assignedTo = issues[i].assignedTo;
        let description = issues[i].description;
        let dueDate = issues[i].dueDate;
        let status = issues[i].status;

        issuesList.innerHTML += '<div class = 'taskName'>' +    '<h6>Issue ID: ' + '</h6>' + '<p> <span class=" label label-info">' + status +' </span> </p>' +
                                                    '<h3>' + description + '</h3>' + '<p><span class="glyphicon glyphicon-time">' + dueDate + '</p>' +
                                                    '<p><span class="glyphicon glyphicon-user">' + assignedTo + '</p>' + 
                                                    '<a href="#" onclick= "setStatusClosed(\'' +id+ '\')" class= "btn btn-warning">Close</a>' +
                                                    '<a href="#" onclick= "deleteIssue(\'' +id+ '\')" class= "btn btn-danger">Delete</a>' +
                                                    '</div>';
   
    }                                            
}