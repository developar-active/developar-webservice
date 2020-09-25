const { Schema, model } = require('mongoose');

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