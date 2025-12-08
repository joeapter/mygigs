import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { supabase } from '../../lib/supabase';

type Post = { id: string; title: string | null; caption: string | null; media_urls: string[] | null; created_at: string };
type Profile = { id: string; first_name: string | null; last_name: string | null; company: string | null };

export default function PosterPage({ profile, posts }: { profile: Profile | null; posts: Post[] }) {
  if (!profile) return <main style={{ padding: 24 }}>Not found</main>;

  const posterName =
    profile.company ||
    [profile.first_name, profile.last_name].filter(Boolean).join(' ') ||
    'Poster';

  return (
    <>
      <Head>
        <title>{posterName} — MyGigs</title>
      </Head>
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 16, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <h1 style={{ marginBottom: 6 }}>{posterName}</h1>
        <p style={{ color: '#555', marginBottom: 16 }}>Recent posts</p>
        {posts.length === 0 ? (
          <p style={{ color: '#777' }}>No posts yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {posts.map((p) => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 12, padding: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {p.media_urls?.[0] ? (
                  <img
                    src={p.media_urls[0]}
                    alt={p.title || 'Post image'}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10 }}
                  />
                ) : (
                  <div style={{ width: '100%', height: 180, borderRadius: 10, background: '#f3f3f3' }} />
                )}
                {p.title && <div style={{ fontWeight: 700, marginTop: 8 }}>{p.title}</div>}
                {p.caption && <div style={{ color: '#555', fontSize: 14, marginTop: 4 }}>{p.caption}</div>}
                <div style={{ color: '#777', fontSize: 12, marginTop: 6 }}>
                  {new Date(p.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  if (!id) return { props: { profile: null, posts: [] } };

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, company')
    .eq('id', id)
    .single();

  const { data: posts } = await supabase
    .from('poster_social_posts')
    .select('id, title, caption, media_urls, created_at')
    .eq('profile_id', id)
    .order('created_at', { ascending: false });

  return { props: { profile: profile ?? null, posts: posts ?? [] } };
};
