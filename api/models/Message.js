/**
* Message.js
*
* @description :: Model of a message
* @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/

module.exports = {
  attributes: {
    user: 'string',
    messages: {
      type: 'integer',
      defaultsTo: 0
    },
    toJSON: function() {
      return this.toObject();
    }
  }
};
