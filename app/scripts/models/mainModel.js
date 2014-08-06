var StickyModel = Parse.Object.extend({

	className:'mainStickies',

	idAttribute: 'objectId',


	initialize: function(){

		var stickyId = this.get('id');
		// console.log(stickyId " has been added to your mainModel.");
	
		console.log('you are here');
	}


});

var StickyCollection = Parse.Collection.extend({

	model: StickyModel

});