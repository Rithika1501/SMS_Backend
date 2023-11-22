const mongoose = require('mongoose');

const SMSchema = new mongoose.Schema({
    subCode: String,
    subName: String,
    matLink: {
        type: String,
        validate: {
            validator: function(value) {
                // Simple URL validation
                const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
                return urlPattern.test(value);
            },
            message: props => `${props.value} is not a valid URL!`,
        },
    },
}, {
    timestamps: true
});

const MaterialsModel = mongoose.model("materials", SMSchema);
module.exports = MaterialsModel;
