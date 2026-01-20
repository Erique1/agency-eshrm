const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "eshrm_db",
  multipleStatements: true
};

async function seedDatabase() {
  let connection;

  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(dbConfig);

    // Execute SQL files in order
    const sqlFiles = [
      '001-create-database.sql',
      '003-create-admin-schema.sql',
      '004-content-management-schema.sql',
      '002-seed-data.sql'
    ];

    for (const sqlFile of sqlFiles) {
      const filePath = path.join(__dirname, sqlFile);
      console.log(`📄 Executing ${sqlFile}...`);

      if (fs.existsSync(filePath)) {
        const sqlContent = fs.readFileSync(filePath, 'utf8');

        // Split by semicolon and execute each statement
        const statements = sqlContent.split(';').filter(stmt => stmt.trim().length > 0);

        for (const statement of statements) {
          if (statement.trim()) {
            try {
              await connection.execute(statement);
            } catch (error) {
              // Ignore errors for statements that might already exist
              if (!error.message.includes('already exists') && !error.message.includes('Duplicate entry')) {
                console.warn(`⚠️  Warning executing statement from ${sqlFile}:`, error.message);
              }
            }
          }
        }

        console.log(`✅ ${sqlFile} executed successfully`);
      } else {
        console.log(`⚠️  ${sqlFile} not found, skipping`);
      }
    }

    console.log('✅ Database setup and seeding completed!');

    // Verify services were inserted
    try {
      const [services] = await connection.execute('SELECT COUNT(*) as count FROM services');
      console.log(`📊 Services in database: ${services[0].count}`);

      const [publishedServices] = await connection.execute('SELECT COUNT(*) as count FROM services WHERE published = 1');
      console.log(`📊 Published services: ${publishedServices[0].count}`);
    } catch (error) {
      console.log('⚠️  Could not verify services count:', error.message);
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the seeder
seedDatabase().catch(console.error);
