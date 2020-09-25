const { Schema, model } = require('mongoose');

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
	}
},
{
	versionKey: false,
	timestamps: true
});

module.exports = model('contacts', ContactSchema);