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
        <ScheduleComponent router={router} url="schedule.json"  />
      </div>
    );
  }
});

var Router = Backbone.Router.extend({
  routes : {
    "schedule" : "schedule"
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

React.renderComponent(
  <InterfaceComponent router={router} />,
  document.getElementById('rightMain')
);

Backbone.history.start();
