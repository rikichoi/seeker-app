import React from 'react'

export function formatPrice(price: number) {
    return ((price).toLocaleString('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }));
}

export function getTimeAgo(createdAt: Date) {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(createdAt).getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        }
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
        } else {
            const diffInYears = Math.floor(diffInMonths / 12);
            return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
        }
    }
};

export function getDaysUntilExpiry(expiryDate: Date) {
    const now = new Date();
    const diffInMs = new Date(expiryDate).getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
};