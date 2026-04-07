const fs = require('fs');
const path = require('path');

// Get environment variables from Vercel
const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;

// Build environment object
const environment = {
  production: true,
  emailjs: {
    serviceId: emailjsServiceId || 'your_service_id_here',
    templateId: emailjsTemplateId || 'your_template_id_here',
    publicKey: emailjsPublicKey || 'your_public_key_here'
  }
};

// Write environment.prod.ts
const envProdPath = path.join(__dirname, '../src/environments/environment.prod.ts');
const envContent = `export const environment = ${JSON.stringify(environment, null, 2)};\n`;

try {
  fs.writeFileSync(envProdPath, envContent, 'utf-8');
  console.log(`✓ Environment file generated: ${envProdPath}`);
  console.log(`  - Service ID: ${emailjsServiceId ? '✓ set' : '✗ using default'}`);
  console.log(`  - Template ID: ${emailjsTemplateId ? '✓ set' : '✗ using default'}`);
  console.log(`  - Public Key: ${emailjsPublicKey ? '✓ set' : '✗ using default'}`);
} catch (error) {
  console.error('✗ Failed to generate environment file:', error.message);
  process.exit(1);
}
