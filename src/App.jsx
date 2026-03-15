import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import PhotoCard from './components/PhotoCard';

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const isFavorite = state.some(p => p.id === action.payload.id);
      const newState = isFavorite
        ? state.filter(p => p.id !== action.payload.id)
        : [...state, action.payload];
      
      localStorage.setItem('favorites', JSON.stringify(newState));
      return newState;
    }
    case 'INIT_FAVORITES':
      return action.payload;
    default:
      return state;
  }
}

function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        dispatch({ type: 'INIT_FAVORITES', payload: JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse favorites text', e);
      }
    }
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleToggleFavorite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photo });
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) return photos;
    const lowerSearch = searchTerm.toLowerCase();
    return photos.filter(photo => photo.author.toLowerCase().includes(lowerSearch));
  }, [photos, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Setup */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Photo Gallery
          </h1>
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search by author name..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium tracking-wide">Fetching amazing photos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md shadow-sm">
            <h3 className="text-red-800 font-bold text-lg mb-1">Oops! Something went wrong</h3>
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xl text-gray-500 font-medium">No photos found for "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {filteredPhotos.map(photo => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                isFavorite={favorites.some(f => f.id === photo.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
