const express = require('express');

const app = express();
// init Middleware
app.use(express.json({ extended: false }));

const passRoutes = require('./routes/api/pass.js');
const auth = require('./routes/api/auth.js');
app.use('/pass', passRoutes);
app.use('/auth', auth);

app.get('/', (req, res) => res.send('System is Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));