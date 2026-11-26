import { getSupabaseClient } from '../config/supabase';

/**
 * Creates or promotes a Supabase Auth user to admin with `app_metadata: { role: 'admin' }`.
 *
 * Usage:
 *   npm run create-admin -- admin@vibesofegypt.com StrongPassword123!
 *   # or via env vars:
 *   ADMIN_EMAIL=admin@vibesofegypt.com ADMIN_PASSWORD=StrongPassword123! npm run create-admin
 */
async function createOrPromoteAdmin(): Promise<void> {
  const email = (process.argv[2] ?? process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();
  const password = (process.argv[3] ?? process.env.ADMIN_PASSWORD ?? '').trim();

  if (!email || !email.includes('@')) {
    console.error(
      'Usage: npm run create-admin -- <admin-email> <password>\n' +
        '   or: ADMIN_EMAIL=<email> ADMIN_PASSWORD=<password> npm run create-admin'
    );
    process.exit(1);
  }

  const supabase = getSupabaseClient();

  // Check if user already exists
  const { data: listData, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) {
    throw new Error(`Failed to list existing users: ${listError.message}`);
  }

  const existingUser = listData.users.find(
    (u) => (u.email ?? '').toLowerCase() === email
  );

  if (existingUser) {
    const existingAppMeta = (existingUser.app_metadata ?? {}) as Record<string, unknown>;
    const { data: updated, error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      {
        email_confirm: true,
        app_metadata: { ...existingAppMeta, role: 'admin' },
        ...(password ? { password } : {}),
      }
    );

    if (updateError || !updated.user) {
      throw new Error(`Failed to promote existing user: ${updateError?.message ?? 'Unknown error'}`);
    }

    console.log(
      `[create-admin] Promoted existing user "${updated.user.email}" (id: ${updated.user.id}) to role="admin".`
    );
    return;
  }

  if (password.length < 8) {
    console.error('Error: A password of at least 8 characters is required when creating a new admin user.');
    process.exit(1);
  }

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: 'admin' },
  });

  if (createError || !created.user) {
    throw new Error(`Failed to create admin user: ${createError?.message ?? 'Unknown error'}`);
  }

  console.log(
    `[create-admin] Created new admin user "${created.user.email}" (id: ${created.user.id}) with app_metadata.role="admin".`
  );
}

createOrPromoteAdmin().catch((err) => {
  console.error('[create-admin] Fatal error:', err);
  process.exit(1);
});
