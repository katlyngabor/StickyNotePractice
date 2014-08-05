var LoginView = Backbone.View.extend({

	className: 'loginContainers',

	events: {
		'click .loginBtn' : 'loggingIn',
		'click .signUpBtn' : 'signingUp'
	}, 

	initialize: function(){
		this.render();
	},

	render: function(){
		
	}

});