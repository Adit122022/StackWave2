const mongoose = require('mongoose');
const connect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('🐰🐼🐼MongoDB Connected...✅✅✅ ... 🐼🐼🐰'))
        .catch(err => console.log(err));
}

module.exports = connect;