function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          Eyewear
        </h1>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 text-sm uppercase tracking-widest">
          <a className="hover:opacity-60 cursor-pointer">Shop</a>
          <a className="hover:opacity-60 cursor-pointer">About</a>
          <a className="hover:opacity-60 cursor-pointer">Contact</a>
        </nav>

        {/* Icon mobile */}
        <button className="md:hidden text-2xl">
          ☰
        </button>

      </div>
    </header>
  );
}

export default Header;
