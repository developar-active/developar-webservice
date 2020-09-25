const { Schema, model } = require('mongoose');

/**
 * Subscriber Instance
 * @typedef {Object} SubscriberInstance
 * @property {string} [_id] - Id
 * @property {string} email - Email
 * @property {string} [userAgent] - User Agent
 * @property {string} [createdAt] - Created timestamp
 * @property {string} [updatedAt] - Updated timestamp
 */

const SubscriberSchema = new Schema({
	email: {
		type: String,
		maxlength: 254,
		required: true,
		unique: true
	},
	userAgent: {
		type: String,
		required: false
	}
},
{
	versionKey: false,
	timestamps: true
});

module.exports = model('subs', SubscriberSchema);