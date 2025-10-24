import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CircuitGraphic from '@/components/CircuitGraphic';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="frame-1024 mt-8">
        <div className="card p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Nat & Ya Solutions
              </h2>
              <p className="mt-3 text-lg text-gray-700">
                You have some projects, we have Solutions!
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Elegant, maintainable and resilient systems — designed with care, delivered with precision.
              </p>
            </div>
            <CircuitGraphic className="w-[200px] h-[200px]" />
          </div>
        </div>
      </section>

      <section id="work" className="frame-1024 mt-12">
        <h3 className="text-xl font-semibold text-brand-darkBlue mb-4">Recipe project highlights</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((n) => (
            <article key={n} className="card hover-float overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`/screenshots/recipe-${n}.svg`}
                  alt={`Recipe project screenshot ${n}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Feature {n}</h4>
                <p className="text-sm text-gray-600 mt-1">Smart browsing, clean UI, and delightful interactions.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="play" className="frame-1024 mt-16">
        <div className="card overflow-hidden p-5">
          <div className="bg-black rounded-lg overflow-hidden">
            <canvas id="retroCanvas" className="w-full h-[480px] pixelate"></canvas>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
