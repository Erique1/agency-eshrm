#!/bin/bash

# Script to generate bcrypt password hash for admin user
# Usage: ./generate-password-hash.sh "your_password_here"

if [ -z "$1" ]; then
    echo "Usage: ./generate-password-hash.sh <password>"
    echo "Example: ./generate-password-hash.sh MySecurePassword123!"
    exit 1
fi

PASSWORD="$1"

# Generate bcrypt hash using Node.js
node -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('$PASSWORD', 10).then(hash => {
    console.log('');
    console.log('Password Hash Generated:');
    console.log('========================');
    console.log(hash);
    console.log('');
    console.log('Use this hash in the SQL command:');
    console.log('UPDATE admin_users SET password_hash = \"' + hash + '\" WHERE email = \"admin@eshrm.africa\";');
    console.log('');
});
"
