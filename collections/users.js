import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  const existingUser = Meteor.users.findOne({ 'emails.address': email });

  if (!existingUser) {
    return true;
  }

  throw new Meteor.Error('email-already-in-use', 'This email is already in use.');
});

Meteor.methods({
  'users.setRole': (userId, role) => {
    Roles.setUserRoles(userId, role);
  }
});
