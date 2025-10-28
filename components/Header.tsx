import BrandMark from './BrandMark';
import Lion3D from './Lion3D';

export default function Header() {
  return (
    <header className="frame-1024 py-6">
      {/* 3D Lion Animation */}
      <div className="flex justify-center mb-6">
        <Lion3D className="w-full max-w-md h-[200px]" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <h1 className="font-bold text-xl">Nat & Ya Solutions</h1>
            <p className="text-sm text-gray-600">Crafting reliable solutions with elegance</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-700">
          <a className="hover:text-brand-darkBlue transition-colors" href="#work">Work</a>
          <a className="hover:text-brand-darkBlue transition-colors" href="#play">Lab</a>
          <a className="hover:text-brand-darkBlue transition-colors" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
