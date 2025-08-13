// utils/database.js
const sql = require('mssql');

const dbConfig = {
  user: 'amplifyapp_test',
  password: '',
  server: 'amplify.database.windows.net',
  database: 'Amplify-test',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function executeQuery(query) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(query);
    await sql.close();
    return result.recordset;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

async function getCreatedDates() {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT TOP 1 HouseholdName, CreatedDate FROM CRM_Household');
    await sql.close();
    return result.recordset;
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
}


module.exports = { executeQuery,getCreatedDates };
