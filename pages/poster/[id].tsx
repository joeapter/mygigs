import { useState } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { supabase } from '../../lib/supabase';

type Post = {
  id: string;
  title: string | null;
  caption: string | null;
  client_name: string | null;
  media_urls: string[] | null;
  created_at: string;
};
type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  profile_image_url: string | null;
  phone: string | null;
};

export default function PosterPage({ profile, posts }: { profile: Profile | null; posts: Post[] }) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!profile) return <main style={{ padding: 24 }}>Not found</main>;

  const posterName =
    profile.company ||
    [profile.first_name, profile.last_name].filter(Boolean).join(' ') ||
    'Poster';
  const personName = [profile.first_name, profile.last_name].filter(Boolean).join(' ');

  return (
    <>
      <Head>
        <title>{posterName} — MyGigs</title>
      </Head>
      <main className="page">
        <div className="container">
          <header className="profile">
            {profile.profile_image_url ? (
              <img src={profile.profile_image_url} alt={posterName} className="avatar" />
            ) : (
              <div className="avatar placeholder">{posterName.slice(0, 1)}</div>
            )}
            <div className="meta">
              <div className="company">{posterName}</div>
              {personName && <div className="person">{personName}</div>}
              {profile.phone && <div className="contact">Phone: {profile.phone}</div>}
            </div>
          </header>

          <div className="section-heading">
            <h2>Recent posts</h2>
            <p>Tap a post to view details.</p>
          </div>

          {posts.length === 0 ? (
            <p className="muted">No posts yet.</p>
          ) : (
            <div className="grid">
              {posts.map((p) => (
                <button
                  key={p.id}
                  className="card"
                  onClick={() => {
                    setSelectedPost(p);
                    setActiveImageIndex(0);
                  }}
                  type="button"
                  aria-label={p.title || 'View post'}
                >
                  {p.media_urls?.[0] ? (
                    <img
                      src={p.media_urls[0]}
                      alt={p.title || 'Post image'}
                      className="cover"
                    />
                  ) : (
                    <div className="cover placeholder" />
                  )}
                  {p.title && <div className="title">{p.title}</div>}
                  {p.caption && <div className="caption">{p.caption}</div>}
                  <div className="date">{new Date(p.created_at).toLocaleDateString()}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedPost && (
        <div className="modal-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{selectedPost.title || 'Post details'}</div>
                <div className="date">{new Date(selectedPost.created_at).toLocaleString()}</div>
                {selectedPost.client_name && <div className="client">Client: {selectedPost.client_name}</div>}
              </div>
              <button type="button" className="close" onClick={() => setSelectedPost(null)}>
                ×
              </button>
            </div>
            {selectedPost.media_urls?.length ? (
              <div className="gallery">
                <div className="main-media">
                  <img
                    src={selectedPost.media_urls[activeImageIndex]}
                    alt={selectedPost.title || 'Post image'}
                    className="modal-image"
                  />
                  {selectedPost.media_urls.length > 1 && (
                    <div className="controls">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((idx) =>
                            idx === 0 ? selectedPost.media_urls!.length - 1 : idx - 1
                          )
                        }
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((idx) =>
                            idx === selectedPost.media_urls!.length - 1 ? 0 : idx + 1
                          )
                        }
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
                {selectedPost.media_urls.length > 1 && (
                  <div className="thumbnails">
                    {selectedPost.media_urls.map((url, i) => (
                      <button
                        key={url}
                        type="button"
                        className={`thumb ${i === activeImageIndex ? 'active' : ''}`}
                        onClick={() => setActiveImageIndex(i)}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img src={url} alt={`Media ${i + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
            {selectedPost.caption && <p className="modal-caption">{selectedPost.caption}</p>}
          </div>
        </div>
      )}

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #f6f7fb;
          padding: 32px 16px 48px;
          display: flex;
          justify-content: center;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .container {
          width: 100%;
          max-width: 1200px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          padding: 20px 16px 28px;
        }
        @media (min-width: 960px) {
          .container {
            width: 60%;
            margin: 0 auto;
            padding: 28px 32px 36px;
          }
        }
        .profile {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          background: #eef1f6;
          flex-shrink: 0;
        }
        .avatar.placeholder {
          display: grid;
          place-items: center;
          color: #4a5568;
          font-weight: 700;
          font-size: 22px;
        }
        .meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .company {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
        }
        .person {
          color: #334155;
        }
        .contact {
          color: #475569;
          font-size: 14px;
        }
        .section-heading {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin: 12px 0 18px;
        }
        .section-heading h2 {
          margin: 0;
          font-size: 18px;
        }
        .section-heading p {
          margin: 0;
          color: #667085;
          font-size: 14px;
        }
        .muted {
          color: #667085;
        }
        .grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .card {
          text-align: left;
          background: #fff;
          border-radius: 12px;
          padding: 10px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          cursor: pointer;
          transition: transform 120ms ease, box-shadow 120ms ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }
        .cover {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          background: #f3f4f6;
          border: none;
        }
        .cover.placeholder {
          display: block;
        }
        .title {
          font-weight: 700;
          color: #111827;
        }
        .caption {
          color: #4b5563;
          font-size: 14px;
          line-height: 1.4;
        }
        .date {
          color: #6b7280;
          font-size: 12px;
        }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: grid;
          place-items: center;
          padding: 16px;
          z-index: 20;
        }
        .modal {
          background: #fff;
          border-radius: 14px;
          padding: 16px;
          max-width: 640px;
          width: min(640px, 100%);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.18);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }
        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }
        .close {
          background: #eef2f6;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
        }
        .modal-image {
          width: 100%;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 12px;
        }
        .gallery {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .main-media {
          position: relative;
        }
        .controls {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }
        .controls button {
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
        }
        .thumbnails {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 72px;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .thumb {
          border: 2px solid transparent;
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          background: transparent;
        }
        .thumb.active {
          border-color: #111827;
        }
        .thumb img {
          width: 100%;
          height: 64px;
          object-fit: cover;
          display: block;
        }
        .client {
          color: #334155;
          font-size: 14px;
          margin-top: 4px;
        }
        .modal-caption {
          color: #334155;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  if (!id) return { props: { profile: null, posts: [] } };

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, company, profile_image_url, phone')
    .eq('id', id)
    .single();

  const { data: posts } = await supabase
    .from('poster_social_posts')
    .select('id, title, caption, client_name, media_urls, created_at')
    .eq('profile_id', id)
    .order('created_at', { ascending: false });

  return { props: { profile: profile ?? null, posts: posts ?? [] } };
};
