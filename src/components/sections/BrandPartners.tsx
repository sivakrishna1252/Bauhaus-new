import { useEffect, useState } from 'react';
import asianPaints from '@/assets/asian-paints-logo.png';
import greenply from '@/assets/greenplaylogo.png';
import hettich from '@/assets/het_hettich.png';
import gyproc from '@/assets/gyproc-logo.png';
import hafele from '@/assets/hafele-logoo.png';
import woodenStreet from '@/assets/Wooden_Street-Logo.wine.png';
import dDecor from '@/assets/decor-logo.png';

const brands = [
    { name: 'Asian Paints', image: asianPaints },
    { name: 'Greenply', image: greenply },
    { name: 'Hettich', image: hettich },
    { name: 'Gyproc', image: gyproc },
    { name: 'Hafele', image: hafele },
    { name: 'Wooden Street', image: woodenStreet },
    { name: 'D Decor', image: dDecor },
];

export const BrandPartners = () => {
    // Duplicate the brands array to create the seamless loop effect
    // We duplicate it 4 times to ensure enough length for larger screens
    const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

    return (
        <section className="py-6 md:py-10 bg-gray-50/50 overflow-hidden border-t border-gray-100">
            <div className="container-custom mb-10">
                <h2 className="text-5xl md:text-6xl text-center font-serif text-primary mb-4">Brand Partners</h2>
                <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
            </div>

            <div className="relative w-full overflow-hidden group">
                {/* Gradient masks for smooth fade edges - Increased width for better effect */}
                <div className="absolute top-0 left-0 w-32 md:w-48 h-full bg-gradient-to-r from-gray-50/50 via-gray-50/50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 md:w-48 h-full bg-gradient-to-l from-gray-50/50 via-gray-50/50 to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                    {duplicatedBrands.map((brand, index) => (
                        <div key={`${brand.name}-${index}`} className="flex-shrink-0 mx-10 md:mx-16 items-center justify-center flex transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="h-20 md:h-28 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
