import Header from './Header.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import './Layout.css';


export default function Layout({ children }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="Layout">
      <div className="StickyHeader">
        <Header />
        <Navbar />
      </div>
      <main className="Layout">{children}</main>
      <Footer />
    </div>
  )
}
