var JournalView = Backbone.View.extend({

	className: "allJournals",

	events:{

		'click .addJournalBtn' : 'addJournal',
		'click .saveJournalBtn' : 'saveJournal',
		'click .deleteJournalBtn' : 'deleteJournal',
		'click .editJournalBtn' : 'editJournal'

	},

	initialize: function(){
		this.render();
		this.collection.on('change', this.render, this);
		this.collection.on('destroy', this.render, this);
		this.collection.on('add', this.render, this);
	},

	render: function(){
		var journal_template = Handlebars.compile($('#journals-template').html());
		var rendered = journal_template( {journals:this.collection.toJSON() })
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		this.delegateEvents();
	},

	addJournal: function(e){
		e.preventDefault();
		e.stopPropagation();
		var journalid = $(event.target).attr('id');
		var singleJournal = this.collection.get(journalid);

	},

	saveJournal: function(e){
		e.preventDefault();
		e.stopPropagation();

	},

	editJournal: function(){
		e.preventDefault();
		e.stopPropagation();

	}




});