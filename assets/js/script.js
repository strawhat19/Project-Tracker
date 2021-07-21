var updateTime = setInterval(function() {
    var date = moment().format('MMM DD, YYYY');
    var time = moment().format('hh:mm:ss a');
    var dateElement = $('#date');
    dateElement.html(date + ' at ' + time);
}, 1000)





