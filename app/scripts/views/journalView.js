var JournalView = Backbone.View.extend({

	className: "allJournals",

	events:{

		'click .addJournalBtn' : 'addJournal',
		'click .submitJournalBtn' : 'submitJournal',
		'click .saveJournalBtn' : 'saveJournal',
		'click .cancelJournalBtn' : 'cancelJournal',
		'click .journalTitleBtn' : 'singleJournal',
		'click .deleteJournalBtn' : 'deleteJournal',
		'click .editJournalBtn' : 'editJournal'

	},

	initialize: function(){
		this.render();
		// $('.sticky-container').removeClass();
		// this.collection.on('change', this.render, this);
		// this.collection.on('destroy', this.render, this);
		// this.collection.on('add', this.render, this);  
		$('.viewProjectsSlideBtn').show();
		$('#projectsSlide').show();
	},

	render: function(){
		var journal_template = Handlebars.compile($('#journals-template').html());
		var rendered = journal_template( {journals:this.collection.toJSON() })
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		var myCollection = this.collection;


		var coordinates = function(element) {
				element = $(event.target);
				var top = element.position().top;
				var left = element.position().left;
				var journalid = element.attr('id');
				var singleJournal = myCollection.get(journalid);
				singleJournal.save({
					topLocation: top,
					leftLocation: left
				})
			}

			$(".journalContainer").draggable({
		    stop: function() {
		        coordinates('.journalContainer');
		    }
			})

	},

	addJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.overlay').toggleClass('shown');
	},

	submitJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
	
		var new_journal = new JournalModel({
			title: $('.journalTitleInput').val(),
  		content: $('.journalInput').val()
  	});

			new_journal.save(null,{
	    success:function(new_journal) {
	     	newJournalCollection.add(new_journal);
	    }	
	  });	
	},

	cancelJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.overlay').toggleClass('shown');
	},

	singleJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		var journalid = $(event.target).attr('id');
		App.myRouter.navigate('#journal/'+journalid, { trigger: true });
	},

	editJournal: function(){
		e.preventDefault();
		e.stopPropagation();

	},

	deleteJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		var journalid = $(event.target).attr('id');
		var singleJournal = this.collection.get(journalid);
		if (window.confirm("Are you sure you want to delete this post?")) {
      singleJournal.destroy();
		}
	}




});