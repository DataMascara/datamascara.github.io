/** @jsx React.DOM */

var Attribution = React.createClass({
  render: function() {
    return (
        <div className="inside">
            <div className="widget">
                <div className="textwidget">
                   Designed by <a href="https://plus.google.com/+KatherineChuang?rel=author">Dr. Kat</a>
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

React.renderComponent(
  <DataScienceTopics />,
  document.getElementById('topics')
);

React.renderComponent(
  <Attribution />,
  document.getElementById('footer')
);


