import { API_BASE } from '../config';

export const fetchBlogs = async () => {
    const response = await fetch(`${API_BASE}/api/blogs/`);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
};

export const fetchBlogBySlug = async (slug: string) => {
    const response = await fetch(`${API_BASE}/api/blogs/${slug}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch blog post');
    }
    return response.json();
};
