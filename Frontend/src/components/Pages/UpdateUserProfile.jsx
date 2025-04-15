import useAuthStore from '@/store/useAuth';
import React, { useState } from 'react';

const UpdateUserProfile = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [username, setUsername] = useState(initialData.name || '');
  const [bio, setBio] = useState(initialData.bio || '');
 const {updateProfile} = useAuthStore()

  if (!isOpen) return null;

  const handleSubmit =async (e) => {
    e.preventDefault();

    onSubmit({ name: username, bio });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex w-full h-screen items-center justify-center z-50">
      <div className=" rounded-xl py-8 px-10 w-full  border-[1px] border-gray-500 bg-gray-700/80 max-w-md  shadow-2xl relative ">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full ">
          {/* Username Input */}
          <label className="input validator outline-1 outline-gray-500 flex w-full items-center gap-2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full outline-none"
            />
          </label>
          <p className="text-xs text-gray-500 ml-1">
            Must be 3 to 30 characters<br />containing only letters, numbers or dash
          </p>

          {/* Bio Input */}
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Your bio</legend>
  <textarea
   onChange={(e) => setBio(e.target.value)} className="outline-gray-500 focus:outline-emerald-500 w-full textarea h-24 outline-1" placeholder="Bio"></textarea>
  <div className="fieldset-label">Optional</div>
</fieldset>
             
          <p className="text-xs text-gray-500 ml-1">Max 150 characters</p>

          {/* Actions */}
          <div className="flex justify-between items-center gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-600 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
