var path = require("path");

module.exports = function(compile) {
	var todomvccss = path.relative(__dirname, require.resolve("todomvc-app-css/index.css"));
	compile.include(todomvccss, [ "client" ]);
};
