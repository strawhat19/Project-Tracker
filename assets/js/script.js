var updateTime = setInterval(updatedTime = () => {
    var dateElement = $('#date');
    var date = moment().format('MMM DD, YYYY');
    var time = moment().format('hh:mm:ss a');
    dateElement.html(date + ' at ' + time);
}, 1000)





