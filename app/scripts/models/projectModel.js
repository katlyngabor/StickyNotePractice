var ProjectModel = Parse.Object.extend({

	className: 'allProjects',

	idAttribute:"objectId"

});


var ProjectCollection = Parse.Collection.extend({
	model: ProjectModel
});
