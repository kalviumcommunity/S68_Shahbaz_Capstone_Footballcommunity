import { FiSearch, FiUpload, FiUser } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ESTADIO
        </div>
        
        <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 flex-1 max-w-md mx-6">
          <FiSearch className="text-white/50 mr-2" />
          <input 
            type="text" 
            placeholder="Search goals, players, matches..."
            className="bg-transparent border-none outline-none text-white w-full"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2 rounded-full border border-white/20">
            <FiUpload /> Upload
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2 rounded-full border border-white/20">
            <FiUser /> Profile
          </button>
        </div>
      </div>
    </nav>
  )
}