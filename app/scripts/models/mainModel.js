var StickyModel = Parse.Object.extend({

	className:'mainStickies',

	idAttribute: 'objectId',


	initialize: function(){
		console.log('added');
	}


});

var StickyCollection = Parse.Collection.extend({

	model: StickyModel

});