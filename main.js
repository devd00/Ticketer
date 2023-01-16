//EventListenter for the submit button
document.getElementById('issueInputForm').addEventListener('submit', saveIssue)





//grabs issues from storage...controller-->mongoDB..OR local storage and plop them on the dom
function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'))
    let issuesList = document.getElementById('issuesList')
    console.log(issues)

    issuesList.innerHTML = ''

    //the numebr of tickets is always going to change...iterable item of varyiable length
    for (let i =0; i< issues.length; i++){
        let id = issues[i].id
        let subject = issues[i].subject
        let description = issues[i].description
        let severity= issues[i].severity
        let assigned = issues[i].assignedTo
        let status = issues[i].status
        let statusColor = status == 'Closed' ? 'label-succes': 'label-info'
        //do this with template literals
        issuesList.innerHTML +=
        // "<div class = 'well'>" +
        // "<h6>Issue ID:" + id + "</h6>"+
        // "<p><span class = 'label " + statusColor + "'>" + status + "</span></p>"+
        // "<h3>"+ subject + "</h3>"+
        // "<p>" + description + "</p>" + 
        // "</div>"

        `<div class = 'well'>
        <h6>Issue ID:${id}</h6>
        <p><span class = 'label ${statusColor}'>${status}</span></p>
        <h3>${subject}</h3>
        <p>${description}</p>
        </div>
        `
    }   
}

//onCllick on submit button...
function saveIssue(){
    let issueId = chance.guid()
    let issueSubject = document.getElementById('issueSubjectInput').value
    let issueDesc = document.getElementById('issueDescInput').value
    let issueSeverity = document.getElementById('issueSeverity').value
    let issueAssignedTo= document.getElementById('issueAssignedTo').value
        // let issueStatus = document.getElementById('issueSubject').value
    let issuesStatus = 'Open'


    let issue = {
        id: issueId,
        subject: issueSubject,
        description: issueDesc,
        severity: issueSeverity,
        assigned: issueAssignedTo,
        status: issuesStatus
    }

    //now put all the obects in the array...
    //conditional for if there are items in the array or not

    if(localStorage.getItem('issues')=== null){
        let issues =[]
        issues.push(issue)      //pushes the object in the array that was created, 
        localStorage.setItem('issues', JSON.stringify(issues))  //this creates the key: value pairs in the localstorage, JSON.stringify turns them into strings, as in local storlage everything needs to be strings. 
    }else{
        let issues = JSON.parse(localStorage.getItem('issues')) //this fires when there are issues, grabs the issues in array form
        issues.push(issue)  //pushes the object into the array
        localStorage.setItem('issues', JSON.stringify(issues))  //remakes it into a string 
    }
    document.getElementById('issueInputForm').reset() //resets the form

    fetchIssues() //grabs the issues and displays it in the dom

    e.preventDefault() //this is for the submit button, usually the submit button saves things to backend server, this is to stop that behaviour in case we are using local storage
}

