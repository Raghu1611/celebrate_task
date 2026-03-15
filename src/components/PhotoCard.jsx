import React from 'react';

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col group">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={photo.download_url} 
          alt={`Photo by ${photo.author}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg text-gray-800 truncate pr-4">{photo.author}</h3>
        <button
          onClick={() => onToggleFavorite(photo)}
          className={`p-2 rounded-full transition-colors flex-shrink-0 ${
            isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400'
          }`}
          aria-label="Toggle Favorite"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 transition-transform hover:scale-110" 
            fill={isFavorite ? 'currentColor' : 'none'} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={isFavorite ? 0 : 2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
