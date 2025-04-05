import React from 'react';

export default function ClipGrid({ clips }) {
  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">⚽ TOP FOOTBALL MOMENTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {clips.map((clip) => (
          <div key={clip.id} className="bg-darker rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative aspect-video">
              <img 
                src={clip.image} 
                alt={clip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                {clip.views}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{clip.title}</h3>
              <p className="text-gray-400 text-sm">@{clip.user}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}