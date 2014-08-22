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
  				$( ".projectContainer" ).on( "dropover", function( event, ui ) {
						$(ui.draggable[0]).css('width', '50px');
						$(ui.draggable[0]).css('height', '80px');
						$(ui.draggable[0]).css('background-image', 'url("../images/comp_notebook small.jpg")');
						$('.deleteJournalBtn').css('font-size','8px');
			 		});
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
