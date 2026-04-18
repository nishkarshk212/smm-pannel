"use client";

import { useState, useEffect } from "react";

export default function ReferralsPage() {
  const [data, setData] = useState({
    referralCode: "",
    referralEarnings: 0,
    referrals: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/referrals")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  const referralLink = `${window.location.origin}/api/auth/signin?ref=${data.referralCode}`;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-2xl font-bold">Affiliate Program</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Referral Link</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50"
            />
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Copy
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Share this link and earn 10% commission on all your referrals' deposits!
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6 flex flex-col justify-center items-center">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Total Earnings</h2>
          <p className="text-4xl font-bold text-indigo-600">${data.referralEarnings.toFixed(2)}</p>
          <p className="mt-2 text-sm text-gray-500">Available in your balance</p>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Referrals</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.referrals.map((ref: any) => (
              <tr key={ref.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ref.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(ref.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {data.referrals.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">You haven't referred anyone yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
