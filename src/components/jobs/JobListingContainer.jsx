"use client";

import React, { useState, useMemo, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { useRouter } from "next/navigation";

export default function JobListingContainer({ jobs, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [selectedType, setSelectedType] = useState(filters.jobType || "all");
  const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory || "all");
  const [isRemoteOnly, setIsRemoteOnly] = useState( filters.isRemote|| false);

  const router = useRouter();

  useEffect(() => {
    const sp = new URLSearchParams()

    if(searchQuery){
      sp.set('search', searchQuery);
    }

    if (selectedType !== 'all') {
      sp.set('jobType', selectedType)
    }
    if (selectedCategory !== 'all') {
      sp.set('jobCategory', selectedCategory)
    }

    if(isRemoteOnly){
      sp.set('isRemote', true)
    }

    console.log('search params', sp.toString());

    const path = `?${sp.toString()}`
    router.push(path);

  }, [router, searchQuery, selectedType, selectedCategory, isRemoteOnly])

  // Compute matched filter rows instantly
  // const jobs = useMemo(() => {
  //   return jobs.filter((job) => {
  //     const matchesSearch =
  //       job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       job.requirements?.toLowerCase().includes(searchQuery.toLowerCase());

  //     const matchesType = selectedType === "all" || job.jobType === selectedType;
  //     const matchesCategory = selectedCategory === "all" || job.jobCategory === selectedCategory;
  //     const matchesRemote = !isRemoteOnly || job.isRemote === true;

  //     return matchesSearch && matchesType && matchesCategory && matchesRemote;
  //   });
  // }, [searchQuery, selectedType, selectedCategory, isRemoteOnly, jobs]);

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {jobs.length} position{jobs.length !== 1 && "s"}
      </div>

      {jobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {jobs.map((jobItem) => (
            <JobCard
              key={jobItem._id?.$oid || jobItem._id}
              job={jobItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">No positions match your search criteria.</p>
        </div>
      )}
    </>
  );
}