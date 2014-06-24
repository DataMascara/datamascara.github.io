/** @jsx React.DOM */



var MyDescription = React.createClass({
  render: function() {
    var tag="Make data pop!";
    var desc = "This group focuses on human factors in data science.";
    return (
        <div>
            <h1>
                {tag}
            </h1>
            <p>
                {desc}
            </p>
        </div>
    );
  }
});

var MySchedule = React.createClass({
  render: function() {
    var schedule = [{
                  date: "2014-06-02"
                , topic:"Mixer"
                , description: ""
                , speakers: []
                }, {
                  date: "2014-06-09 19:00:00"
                , topic:"Data Viz Weight Loss"
                , description: "We'll be looking at several examples of improving presentation of data."
                , speakers: []
		}, {
		  date: "2014-06-16 19:00:00"
		, topic: "Study Hall"
		, description: ""
		, speakers: []
		}, {
		  date: "2014-06-22 19:00:00"
		, topic: "Analyzing rap lyrics"
		, description: "The topic for this week is about analyzing rap lyrics.. Here are some examples of work we will be looking at: <br /><a href='http://pyvideo.org/video/2658/analyzing-rap-lyrics-with-python'> Analyzing Rap Lyrics with Python</a><br /><a href='http://rappers.mdaniels.com.s3-website-us-east-1.amazonaws.com/'>The Largest Vocabulary in Hip Hop</a>"
		, speakers: []
		}, {
		  date: "2014-06-30 19:00:00"
		, topic: "Show and tell"
		, description: "Chris Jenkins, a Ph.D. Candidate in experimental psychology from the University of New Mexico will be describing how he got started with scientific programming packages in Python. He'll show us how he's been using IPython Notebook, pandas, matplotlib, and Bokeh to analyze data from his research on differences in rhythmic timing accuracy."
		, speakers: []
    }];
    var n = schedule.length;
    return (
        <div>
            <h2>
                <i className="fa fa-calendar"></i> Schedule
            </h2>
            <p>
            Every Monday evening, 7-9pm. <br/>
            Check the <a href="http://www.meetup.com/nycpython/#calendar">NYC Python Calendar</a> for meeting locations.
            </p>
            <p>
                <i>{moment(schedule[n-1].date).fromNow()}</i> - "{schedule[n-1].topic}"
            </p>
            <p>
                {schedule[n-1].description}
            </p>
        </div>
    );
  }
});

React.renderComponent(
  <MyDescription />,
  document.getElementById('description')
);

React.renderComponent(
  <MySchedule />,
  document.getElementById('schedule')
);


