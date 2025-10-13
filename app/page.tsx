import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="frame-1024 mt-8">
        <div className="card p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Logo className="w-[220px] h-[82px]" />
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

      <section id="skills" className="frame-1024 mt-16">
        <div className="card p-8">
          <h3 className="text-xl font-semibold text-brand-darkBlue">Capabilities for your projects</h3>
          <p className="mt-2 text-sm text-gray-700">Drawn from public professional experience and common engagements.</p>
          <ul className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
            <li className="p-3 rounded-lg bg-brand-blue/30 border border-white/60">Cloud Architecture & FinOps</li>
            <li className="p-3 rounded-lg bg-brand-yellow/30 border border-white/60">Platform Engineering & IaC (Terraform)</li>
            <li className="p-3 rounded-lg bg-white/70 border border-white/60">Serverless (Cloud Run, Functions)</li>
            <li className="p-3 rounded-lg bg-white/70 border border-white/60">Kubernetes & Workload Identity</li>
            <li className="p-3 rounded-lg bg-brand-blue/30 border border-white/60">Next.js, React, TypeScript</li>
            <li className="p-3 rounded-lg bg-brand-yellow/30 border border-white/60">CI/CD, GitHub Actions, Security by Design</li>
            <li className="p-3 rounded-lg bg-white/70 border border-white/60">Observability & SRE Practices</li>
            <li className="p-3 rounded-lg bg-white/70 border border-white/60">Data Engineering basics</li>
            <li className="p-3 rounded-lg bg-white/70 border border-white/60">Team Enablement & Mentoring</li>
          </ul>
        </div>
      </section>

      <section id="play" className="frame-1024 mt-16">
        <div className="card p-0 overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-brand-darkBlue">Retro lab: Terraform to Cloud Run</h3>
            <span className="text-xs text-gray-500">15s pixel animation</span>
          </div>
          <div className="bg-black">
            <canvas id="retroCanvas" className="w-full h-[320px] pixelate"></canvas>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
