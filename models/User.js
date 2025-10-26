import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bucketProducts:[
        {
            item:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
            addedAt: {type:Date, default:Date.now}
        }
    ],
    savedProducts:[
        {
            item: {type:mongoose.Schema.Types.ObjectId,required: true , ref:"Product"},
            addedAt: {type:Date, default:Date.now},
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId, required: true,
            ref:"Review"
        }
    ]

})

export default  mongoose.model('User', userSchema);
