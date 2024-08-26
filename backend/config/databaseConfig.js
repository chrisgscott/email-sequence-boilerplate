module.exports = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name',
  options: {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};