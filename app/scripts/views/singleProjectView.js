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

		// $('.column2').draggable();
		// $('.journalContainer').draggable();

		// var coordinates = function(element) {
		// 		element = $(event.target);
		// 		var top = element.position().top;
		// 		var left = element.position().left;
		// 		var stickyid = element.attr('id');
		// 		var singleSticky = collectionVariable.get(stickyid);
		// 		singleSticky.save({
		// 			topLocation: top,
		// 			leftLocation: left
		// 		})
		// 	}

		// 	$(".column2").draggable({
		//     stop: function() {
		//         coordinates('.column');
		//     }
		// 	})
	 //    .click(function(){
	 //       if ( $(this).is('.ui-draggable-dragging') ) {
	 //            return;
	 //       }
	 //       $(this).draggable( "option", "disabled", true );
	 //       $(this).attr('contenteditable','true');
	 //    })
	 //    .blur(function(){
	 //      $(this).draggable( 'option', 'disabled', false);
	 //      $(this).attr('contenteditable','false');
	 //      var setZindex = 0;
	 //      $(this).each(function() {
	 //        var z = parseInt($(this).css('z-index'));
	 //        if(isNaN(z)) z = 0;
	 //        if(z > setZindex) setZindex = z;
	 //   		 });
	 //    	$(this).css('z-index', setZindex+1);

	 //    });

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


