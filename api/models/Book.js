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
            minLength: 1,
            required: true,
        },
        author: {
            type: 'array',
            required: true,
        },
        isbn: {
            type: 'string',
            minLength: 6,
            required: true,
            unique: true
        },
        description: {
            type: 'string',
        },
        img: {
            type: 'string',
            defaultsTo: '/images/no-cover.png'
        },
        link: {
            type: 'string',
        },
        isbn10: {
            type: 'string',
        },
        isbn13: {
            type: 'string',
        },
        toJSON: function() {
            return this.toObject();
        }
    }
};
