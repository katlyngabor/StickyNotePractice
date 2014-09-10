var LoginView = Backbone.View.extend({

	className: 'loginContainer',

	events: {
		'click .loginBtn' : 'logIn',
		'click .signUpBtn' : 'signUp',
		'click .newUserBtn' : 'newUser',
		'click .returningUser' : 'returningUser'
	}, 

	initialize: function(){
		$('.logo').hide();
		$('#fixThis').removeClass('sticky-container');
		$('#menu').hide();	
		this.render();
	},

	render: function(){	
		var login_template = Handlebars.compile($('#login-template').html());
		var rendered = login_template();
		var renderingElement = this.$el.html(rendered);
		$('.renderedStickies').html(renderingElement);
		$('.viewProjectsSlideBtn').hide();
		$('#projectsSlide').hide();
		$('.logOutBtn').hide();
		this.delegateEvents();
	},

	logIn: function(){

			Parse.User.logIn($('#loginInput').val(), $('#passwordInput').val(), {
			  success: function(user) {
			  	$('.sticky-container').addClass('sticky-container');
			 		App.myRouter.navigate('', { trigger: true });

			  },
			  error: function(user, error) {
			    // The login failed. Check error to see why.
			  }
			});

		},

		newUser: function(){
			var signUp_template = Handlebars.compile($('#signUp-template').html());
			var rendered = signUp_template();
			var renderingElement = this.$el.html(rendered);
			$('.renderedStickies').html(renderingElement);
			$('.viewProjectsSlideBtn').hide();
			$('#projectsSlide').hide();
			this.delegateEvents();
		},

		signUp: function(){
			var user = new Parse.User();
			user.set("username", $('#signUpInput').val() );
			user.set("password", $('#newPasswordInput').val() );
		 
		 
			user.signUp(null, {
			  success: function(user) {
			    App.myRouter.navigate('', { trigger: true });
			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
		  	}
			});

		},

		returningUser: function(){
			var login_template = Handlebars.compile($('#login-template').html());
			var rendered = login_template();
			var renderingElement = this.$el.html(rendered);
			$('.renderedStickies').html(renderingElement);
		}

});