module.exports = function(compile) {
	compile.include(require.resolve("todomvc-app-css/index.css"), [ "client" ]);
};
