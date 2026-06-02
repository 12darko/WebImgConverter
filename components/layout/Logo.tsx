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
