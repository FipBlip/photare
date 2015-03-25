var React = require('react'),
	mui = require('material-ui'),
	RaisedButton = mui.RaisedButton;

var MyRaisedButton = React.createClass({
	render: function() {
		console.log("MyRaisedButton Initialized Yo");
		return (
			<RaisedButton label={this.props.label} />
		);
	}
});

module.exports = MyRaisedButton;