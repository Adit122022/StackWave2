import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuth';
import UpdateUserProfile from './UpdateUserProfile';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { fetchUserStore ,updateProfile } = useAuthStore();

  const [showModal, setShowModal] = useState(false);

  const handleUpdate = async (data) => {
    try {
      await updateProfile(data);
      await fetchUser(); // Re-fetch the updated user data
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await fetchUserStore();
      setUser(data);
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

  if (loading) return <div className="p-4 text-gray-300">Loading profile...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 relative z-20">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-700 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">{user.name}</h1>
            <div className="text-sm text-gray-300 mt-1">
              <span>Member for {user?.daysMember || 2} days</span> ·{' '}
              <span>Visited {user?.visitDays || 2} days</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{user.bio}</p>
            <p className="mt-1 text-xs text-gray-400">Reputation: {user.reputation}</p>
          </div>
        </div>

        <div className="mt-6 sm:mt-0">
          <button  onClick={() => setShowModal(true)} className="border border-gray-600 text-sm text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            Edit Profile
          </button>

          {/* MODAL FOR EDIT */}
          <UpdateUserProfile
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleUpdate}
        initialData={{
          name: 'aditya',
          bio: 'Aspiring dev 🧠',
        }}
      />

        </div>
      </div>

      {/* Content Section */}
      <div className="flex gap-8">
        {/* Sidebar
        <aside className="w-full sm:w-64">
          <ul className="space-y-2 text-sm font-medium text-gray-400">
            <li className="font-semibold text-orange-500">Activity</li>
            <li className="hover:text-white cursor-pointer">Summary</li>
            <li className="hover:text-white cursor-pointer">Answers</li>
            <li className="hover:text-white cursor-pointer">Questions</li>
            <li className="hover:text-white cursor-pointer">Tags</li>
            <li className="hover:text-white cursor-pointer">Articles</li>
            <li className="hover:text-white cursor-pointer">Badges</li>
            <li className="hover:text-white cursor-pointer">Following</li>
            <li className="hover:text-white cursor-pointer">Reputation</li>
            <li className="hover:text-white cursor-pointer">Votes</li>
          </ul>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 space-y-10">
          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center shadow-sm">
              <h2 className="text-md font-semibold text-white mb-2">Reputation</h2>
              <p className="text-sm text-gray-300">
                Earn reputation when users upvote your helpful posts.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center shadow-sm">
              <h2 className="text-md font-semibold text-white mb-2">Badges</h2>
              <p className="text-sm text-gray-300">
                Get badges for helpful actions in the community.
              </p>
              <button className="mt-3 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                Take the Tour
              </button>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center shadow-sm">
              <h2 className="text-md font-semibold text-white mb-2">Impact</h2>
              <p className="text-sm text-gray-300">
                Your contributions help others find solutions.
              </p>
            </div>
          </div>

          {/* Questions & Answers */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Answers */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Answers ({user.answers?.length || 0})
              </h3>
              {user.answers?.length > 0 ? (
                <ul className="space-y-3">
                  {user.answers.map((ans) => (
                    <li
                      key={ans._id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:bg-gray-700 transition"
                    >
                      <p className="text-sm text-gray-200 font-medium mb-1">
                        On: {ans.questionId?.title || 'Untitled'}
                      </p>
                      <p className="text-gray-300 text-sm line-clamp-2">{ans.content}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No answers yet.</p>
              )}
            </div>

            {/* Questions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Questions ({user.questions?.length || 0})
              </h3>
              {user.questions?.length > 0 ? (
                <ul className="space-y-3">
                  {user.questions.map((ques) => (
                    <li
                      key={ques._id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-3 hover:bg-gray-700 transition"
                    >
                      <p className="text-sm text-gray-200 font-medium mb-1">{ques.title}</p>
                      <p className="text-gray-300 text-sm line-clamp-2">{ques.content}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No questions posted yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
