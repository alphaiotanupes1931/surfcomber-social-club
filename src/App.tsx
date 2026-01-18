import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import MenusPage from "./pages/MenusPage";
import LocationPage from "./pages/LocationPage";
import GalleryPage from "./pages/GalleryPage";
import UpcomingPage from "./pages/UpcomingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menus" element={<MenusPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/events" element={<UpcomingPage />} />
          <Route path="/calendar" element={<UpcomingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
