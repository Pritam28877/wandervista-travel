'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminShell } from '@/components/admin/AdminShell';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { api } from '@/lib/api';
import { keys } from '@/lib/hooks';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading } = useQuery({ queryKey: keys.blog(id), queryFn: () => api.getBlog(id) });

  if (isLoading) {
    return (
      <AdminShell title="Edit Post">
        <div style={{ padding: 'var(--space-10)', color: 'var(--gray-500)' }}>Loading…</div>
      </AdminShell>
    );
  }
  if (!data) {
    return (
      <AdminShell title="Edit Post">
        <div style={{ padding: 'var(--space-10)' }}>Post not found.</div>
      </AdminShell>
    );
  }
  return <BlogEditor existing={data.blog} />;
}
