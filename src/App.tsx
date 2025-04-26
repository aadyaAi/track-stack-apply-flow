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
import ExploreJobs from './pages/ExploreJobs'; // Added import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ApplicationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route index element={<Dashboard />} /> {/* Assuming Dashboard exists */}
              <Route path="applications" element={<Applications />} />
              <Route path="applications/add" element={<AddApplication />} />
              <Route path="applications/:id" element={<ApplicationDetail />} />
              <Route path="explore" element={<ExploreJobs />} /> {/* Added ExploreJobs route */}
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* <Route path="/applications" element={
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
            } /> */}
            {/* Commented out redundant routes as they are now nested under / */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;