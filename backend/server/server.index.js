require('dotenv').config();

const startServer = async (app, port) => {
    try {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log('Error starting the server:', error);
    }
};

module.exports = startServer;
