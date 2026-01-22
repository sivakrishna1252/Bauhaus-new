import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroImage from '@/assets/Blogs.jpg';
import placeholderImage from '@/assets/banner1.jpg';
import placeholderImage2 from '@/assets/banner2.jpg';
import placeholderImage3 from '@/assets/banner3.jpg';
import { fetchBlogs } from '@/lib/api';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    created_at: string;
    featured_image: string | null;
    author: string;
    isMock?: boolean; // Flag to identify mock data
}

export const MOCK_BLOGS: BlogPost[] = [
    {
        id: '5-trends-shaping-interior-design-pune-2024',
        slug: '5-trends-shaping-interior-design-pune-2024',
        title: '5 Trends Shaping Interior Design in Pune 2024',
        excerpt: "From sustainable materials to smart homes, discover the top interior design trends transforming Pune’s residential spaces this year.",
        content: `
            <p>Pune's interior design landscape is evolving rapidly, blending modern aesthetics with traditional warmth. Here are the top 5 trends shaping homes in 2024:</p>
            <h3>1. Biophilic Design</h3>
            <p>Bringing the outdoors in is more popular than ever. Pune homeowners are opting for indoor plants, natural light maximization, and organic materials like wood and stone to create serene living spaces.</p>
            <h3>2. Smart Home Integration</h3>
            <p>Technology meets design. Automated lighting, smart curtains, and voice-controlled appliances are becoming standard in modern Pune apartments, offering convenience without compromising on style.</p>
            <h3>3. Sustainable Luxury</h3>
            <p>Eco-friendly materials such as bamboo, reclaimed wood, and low-VOC paints are in high demand. Luxury is now defined by conscious choices that look good and feel good.</p>
            <h3>4. Multifunctional Spaces</h3>
            <p>With hybrid work models staying, homes are adapting. Flexible furniture and designated home office nooks that blend seamlessly into living areas are a key trend.</p>
            <h3>5. Statement Ceilings</h3>
            <p>Often overlooked, ceilings are getting a makeover with bold colors, wallpapers, or intricate POP designs, adding a new dimension to room aesthetics.</p>
        `,
        created_at: '2024-01-15T00:00:00Z',
        featured_image: placeholderImage,
        author: 'Admin',
        isMock: true
    },
    {
        id: 'why-modular-kitchens-are-must-have',
        slug: 'why-modular-kitchens-are-must-have',
        title: 'Why Modular Kitchens are a Must-Have for Modern Homes',
        excerpt: "Efficiency meets elegance. Learn why modular kitchens are the preferred choice for homeowners looking for style and functionality.",
        content: `
            <p>The kitchen is the heart of the home, and in modern Indian households, functionality is key. Modular kitchens have revolutionized the way we cook and store.</p>
            <h3>Maximized Storage</h3>
            <p>Modular kitchens are designed to utilize every inch of space. With smart corner units, tall pantries, and deep drawers, clutter is a thing of the past.</p>
            <h3>Customization</h3>
            <p>Whether you prefer an L-shaped, U-shaped, or island layout, modular kitchens can be tailored to fit your specific needs and floor plan perfectly.</p>
            <h3>Ease of Maintenance</h3>
            <p>Materials like Acrylic and PU finishes are not only heat and moisture resistant but also incredibly easy to clean, ensuring your kitchen looks new for years.</p>
            <h3>Aesthetics</h3>
            <p>With a wide range of colors, textures, and finishes available, a modular kitchen can elevate the entire look of your home, making it a stylish space for culinary creativity.</p>
        `,
        created_at: '2024-02-10T00:00:00Z',
        featured_image: placeholderImage2,
        author: 'Admin',
        isMock: true
    },
    {
        id: 'small-space-big-style-tips',
        slug: 'small-space-big-style-tips',
        title: 'Small Space, Big Style: Interior Design Tips for Compact Apartments',
        excerpt: "Limited square footage? No problem. Here are expert tips to make your compact apartment feel spacious and stylish.",
        content: `
            <p>Living in a compact apartment doesn't mean compromising on style. With the right design strategies, small spaces can feel airy and luxurious.</p>
            <h3>1. Light Colors</h3>
            <p>Soft hues like whites, creams, and pastels reflect light, making rooms appear larger and more open. Use mirrors strategically to enhance this effect.</p>
            <h3>2. Multi-functional Furniture</h3>
            <p>Invest in beds with storage, sofa-cum-beds, or extendable dining tables. Furniture that serves dual purposes saves valuable floor space.</p>
            <h3>3. Vertical Storage</h3>
            <p>When floor space is limited, look up. Floor-to-ceiling shelves and wall-mounted cabinets draw the eye upward and provide ample storage without crowding the room.</p>
            <h3>4. Declutter</h3>
            <p>Minimalism is your best friend. Keep decor simple and functional. sleek lines and organized spaces create a sense of calm and openness.</p>
        `,
        created_at: '2024-03-05T00:00:00Z',
        featured_image: placeholderImage3,
        author: 'Admin',
        isMock: true
    }
];

const BlogStatus = ({ message }: { message: string }) => (
    <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground font-serif text-xl">{message}</p>
    </div>
);

const Blog = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const dynamicData = await fetchBlogs();

                // Merge logic: Dynamic blogs take priority, fill remaining slots with MOCK_BLOGS up to 3 total items.
                const merged = [...dynamicData, ...MOCK_BLOGS].slice(0, 3);
                setBlogs(merged);
            } catch (err) {
                console.error('Error fetching blogs, using fallback:', err);
                setBlogs(MOCK_BLOGS);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-black/40 overflow-hidden">
                <motion.div
                    className="absolute inset-0 z-[-1]"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <img src={heroImage} alt="Blog Hero" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
                <div className="text-center text-white z-10 px-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-gold text-sm tracking-[0.4em] uppercase mb-4"
                    >
                        Our Journal
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl tracking-wide mb-6"
                    >
                        Insights & Inspiration
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Explore the latest trends and expert tips to transform your space.
                    </motion.p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 bg-background">
                <div className="container-custom">
                    {loading ? (
                        <BlogStatus message="Discovering insights..." />
                    ) : blogs.length === 0 ? (
                        <BlogStatus message="No articles found yet. Stay tuned!" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {blogs.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <Link to={`/blog/${post.slug}`}>
                                        <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-secondary/20">
                                            <img
                                                src={post.featured_image || placeholderImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                                                <span className="text-gold font-medium">Trends</span>
                                                <span>•</span>
                                                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <h3 className="font-serif text-2xl group-hover:text-gold transition-colors duration-300 leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="pt-2">
                                                <span className="text-xs uppercase tracking-[0.2em] border-b border-gold/50 pb-1 group-hover:border-gold transition-all duration-300">Read Article</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Blog;
