var JournalModel = Parse.Object.extend({

	className: 'mainJournals',

	idAttribute: 'objectId'	

});

var JournalCollection = Parse.Collection.extend({

	model: JournalModel

});