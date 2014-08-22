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


