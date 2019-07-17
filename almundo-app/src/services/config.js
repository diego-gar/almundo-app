// ============================
//  Configuracion del puerto segun entorno
// ============================
export const baseUrl = (process.env.NODE_ENV !== 'prod') ? 'http://localhost:3001' : '';