import React from 'react';
import Link from 'next/link';
import { Lock } from '@gravity-ui/icons';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 dark:bg-slate-900">
      <div className="max-w-md w-full text-center space-y-8 backdrop-blur-sm bg-white/40 p-8 rounded-2xl shadow-xl border border-slate-200/50 dark:bg-slate-800/40 dark:border-slate-700/50">
        
        {/* Icon Container */}
        <div className="relative flex justify-center">
          {/* Decorative glowing background effect */}
          <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full w-24 h-24 mx-auto" />
          
          <div className="relative bg-red-50 text-red-500 p-5 rounded-full border border-red-100 dark:bg-red-950/30 dark:border-red-900/50">
            {/* Gravity UI Padlock Icon */}
            <Lock width={48} height={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            403
          </h1>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Access Forbidden
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Hold on there! You do not have the required permissions to access this page. If you think this is a mistake, please contact your administrator.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors duration-200 shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Go to Dashboard
          </Link>
          
          <button
            
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-lg transition-colors duration-200 shadow-sm dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700"
          >
            Go Back
          </button>
        </div>
        
      </div>
    </div>
  );
}