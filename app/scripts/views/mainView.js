StickyView = Backbone.View.extend({

		className: 'allStickies',

		events:{

				'click .saveSticky' : 'saveSticky'
		},

		// initialize: function(){

		// 	this.render();
		// 	this.collection.on('change', this.render, this);
		// 	this.collection.on('destroy',this.render, this);
		// 	this.collection.on('add', this.render,this);
		// },

		// render: function(){

		// 	var sticky_template = Handlebars.compile($("#allStickies-template").html());
		// 	var rendered = template({ posts:this.collection.toJSON() });
		// },

		saveSticky:function(){
			console.log('in saveSticky function');
			$('.saveSticky').on('click', function(e){
  			e.preventDefault();
  			e.stopPropagation();
  			var new_sticky = new StickyModel({
  				content: $('.stickyText').val()
  
  			});

  			new_sticky.save(null,{
    			success:function(new_sticky) {
      			newStickyCollection.add(new_sticky);
      			console.log('saved');
    			}	
  			});


			})
		}

});


