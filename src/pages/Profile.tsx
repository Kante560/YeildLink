import React, { useState, useEffect } from 'react';
import { useAuth } from '@/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail, MapPin, Bell, Activity, LogOut, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    joinedDate: ''
  });

  const recentActivity = [
    { action: 'Added Cassava to crops', date: '2 days ago', type: 'crop' },
    { action: 'Posted Tomato listing', date: '1 week ago', type: 'marketplace' },
    { action: 'Received seasonal alert for Maize', date: '2 weeks ago', type: 'alert' },
  ];


  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.token) {
        toast({ title: 'Unauthorized', description: 'Please login to access your profile.', variant: 'destructive' });
        navigate('/login');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch('https://yieldlink-api-six.vercel.app/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || '',
            location: data.location || '',
            phone: data.phone || '',
            email: data.email || '',
            joinedDate: data.joinedDate || 'January 2024',
          });
        } else if (res.status === 401) {
          toast({ title: 'Session expired', description: 'Please login again.', variant: 'destructive' });
          logout();
          navigate('/login');
        } else {
          toast({ title: 'Error', description: 'Failed to fetch profile', variant: 'destructive' });
        }
      } catch (err) {
        toast({ title: 'Error', description: 'Network error', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!user || !user.token) {
      toast({ title: 'Unauthorized', description: 'Please login to update your profile.', variant: 'destructive' });
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://yieldlink-api-six.vercel.app/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          email: profile.email,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        toast({
          title: 'Profile Updated',
          description: 'Your profile information has been saved successfully.',
        });
      } else if (res.status === 401) {
        toast({ title: 'Session expired', description: 'Please login again.', variant: 'destructive' });
        logout();
        navigate('/login');
      } else {
        toast({ title: 'Error', description: 'Failed to update profile', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Network error', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    });
    navigate('/login');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <div className='flex flex-col' >
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
          className='bg-[#239B32] text-white hover:bg-green-700 hover:text-white'
        >
          <Edit className="mr-2 w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
        <Button className='flex md:hidden' >
          <LogOut className="mr-2 w-4 h-4" />
          <span onClick={handleLogout}>Logout</span>
        </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Your basic information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing || loading}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing || loading}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing || loading}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing || loading}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSaveProfile} variant="hero" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage how you receive seasonal alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive seasonal alerts and crop recommendations via SMS
                  </p>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Get weekly crop insights and marketplace updates
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="w  -8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">Member since {profile.joinedDate}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  {profile.location}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  {profile.phone}
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  {profile.email}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  );
};

export default Profile;