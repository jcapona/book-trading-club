/**
 * Prop.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		user_id: {
            type: 'string',
        },
  		user: {
            type: 'string',
        },
        book_id: {
        	type: 'string',
        },
        toJSON: function() {
            return this.toObject();
        }
  }
};