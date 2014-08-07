var StickyView = Backbone.View.extend({

		el: ".trial",

		events:{
				'click .addNewStickyBtn' : 'addSticky',
				'click .saveStickyBtn' : 'saveSticky',
				'click .delete StickyBtn' : 'deleteSticky',
				'click .sticky-content' : 'editSticky'
		},

		initialize: function(){

			this.render();
			this.collection.on('change', this.render, this);
			this.collection.on('destroy',this.render, this);
			this.collection.on('add', this.render,this);
		},

		render: function(){
			var sticky_template = Handlebars.compile($("#allStickies-template").html());
			var rendered = sticky_template({ stickies:this.collection.toJSON() });
				this.$el.html(rendered);
			$(".column")
	    .draggable()
	    .click(function(){
	        if ( $(this).is('.ui-draggable-dragging') ) {
	            return;
	        }
	        $(this).draggable( "option", "disabled", true );
	        $(this).attr('contenteditable','true');
	    })
	    .blur(function(){
	        $(this).draggable( 'option', 'disabled', false);
	        $(this).attr('contenteditable','false');
	        var setZindex = 0;
	        $(this).each(function() {
	        var z = parseInt($(this).css('z-index'));
	        if(isNaN(z)) z = 0;
	        if(z > setZindex) setZindex = z;
	   		 });
	    	$(this).css('z-index', setZindex+1);
	    });
		}, 

		addSticky : function(e){
			e.preventDefault();
			e.stopPropagation();
			// $el.append(); //what element do I append it to?
		},

		saveSticky:function(e){
			console.log('in saveSticky function');
			e.preventDefault();
  		e.stopPropagation();
  		var new_sticky = new StickyModel({
  			content: $('.stickyText').val(),	
  			// tags: $('.tagsText').val()
  		});

	  		new_sticky.save(null,{
	    		success:function(new_sticky) {
	      		newStickyCollection.add(new_sticky);
	      		console.log('saved');
	    		}	
	  		});
		},

		// deleteSticky: function(e){
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	if (window.confirm("Are you sure you want to delete this post?")) {
  //     	this.singlePost.destroy({success: function () {
  //       	window.blog_router.navigate('', { trigger: true });
  //     	}});
  //   	}


		// }

		editSticky: function(e){
			e.preventDefault();

		}


});


