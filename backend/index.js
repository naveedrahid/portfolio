const express = require('express');
const path = require('path');
const connectDB = require('./server/db');
const apiRoutes = require('./routes/apiRoutes');
const sideBarMenu = require('./utils/menuConstant');
const sweetalert2 = require('sweetalert2');
const bodyParser = require('body-parser');

// Parse JSON bodies for this app
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', apiRoutes);

app.use((req, res, next) => {
  res.locals.sideBarMenu = sideBarMenu;
  next();
});

const webRouteManager = require('./routes/webRouteManager');

webRouteManager(app);

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