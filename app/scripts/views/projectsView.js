var ProjectView = Backbone.View.extend({

	className : 'allProjects',

	events:{

		'click .deleteProjectBtn' : 'deleteProject',
		'click .singleViewBtn' : 'singleView',
		'click .addNewProjectBtn' : 'addNewProject'
	},

	initialize: function(){
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

	addNewProject: function(e){
		e.preventDefault();
		e.stopPropagation();
		var new_project = new ProjectModel({
			journals:[],
			stickies:[]

  	});

			new_project.save(null,{
	    success:function(new_project) {
	     	newProjectCollection.add(new_project);
	    }	
	  });

	}



});