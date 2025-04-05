import React from 'react';

export default function Trending({ clips }) {
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-darker to-black">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="text-primary mr-2">🔥</span> TRENDING THIS WEEK
      </h2>
      <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
        {clips.map((clip) => (
          <div key={clip.id} className="flex-shrink-0 w-64">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={clip.image}
                alt={clip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <h3 className="font-bold text-white">{clip.title}</h3>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {clip.views}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}