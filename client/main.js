import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Loans } from '../collections/loans';

import './register.html';
import './borrower.html';
import './lender.html';
import './admin.html'

Template.register.events({
  'submit form': function(event) {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;
    var role = event.target.role.value;

    Accounts.createUser({
      email: email,
      password: password
    }, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        const userId = Meteor.userId();
        Meteor.call('users.setRole', userId, role);
      }
    });
  }
});

Template.borrower.events({
  'submit form': function(event) {
    event.preventDefault();
    var amount = event.target.amount.value;

    Loans.insert({
      amount: amount,
      borrowerId: Meteor.userId(),
      status: 'requested'
    });
  }
});

Template.borrower.helpers({
  loans: function() {
    return Loans.find({ borrowerId: Meteor.userId() });
  }
});

Template.lender.events({
  'click .confirm-payment': function(event) {
    var loanId = event.target.getAttribute('data-id');

    Loans.update(loanId, { $set: { status: 'paid' } });
  }
});

Template.lender.helpers({
  loans: function() {
    return Loans.find({ status: 'requested' });
  }
});

Template.admin.helpers({
  allTransactions: function() {
    return Loans.find();
  }
});
