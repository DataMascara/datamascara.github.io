/** @jsx React.DOM */

var Attribution = React.createClass({
  render: function() {
    return (
        <div className="inside">
            <div className="widget">
                <div className="textwidget">
                   Designed by <a href="https://plus.google.com/+KatherineChuang?rel=author">Dr. Kat</a>
		   <br />
	           Made with React.js
                </div>
            </div>
        </div>
    );
  }
});


var DataScienceTopics = React.createClass({
  render: function() {
    var schedule = ["Mining", "Algorithms", "Science", "Curation", "&", "Realtime Analytics"];
    var items = {};

    schedule.forEach(function(i) {
      items[i] = <li><a href="#">{i}</a></li>;
    });

    return (
        <ul>
            {items}
        </ul>
    );
  }
});

/** ==================================================
*/

var RouterMixin = {
  componentWillMount : function() {
    this.callback = (function() {
      this.forceUpdate();
    }).bind(this);

    this.props.router.on("route", this.callback);
  },
  componentWillUnmount : function() {
    this.props.router.off("route", this.callback);
  }
};

var FooComponent = React.createClass({
  mixins : [RouterMixin],
  handle : function() {
    this.props.router.navigate("bar", {
      trigger : true
    });
  },
  render : function() {
    var className = "animate-leave animate-leave-active";
    var displayText = "";

    if (this.props.router.current == "foo") {
      className = "animate-enter animate-enter-active";
      displayText = "in foo, <a onClick={this.handle}>go to bar</a>";
    }

    return (
      <div className={className}>
        {displayText}
      </div>
    );
  }
});

var BarComponent = React.createClass({
  mixins : [RouterMixin],
  handle : function() {
    this.props.router.navigate("foo", {
      trigger : true
    });
  },
  render : function() {
    var className = "animate-leave animate-leave-active";
    var displayText = "";

    if (this.props.router.current == "bar") {
      className = "animate-enter animate-enter-active";
      displayText = "in bar, <a onClick={this.handle}>go to foo</a>";
    }

    return (
      <div className={className}>
        {displayText}
      </div>
    );
  }
});

var ScheduleComponent = React.createClass({
  mixins : [RouterMixin],
  handle : function() {
    this.props.router.navigate("foo", {
      trigger : true
    });
  },
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
  render : function() {
    var className = "animate-leave animate-leave-active";

    if (this.props.router.current == null ) {
      var splash= React.DOM.img({src: '/static/images/eye.jpg'}, '');
    }

    if (this.props.router.current == "schedule") {
      className = "animate-enter animate-enter-active";
      var n = this.state.data1.length;

      var scheduleTitle = React.DOM.h2({}, 'Previous Schedule');

      var c = React.DOM.span({className: 'close'}, React.DOM.a({href: '/'}, 'x') );

      var scheduleList = this.state.data1.map(function(item, i) {
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
      });

    }

    return (
      <div>
          {splash}
          {c}
          {scheduleTitle}
          <div className={className} id="inner">
            {scheduleList}
          </div>

      </div>
    );
  }
});

var InterfaceComponent = React.createClass({
  mixins : [RouterMixin],
  render : function() {
    var router = this.props.router;

    return (
      <div className="scheduleList">
        <FooComponent router={router} />
        <BarComponent router={router} />
        <ScheduleComponent router={router} url="schedule.json"  />
      </div>
    );
  }
});

var Router = Backbone.Router.extend({
  routes : {
    "foo" : "foo",
    "bar" : "bar",
    "schedule" : "schedule"
  },
  foo : function() {
    this.current = "foo";
  },
  bar : function() {
    this.current = "bar";
  },
  schedule : function() {
    this.current = "schedule";
  }
});

var router = new Router();


React.renderComponent(
  <DataScienceTopics />,
  document.getElementById('topics')
);

React.renderComponent(
  <Attribution />,
  document.getElementById('footer')
);

// Add an if condition for if it exists
React.renderComponent(
  <InterfaceComponent router={router} />,
  document.getElementById('rightMain')
);

Backbone.history.start();
