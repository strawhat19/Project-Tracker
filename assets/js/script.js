// Project Tracker App
console.log('Project Tracker App!');

// Declaring Variables
var body = $('body');
var table = $('#table');
var form = $('#addProjectForm');
var projectNameInput = $('#projectName');
var projectTypeSelection = $('#projectType');
var hourlyRateInput = $('#hourlyRateInput');
var hourlyRateNumberElement = $('.rateNumber');
var hourlyRateNumber = $('.dollarAmount');
var dueDateInput = $('#dueDateInput');
var submitButton = $('#submitButton');
var clearButton = $('#closeButtonClear');
var tableHead = document.querySelector('#tableHead');
var maxProjects = 5;
var today = moment();
var millisecondsInADay = 86400000;

// Update Time on an Interval
var updateTime = setInterval(interval => {
    var dateElement = $('#date');
    var date = moment().format('MMM DD, YYYY');
    var time = moment().format('hh:mm:ss a');
    dateElement.html(date + ' at ' + time);
}, 1000);

// Retrieving Projects from Storage
var projects = JSON.parse(localStorage.getItem('Projects')) || [];

// Checking Array Size
setInterval(function() {
    if (projects.length === 0) tableHead.style.borderBottom = 'none';
},1000)

// Function Invokations
// Generate Project Rows
generateProjectRows();
setInterval(function() {
    // Check and Regenerate Project Rows every 24 Hours
    generateProjectRows();
}, millisecondsInADay)

// Generate Project Rows
function generateProjectRows() {

    // Execute these functions for each item in the Projects Array
    projects.map(project => {

        var projectRow = $('<div class="tableRow projectRow">');
        table.append(projectRow);

        // Project Variables
        var projectNameField = $('<div class="tableItem" class="projectName">');
        var projectTypeField = $('<div class="tableItem" class="projectType">');
        var hourlyRateField = $('<div class="tableItem" class="hourlyRate">');
        var dueDateField = $('<div class="tableItem" class="dueDate">');
        var daysUntilField = $('<div class="tableItem" class="daysUntil">');
        var closeButton = $('<div class="tableItem"><i class="projectCloseButton closeButton fas fa-times" title="Clear Project"></i></div>');

        var projectName = project.name;
        var projectType = project.type;
        var hourlyRate = project.hourly;
        var dueDate = project.dueDate;
        var daysUntil = project.daysUntil;

        projectNameField.html(projectName);
        projectTypeField.html(projectType);
        hourlyRateField.html(hourlyRate);
        dueDateField.html(dueDate);
        daysUntilField.html(daysUntil);

        projectRow.append(projectNameField);
        projectRow.append(projectTypeField);
        projectRow.append(hourlyRateField);
        projectRow.append(dueDateField);
        projectRow.append(daysUntilField);
        projectRow.append(closeButton);

    })

}

var projectCloseButtons = document.querySelectorAll('.projectCloseButton');

// Clear Item // Local Storage
for (var i = projects.length - 1; i >= 0; i--) {
    projectCloseButtons[i].addEventListener('click', event => {
        $(event.target).parent().parent().remove();
        projects.splice(i, 1);
        localStorage.setItem('Projects', JSON.stringify(projects));
    })
}

// Project Object
submitButton.on('click', event => {

    // Input Validation
    if (!projectNameInput || !projectTypeSelection || !hourlyRateInput || !dueDateInput) {
        alert('You must enter values to add Project!');
        return;
    } else if (dueDateInput.val() === '- Select Project Type -') {
        alert('You must enter an actual Project Type!');
        return;
    }
    
    var project = {
        name: projectNameInput.val(),
        type: projectTypeSelection.val(),
        hourly: hourlyRateInput.val(),
        dueDate: moment(dueDateInput.val()).format('MMM Do, YYYY'),
        daysUntil: moment(dueDateInput.val()).to(today, true)
    }
    
    projects.push(project);
    projects.splice(maxProjects);
    localStorage.setItem('Projects', JSON.stringify(projects));
    
    setInterval(function() {
        location.reload(true);
    }, 300)
})

// Setting Ready State
hourlyRateNumber.html(hourlyRateInput.val());
// Update Synchronize Slider
hourlyRateInput.on('input', (event) => {
    hourlyRateNumber.html(hourlyRateInput.val())
});

// Clear Button
clearButton.on('click', event => {
    localStorage.removeItem('Projects');
    location.reload(true);
})