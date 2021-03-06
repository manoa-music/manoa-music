import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfilesCollection. It encapsulates state and variable values for stuff.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      pic: String,
      description: String,
      link_1: { type: String, optional: true, defaultValue: '' },
      link_2: { type: String, optional: true, defaultValue: '' },
      link_3: { type: String, optional: true, defaultValue: '' },
      instruments: Array,
      'instruments.$': String,
      genres: { type: Array, optional: true, defaultValue: [] },
      'genres.$': String,
      goals: { type: Array, optional: true, defaultValue: [] },
      'goals.$': String,
      capabilities: { type: Array, optional: true, defaultValue: [] },
      'capabilities.$': String,
      // accOwner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profile = new ProfilesCollection();
