var StickyModel = Parse.Object.extend({

	className:'mainStickies',

	idAttribute: 'objectId'

});


var StickyCollection = Parse.Collection.extend({

	model: StickyModel

});