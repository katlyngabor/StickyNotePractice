var Router = Backbone.Router.extend({

	routes:{

		"" : "home"
		// "login/" : "logInScreen"

	},



	home: function(){
		// var currentUser = Parse.User.current();
  //   if (currentUser) {
    	var newView = new StickyView({ collection: newStickyCollection});
  //   } else {
    	// App.myRouter.navigate("login/", {trigger: true});
    }



	// logInScreen: function(){
	// 	var currentUser = Parse.User.current();
	// 	if (currentUser) {
	// 		App.myRouter.navigate("", {trigger:true});
	// 	} else {
	// 		var myLoginView = new LoginView();
	// 	}
	// }

});