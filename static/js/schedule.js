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
    }];
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
                <i>{moment(schedule[1].date).fromNow()}</i> - "{schedule[1].topic}"
            </p>
            <p>
                {schedule[1].description}
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


