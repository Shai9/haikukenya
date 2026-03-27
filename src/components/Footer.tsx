"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 py-8 border-t border-slate-900 bg-black/50">
      <p className="text-center text-[10px] text-slate-500 font-medium tracking-widest uppercase">
        © {currentYear} Built By Astariqa Labs
      </p>
    </footer>
  );
}