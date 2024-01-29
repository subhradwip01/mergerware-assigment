import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
  // Define roles only if they don't already exist
  if (!roleExists('admin')) {
    Roles.createRole('admin');
  }
  if (!roleExists('borrower')) {
    Roles.createRole('borrower');
  }
  if (!roleExists('lender')) {
    Roles.createRole('lender');
  }
});

function roleExists(roleName) {
  const roles = Roles.getAllRoles().fetch();
  return roles.some(role => role._id === roleName);
}
