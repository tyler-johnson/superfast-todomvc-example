var Temple = require("templejs");

App.ready(function() {
	var view = Temple.create("todomvc-layout").paint("body");

	App.call("getItems").then(function(res) {
		res.forEach(function(i) {
			view.addItem(i.value, i.completed);
		});
	}).catch(function(e) {
		console.error(e);
	});

	Trackr.autorun(function() {
		App.call("saveItems", view.getItems()).catch(function(e) {
			console.error(e);
		});
	});
});
