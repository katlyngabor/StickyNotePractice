Parse.initialize("ikflc6FJNbil71onUrPvUaM8sqT3wvOzyKf2dMND", "nvoIzKfcRJ4faVv7RaLFsWHlbIkLMoLlmsLpCbbU");

var App = {};

var newStickyCollection = new StickyCollection();
var newJournalCollection = new JournalCollection();

newStickyCollection.fetch().done(function (){
	

	newJournalCollection.fetch().done(function(){

			App.myRouter = new Router();
			Backbone.history.start();

		});
});


$('.JournalsBtn').on('click', function(){
	App.myRouter.navigate("Journal", { trigger: true });
});





