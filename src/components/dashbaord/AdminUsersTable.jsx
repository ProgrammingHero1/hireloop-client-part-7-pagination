'use client';

import React, { useState } from 'react';
import { Person, Briefcase, ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { updateUserRole } from '@/lib/actions/users';

export default function AdminUsersTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);

    // Helper function to format MongoDB ISO dates to 'MMM DD, YYYY' (e.g., Oct 12, 2023)
    const formatDate = (dateObj) => {
        if (!dateObj || !dateObj.$date) return 'N/A';
        const date = new Date(dateObj.$date);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    // Safe accessor for MongoDB OID
    const getUserId = (user) => user._id?.$oid || user.id;

    const handleRoleChange = async (userId, newRole) => {
        const data = await updateUserRole(userId, newRole);

    };

    const handleStatusChange = async (userId, newStatus) => {
        // Mapping 'status' locally since your schema currently controls flow via active/suspended fields
        setUsers(prev => prev.map(u => getUserId(u) === userId ? { ...u, status: newStatus } : u));
    };

    const handleDelete = async (userId) => {
        setUsers(prev => prev.filter(u => getUserId(u) !== userId));
    };

    return (
        <div className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-sans">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-zinc-400">

                    {/* Header */}
                    <thead>
                        <tr className="border-b border-zinc-800 text-zinc-400 font-medium select-none">
                            <th className="py-5 px-6 font-normal">User Name</th>
                            <th className="py-5 px-6 font-normal">Email Address</th>
                            <th className="py-5 px-6 font-normal">Role</th>
                            <th className="py-5 px-6 font-normal">Join Date</th>
                            <th className="py-5 px-6 font-normal">Status</th>
                            <th className="py-5 px-6 font-normal text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-zinc-800/60 bg-[#1e1e1e]">
                        {users.map((user) => {
                            const userId = getUserId(user);
                            const userRole = user.role?.toLowerCase() || 'seeker';
                            const userStatus = user.status || 'Active'; // Fallback default state

                            return (
                                <tr key={userId} className="hover:bg-zinc-900/40 transition-colors duration-150">

                                    {/* User Name + Initial Avatar */}
                                    <td className="py-4 px-6 font-medium text-zinc-200 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex items-center justify-center text-xs text-zinc-300 font-bold tracking-wider">
                                                {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                            </div>
                                            <span>{user.name || 'Unknown User'}</span>
                                        </div>
                                    </td>

                                    {/* Email Address */}
                                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                                        {user.email}
                                    </td>

                                    {/* Role Badge mapped to your lowercase roles */}
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        {userRole === 'recruiter' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 text-zinc-900 shadow-sm">
                                                <Briefcase width={12} height={12} />
                                                Recruiter
                                            </span>
                                        ) : userRole === 'admin' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-purple-950/40 text-purple-300 border border-purple-800/50 capitalize">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                                                <Person width={12} height={12} />
                                                Seeker
                                            </span>
                                        )}
                                    </td>

                                    {/* Join Date processed from MongoDB $date structure */}
                                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                                        {formatDate(user.createdAt)}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        {userStatus === 'Active' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-950/30 text-emerald-400 border border-emerald-900/40">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-950/30 text-red-400 border border-red-900/40">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                Suspended
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions Column */}
                                    <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-medium">
                                        <div className="flex items-center justify-end gap-4">

                                            {/* Change Roles Triggers */}
                                            {userRole !== 'admin' && (
                                                <button
                                                    onClick={() => handleRoleChange(userId, 'admin')}
                                                    className="text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                            {userRole !== 'recruiter' && (
                                                <button
                                                    onClick={() => handleRoleChange(userId, 'recruiter')}
                                                    className="text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    Make Recruiter
                                                </button>
                                            )}
                                            {userRole !== 'seeker' && (
                                                <button
                                                    onClick={() => handleRoleChange(userId, 'seeker')}
                                                    className="text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    Make Seeker
                                                </button>
                                            )}

                                            {/* Suspension Toggle / Delete Operations */}
                                            {userStatus === 'Active' ? (
                                                <button
                                                    onClick={() => handleStatusChange(userId, 'Suspended')}
                                                    className="text-red-500 hover:text-red-400 transition-colors pl-2 border-l border-zinc-800"
                                                >
                                                    Suspend
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(userId, 'Active')}
                                                        className="text-emerald-500 hover:text-emerald-400 transition-colors pl-2 border-l border-zinc-800"
                                                    >
                                                        Activate
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(userId)}
                                                        className="text-zinc-400 hover:text-red-400 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500 select-none">
                <div>
                    Showing 1 to {users.length} of 12,842 users
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:text-zinc-300 transition-colors">
                        <ChevronLeft width={16} height={16} />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center bg-white text-zinc-900 rounded font-medium">
                        1
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
                        2
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
                        3
                    </button>
                    <span className="px-1 text-zinc-600">...</span>
                    <button className="w-fit px-1.5 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
                        1285
                    </button>
                    <button className="p-1 hover:text-zinc-300 transition-colors">
                        <ChevronRight width={16} height={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}