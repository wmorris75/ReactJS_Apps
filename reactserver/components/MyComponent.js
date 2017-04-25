var React = require('react');
var ReactDOMServer = require('react-dom/server');

var MyComponent = React.createClass({
	render: function(){
		return (
				<div>
					<h1>My Component</h1>
					<p>This is a component rendered on the server</p>
				</div>
			);
	}
});

module.exports.MyComponent = MyComponent;