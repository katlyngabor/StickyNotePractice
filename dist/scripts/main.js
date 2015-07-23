var ProjectModel = Parse.Object.extend({

	className: 'allProjects',

	idAttribute:"objectId"

});


var ProjectCollection = Parse.Collection.extend({
	model: ProjectModel
});

var StickyModel = Parse.Object.extend({

	className:'mainStickies',

	idAttribute: 'objectId'

});


var StickyCollection = Parse.Collection.extend({

	model: StickyModel

});
var JournalModel = Parse.Object.extend({

	className: 'mainJournals',

	idAttribute: 'objectId'	

});

var JournalCollection = Parse.Collection.extend({

	model: JournalModel

});
	var StickyView = Backbone.View.extend({

		className:'all-stickies',

		events:{
				'click .addNewStickyBtn' : 'addSticky',
				'click .saveStickyBtn' : 'saveSticky',
				'click .deleteStickyBtn' : 'deleteSticky',
				'click .sticky-content' : 'editSticky'
		},

		initialize: function(){
			$('#menu').show();
			$('#fixThis').addClass('sticky-container');
			$('.logOutBtn').show();
			this.render();
			this.collection.on('change', this.render, this);
			this.collection.on('destroy',this.render, this);
			this.collection.on('add', this.render, this);
			$('.viewProjectsSlideBtn').show();
			$('#projectsSlide').show();
		},

		render: function(){
			var sticky_template = Handlebars.compile($("#allStickies-template").html());
			var rendered = sticky_template({ stickies:this.collection.toJSON() });
			var renderingElement = this.$el.html(rendered);
			$('.renderedStickies').html(renderingElement);
			var collectionVariable = this.collection;
			this.delegateEvents();

			var coordinates = function(element) {
				element = $(event.target);
				var top = element.position().top;
				var left = element.position().left;
				var stickyid = element.attr('id');
				var singleSticky = collectionVariable.get(stickyid);
				singleSticky.save({
					topLocation: top,
					leftLocation: left
				})
			}

			$(".column").draggable({
		    stop: function() {
		        coordinates('.column');
		    }
			})
	    // .click(function(){
	    //    if ( $(this).is('.ui-draggable-dragging') ) {
	    //         return;
	    //    }
	    //    $(this).draggable( "option", "disabled", true );
	    //    $(this).attr('contenteditable','true');
	    // })
	    // .blur(function(){
	    //   $(this).draggable( 'option', 'disabled', false);
	    //   $(this).attr('contenteditable','false');
	    //   var setZindex = 2;
	    //   $(this).each(function() {
	    //     var z = parseInt($(this).css('z-index'));
	    //     if(isNaN(z)) z = 2;
	    //     if(z > setZindex) setZindex = z;
	   	// 	 });
	    // 	$(this).css('z-index', setZindex+1);

	    // });

			},

		addSticky : function(e){
			e.preventDefault();
			e.stopPropagation();
			var new_sticky = new StickyModel({
  			content: $('.stickyText').val()

  			 });

  			new_sticky.save(null,{
	    		success:function(new_sticky) {
	      		newStickyCollection.add(new_sticky);
	    		}
	  		});
		},

		saveSticky:function(e){
			e.preventDefault();
  		e.stopPropagation();
  		var stickyid = $(event.target).attr('id');
			var singleSticky = this.collection.get(stickyid);
  		singleSticky.save({
  			content: $(event.target).next().val() //explain this
  		});
		},

		deleteSticky: function(e){
			console.log('in delete sticky function');
			e.preventDefault();
			e.stopPropagation();
			var stickyid = $(event.target).attr('id');
			var singleSticky = this.collection.get(stickyid);
			if (window.confirm("Are you sure you wanna delete? There are no bad ideas in brainstorming!")) {
      	singleSticky.destroy();
    	}
		}

});

var LoginView = Backbone.View.extend({

	className: 'loginContainer',

	events: {
		'click .loginBtn' : 'logIn',
		'click .signUpBtn' : 'signUp',
		'click .newUserBtn' : 'newUser',
		'click .returningUser' : 'returningUser'
	}, 

	initialize: function(){
		$('#fixThis').removeClass('sticky-container');
		$('#menu').hide();	
		this.render();
	},

	render: function(){	
		var login_template = Handlebars.compile($('#login-template').html());
		var rendered = login_template();
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		$('.viewProjectsSlideBtn').hide();
		$('#projectsSlide').hide();
		$('.logOutBtn').hide();
		this.delegateEvents();
	},

	logIn: function(){

			Parse.User.logIn($('#loginInput').val(), $('#passwordInput').val(), {
			  success: function(user) {
			  	$('.sticky-container').addClass('sticky-container');
			 		App.myRouter.navigate('', { trigger: true });

			  },
			  error: function(user, error) {
			    // The login failed. Check error to see why.
			  }
			});

		},

		newUser: function(){
			var signUp_template = Handlebars.compile($('#signUp-template').html());
			var rendered = signUp_template();
			var renderingElement = this.$el.html(rendered);
			$('.renderedStickies').html(renderingElement);
			$('.viewProjectsSlideBtn').hide();
			$('#projectsSlide').hide();
			this.delegateEvents();
		},

		signUp: function(){
			var user = new Parse.User();
			user.set("username", $('#signUpInput').val() );
			user.set("password", $('#newPasswordInput').val() );
		 
		 
			user.signUp(null, {
			  success: function(user) {
			    App.myRouter.navigate('', { trigger: true });
			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
		  	}
			});

		},

		returningUser: function(){
			var login_template = Handlebars.compile($('#login-template').html());
			var rendered = login_template();
			var renderingElement = this.$el.html(rendered);
			$('.renderedStickies').html(renderingElement);
		}

});
var JournalView = Backbone.View.extend({

	className: "allJournals",

	events:{

		'click .addJournalBtn' : 'addJournal',
		'click .submitJournalBtn' : 'submitJournal',
		'click .saveJournalBtn' : 'saveJournal',
		'click .cancelJournalBtn' : 'cancelJournal',
		'click .journalTitleBtn' : 'singleJournal',
		'click .deleteJournalBtn' : 'deleteJournal',
		'click .editJournalBtn' : 'editJournal'

	},

	initialize: function(){
		this.render();
		$('#fixThis').addClass('sticky-container');
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
		this.collection.on('add', this.render, this);  
		$('.viewProjectsSlideBtn').show();
		$('#projectsSlide').show();
	},

	render: function(){
		var journal_template = Handlebars.compile($('#journals-template').html());
		var rendered = journal_template( {journals:this.collection.toJSON() })
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		var myCollection = this.collection;


		var coordinates = function(element) {
				element = $(event.target);
				var top = element.position().top;
				var left = element.position().left;
				var journalid = element.attr('id');
				var singleJournal = myCollection.get(journalid);
				singleJournal.save({
					topLocation: top,
					leftLocation: left
				})
			}

			$(".journalContainer").draggable({
		    stop: function() {
		        coordinates('.journalContainer');
		    }
			})

	},

	addJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.overlay').toggleClass('shown');
	},

	submitJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
	
		var new_journal = new JournalModel({
			title: $('.journalTitleInput').val(),
  		content: $('.journalInput').val()
  	});

			new_journal.save(null,{
	    success:function(new_journal) {
	     	newJournalCollection.add(new_journal);
	    }	
	  });	
	},

	cancelJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.overlay').toggleClass('shown');
	},

	singleJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		var journalid = $(event.target).attr('id');
		App.myRouter.navigate('#journal/'+journalid, { trigger: true });
	},

	// editJournal: function(){
	// 	e.preventDefault();
	// 	e.stopPropagation();

	// },

	deleteJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log('deleting');
		var journalid = $(event.target).attr('id');
		var singleJournal = this.collection.get(journalid);
		if (window.confirm("Are you sure you want to delete this post?")) {
      singleJournal.destroy();
		}
	}




});
var ProjectView = Backbone.View.extend({

	className : 'allProjects',

	events:{		
		'click .addNewProjectBtn' : 'addNewProject',
		'click .submitProjectInfo' : 'submitProject',
		'click .cancelProjectInfo' : 'cancelProject',
		'click .deleteProjectBtn' : 'deleteProject',
		'click .projectTitleBtn' : 'singleView'
	},

	initialize: function(){
		$('#fixThis').addClass('sticky-container');
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
		this.collection.on('add', this.render, this);
		$('.viewProjectsSlideBtn').hide();
		$('#projectsSlide').hide();
	},

	render: function(){
		var project_template = Handlebars.compile($('#projects-template').html());
		var rendered = project_template( {projects:this.collection.toJSON() })
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		this.delegateEvents();
	},

	singleView: function(e){
		e.preventDefault();
		e.stopPropagation();
		var projectid = $(event.target).attr('id');
	 	App.myRouter.navigate('#project/'+projectid, { trigger: true });
	},

	addNewProject: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.projectModal').addClass('showModal');
	},

	submitProject: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.projectModal').removeClass('showModal');
		var new_project = new ProjectModel({
			projectTitle:$('.projectTitleInput').val(),
			projectDescription:$('.projectDescription').val(),
  	});

			new_project.save(null,{
	    success:function(new_project) {
	     	newProjectCollection.add(new_project);
	    }	
	  });

	},

	cancelProject: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.projectModal').removeClass('showModal');
	},

	deleteProject: function(e){
		e.preventDefault();
		e.stopPropagation();
		var projectid = $(event.target).attr('id');
		var singleProject = this.collection.get(projectid);
		if (window.confirm("Are you sure you want to delete this post?")) {
      singleProject.destroy();
		}

	}



});
var sideBarProjectsView = Backbone.View.extend({

	className: 'allSidebarProjects',

	events:{
	},

	initialize: function(){
		$('.addNewProjectBtn').addClass('hiddenBtn');//why isn't this working?
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
		this.collection.on('add', this.render, this);
		$('.addNewProjectBtn').hide();
	},

	render: function(){
		var project_template = Handlebars.compile($('#projects-template').html());
		var rendered = project_template( {projects:this.collection.toJSON() })
		var renderingElement = this.$el.html(rendered);
		$('.try').html(renderingElement);
		this.delegateEvents();


		$('.projectContainer').droppable({
	    // accept: '.column',
	    drop: function( event, ui) {
	    	var projectid = $(event.target).attr('id');
	    	var stickyid = $(ui.draggable[0]).attr('id');
	    	var a = $(ui.draggable[0]).attr('rel');

	    	if(a == "sticky"){
				var singleSticky = newStickyCollection.get(stickyid);
  			singleSticky.save({
  				project: projectid
  			})
  			$(ui.draggable[0]).css('display', 'none');
  			console.log(stickyid);
  			console.log(projectid)
  		}
  			if(a == "journal"){
  				// $( ".projectContainer" ).on( "dropover", function( event, ui ) {
						// $(ui.draggable[0]).css('width', '50px');
						// $(ui.draggable[0]).css('height', '80px');
						// $(ui.draggable[0]).css('background-image', 'url("../images/comp_notebook small.jpg")');
						// $('.deleteJournalBtn').css('font-size','8px');
			 		// });
  				var singleJournal = newJournalCollection.get(stickyid);
  				singleJournal.save({
  					project: projectid
  				})
  				$(ui.draggable[0]).css('display', 'none');
  				console.log(singleJournal);
  			}
	    }

	   });

	
			// $( ".projectContainer" ).on( "dropover", function( event, ui ) {
			// 	$(ui.draggable[0]).css('width', '50px');
			// 	$(ui.draggable[0]).css('height', '80px');
			// 	$(ui.draggable[0]).css('background-image', 'url("../images/comp_notebook small.jpg")');
			// 	$('.deleteJournalBtn').css('font-size','8px');
			// 	$('.journalTitleBtn').css('display', 'none');	
			//  });
		
	
	// if $(ui.draggable[0].attr('rel') == "sticky"){
	// 	$( ".projectContainer" ).on( "dropover", function( event, ui ) {
	// 		$(ui.draggable[0]).css('width', '50px');
	// 		$(ui.draggable[0]).css('height', '80px');
	// 	});
	// }

		// addNewProject: function(e){
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	var new_project = new ProjectModel({
		// 		stickies:[],
		// 		journals:[]
	 //  	});

		// 		new_project.save(null,{
		//     success:function(new_project) {
		//      	newProjectCollection.add(new_project);
		//     }	
		//   });

		// }

	}

});




// $('.viewProjectsSlideBtn').on('click', function(){
// 	$('#projectsSlide').toggleClass('show');

// });







// $('#projectsSlide').droppable({ tolerance: "fit" });

// $('#projectsSlide').droppable({ accept: '.column'});

// // var accept = $('#projectsSlide').droppable( "option", "accept" );
 
// $('#projectsSlide').droppable( "option", "accept", ".column" );

// $('#projectsSlide').on( "drop", function( event, ui ) {
// 	alert('dropped');
// });

var SingleJournalView = Backbone.View.extend({

	className: 'singleJournal',

	events:{
		'click .editSingleJournalBtn' : 'editJournal',
		'click .submitJournalBtn' : 'submitJournal',
		'click .cancelJournalBtn' : 'cancelJournal'

	},

	initialize: function(attributes){
		// this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy',this.render, this);
		this.collection.on('add', this.render, this);
		this.singleJournal = this.collection.get(attributes.journalid);
		// this.myJournal = this.singleJournal;	
		this.render();
	},

	render: function(){
		// this.singleJournal = this.collection.get(attributes.journalid);
		var singleJournalView_template = Handlebars.compile($('#singleJournalView-template').html());
		console.log(this.singleJournal);
		var rendered = singleJournalView_template(this.singleJournal.toJSON());
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
	},

	editJournal: function(e){
		console.log('yo');
		e.preventDefault();
		e.stopPropagation();
		var journalid = $(event.target).attr('id');
		App.myRouter.navigate('editJournal/'+journalid, { trigger: true });

	}
	
	

	// 	var journalid = $(event.target).attr('id');
	// 	var singleJournal = this.collection.get(journalid);
 //  	singleJournal.save({
 //  		title: $('.journalTitleInput').val(),
 //  		content: $('.journalInput').val()
 //  	});	
	// },

	// cancelJournal: function(e){
	// 	e.preventDefault();
	// 	e.stopPropagation();

	// 	$('.overlay').toggleClass('shown');

	// }
	   
});
var EditJournalView = Backbone.View.extend({

	className: 'editJournal',

	events:{
		'click .submitJournalBtn' : 'submitJournal',
		'click .cancelJournalBtn' : 'cancelJournal'
	},

	initialize: function(attributes){	
		// journalid = $(event.target).attr('id');
		$('#fixThis').addClass('sticky-container');
		this.singleJournal = this.collection.get(attributes.journalid);
		console.log(attributes.journalid);	
		this.render();
	},

	render: function(){
		var singleJournalView_template = Handlebars.compile($('#journals-template').html());
		var rendered = singleJournalView_template(this.singleJournal.toJSON());
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		$('.overlay').toggleClass('shown');
	},

	submitJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log('submit');
		var journalid = $(event.target).attr('id');
		var singleJournal = this.collection.get(this.singleJournal);
  	singleJournal.save({
  		title: $('.journalTitleInput').val(),
  		content: $('.journalInput').val()
  	});	
  	App.myRouter.navigate('#journal/'+journalid, { trigger: true });
	},

	cancelJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.overlay').toggleClass('shown');
		journalid = $(event.target).attr('id');
		App.myRouter.navigate('#journal/'+journalid, { trigger: true });
	}

});











	


SingleProjectView = Backbone.View.extend({

	className: 'singleProject',

	events:{
		'click .closeSingleViewBtn' : 'closeSingleView',
		'click .deleteItemBtn' : 'deleteItem',
		'click .viewItemBtn' : 'viewItem'
	},

	initialize: function(attributes){
		this.singleProject = this.collection.get(attributes.projectid);
		this.render();
	},

	render: function(){
		$('.renderedStickies').html('');
		var self = this
		var projectid = $(event.target).attr('id');
		var query = new Parse.Query("mainStickies");
		query.equalTo("project", projectid);
		query.find({	
		  success: function(results) {
		  	if (results.length > 0){
		  		var stickiesProject = '';
		  		results.forEach(function(sticky){
			  		stickiesProject += "<div class='column2'>" + sticky.get('content') + "</div>";
		  		});
		  		$('.renderedStickies').append(stickiesProject);
		  	}
			}
		})	
		var query2 = new Parse.Query("mainJournals");
		query2.equalTo("project",projectid);
		query2.find({
			success: function(results) {
				if(results.length > 0){
					var journalsProject = '';
					results.forEach(function(journal){
						journalsProject += "<div class='journalContainer2'>" + journal.get('title') + "</div>";
					});

					$('.renderedStickies').append(journalsProject);
					// $('.renderedStickies').html(journalsProject);
					// console.log(journalsProject);
				}	
				else{
					console.log('hi');
				}
			}
		})
	
	},

	deleteItem: function(e){
		e.preventDefault();
		e.stopPropagation();
		var itemid = $(event.target).attr('id');
		var singleItem = this.collection.get(itemid);
		if (window.confirm("Are you sure you want to delete this post?")) {
      singleItem.destroy();
		}
	},

	closeSingleView: function(e){
		e.preventDefault();
		e.stopPropagation();
		App.myRouter.navigate("Project", { trigger: true });
	}

});

	// render: function(){
	// 		var sticky_template = Handlebars.compile($("#allStickies-template").html());
	// 		var rendered = sticky_template({ stickies:this.collection.toJSON() }); 
	// 		var renderingElement = this.$el.html(rendered);
	// 		$('.renderedStickies').html(renderingElement);
	// 		var collectionVariable = this.collection;
	// 		this.delegateEvents();



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
Parse.initialize("ikflc6FJNbil71onUrPvUaM8sqT3wvOzyKf2dMND", "nvoIzKfcRJ4faVv7RaLFsWHlbIkLMoLlmsLpCbbU");

var App = {};

var newProjectCollection = new ProjectCollection();
var newStickyCollection = new StickyCollection();
var newJournalCollection = new JournalCollection();

newProjectCollection.fetch().done(function(){


	newStickyCollection.fetch().done(function(){
	

		newJournalCollection.fetch().done(function(){

			App.myRouter = new Router();
			Backbone.history.start();

		});
	});
});

$('.IdeaBoardBtn').on('click',function(){
	App.myRouter.navigate("", { trigger: true });
});

$('.JournalsBtn').on('click', function(){
	App.myRouter.navigate("Journal", { trigger: true });
});


$('.ProjectsBtn').on('click', function(){
	App.myRouter.navigate("Project", { trigger: true });
});

$('.viewProjectsSlideBtn').on('click', function(){
	$('#projectsSlide').toggleClass('show');
	var newSideBarProjectsView = new sideBarProjectsView( {collection: newProjectCollection} );
});

$('.logOutBtn').on('click', function(){
	Parse.User.logOut();
 	var currentUser = Parse.User.current();
 	App.myRouter.navigate("login", {trigger: true});
});
// $('.viewProjectsSlideBtn').on('click', function(){
// 	$('#projectsSlide').toggleClass('show');

// });


// var project_template = Handlebars.compile($('#projects-template').html());
// var rendered = project_template( {projects:newProjectCollection.toJSON() })
// $('#projectsSlide').html(rendered);






// $('#projectsSlide').droppable({ tolerance: "fit" });

// $('#projectsSlide').droppable({ accept: '.column'});

// // var accept = $('#projectsSlide').droppable( "option", "accept" );
 
// $('#projectsSlide').droppable( "option", "accept", ".column" );

// $('#projectsSlide').on( "drop", function( event, ui ) {
// 	alert('dropped');
// });



