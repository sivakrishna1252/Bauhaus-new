import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Loader2 } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBlogBySlug } from '@/lib/api';
import { MOCK_BLOGS, BlogPost as BlogPostType } from './Blog';
import heroImage from '@/assets/hero-living-room.jpg';

const BlogPost = () => {
    const { id: slug } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPostType | any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await fetchBlogBySlug(slug);
                setPost(data);
                setError(false);
            } catch (err) {
                console.error('API fetch failed, checking mocks:', err);
                const mockMatch = MOCK_BLOGS.find(m => m.slug === slug);
                if (mockMatch) {
                    setPost(mockMatch);
                    setError(false);
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [slug]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-gold" />
                    <p className="text-muted-foreground font-serif">Arriving at your story...</p>
                </div>
            </Layout>
        );
    }

    if (error || !post) {
        return <Navigate to="/blog" replace />;
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const renderContent = () => {
        // Dynamic content from API or Mock Fallback (supports HTML content)
        if (post.content) {
            return (
                <div
                    className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-muted-foreground prose-a:text-gold prose-li:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            );
        }

        // Fallback
        return (
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-muted-foreground prose-a:text-gold prose-li:text-muted-foreground">
                <p>Content coming soon...</p>
            </div>
        );
    };

    return (
        <Layout>
            <div className="h-[40vh] relative flex items-center justify-center bg-zinc-900 overflow-hidden">
                <img src={post.featured_image || heroImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="relative z-10 text-center container-custom px-4">
                    <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] mb-4 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                        <span className="font-semibold">Trends</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl lg:text-6xl text-white font-serif tracking-tight leading-tight max-w-4xl mx-auto"
                    >
                        {post.title}
                    </motion.h1>
                </div>
            </div>

            <article className="py-20 bg-background">
                <div className="container-custom max-w-3xl">
                    <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-gold transition-colors mb-10 group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-12 border-b border-border pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formattedDate}
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-foreground font-serif">By {post.author || 'Bauhaus Studio'}</span>
                        </div>
                    </div>

                    {renderContent()}

                    <div className="mt-16 pt-10 border-t border-border">
                        <h3 className="font-serif text-2xl mb-6" style={{ fontFamily: "plus jakarta sans" }}>Share this article</h3>
                        <div className="flex gap-4">
                            <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out this article: ${post.title}`, '_blank')}>Twitter</Button>
                            <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>Facebook</Button>
                            <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`, '_blank')}>LinkedIn</Button>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default BlogPost;
