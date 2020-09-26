const { Schema, model } = require('mongoose');

/**
 * Candidate Instance
 * @typedef {Object} CandidateInstance
 * @property {string} job - Job
 * @property {string} indexName - Index name
 * @property {string} [name] - Name
 * @property {string} [pictureURL] - Picture URL
 * @property {string} email - Email
 * @property {string} phone - Phone
 * @property {string} githubUsername - Github username
 * @property {string} [message] - Message
 * @property {string} [userAgent] - User Agent
 * @property {string} [createdAt] - Created timestamp
 * @property {string} [updatedAt] - Updated timestamp
 */

const CandidateSchema = new Schema({
	job: {
		type: String,
		required: true
	},
	indexName: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: false
	},
	pictureURL: {
		type: String,
		required: false
	},

	email: {
		type: String,
		required: true,
		maxlength: 254
	},
	phone: {
		type: String,
		required: false,
		maxlength: 16
	},
	githubUsername: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: false
	},
	
	userAgent: {
		type: String,
		required: false
	}
});

module.exports = model('candidates', CandidateSchema);