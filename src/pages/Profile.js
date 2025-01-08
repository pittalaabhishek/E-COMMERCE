// ProfileComponent.js
import React, { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../store/atoms';
// import { supabase } from '../services/supabase';
import { supabase } from '../Auth/Client';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useRecoilState(userState);

  const fetchUserProfile = useCallback(async () => {
          try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
        
              if (error) throw error;
              setUser(data);
          }
          } catch (error) {
          console.error('Error fetching profile:', error.message);
          }
      }, [setUser]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: user.full_name,
          phone_number: user.phone_number,
          address: user.address
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="email">{user.email}</p>
      </div>
      
      <form onSubmit={handleUpdateProfile} className="profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={user.full_name || ''}
            onChange={(e) => setUser({ ...user, full_name: e.target.value })}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={user.phone_number || ''}
            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={user.address || ''}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            placeholder="Enter your address"
          />
        </div>

        <div className="profile-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>

      <div className="order-history">
        <h2>Recent Orders</h2>
        {/* Order history component would go here */}
      </div>
    </div>
  );
};

export default Profile;