export default function Trending({ clips }) {
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-darker to-black">
      <h2 className="text-2xl font-bold mb-6 flex items-center px-4">
        <span className="text-primary mr-2">🔥</span> TRENDING THIS WEEK
      </h2>
      
      <div className="relative">
        <div className="flex overflow-x-auto pb-4 space-x-4 px-4 scrollbar-hide">
          {clips.map((clip) => (
            <div 
              key={clip.id} 
              className="flex-shrink-0 w-64 transform transition-transform hover:scale-105"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                <img
                  src={clip.image}
                  alt={clip.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <div>
                    <h3 className="font-bold text-white line-clamp-1">{clip.title}</h3>
                    <p className="text-sm text-gray-300">{clip.views} views</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  <span className="mr-1">▶</span>
                  <span>Play</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}