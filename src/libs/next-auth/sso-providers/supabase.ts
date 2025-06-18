

interface SupabaseProfile {
  sub: string;
  email: string;
  email_verified: boolean;
  phone: string | null;
  phone_verified: boolean;
  role: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  identities: Array<Record<string, any>>;
  created_at: string;
  updated_at: string;
}

export default function Supabase(options: any) {
  return {
    id: 'supabase',
    name: 'Supabase',
    type: 'oauth',
    version: '2.0',
    scope: 'openid email profile',
    params: { grant_type: 'authorization_code' },
    accessTokenUrl: `${options.issuer}/token`,
    authorization: {
      url: `${options.issuer}/authorize`,
      params: { scope: 'openid email profile' },
    },
    profileUrl: `${options.issuer}/userinfo`,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    issuer: options.issuer,
    profile(profile: any) {
      return {
        id: profile.sub,
        name: profile.user_metadata?.full_name || profile.email,
        email: profile.email,
        image: null,
      };
    },
  };
}
