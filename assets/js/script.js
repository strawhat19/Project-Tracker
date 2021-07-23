// Project Tracker App
console.log('Project Tracker App!');

// Declaring Variables
var projectNameInput = $('#projectName');
var projectTypeSelection = $('#projectType');
var hourlyRateInput = $('#hourlyRateInput');
var hourlyRateNumberElement = $('.rateNumber');
var hourlyRateNumber = $('.dollarAmount');
var dueDateInput = $('#dueDateInput');
var submitButton = $('#submitButton');
var maxProjects = 15;
var today = moment();
var millisecondsInADay = 86400000;

// Update Time on an Interval
var updateTime = setInterval(interval => {
    var dateElement = $('#date');
    var date = moment().format('MMM DD, YYYY');
    var time = moment().format('hh:mm:ss a');
    dateElement.html(date + ' at ' + time);
}, 1000);

var projects = JSON.parse(localStorage.getItem('Projects')) || [];

// Project Object
submitButton.on('click', event => {

    // Input Validation
    if (!projectNameInput || !projectTypeSelection || !hourlyRateInput || !dueDateInput) {
        alert('You must enter values to add Project!');
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
    // // projects.sort((a,b) => b.score - a.score);
    console.log(projects);

})


// Setting Ready State
hourlyRateNumber.html(hourlyRateInput.val());
// Update Synchronize Slider
hourlyRateInput.on('input', (event) => {
    hourlyRateNumber.html(hourlyRateInput.val())
});









