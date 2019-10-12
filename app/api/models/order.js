const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	item: String,
	quantity: Number,
	total: Number,
	user: String
});

module.exports = mongoose.model('Order', OrderSchema)