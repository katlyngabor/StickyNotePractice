var ProjectView = Backbone.View.extend({

	className : 'allProjects',

	events:{		
		'click .addNewProjectBtn' : 'addNewProject',
		'click .submitProjectInfo' : 'submitProject',
		'click .deleteProjectBtn' : 'deleteProject',
		'click .singleViewBtn' : 'singleView'
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
		$('.projectTitle').on('click', function(){
			$('.hoverContainer').addClass('showHover');
		})
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
			journals:[],
			stickies:[]
  	});

			new_project.save(null,{
	    success:function(new_project) {
	     	newProjectCollection.add(new_project);
	    }	
	  });

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