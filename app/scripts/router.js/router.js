var Router = Backbone.Router.extend({

	routes:{

		"" : "home",
		"login/" : "logInScreen"

	},

	home: function(){
		var currentUser = Parse.User.current();
    if (currentUser) {
    	var myView = new MainView({ collection: myCollection});
    } else {
    	App.myRouter.navigate("login/", {trigger: true});
    }

	}

	logInScreen: function(){
		if (currentUser) {
			App.myRouter.navigate("", {trigger:true});
		} else {
			var myLoginView = new LoginView();
		}
	}

});