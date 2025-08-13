import Database from './src/db/db.js';

const initializeDatabase = async () => {
    try {
        await Database.createTables();
        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

initializeDatabase().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error('Error during database initialization:', error);
    process.exit(1);
});