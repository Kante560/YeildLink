import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Sprout } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const location = useLocation();

  // Location suggestion state
  type Suggestion = { name: string; latitude: number; longitude: number };
  const [locationQuery, setLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<Suggestion[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const suggestionBoxRef = useRef<HTMLDivElement | null>(null);
  const [chosenLocation, setChosenLocation] = useState<Suggestion | null>(null);

  // Set mode from query string on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'login' || urlMode === 'signup') {
      setMode(urlMode);
    }
  }, [location.search]);

  // Debounced fetch for location suggestions
  useEffect(() => {
    const controller = new AbortController();
    const q = locationQuery.trim();
    if (!q) {
      setLocationSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLocationLoading(true);
      try {
        const url = `https://yieldlink-api-six.vercel.app/api/location/suggest?query=${encodeURIComponent(q)}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch suggestions (${res.status})`);
        const data = await res.json();
        // Normalize to array of { name, latitude, longitude }
        const pick = (x: any): Suggestion | null => {
          if (!x) return null;
          const name = x.name ?? x.label ?? x.display_name ?? x.title ?? x.text ?? x.city ?? x.place_name;
          const lat = x.latitude ?? x.lat ?? x.y ?? x.center?.[1];
          const lon = x.longitude ?? x.lng ?? x.lon ?? x.x ?? x.center?.[0];
          if (!name || lat === undefined || lon === undefined) return null;
          return { name: String(name), latitude: Number(lat), longitude: Number(lon) };
        };
        let suggestions: Suggestion[] = [];
        if (Array.isArray(data)) suggestions = data.map(pick).filter(Boolean) as Suggestion[];
        else if (data && Array.isArray(data.suggestions)) suggestions = data.suggestions.map(pick).filter(Boolean) as Suggestion[];
        else if (data && Array.isArray(data.results)) suggestions = data.results.map(pick).filter(Boolean) as Suggestion[];
        setLocationSuggestions(suggestions);
        setShowLocationSuggestions(true);
      } catch (err: any) {
        if (err?.name !== 'AbortError') setLocationSuggestions([]);
      } finally {
        setLocationLoading(false);
      }
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [locationQuery]);

  // Hide suggestions on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!suggestionBoxRef.current) return;
      if (!suggestionBoxRef.current.contains(e.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        // Get form values
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
        const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
        const password = (form.elements.namedItem('password') as HTMLInputElement)?.value || '';
        if (!chosenLocation || chosenLocation.name.trim() !== locationQuery.trim()) {
          toast({ title: 'Select a location', description: 'Please choose a suggested location so we can capture coordinates.', variant: 'destructive' });
          setIsLoading(false);
          return;
        }
        await signup(name, phone, email, password, {
          name: chosenLocation.name,
          latitude: chosenLocation.latitude,
          longitude: chosenLocation.longitude,
          // duplicates for backend compatibility
          lat: chosenLocation.latitude,
          lon: chosenLocation.longitude,
        });
        toast({
          title: 'Welcome to YieldLink!',
          description: "You've successfully joined the platform.",
        });
      } else {
        const form = e.target as HTMLFormElement;
        const identifier = (form.elements.namedItem('loginIdentifier') as HTMLInputElement)?.value || '';
        const password = (form.elements.namedItem('loginPassword') as HTMLInputElement)?.value || '';
        await login(identifier, password);
        toast({
          title: 'Welcome Back!',
          description: 'You are now signed in.',
        });
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      let message = 'Please check your credentials and try again.';
      if (err instanceof Error) {
        if (/email.*exist|already.*used|already.*registered/i.test(err.message)) {
          message = 'Email already in use. Please use a different email.';
        } else if (/invalid.*credentials|not found|404|incorrect/i.test(err.message)) {
          message = 'Invalid email, phone, or password.';
        } else if (/required|missing|empty/i.test(err.message)) {
          message = 'Please fill in all required fields.';
        } else {
          message = err.message;
        }
      }
      toast({
        title: 'Authentication Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-mont">
      <Card className="w-full max-w-sm shadow-lg border-0">
        <div className="flex flex-col items-center mt-8">
          <Link to="/" >
          <div className="flex items-center space-x-2 mb-4">
            <Sprout className="w-7 h-7 text-[#22b14c]" />
            <span className="text-2xl font-bold text-[#22b14c] font-mont">YieldLink</span>
          </div>
          </Link>
          <h2 className="text-xl font-bold text-black mb-1 font-mont">
            {mode === 'signup' ? 'Get Started' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            {mode === 'signup'
              ? 'Create an account to experience smart farming for better yields.'
              : 'Experience smart farming for better yields.'}
          </p>
        </div>
        <div className="px-6 pb-8">
          {mode === 'signup' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-black font-medium">Name</Label>
                <Input id="name" type="text" placeholder="Enter your full name" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="location" className="text-black font-medium">Location</Label>
                <div className="relative" ref={suggestionBoxRef}>
                  <Input
                    id="location"
                    placeholder="Enter your City, State."
                    required
                    className="mt-1"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      // Reset chosen location if user edits away
                      if (!chosenLocation || e.target.value.trim() !== chosenLocation.name) {
                        setChosenLocation(null);
                      }
                      if (e.target.value.trim().length > 0) setShowLocationSuggestions(true);
                    }}
                    onFocus={() => {
                      if (locationSuggestions.length > 0) setShowLocationSuggestions(true);
                    }}
                    autoComplete="off"
                  />
                  {showLocationSuggestions && (locationSuggestions.length > 0 || locationLoading) && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-56 overflow-auto">
                      {locationLoading && (
                        <div className="px-3 py-2 text-sm text-gray-500">Searching...</div>
                      )}
                      {!locationLoading && locationSuggestions.map((s, idx) => (
                        <button
                          type="button"
                          key={`${s.name}-${idx}`}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setLocationQuery(s.name);
                            setChosenLocation(s);
                            console.log('Chosen location:', s);
                            setShowLocationSuggestions(false);
                          }}
                        >
                          {s.name}
                        </button>
                      ))}
                      {!locationLoading && locationSuggestions.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">No matches</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-black font-medium">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="text-black font-medium">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="password" className="text-black font-medium">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-black font-medium">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" required className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-[#22b14c] hover:bg-[#1a8c39] text-white font-bold rounded-lg py-2 mt-2" disabled={isLoading}>
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              <div className="text-center mt-4 text-sm">
                Already have an account?{' '}
                <button type="button" className="text-[#22b14c] font-semibold hover:underline" onClick={() => setMode('login')}>
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="loginIdentifier" className="text-black font-medium">Email or Phone</Label>
                <Input id="loginIdentifier" type="text" placeholder="Enter email or phone." required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="loginPassword" className="text-black font-medium">Password</Label>
                <Input id="loginPassword" type="password" placeholder="Enter your password." required className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-[#22b14c] hover:bg-[#1a8c39] text-white font-bold rounded-lg py-2 mt-2" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign in'}
              </Button>
              <div className="flex flex-col items-center mt-4 text-sm">
                <span>
                  Don't have an account?{' '}
                  <button type="button" className="text-[#22b14c] font-semibold hover:underline" onClick={() => setMode('signup')}>
                    Sign Up
                  </button>
                </span>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Auth;