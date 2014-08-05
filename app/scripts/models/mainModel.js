var mainModel = Parse.Object.extend({

	className:'mainStickies',

	idAttribute: 'objectId',


	initialize: function(){

		var stickyId = this.get('id');
		console.log(stickyId " has been added to your mainModel.");
	}


});

var MainCollection = Parse.Collection.extend({

	model: mainModel

});