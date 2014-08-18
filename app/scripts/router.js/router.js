var Router = Backbone.Router.extend({

	routes:{

		"IdeaBoard" : "home",	

		"Journal" : 'journals'
		// "login/" : "logInScreen"

	},


	home: function(){
		// var currentUser = Parse.User.current();
  //   if (currentUser) {
			var newView = new StickyView( {collection: newStickyCollection} );
  //   } else {
    	// App.myRouter.navigate("login/", {trigger: true});
  },

  journals: function(){
 		var newJournalView = new JournalView ( {collection: newJournalCollection} );	
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