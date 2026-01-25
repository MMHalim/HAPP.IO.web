
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Fixing Supabase Storage policies...');

    // 1. Create bucket if not exists
    await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('imgs', 'imgs', true)
      ON CONFLICT (id) DO UPDATE SET public = true;
    `);
    console.log('Bucket "imgs" ensured.');

    // 2. Enable public SELECT
    try {
        await prisma.$executeRawUnsafe(`
            DROP POLICY IF EXISTS "Public Access" ON storage.objects;
        `);
        await prisma.$executeRawUnsafe(`
            CREATE POLICY "Public Access"
            ON storage.objects FOR SELECT
            TO public
            USING ( bucket_id = 'imgs' );
        `);
        console.log('Public SELECT policy created.');
    } catch (e) {
        console.error('Error creating SELECT policy:', e.message);
    }

    // 3. Enable public INSERT
    try {
        await prisma.$executeRawUnsafe(`
            DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
        `);
        await prisma.$executeRawUnsafe(`
            CREATE POLICY "Public Upload"
            ON storage.objects FOR INSERT
            TO public
            WITH CHECK ( bucket_id = 'imgs' );
        `);
        console.log('Public INSERT policy created.');
    } catch (e) {
        console.error('Error creating INSERT policy:', e.message);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
