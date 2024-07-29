const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB=async ()=>{
try {
  const conn = await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("CONNECTED::::",conn.connection.host);
} catch (error) {
  console.log("MONGODB ERROR::::",error)
  process.exit(1);
}
};

module.exports = connectDB;