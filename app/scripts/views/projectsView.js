var ProjectView = Backbone.View.extend({

	className : 'allProjects',

	events:{

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
	}


});