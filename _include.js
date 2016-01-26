var path = require("path");
var Temple = require("templejs");

function transform(file, src) {
	if (path.extname(file.path) !== ".html") return;
	file.setType("script");
	file.target("client");

	return [
		"var Temple = require(\"templejs\");",
		"module.exports = (function() {",
		Temple.compile(src),
		"}).call(this);"
	].join("\n");
}

module.exports = function(compile) {
	var todomvccss = path.relative(__dirname, require.resolve("todomvc-app-css/index.css"));
	compile.include(todomvccss, "style", [ "client" ]);
	compile.transform(transform);
};
