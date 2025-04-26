import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import ApplicationDetail from "./pages/ApplicationDetail";
import { ApplicationProvider } from "./context/ApplicationContext";
import Navbar from "./components/layout/Navbar";

const queryClient = new QueryClient();

const Analytics = () => (
  <div>
    <h1>Analytics Dashboard</h1>
    {/* Placeholder for analytics charts and data */}
  </div>
);


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ApplicationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/applications" element={
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Applications />
              </div>
            } />
            <Route path="/add-application" element={
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <AddApplication />
              </div>
            } />
            <Route path="/application/:id" element={
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <ApplicationDetail />
              </div>
            } />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;