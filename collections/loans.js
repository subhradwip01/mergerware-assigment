import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2/static';
export const Loans = new Mongo.Collection('loans');
Loans.attachSchema(new SimpleSchema({
  amount: {
    type: Number,
    label: 'Loan Amount'
  },
  borrowerId: {
    type: String,
    label: 'Borrower ID'
  },
  status: {
    type: String,
    allowedValues: ['requested', 'paid'],
    defaultValue: 'requested'
  }
}));
console.log(Loans);