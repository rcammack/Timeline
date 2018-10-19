//file: timeline.js

// given an array of course objects
function plotCourses(data) {
    courses = data[0]['classes'];
    projects = data[0]['projects'];
    
    //initialize min and max times with first time entry
    let min, max;
    let time0 = courses[0].time.split('/');
    const mydate0 = new Date(time0[2], time0[0] - 1, time0[1]);
    document.getElementById('test').innerHTML = mydate0.toDateString();
    min = mydate0;
    max = min;
    
    //get array of times to plot
    let timeline = [];
    // for (let i = 0; i < courses.length; i++) {
    //     let course = courses[i];
    //     let time = course.time.split('/');
    //     let mydate = new Date(time[2], time[0] - 1, time[1]);
    //     min = mydate < min ? mydate : min;
    //     max = mydate > max ? mydate : max;
    //     timeline.push(mydate);
    // }
    // for (let i = 0; i < timeline.length; i++) {
    //     let percent = (timeline[i]-min)/(max-min) * 100; //percentage of time from timeline start to total time
    //     timeline[i] = percent.toString() + '%';
    // }
    // console.log(timeline);

    for (let j = 0; j < data.length; j++) {
        elem = data[j];
        for(var propName in elem) {
            if(elem.hasOwnProperty(propName)) {
                var propValue = elem[propName];
                for (let i = 0; i < propValue.length; i++) {
                    let course = propValue[i];
                    let time = course.time.split('/');
                    let mydate = new Date(time[2], time[0] - 1, time[1]);
                    min = mydate < min ? mydate : min;
                    max = mydate > max ? mydate : max;
                    timeline.push(mydate);
                }
            }
        }
    }
    for (let i = 0; i < timeline.length; i++) {
        let percent = (timeline[i]-min)/(max-min) * 100; //percentage of time from timeline start to total time
        timeline[i] = percent.toString() + '%';
    }
    console.log(timeline);
    
    /////////////////////////////////////////
    let date = courses[0].date;
    let content = courses[0].content;
    $('#fall18').popup({
        title   : date,
        content : content
    });
    $('#fall18')[0].style.top = timeline[1];
    $('#grad').popup({
        title   : 'May 2019',
        content : 'graduation!'
    });
    $('#grad')[0].style.top = timeline[2];

    return;
}

$.getJSON("/../data/data.json", function (data) {
    plotCourses(data);
});