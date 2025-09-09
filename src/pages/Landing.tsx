import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, MapPin, ShoppingCart, Bell, Users, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-farming.jpg';

const Landing = () => {
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

  const stats = [
    { value: '10k+', label: 'Active Farmers' },
    { value: '95%', label: 'Reduced Crop Loss' },
    { value: '200+', label: 'Crop Varieties' },
    { value: '15', label: 'Countries' }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">YieldLink</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button variant="hero">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 bg-success/10 text-success border-success/20">
                  Climate-Smart Farming
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Grow Smarter with 
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> AI-Powered</span> 
                  Insights
                </h1>
                <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                  Join thousands of farmers using YieldLink to reduce crop losses, optimize planting seasons, 
                  and connect with buyers. Get personalized recommendations based on climate data and your location.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" variant="hero" className="w-full sm:w-auto">
                    Start Growing Smarter
                  </Button>
                </Link>
                <Link to="/map">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Map
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Smart farming with climate technology" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground p-3 rounded-full shadow-lg animate-fade-in">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-warning text-warning-foreground p-3 rounded-full shadow-lg animate-fade-in">
                <Bell className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
                Explore Marketplace
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • SMS alerts included • Join 10,000+ farmers
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">YieldLink</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 YieldLink. Empowering farmers with smart technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;