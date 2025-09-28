import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },

    title: { type: String, default: ""},           // name of the layout
    layout: String,
    customStyles:Object,
    visibleSections: Array,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Cv  = mongoose.model('Cv', cvSchema);
export default Cv;

