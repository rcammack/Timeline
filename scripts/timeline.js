//file: timeline.js

// given an array of course objects
function plotCourses(courses) {
    let date = courses[0].time;
    let content = courses[0].content;
    $('#fall18').popup({
        title   : date,
        content : content
    });
    $('#grad').popup({
        title   : 'May 2019',
        content : 'graduation!'
    });
    return;
}

$.getJSON("/../data/data.json", function (data) {
    document.getElementById('test').innerHTML = 'TIMELINE';
    plotCourses(data[0].classes)
});