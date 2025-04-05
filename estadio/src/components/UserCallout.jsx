import React from 'react';

export default function UserCallout() {
  return (
    <section className="py-16 px-4 bg-darker">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">YOUR TURN TO GO VIRAL</h2>
          <p className="text-gray-300 mb-6">
            Upload your best football moments and join our community of creators.
            Get featured on our platform and reach millions of football fans.
          </p>
          <button className="cta-button">
            Start Uploading →
          </button>
        </div>
        
        <div className="relative">
          <img 
            src={"https://tse4.mm.bing.net/th?id=OIP.9K2YMs0Z8IlC3SDErk8YgAHaEK&pid=Api&P=0&h=180"} 
            alt="User submission example"
            className="rounded-lg shadow-2xl"
          />
          <div className="absolute -top-3 -left-3 bg-primary text-black font-bold px-3 py-1 rounded-full text-sm">
            USER SUBMISSION
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
            <div className="flex justify-between">
              <span>1.2M views</span>
              <span>@FootballFanatic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}