/** @jsx React.DOM */

var MyDescription = React.createClass({
  render: function() {
    var tag="Make data pop!";
    var desc = "This series of events focuses on human factors in data science.";
    return (
        <div>
            <h1>
                {tag}
            </h1>
            <p>
                {desc}
            </p>
            <h2>
                <a href="#schedule">
                <i className="fa fa-calendar"></i> Schedule
                </a>
            </h2>
            <p>
            Every Monday evening, 7-9pm. <br/>
            Check the <a href="http://www.meetup.com/nycpython/#calendar">NYC Python Calendar</a> for meeting locations.
            </p>
        </div>
    );
  }
});

var MySchedule = React.createClass({
  getInitialState: function() {
    return {data1: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data1: data.items});
      }.bind(this)
    });
  },

  render: function() {
    var n = this.state.data1.length;

    var scheduleNodes = this.state.data1.map(function(item, i) {
      if (i == n-1){
        return (
            <div>
              <p>
                  <i>{moment(item.date).fromNow()}</i> - "{item.topic}"
              </p>
              <p>
                  <span dangerouslySetInnerHTML={{__html: item.description}} />
              </p>
            </div>
        );
      }
    });

    return (
        <div>
            {scheduleNodes}
        </div>
    );
  }
});

React.renderComponent(
  <MyDescription />,
  document.getElementById('description')
);

React.renderComponent(
  <MySchedule url="schedule.json"  />,
  document.getElementById('schedule')
);

