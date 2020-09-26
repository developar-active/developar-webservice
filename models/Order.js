const { Schema, model } = require('mongoose');

/**
 * Order Instance
 * @typedef {Object} OrderInstance
 * @property {string} [_id] - Id
 * @property {string} name - Name
 * @property {string} [email] - Email
 * @property {string} phone - Phone
 * @property {string} [category] - Order category
 * @property {string} plan - Order plan
 * @property {string} message - Order message
 * @property {string} [userAgent] - User Agent
 * @property {string} [createdAt] - Created timestamp
 * @property {string} [updatedAt] - Updated timestamp
 */

const OrderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		maxlength: 254,
		required: false
	},
	phone: {
		type: String,
		maxlength: 16,
		required: true
	},
	category: {
		type: String,
		default: 'Unknown'
	},
	plan: {
		type: String,
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

module.exports = model('orders', OrderSchema);