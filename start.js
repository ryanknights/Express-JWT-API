const env = require('dotenv');

env.config();

const app = require('./server');

const port = process.env.PORT || 4007;

// Start Application
app.listen(port, () => console.log(`App listening on port ${port}`));
