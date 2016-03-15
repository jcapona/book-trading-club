/**
 * Interact.js
 *
 * @description :: Model of interactions between users
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        u_id_tx: {
            type: 'string',
            required: true,
        },
        u_id_rx: {
            type: 'string',
            required: true,
        },
        b_id: {
            type: 'string',
            required: true,
        },
        msg_tx: {
            type: 'string',
        },
        msg_rx: {
            type: 'string',
        },
        status: {
            type: 'boolean',
        },
        toJSON: function() {
            return this.toObject();
        }
    }
};
