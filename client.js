var Temple = require("templejs");

App.ready(function() {
	var view = Temple.create("todomvc-layout").paint("body");
	var comp;

	App.socket.on("todo-change", updateItems);
	updateItems();

	function saveItems() {
		if (comp) comp.stop();
		comp = Trackr.autorun(function(c) {
			var items = view.getItems();
			if (c.firstRun) return;
			App.call("saveItems", items).catch(function(e) {
				console.error(e);
			});
		});
	}

	function updateItems() {
		App.call("getItems").then(function(res) {
			view.resetItems(res);
			saveItems();
		}).catch(function(e) {
			console.error(e);
		});
	}
});
