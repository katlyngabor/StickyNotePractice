var Router = Backbone.Router.extend({

	routes:{

		"login" : "login",
		"" : "home",	
		"Journal" : 'journals',
		"Project" : 'projects',
    "project/:id" : 'singleProject',
    "journal/:id" : 'singleJournal',
    "editJournal/:id" : 'editJournal'
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
  }, 

  singleProject: function(id){
    var currentUser = Parse.User.current();
    if (currentUser) {
      var newSingleProjectView = new SingleProjectView( {projectid: id, collection: newProjectCollection} ); 
    } else {
      App.myRouter.navigate("login", {trigger: true});
    }
  },

  singleJournal: function(id){
   var currentUser = Parse.User.current();
      if (currentUser) {
        var newSingleJournalView = new SingleJournalView( {journalid: id, collection: newJournalCollection} ); 
      } else {
        App.myRouter.navigate("login", {trigger: true});
      }
  },

  editJournal: function(id){
    var currentUser = Parse.User.current();
      if (currentUser) {
        var newEditJournalView = new EditJournalView( {journalid: id, collection: newJournalCollection} ); 
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