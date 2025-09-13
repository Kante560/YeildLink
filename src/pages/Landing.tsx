import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, MapPin, ShoppingCart, Bell, Users, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-farming.jpg';
import Footer from '../components/Footer';
import { User, Leaf, MessageSquare } from "lucide-react";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const Landing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage immediately
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.token) {
          // User has valid token, redirect to dashboard
          navigate('/dashboard', { replace: true });
          return;
        }
      } catch (error) {
        // Invalid JSON, clear it
        localStorage.removeItem("authUser");
      }
    }
    // No valid user data found, stay on landing
    setIsCheckingAuth(false);
  }, [navigate]);

  // Show loading while checking auth
  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Sprout,
      title: 'Smart Crop Recommendations',
      description: 'AI-powered seasonal suggestions based on climate data and your location.',
      color: 'text-success'
    },
    {
      icon: Bell,
      title: 'Seasonal Alerts',
      description: 'Get SMS and email notifications when it\'s optimal to plant your crops.',
      color: 'text-warning'
    },
    {
      icon: MapPin,
      title: 'Interactive Maps',
      description: 'Find favorable growing regions and discover new opportunities nearby.',
      color: 'text-primary'
    },
    {
      icon: ShoppingCart,
      title: 'Surplus Marketplace',
      description: 'Connect with buyers and sellers to reduce waste and improve food access.',
      color: 'text-secondary-foreground'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Join a network of farmers and cooperatives sharing knowledge and resources.',
      color: 'text-accent-foreground'
    },
    {
      icon: TrendingUp,
      title: 'Reduce Crop Loss',
      description: 'Make informed decisions to minimize losses and maximize yields.',
      color: 'text-success'
    }
  ];

  

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-[84rem] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex flex-row items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-7 w-7 text-[#22b14c]" />
            <span className="text-2xl font-bold text-[#22b14c]">
          YieldLink
            </span>
          </Link>
        </div>
        {/* Center Nav Links */}
        <div className="flex-1 md:flex hidden justify-center ">
          <ul className="flex space-x-10 text-lg">
            <li>
          <a href="#" className="font-bold text-[#333]" onClick={e => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});}}>Home</a>
            </li>
            <li>
          <a href="#features" className="text-[#444] hover:text-[#22b14c]" onClick={e => {e.preventDefault(); document.getElementById('features')?.scrollIntoView({behavior: 'smooth'});}}>Features</a>
            </li>
            <li>
          <a href="#how-it-works" className="text-[#444] hover:text-[#22b14c]" onClick={e => {e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'});}}>How It Works</a>
            </li>
            <li>
          <a href="#Insights" className="text-[#444] hover:text-[#22b14c]" onClick={e => {e.preventDefault(); document.getElementById('Insights')?.scrollIntoView({behavior: 'smooth'});}}>Insights</a>
            </li>
          </ul>
        </div>
        {/* Right Side Buttons */}
        <div className="md:flex hidden items-center space-x-4  ">
          <Link to="/auth?mode=login" className="font-bold text-[#22b14c] text-lg">Log in</Link>
          <Link to="/auth?mode=signup">
            <Button className="bg-[#22b14c] text-white font-bold text-lg px-6 py-2 rounded-full shadow-md hover:bg-[#1a8c39] transition-all" style={{boxShadow: '0 2px 8px 0 rgba(34,177,76,0.15)'}}>Get started</Button>
          </Link>
        </div>
      </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-foreground font-mont leading-tight">
                Smarter Farming. <span className="text-[#22b14c]">Stronger Harvest.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                YieldLink helps farmers know what to plant, when to plant, and connects regions with surplus crops to those in need - reducing waste, increasing food security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="bg-[#22b14c] text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-[#1a8c39] transition-all">Join Yieldlink</Button>
                </Link>
                <Link to="/map">
                  <Button size="lg" variant="outline" className="font-bold px-6 py-2 rounded-lg border-[#22b14c] text-[#22b14c] hover:bg-[#eafff1] border-2">See How it works</Button>
                </Link>
              </div>
            </div>
            {/* Right: Image Card Stack */}
            <div className="relative md:flex hidden justify-center lg:justify-end">
              <div className="relative w-[450px] h-[300px] group cursor-pointer">
                {/* Back image, slightly rotated and offset */}
                <img 
                  src={"/oss/Farm5.jpeg"}
                  alt="Smart farming field background"
                  className="absolute top-6 w-full h-full   
                  opacity-80 z-0 rotate-[-10deg] rounded-2xl transition-all object-cover duration-500 group-hover:rotate-[0deg] group-hover:top-[] 
                  "
                  style={{filter: 'brightness(0.95) blur(0.5px)'}}
                /> 
                {/* Front image */}
                <img 
                  src={"/oss/Farm5.jpeg"}
                  alt="Smart farming field"
                  className="relative z-10 w-full top-6 h-full object-cover rounded-2xl shadow-3xl  border-gray-300
                   rotate-[5deg] transition-all duration-500 group-hover:rotate-[0deg]
                   "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Features</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI-powered crop recommendations to community marketplaces, 
              YieldLink provides comprehensive tools for modern agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}

      <div id='Insights'>

     
      <section className="bg-[#f2fff6] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">The Challenges We’re Tackling</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            {/* Challenge 1 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-[#22b14c] rounded-full w-12 h-12 flex items-center justify-center mb-[-24px] z-10">
                <Sprout className="text-white w-7 h-7" />
              </div>
              <div className="bg-white border border-[#e0e0e0] rounded-lg shadow-sm px-6 py-8 w-full text-center" style={{minHeight: '140px'}}>
                <div className="text-lg text-[#222]">1. Farmers often guess what to plant- leading to failed harvests.</div>
              </div>
            </div>
            {/* Challenge 2 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-[#22b14c] rounded-full w-12 h-12 flex items-center justify-center mb-[-24px] z-10">
                <MapPin className="text-white w-7 h-7" />
              </div>
              <div className="bg-white border border-[#e0e0e0] rounded-lg shadow-sm px-6 py-8 w-full text-center" style={{minHeight: '140px'}}>
                <div className="text-lg text-[#222]">2. Some regions have too much of one crop, others have none.</div>
              </div>
            </div>
            {/* Challenge 3 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-[#22b14c] rounded-full w-12 h-12 flex items-center justify-center mb-[-24px] z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18c.978 0 1.978-.5 3-1.5S8.022 15 9 15s1.978.5 3 1.5S13.978 18 15 18s1.978-.5 3-1.5S20.022 15 21 15" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18" /></svg>
              </div>
              <div className="bg-white border border-[#e0e0e0] rounded-lg shadow-sm px-6 py-8 w-full text-center" style={{minHeight: '140px'}}>
                <div className="text-lg text-[#222]">3. Climate change makes planting seasons harder to predict.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Simple Solution Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Our Simple Solution.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-white border border-[#e0e0e0] rounded-lg shadow-sm overflow-hidden">
              <img src="/oss/farm2.jpg" alt="Smart Crop Advice" className="w-full h-48 object-cover" />
              <div className="p-6 text-center">
                <div className="font-bold text-lg mb-2">Smart Crop Advice</div>
                <div className="text-gray-700 text-sm">Get recommendations on the best crops for your area based on climate data.</div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center bg-white border border-[#e0e0e0] rounded-lg shadow-sm overflow-hidden">
              <img src="/oss/farm3.png" alt="Crop Management" className="w-full h-48 object-cover" />
              <div className="p-6 text-center">
                <div className="font-bold text-lg mb-2">Crop Management</div>
                <div className="text-gray-700 text-sm">Track your crops, get alerts when it's the right season to plant.</div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center bg-white border border-[#e0e0e0] rounded-lg shadow-sm overflow-hidden">
              <img src="oss/farm1.png" alt="Surplus & Demand Map" className="w-full h-48 object-cover" />
              <div className="p-6 text-center">
                <div className="font-bold text-lg mb-2">Surplus & Demand Map</div>
                <div className="text-gray-700 text-sm">See where your crops are in demand, and discover nearby surplus.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

       </div>

      {/* How it works Section */}
        <section className="bg-green-50 py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-12">How it works</h2>

        {/* Steps */}
        <div className="flex items-center justify-between">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-[220px]">
            <div className="bg-[#239B32] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <User size={28} />
            </div>
            <p className="text-gray-800 text-sm">
              1. Sign up easily (with phone or email).
            </p>
          </div>

          {/* Connector Line 1 with Gradient */}
          <div className="flex-1 h-[1px] mb-8 bg-gradient-to-r from-white via-[#239B32] to-white "></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-[220px]">
            <div className="bg-[#239B32] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Leaf size={28} />
            </div>
            <p className="text-gray-800 text-sm">
              2. Add crops you’re growing (from list).
            </p>
          </div>

          {/* Connector Line 2 with Gradient */}
          <div className="flex-1 h-[1px] mb-8 bg-gradient-to-r from-white via-[#239B32] to-white mx-4"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-[220px]">
            <div className="bg-[#239B32] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={28} />
            </div>
            <p className="text-gray-800 text-sm">
              3. Get alerts + market insights (via app, SMS, or email).
            </p>
          </div>
        </div>
      </div>
    </section>

<div id='how-it-works'>      {/* CTA Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of farmers already using YieldLink to grow smarter, reduce losses, and increase profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="hero" className="w-full sm:w-auto">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • SMS alerts included • Join 10,000+ farmers
          </p>
        </div>
      </section>
      </div>


      {/* Footer */}
  <Footer />
    </div>
  );
};

export default Landing;