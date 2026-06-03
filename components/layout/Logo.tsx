import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
    className?: string;
    size?: number;
}

/**
 * WebImgConverter wordmark logo — emerald green, matches Vivid Clarity design system.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 22 }) => {
    return (
        <Link to="/" className={`inline-flex items-center gap-2 group ${className}`} aria-label="WebImgConverter">
            <img src="/logo-icon.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow-sm group-hover:rotate-12 transition-transform duration-300" />
            <span
                className="font-extrabold text-brand-600 tracking-tight"
                style={{ fontSize: size }}
                translate="no"
            >
                WebImgConverter
            </span>
        </Link>
    );
};
