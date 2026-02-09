import { NavBar } from "./NavBar";

// ============================================
// COMPONENTE FOOTER
// ============================================



export function Footer() {


  return (
    <footer className="fixed left-0 right-0 z-50 bottom-0 bg-white border-t border-gray-100 mt-auto md:hidden">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <NavBar />
      </div>
    </footer>
  );
}
