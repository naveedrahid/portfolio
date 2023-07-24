const express = require('express');
const path = require('path');
const ejs = require('ejs');
const connectDB = require('./server/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use('/admin', apiRoutes);
const homeRoutes = require('./routes/home');

app.use('/', homeRoutes);

const startApp = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log('Error starting the app:', error);
    }
};

startApp();
