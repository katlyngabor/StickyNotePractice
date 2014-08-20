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
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
		this.collection.on('add', this.render, this);
		$('.viewProjectsSlideBtn').hide();
		$('#projectsSlide').hide();
	},

	render: function(){
		var project_template = Handlebars.compile($('#projects-template').html());

		// Parse.Query(mainStickies)
		// Look for all stickies that have a 'project' value of current project id
		// return from query.find is 'results' which is your array of stickies that match
		// projects: this.collection.toJSON(), stickies: results

		// var mainstickies = stopPropagationrse.Object.extend("mainStickies");
		
		//     alert("Successfully retrieved " + results.length + " scores.");
//     // Do something with the returned Parse.Object values
//     for (var i = 0; i < results.length; i++) { 
//       var object = results[i];
//       alert(object.id + ' - ' + object.get('playerName'));
//     }
//   },
//   error: function(error) {
//     alert("Error: " + error.code + " " + error.message);
//   }
// });
		var rendered = project_template( {projects:this.collection.toJSON() })
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		this.delegateEvents();
		// $('.projectTitle').on('click', function(){
		// 	$('.hoverContainer').addClass('showHover');
		// })
	},

	singleView: function(e){
		e.preventDefault();
		e.stopPropagation();
		var projectid = $(event.target).attr('id');
	 	App.myRouter.navigate('#project/'+projectid, { trigger: true });
	},
		
		// var projectid = $(event.target).attr('id'
		

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
			// journals:[],
			// stickies:[]
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