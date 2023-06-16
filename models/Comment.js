const { Schema, model, Types } = require('mongoose');
const moment = require('moment')


// this is a subdocument and the reason why we initialize it befor the commentSchema because, we need to init something before we can invoque it
const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id.  just to remember that this schema is not a new table
    replyId: { 
      type: Schema.Types.ObjectId, // this is a way to create another id, because mangoose wont create ID's for you when it comes to subdocuments
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: true,
      trim: true
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal) // this is where we will use the getter 
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


// comment schema
const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') // getter
  },
  // use ReplySchema to validate data for a reply ( this will give us the data of any reply from the reply schema)
  replies: [ReplySchema]
},
{
  toJSON: {
    // to be able to use the getters and virtuals, we need to transfer them to json
    virtuals: true,
    getters: true
  }
});

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
