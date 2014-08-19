var sideBarProjectsView = Backbone.View.extend({

	className: 'allSidebarProjects',

	events:{
		'click .addNewProjectBtn' : 'addNewProject',
		'drop .column' : 'moveSticky',
		'drop .journalContainer' : 'moveJournal',
		'drag .column' : 'removeSticky',
		'drag .journalContainer' : 'removeJournal'
	},

	initialize: function(){
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
		this.collection.on('add', this.render, this);
		console.log('hi');

	},

	render: function(){
		var project_template = Handlebars.compile($('#projects-template').html());
		var rendered = project_template( {projects:this.collection.toJSON() })
		var renderingElement = this.$el.html(rendered);
		$('#projectsSlide').html(renderingElement);
		this.delegateEvents();
	},	

	addNewProject: function(e){
		e.preventDefault();
		e.stopPropagation();
		var new_project = new ProjectModel({
			stickies:[],
			journals:[]
  	});

			new_project.save(null,{
	    success:function(new_project) {
	     	newProjectCollection.add(new_project);
	    }	
	  });

	}





});




// $('.viewProjectsSlideBtn').on('click', function(){
// 	$('#projectsSlide').toggleClass('show');

// });







$('#projectsSlide').droppable({ tolerance: "fit" });

$('#projectsSlide').droppable({ accept: '.column'});

// var accept = $('#projectsSlide').droppable( "option", "accept" );
 
$('#projectsSlide').droppable( "option", "accept", ".column" );

$('#projectsSlide').on( "drop", function( event, ui ) {
	alert('dropped');
});