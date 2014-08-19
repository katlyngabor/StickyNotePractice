var Router = Backbone.Router.extend({

	routes:{

		"login" : "login",
		"" : "home",	
		"Journal" : 'journals',
		"Project" : 'projects'
	},


	login: function(){
    var currentUser = Parse.User.current();
    if (currentUser) {
    	App.myRouter.navigate('', { trigger: true });
    } else {
    	var logView = new LoginView();
    }
  },

	home: function(){
		var currentUser = Parse.User.current();
    if (currentUser) {
			var newView = new StickyView( {collection: newStickyCollection} );
    } else {
    	App.myRouter.navigate("login", {trigger: true});
  	}
  },

  journals: function(){
  	var currentUser = Parse.User.current();
    if (currentUser) {
    	var newJournalView = new JournalView( {collection: newJournalCollection} );	
    } else {
    	App.myRouter.navigate("login", {trigger: true});
    }
 		
	},

	projects: function(){
		var currentUser = Parse.User.current();
    if (currentUser) {
    	var newProjectView = new ProjectView( {collection: newProjectCollection} );	
    } else {
    	App.myRouter.navigate("login", {trigger: true});
    }
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