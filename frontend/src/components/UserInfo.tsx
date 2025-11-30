type User = {
  id: number;
  username: string;
  email: string;
};

export default function UserInfo({ user }: { user: User | null }) {
  if (!user) return null;
  return (
    <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2 text-center text-white">User Info</h2>
      <div className="mb-2 text-gray-100"><span className="font-semibold">ID:</span> {user.id}</div>
      <div className="mb-2 text-gray-100"><span className="font-semibold">Username:</span> {user.username}</div>
      <div className="mb-2 text-gray-100"><span className="font-semibold">Email:</span> {user.email}</div>
    </div>
  );
}
