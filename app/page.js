'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখানে পরবর্তীতে ডাটা লোড করার কোড যুক্ত করা হবে
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          Al Baraka Investment Fund
        </h1>
        <p className="text-gray-600 mb-6">
          স্বাগতম! এটি আমাদের ইনভেস্টমেন্ট ফান্ডের হিসাব-নিকাশ ও ব্যবস্থাপনা পোর্টাল।
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">স্ট্যাটাস</h2>
          <p className="text-green-600 font-medium">
            {loading ? 'লোড হচ্ছে...' : 'সিস্টেম সফলভাবে প্রস্তুত রয়েছে!'}
          </p>
        </div>
      </div>
    </main>
  );
}
