// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3001;

// ============================
//  Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  String de coneccion a MongoDB
// ============================
// Aclaracion: Se pone la misma base para entorno dev y prod
// ============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb+srv://admin-user:Gpj7VIR0LQvdgmN4@cluster0-uhdq3.mongodb.net/almundo?retryWrites=true&w=majority";
} else {
    urlDB = "mongodb+srv://admin-user:Gpj7VIR0LQvdgmN4@cluster0-uhdq3.mongodb.net/almundo?retryWrites=true&w=majority";
}

process.env.MONGO_URI = urlDB;
