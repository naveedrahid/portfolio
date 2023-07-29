const webRoutes = require('./webRoutes');

module.exports = (app) => {
  app.use('/', webRoutes);
};
