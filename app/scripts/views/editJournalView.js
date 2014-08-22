var EditJournalView = Backbone.View.extend({

	className: 'editJournal',

	events:{
		'click .submitJournalBtn' : 'submitJournal',
		'click .cancelJournalBtn' : 'cancelJournal'
	},

	initialize: function(attributes){	
		// journalid = $(event.target).attr('id');
		$('#fixThis').addClass('sticky-container');
		this.singleJournal = this.collection.get(attributes.journalid);
		console.log(attributes.journalid);	
		this.render();
	},

	render: function(){
		var singleJournalView_template = Handlebars.compile($('#journals-template').html());
		var rendered = singleJournalView_template(this.singleJournal.toJSON());
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		$('.overlay').toggleClass('shown');
	},

	submitJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		var journalid = $(event.target).attr('id');
		var singleJournal = this.collection.get(this.singleJournal);
  	singleJournal.save({
  		title: $('.journalTitleInput').val(),
  		content: $('.journalInput').val()
  	});	
	},

	cancelJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.overlay').toggleClass('shown');
		journalid = $(event.target).attr('id');
		App.myRouter.navigate('#journal/'+journalid, { trigger: true });
	}

});











	

