import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BrandPartners } from '../sections/BrandPartners';
import FloatingChat from '@/components/sections/FloatingChat';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {children}
            </main>


            <Footer />

            {/* ✅ Floating Chat – visible on all pages */}
            <FloatingChat />
        </div>
    );
}
