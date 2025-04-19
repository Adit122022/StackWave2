import React from 'react';

const usersData = [
  {
    name: 'Dio Lupa',
    song: 'Remaining Reason',
    description:
      '"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.',
    image: 'https://img.daisyui.com/images/profile/demo/1@94.webp',
  },
  {
    name: 'Ellie Beilish',
    song: 'Bears of a fever',
    description:
      '"Bears of a Fever" captivated audiences with its intense energy and mysterious lyrics. Its popularity skyrocketed after fans shared it widely online, earning Ellie critical acclaim.',
    image: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
  },
  {
    name: 'Sabrino Gardener',
    song: 'Cappuccino',
    description:
      '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
    image: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
  },
];

const Users = () => {
  return (
    <div className="p-4">
      <div className="bg-base-100 rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold text-primary tracking-wide uppercase opacity-70">
          Most Played Songs This Week
        </h2>

        {usersData.map((user, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all"
          >
            {/* Profile Image */}
            <img src={user.image} alt={user.name} className="w-14 h-14 rounded-lg object-cover" />

            {/* Name and Song Info */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{user.name}</h3>
              <p className="text-xs uppercase font-bold text-gray-400">{user.song}</p>
              <p className="text-sm mt-2 text-gray-500">{user.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-2 md:mt-0">
              <button className="btn btn-sm btn-outline btn-primary tooltip" data-tip="Play">
                ▶️
              </button>
              <button className="btn btn-sm btn-outline btn-secondary tooltip" data-tip="Like">
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
