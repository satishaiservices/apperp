'use client';

import React, { useState, useEffect } from 'react';

interface AuthenticatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackIcon?: React.ReactNode;
}

export function AuthenticatedImage({
  src,
  alt,
  className,
  fallbackIcon,
  ...props
}: AuthenticatedImageProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    let createdUrl: string | null = null;

    if (!src) {
      setError(true);
      setLoading(false);
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('vyhir_token') : null;

    fetch(src, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load image');
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        createdUrl = URL.createObjectURL(blob);
        setBlobUrl(createdUrl);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [src]);

  if (loading) {
    return <div className={`animate-pulse bg-slate-800 ${className}`} />;
  }

  if (error || !blobUrl) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 text-slate-500 ${className}`}>
        {fallbackIcon || <span className="text-[10px]">Photo Unavailable</span>}
      </div>
    );
  }

  return <img src={blobUrl} alt={alt} className={className} {...props} />;
}
