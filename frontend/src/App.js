import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LangProvider } from "@/i18n";
import { CartProvider } from "@/context/CartContext";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Insurance from "@/pages/Insurance";
import Intake from "@/pages/Intake";
import Providers from "@/pages/Providers";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Landing from "@/pages/Landing";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import FAQ from "@/pages/FAQ";
import ServiceArea from "@/pages/ServiceArea";
import NewPatient from "@/pages/NewPatient";
import Cart from "@/pages/Cart";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/category/:categorySlug" element={<Products />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/intake" element={<Intake />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/get-equipment" element={<Landing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/service-area" element={<ServiceArea />} />
      <Route path="/new-patient" element={<NewPatient />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <LangProvider>
        <CartProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </LangProvider>
    </div>
  );
}

export default App;
