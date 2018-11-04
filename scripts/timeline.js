//file: timeline.js

// given an array of data, plot the timeline
function plotTimeline(data) {
    // document.getElementById('header').innerHTML = 'riley\'s timeline';
    let min, max; //min and max dates to plot
    //get array of dates to plot
    let timeline = [];
    for (let j = 0; j < data.length; j++) {
        elem = data[j];
        for(var propName in elem) {
            if(elem.hasOwnProperty(propName)) {
                var propValue = elem[propName];
                for (let i = 0; i < propValue.length; i++) {
                    let entry = propValue[i];
                    let time = entry.time.split('/');
                    let mydate = new Date(time[2], time[0] - 1, time[1]);
                    if (typeof min === 'undefined'){
                        min = mydate;
                    }
                    if (typeof max === 'undefined'){
                        max = mydate;
                    }
                    min = mydate < min ? mydate : min;
                    max = mydate > max ? mydate : max;
                    timeline.push(mydate);
                }
            }
        }
    }
    //convert dates in timeline array to percentages along timeline
    for (let i = 0; i < timeline.length; i++) {
        let percent = (timeline[i]-min)/(max-min) * 100; //percentage of time from timeline start to total time
        timeline[i] = percent.toString() + '%';
    }
    console.log(timeline);

    //plot time on line
    plotTime(min, max);

////////////////////create buttons/////////////////////////
    let k = 0;
    courses = {};
    for (let j = 0; j < data.length; j++) {
        elem = data[j];
        for(var propName in elem) {
            if(elem.hasOwnProperty(propName)) {
                var propValue = elem[propName];
                for (let i = 0; i < propValue.length; i++) {
                    if(propName == 'projects') {
                        createProject(propValue[i], timeline[k]);
                    }
                    else if (propName == 'classes') {
                        if(!courses.hasOwnProperty(propValue[i].date)) {
                            courses[propValue[i].date] = [timeline[k], propValue[i].content];
                        }
                        else {
                            courses[propValue[i].date].push(propValue[i].content);
                        }
                    }
                    k++;
                }
            }
        }
    }
    for ( semester in courses ) {
        createSemester(semester, courses[semester].slice(1), courses[semester][0]);
    }
    return;
}

function plotTime(min, max) {
    minYear = min.getFullYear();
    maxYear = max.getFullYear();
    diff = maxYear - minYear;
    for(let i = 0; i <= diff; i++) {
        year = (minYear + i).toString();
        yearPercent = ((i / diff) * 100).toString() + '%';
        console.log(year, yearPercent);
        var newDiv = document.createElement("DIV");
        var content = document.createTextNode(year);
        newDiv.appendChild(content);
        $(newDiv)[0].style.position = 'absolute';
        $(newDiv)[0].style.left = '3%';
        $(newDiv)[0].style.top = yearPercent;
        document.getElementById("timeline").appendChild(newDiv);
    }
}

function createProject(data, time) {
    //button
    var btn = document.createElement("BUTTON");
    btn.classList.add("circular");
    btn.classList.add("ui");
    btn.classList.add("button");
    btn.classList.add("green");
    btn.classList.add("icon");
    //icon
    var icon = document.createElement("I");
    icon.classList.add("icon");
    icon.classList.add("pencil");
    icon.classList.add("outline");
    btn.appendChild(icon);
    //popup
    $(btn).popup({
        title   : data.title,
        content : data.content,
        position: 'right center'
    });
    //position on timeline
    $(btn)[0].style.position = 'absolute';
    $(btn)[0].style.left = '10%';
    $(btn)[0].style.top = time;
    //add to document
    document.getElementById("timeline").appendChild(btn);
}

function createSemester(semester, data, time) {
    //button
    var btn = document.createElement("BUTTON");
    btn.classList.add("circular");
    btn.classList.add("ui");
    btn.classList.add("button");
    btn.classList.add("blue");
    btn.classList.add("icon");
    //icon
    var icon = document.createElement("I");
    icon.classList.add("icon");
    icon.classList.add("book");
    btn.appendChild(icon);
    //popup
    const content = data.join(", ");
    $(btn).popup({
        title   : semester,
        content : content,
        position: 'right center'
    });
    //position on timeline
    $(btn)[0].style.position = 'absolute';
    $(btn)[0].style.left = '10%';
    $(btn)[0].style.top = time;
    //add to document
    document.getElementById("timeline").appendChild(btn);
}

$.getJSON("/../data/data.json", function (data) {
    plotTimeline(data);
});