/**
 * Book.js
 *
 * @description :: Model of a book
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        title: {
            type: 'string',
            minLength: 6,
            required: true,
        },
        author: {
            type: 'string',
            required: true,
        },
        isbn: {
            type: 'string',
            minLength: 6,
            required: true,
            unique: true
        },
        toJSON: function() {
            return this.toObject();
        }
    }
};
