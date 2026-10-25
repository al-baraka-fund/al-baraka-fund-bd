'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [membersCount, setMembersCount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReserve, setTotalReserve] = useState(0);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // ১. সদস্য সংখ্যা গণনা
        const { count: memberCount, error: memberError } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true });
        
        if (!memberError) setMembersCount(memberCount || 0);

        // ২. মোট বিনিয়োগের পরিমাণ হিসাব
        const { data: invData, error: invError } = await supabase
          .from('investments')
          .select('invested_amount');
        
        if (!invError && invData) {
          const sumInv = invData.reduce((acc, curr) => acc + Number(curr.invested_amount || 0), 0);
          setTotalInvestment(sumInv);
        }

        // ৩. রিজার্ভ ফান্ডের মোট পরিমাণ হিসাব
        const { data: resData, error: resError } = await supabase
          .from('reserve_funds')
          .select('amount');
        
        if (!resError && resData) {
          const sumRes = resData.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
          setTotalReserve(sumRes);
        }

      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          আল বারাকা ইনভেস্টমেন্ট ফান্ড
        </h1>
        <p className="text-gray-600 mb-6">
          স্বাগতম! এটি আমাদের শরিয়াহসম্মত ৫ বছর মেয়াদী কম্পাউন্ডিং ইনভেস্টমেন্ট ও ব্যবস্থাপনা পোর্টাল।
        </p>

        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center text-green-600 font-medium">
            ডাটা লোড হচ্ছে...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-500 mb-1">মোট সদস্য</h2>
              <p className="text-2xl font-bold text-green-700">{membersCount} জন</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-500 mb-1">মোট বিনিয়োগ</h2>
              <p className="text-2xl font-bold text-green-700">৳ {totalInvestment.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-500 mb-1">রিজার্ভ ফান্ড (২০%)</h2>
              <p className="text-2xl font-bold text-green-700">৳ {totalReserve.toLocaleString()}</p>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">সিস্টেম স্ট্যাটাস</h2>
          <p className="text-green-600 font-medium">
            সদস্য, বিনিয়োগ ও রিজার্ভ টেবিলের সাথে ডেটাবেজ সংযোগ সফলভাবে সম্পন্ন হয়েছে!
          </p>
        </div>
      </div>
    </main>
  );
}
