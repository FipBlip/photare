var React = require('react');
var MyRaisedButton = require('./MyRaisedButton');

window.onload = function(){
	console.log("rendering...");
	React.render(
		<MyRaisedButton label="Photare"/>,
		document.getElementById('example')
	);
};