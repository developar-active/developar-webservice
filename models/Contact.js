const { Schema, model } = require('mongoose');

/**
 * Contact Instance
 * @typedef {Object} ContactInstance
 * @property {string} [_id] - Id
 * @property {string} name - Name
 * @property {string} email - Email
 * @property {string} message - Message
 * @property {string} [userAgent] - User Agent
 * @property {string} [createdAt] - Created timestamp
 * @property {string} [updatedAt] - Updated timestamp
 */

const ContactSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		maxlength: 254,
		required: true
	},
	message: {
		type: String,
		required: true
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

module.exports = model('contacts', ContactSchema);