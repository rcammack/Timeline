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
                    let course = propValue[i];
                    let time = course.time.split('/');
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

////////////////////create buttons/////////////////////////
    let k = 0;
    for (let j = 0; j < data.length; j++) {
        elem = data[j];
        for(var propName in elem) {
            if(elem.hasOwnProperty(propName)) {
                var propValue = elem[propName];
                for (let i = 0; i < propValue.length; i++) {
                    createButton(propValue[i], timeline[k]);
                    k++;
                }
            }
        }
    }
    return;
}

function createButton(data, time) {
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
    $(btn).popup({
        title   : data.title,
        content : data.content,
        position: 'right center'
    });
    //position on timeline
    $(btn)[0].style.position = 'absolute';
    $(btn)[0].style.top = time;
    //add to document
    document.getElementById("timeline").appendChild(btn);
}

$.getJSON("/../data/data.json", function (data) {
    plotTimeline(data);
});