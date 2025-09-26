import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {  Sprout } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const location = useLocation();

  // Set mode from query string on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'login' || urlMode === 'signup') {
      setMode(urlMode);
    }
  }, [location.search]);

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
        await signup(name, phone, email, password);
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
      // Custom error handling for common cases
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
          <div className="flex items-center space-x-2 mb-2">
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
                <Input id="location" placeholder="Enter your City, State." required className="mt-1" />
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
              {/* <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="mx-2 text-gray-400 text-xs">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <Button type="button" variant="outline" className="w-full border-gray-300 flex items-center justify-center gap-2 font-semibold text-gray-700 bg-white">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </Button> */}
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
              {/* <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="mx-2 text-gray-400 text-xs">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <Button type="button" variant="outline" className="w-full border-gray-300 flex items-center justify-center gap-2 font-semibold text-gray-700 bg-white">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </Button> */}
              <div className="flex flex-col items-center mt-4 text-sm">
                {/* <button type="button" className="text-black font-semibold hover:underline mb-2">Forgot Password?</button> */}
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