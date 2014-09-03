var SingleJournalView = Backbone.View.extend({

	className: 'singleJournal',

	events:{
		'click .editSingleJournalBtn' : 'editJournal',
		'click .submitJournalBtn' : 'submitJournal',
		'click .cancelJournalBtn' : 'cancelJournal'

	},

	initialize: function(attributes){
		// this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy',this.render, this);
		this.collection.on('add', this.render, this);
		this.singleJournal = this.collection.get(attributes.journalid);
		// this.myJournal = this.singleJournal;	
		this.render();
	},

	render: function(){
		// this.singleJournal = this.collection.get(attributes.journalid);
		var singleJournalView_template = Handlebars.compile($('#singleJournalView-template').html());
		console.log(this.singleJournal);
		var rendered = singleJournalView_template(this.singleJournal.toJSON());
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
	},

	editJournal: function(e){
		console.log('yo');
		e.preventDefault();
		e.stopPropagation();
		var journalid = $(event.target).attr('id');
		App.myRouter.navigate('editJournal/'+journalid, { trigger: true });

	}
	
	

	// 	var journalid = $(event.target).attr('id');
	// 	var singleJournal = this.collection.get(journalid);
 //  	singleJournal.save({
 //  		title: $('.journalTitleInput').val(),
 //  		content: $('.journalInput').val()
 //  	});	
	// },

	// cancelJournal: function(e){
	// 	e.preventDefault();
	// 	e.stopPropagation();

	// 	$('.overlay').toggleClass('shown');

	// }
	   
});