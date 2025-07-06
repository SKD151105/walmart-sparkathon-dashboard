const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

app.use(express.static('public'));          // Serve frontend
app.use('/api', apiRoutes);                 // All API routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
