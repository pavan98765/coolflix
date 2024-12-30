import React, { useState } from 'react';
import { Play, Info, Search, Bell, User } from 'lucide-react';

const CoolFlix = () => {
  const categories = [
    {
      name: "Trending Now",
      videos: [
        { 
          id: 1, 
          title: "Dune: Part Two", 
          description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
          trailerUrl: "Way9Dexny3w"
        },
        { 
          id: 2, 
          title: "The Batman", 
          description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.", 
          trailerUrl: "mqqft2x_Aa4"
        },
        { 
          id: 3, 
          title: "Oppenheimer", 
          description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", 
          trailerUrl: "bK6ldnjE3Y0"
        },
      ]
    },
    {
      name: "Popular TV Shows",
      videos: [
        { 
          id: 4, 
          title: "House of the Dragon", 
          description: "The story of the House Targaryen, set 200 years before the events of Game of Thrones.", 
          trailerUrl: "DotnJ7tTA34"
        },
        { 
          id: 5, 
          title: "The Last of Us", 
          description: "Joel and Ellie, a pair connected through the harshness of the world they live in, are forced to endure brutal circumstances.", 
          trailerUrl: "uLtkt8BonwM"
        },
        { 
          id: 6, 
          title: "Stranger Things 5", 
          description: "New supernatural threats terror Hawkins as Eleven struggles to regain her powers.", 
          trailerUrl: "pMRePAxn1-I"
        },
      ]
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  const getThumbnailUrl = (videoId, quality = 'maxres') => {
    switch(quality) {
      case 'maxres':
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      case 'hq':
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      default:
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
  };

  const VideoCard = ({ video }) => {
    const [thumbnailError, setThumbnailError] = useState(false);

    return (
      <div 
        className="relative group cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => setSelectedVideo(video)}
      >
        <img 
          src={thumbnailError ? getThumbnailUrl(video.trailerUrl, 'hq') : getThumbnailUrl(video.trailerUrl)}
          alt={video.title}
          className="w-full h-48 object-cover rounded-md"
          onError={() => setThumbnailError(true)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 rounded-md">
          <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <h3 className="text-white font-bold">{video.title}</h3>
            <div className="flex space-x-2 mt-2">
              <button className="bg-blue-600 text-white px-4 py-1 rounded-md flex items-center hover:bg-blue-700">
                <Play size={16} className="mr-1" />
                Play Trailer
              </button>
              <button className="bg-gray-500 bg-opacity-50 text-white px-4 py-1 rounded-md flex items-center hover:bg-gray-600">
                <Info size={16} className="mr-1" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VideoModal = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-4 max-w-4xl w-full">
        <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.trailerUrl}?autoplay=1`}
            title={`${video.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
        <p className="text-gray-300 mb-4">{video.description}</p>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gradient-to-b from-black to-transparent z-40 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-4xl font-bold text-blue-500">CoolFlix</h1>
            <nav className="hidden md:flex space-x-4">
              <button className="hover:text-blue-400">Home</button>
              <button className="hover:text-blue-400">TV Shows</button>
              <button className="hover:text-blue-400">Movies</button>
              <button className="hover:text-blue-400">New & Popular</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-blue-400" />
            <Bell className="w-5 h-5 cursor-pointer hover:text-blue-400" />
            <User className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative h-96 mb-8">
          <img 
            src={getThumbnailUrl(categories[0].videos[0].trailerUrl)}
            alt="Featured Content"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-gray-900">
            <h2 className="text-5xl font-bold mb-4">Dune: Part Two</h2>
            <p className="text-lg mb-4 max-w-xl">
              Experience the epic continuation of Paul Atreides' journey as he unites with the Fremen to bring peace to Arrakis.
            </p>
            <div className="flex space-x-4">
              <button 
                className="bg-blue-600 text-white px-8 py-2 rounded-md flex items-center hover:bg-blue-700"
                onClick={() => setSelectedVideo(categories[0].videos[0])}
              >
                <Play size={24} className="mr-2" />
                Play Trailer
              </button>
              <button className="bg-gray-700 text-white px-8 py-2 rounded-md flex items-center hover:bg-gray-600">
                <Info size={24} className="mr-2" />
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Video Categories */}
        <div className="px-8 space-y-8 pb-8">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default CoolFlix;