import React from 'react';

const categories = [
  { id: 1, name: "Last-Minute Goals", emoji: "⏱️" },
  { id: 2, name: "Long-Range Stunners", emoji: "🚀" },
  { id: 3, name: "Dribbles & Skills", emoji: "⚡" },
  { id: 4, name: "Fan Reactions", emoji: "📢" },
  { id: 5, name: "Iconic Commentary", emoji: "🎙️" }
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(1);

  return (
    <section className="py-8 px-4 overflow-x-auto">
      <div className="flex space-x-2 w-max mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-primary text-black font-bold'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}