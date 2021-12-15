import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class SessionCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SessionCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      location: String,
      time: Number,
      period: Array,
      'period.$': String,
      dateMonth: Array,
      'dateMonth.$': String,
      dateDay: Array,
      'dateDay.$': String,
      genres: String,
      capabilities: String,
      info: String,
      _id: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {SessionCollection}
 */
export const Sessions = new SessionCollection();
