import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Crops from "./pages/Crops";
import Map from "./pages/Map";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./Route/PrivateRoute";

import { AuthProvider } from "./AuthContext/AuthContext"; // fixed import path

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/terms" element={
              <Layout>
              <Terms />
              </Layout>} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/crops"
              element={
                <PrivateRoute>
                  <Layout>
                    <Crops />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <Layout>
                    <Map />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <PrivateRoute>
                  <Layout>
                    <Marketplace />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
