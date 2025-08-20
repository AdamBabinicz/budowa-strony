import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageModal({ src, alt, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
      data-testid="image-modal-overlay"
    >
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full max-h-full object-contain" 
        onClick={(e) => e.stopPropagation()}
        data-testid="image-modal-content"
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-accent transition-colors"
        data-testid="image-modal-close"
      >
        ✕
      </button>
    </div>,
    document.body
  );
}
