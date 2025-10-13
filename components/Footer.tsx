export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-white/50">
      <div className="frame-1024 py-10 text-sm text-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Nat & Ya Solutions. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:text-brand-darkBlue" href="#">LinkedIn</a>
          <a className="hover:text-brand-darkBlue" href="#">GitHub</a>
          <a className="hover:text-brand-darkBlue" href="#">Email</a>
        </div>
      </div>
    </footer>
  );
}
