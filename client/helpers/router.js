import { Router } from 'meteor/iron:router';
Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', function () {
  // Redirect users based on their roles
  console.log("hh");
  if (Meteor.user()) {
    const role = Meteor.user().profile.role;
    console.log(role);
    switch (role) {
      case 'admin':
        this.redirect('/admin');
        break;
      case 'borrower':
        this.redirect('/borrower');
        break;
      case 'lender':
        this.redirect('/lender');
        break;
      default:
        this.redirect('/login'); // Redirect unauthorized users
        break;
    }
  } else {
    this.redirect('/login'); // Redirect unauthenticated users
  }
});




Router.route('/login', function () {
  this.render('login');
});

Router.route('/register',function () {
    this.render('register');
})

Router.route('/admin', function () {
  this.render('admin');
});

Router.route('/borrower', function () {
  this.render('borrower');
});

Router.route('/lender', function () {
  this.render('lender');
});
