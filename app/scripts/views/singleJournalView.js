var SingleJournalView = Backbone.Model.extend({

	className: 'singleJournal',

	events:{
		
	},

	initialize: function(attributes){
		this.render();
		this.singleJournal = this.collection.get(attributes.journalid);
		// console.log(attributes.journalid);
	},

	render: function(){
		// var journalid = $(event.target).attr('id');
		console.log(this.singleJournal);
		var singleJournalView_template = Handlebars.compile($('#singleJournalView-template').html());
		var rendered = singleJournalView_template(this.singleJournal.toJSON());
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		this.delegateEvents();
	}
});