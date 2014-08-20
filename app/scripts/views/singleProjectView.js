SingleProjectView = Backbone.View.extend({

	className: 'singleProject',

	events:{
		'click .closeSingleViewBtn' : 'closeSingleView'
	},

	initialize: function(attributes){
		this.singleProject = this.collection.get(attributes.projectid);
		this.render();
	},

	render: function(){
		var self = this
		var projectid = $(event.target).attr('id');
		var query = new Parse.Query("mainStickies");
		query.equalTo("project", projectid);
		query.find({	
		  success: function(results) {
		  	if (results.length > 0){
		  		results.forEach(function(sticky){
			  		var stickiesProject = sticky.get('content');
			  		$('.renderedStickies').html(stickiesProject);
		  		})
		  	}
		  	else {
		  		$('.renderedStickies').html('Add some brilliance to this project :)')
		  	}
			}
		})
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


