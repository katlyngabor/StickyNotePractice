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
 	App.myRouter.navigate("", { trigger:true });
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



