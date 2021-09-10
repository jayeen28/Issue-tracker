document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const btnInner = document.getElementById(id);
  let btnStatus = btnInner.innerText;
  if (btnStatus !== 'Open') {
    btnInner.innerText = 'Open';
  }
  else {
    btnInner.innerText = 'Close';
  }
}

const deleteIssue = id => {
  //update ui
  const targetBox = document.getElementById(`${id}`);
  const issuesList = document.getElementById('issuesList');
  issuesList.removeChild(targetBox);
  //update local storage
  const issues = JSON.parse(localStorage.getItem('issues'));
  const newIssues = []
  for (const issue of issues) {
    const issueId = parseFloat(issue.id);
    if (issueId !== id) {
      newIssues.push(issue);
    }
  }
  const newIssuesStringified = JSON.stringify(newIssues);
  localStorage.setItem('issues', newIssuesStringified);
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    issuesList.innerHTML += `<div class="well" id="${id}">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <div class="collapse" id="collapseExample${i}">
                                  <h3> ${description} </h3>
                                  <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                  <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                </div>
                                <a class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample${i}" aria-expanded="false" aria-controls="collapseExample" id="${id + i}" onclick="closeIssue('${id + i}')">Open</a>
                                <a onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
