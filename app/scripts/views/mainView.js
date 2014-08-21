	var StickyView = Backbone.View.extend({

		className:'all-stickies',

		events:{
				'click .addNewStickyBtn' : 'addSticky',
				'click .saveStickyBtn' : 'saveSticky',
				'click .deleteStickyBtn' : 'deleteSticky',
				'click .sticky-content' : 'editSticky'
		},

		initialize: function(){	
			 $('.sticky-container').addClass('sticky-container');
			this.render();
			this.collection.on('change', this.render, this);
			this.collection.on('destroy',this.render, this);
			this.collection.on('add', this.render, this);
			$('.viewProjectsSlideBtn').show();
			$('#projectsSlide').show();
		},

		render: function(){
			var sticky_template = Handlebars.compile($("#allStickies-template").html());
			var rendered = sticky_template({ stickies:this.collection.toJSON() }); 
			var renderingElement = this.$el.html(rendered);
			$('.renderedStickies').html(renderingElement);
			var collectionVariable = this.collection;
			this.delegateEvents();

			var coordinates = function(element) {
				element = $(event.target);
				var top = element.position().top;
				var left = element.position().left;
				var stickyid = element.attr('id');
				var singleSticky = collectionVariable.get(stickyid);
				singleSticky.save({
					topLocation: top,
					leftLocation: left
				})
			}

			$(".column").draggable({
		    stop: function() {
		        coordinates('.column');
		    }
			})
	    // .click(function(){
	    //    if ( $(this).is('.ui-draggable-dragging') ) {
	    //         return;
	    //    }
	    //    $(this).draggable( "option", "disabled", true );
	    //    $(this).attr('contenteditable','true');
	    // })
	    // .blur(function(){
	    //   $(this).draggable( 'option', 'disabled', false);
	    //   $(this).attr('contenteditable','false');
	    //   var setZindex = 2;
	    //   $(this).each(function() {
	    //     var z = parseInt($(this).css('z-index'));
	    //     if(isNaN(z)) z = 2;
	    //     if(z > setZindex) setZindex = z;
	   	// 	 });
	    // 	$(this).css('z-index', setZindex+1);

	    // });
	    
			}, 

		addSticky : function(e){
			e.preventDefault();
			e.stopPropagation();
			var new_sticky = new StickyModel({
  			content: $('.stickyText').val()

  			 });	
  			
  			new_sticky.save(null,{
	    		success:function(new_sticky) {
	      		newStickyCollection.add(new_sticky);
	    		}	
	  		});
		},

		saveSticky:function(e){
			e.preventDefault();
  		e.stopPropagation();
  		var stickyid = $(event.target).attr('id');
			var singleSticky = this.collection.get(stickyid);
  		singleSticky.save({
  			content: $(event.target).next().val() //explain this
  		});	
		},

		deleteSticky: function(e){
			console.log('in delete sticky function');
			e.preventDefault();
			e.stopPropagation();
			var stickyid = $(event.target).attr('id');
			var singleSticky = this.collection.get(stickyid);
			if (window.confirm("Are you sure you want to delete this post?")) {
      	singleSticky.destroy();
    	}
		}

});


