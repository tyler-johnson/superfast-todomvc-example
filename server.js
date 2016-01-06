var fs = require("fs-promise");

App.methods({
	getItems: function() {
		return fs.readFile("todolist.json", {
			encoding: "utf-8"
		}).catch(function(e) {
			if (e.code !== "ENOENT" && e.code !== "ENOTDIR") throw e;
		}).then(function(val) {
			return val ? JSON.parse(val) : [];
		});
	},
	saveItems: function(items) {
		return fs.writeFile("todolist.json", JSON.stringify(items)).then(function() {
			App.io.sockets.emit("todo-change");
		});
	}
});
