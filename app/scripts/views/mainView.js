StickyView = Backbone.View.extend({

		className: 'allStickies',

		events:{

				'click button' : 'saveSticky'

		},

		initialize: function(){

			this.render();
			this.collection.on('change', this.render, this);
			this.collection.on('destroy',this.render, this);
			this.collection.on('add', this.render,this);
		},

		render: function(){

			var sticky_template = Handlebars.compile($("#allStickies-template").html());
			var rendered = template({ posts:this.collection.toJSON() });
		},

		// saveSticky:function(){
		// 	$('.column').on('click', function(e){
  // 			// var sticky_id = $(event.target).attr('id');
  // 			// App.my_router.navigate('#post/'+postid, {trigger: true});
  // 			$('.column').focus();	
  // 			 var new_sticky = new StickyModel({
  // 				content: $('.column').val()
  
  // 			});

  // 			new_sticky.save(null,{
  //   			success:function(new_sticky) {
  //     		newStickyCollection.add(new_sticky);
  //     		console.log('saved');
  //   			}	
  // 			});


		// 	})
		// }

});

