/**
 * User.js
 *
 * @description :: Model of a simple user of the app
 *
 */

var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            minLength: 6,
            required: true,
            unique: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        name: {
            type: 'string',
            required: true
        },
        city: {
            type: 'string',
        },
        state: {
            type: 'string',
        },
        avatar: {
            type: 'string',
            defaultsTo: 'http://www.iitedu.org.in/img/unknown_user.png'
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};
