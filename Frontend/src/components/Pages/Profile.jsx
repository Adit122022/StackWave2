import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '@/store/useAuth';

const Profile = () => {
  const [user, setUser] = useState({});
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState('');
  const { fetchUserStore } = useAuthStore();


  const fetchUser = async () => {
    try {
     const data =await fetchUserStore()
      setUser(data);
      console.log(data)
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (Loading) return <div className="p-4">Loading profile...</div>;
  if (Error) return <div className="p-4 text-red-600">{Error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center text-2xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <div className="text-sm text-gray-600 mt-1">
              <span>Member for {user?.daysMember || 2} days</span> ·{' '}
              <span>Visited {user?.visitDays || 2} days, 2 consecutive</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 sm:mt-0">
          <button className="border text-sm px-3 py-1 rounded hover:shadow">
            Edit profile
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-full sm:w-64">
          <ul className="space-y-2 text-sm font-medium text-gray-700">
            <li className="font-semibold text-orange-600">Activity</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Summary</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Answers</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Questions</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Tags</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Articles</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Badges</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Following</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Reputation</li>
            <li className="text-gray-600 hover:text-black cursor-pointer">Votes</li>
          </ul>
        </div>

        <div className="flex-1 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="border rounded p-4 text-center">
              <h2 className="text-md font-semibold mb-2">Reputation is how the community thanks you</h2>
              <p className="text-sm text-gray-600">
                When users upvote your helpful posts, you'll earn reputation and unlock new privileges.
              </p>
            </div>
            <div className="border rounded p-4 text-center">
              <h2 className="text-md font-semibold mb-2">Earn badges for helpful actions</h2>
              <p className="text-sm text-gray-600">
                Badges are bits of digital flair you get for helpful actions.
              </p>
              <button className="mt-3 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                Take the Tour and earn your first badge
              </button>
            </div>
            <div className="border rounded p-4 text-center">
              <h2 className="text-md font-semibold mb-2">Measure your impact</h2>
              <p className="text-sm text-gray-600">
                Your posts and actions help people searching for help.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Answers</h3>
              <div className="text-sm text-gray-600">No answers yet.</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Questions</h3>
              <div className="text-sm text-gray-600">No questions posted.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
