const { Schema, model } = require('mongoose');
const moment = require('moment')


// Create a pizza schema (or table)
const PizzaSchema = new Schema({
  pizzaName: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now /* if no date is provided then use the date.now javascript built in tool */,
    get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') // getter 
  },
  size: {
    type: String,
    required: true,
    enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
    default: 'Large'
  },
  toppings: [],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
},
{
  toJSON: {
    // to be able to use the getters and virtuals, we need to transfer them to json
    virtuals: true,
    getters: true
  }
});

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});


// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;