// import { createClient } from '@supabase/supabase-js';

// // Replace these with your Supabase URL and API key
// const supabaseUrl = 'https://olsuhufpdhrjxiobqvxm.supabase.co';
// const supabaseKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sc3VodWZwZGhyanhpb2JxdnhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDYxNzI4NywiZXhwIjoyMDEwMTkzMjg3fQ.tsnJE08B-Miobofboo4vobJ7QtW2ORY31FqhHKRZ014';

// // Initialize Supabase client
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Define the extension installation SQL
// const extensionInstallationSQL = `
//   CREATE EXTENSION IF NOT EXISTS pg_trgm;
// `;

// // Run the extension installation SQL
// async function run() {
//   try {
//     const { data, error } = await supabase.from('rpc').rpc('exec', {
//       sql: extensionInstallationSQL,
//     });

//     if (error) {
//       console.error('Error installing extension:', error);
//     } else {
//       console.log('Extension installed successfully:', data);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     // Close the Supabase client connection
//     await supabase.close();
//   }
// }
