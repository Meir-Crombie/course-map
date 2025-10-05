"use client"

import React from 'react';
import { X, Filter } from "lucide-react";

type FilterPanelProps = {
  filters: {
    semester: string | null;
    year: string | null;
    type: string | null;
  };
  onFilterChange: (key: string, value: string | null) => void;
  onClearFilters: () => void;
};

export default function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const semesters = ["א", "ב", "קיץ"];
  const years = ["א", "ב", "ג", "ד"];
  const types = ["חובה", "בחירה"];

  const activeFiltersCount = 
    (filters.semester ? 1 : 0) + 
    (filters.year ? 1 : 0) + 
    (filters.type ? 1 : 0);

  return (
    <div 
      className="p-5 rounded-[20px] bg-white/80 backdrop-blur-sm"
      style={{
        boxShadow: '6px 6px 16px rgba(0,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.9), inset 2px 2px 6px rgba(255,255,255,0.5)'
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-600" />
          <h3 className="text-base font-bold text-gray-800">סינון קורסים</h3>
          {activeFiltersCount > 0 && (
            <span 
              className="rounded-full text-xs px-2 py-0.5"
              style={{
                background: 'linear-gradient(145deg, #E0BBE4, #B3E5FC)',
                color: 'white',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700 rounded-xl text-xs h-8 px-3 bg-transparent hover:bg-gray-100 transition-colors flex items-center"
          >
            <X className="w-3 h-3 ml-1" />
            נקה
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">סמסטר</label>
          <div className="flex flex-wrap gap-2">
            {semesters.map((semester) => (
              <button
                key={semester}
                onClick={() => onFilterChange('semester', filters.semester === semester ? null : semester)}
                className="rounded-2xl text-xs h-9 px-3 transition-all border"
                style={filters.semester === semester ? {
                  background: 'linear-gradient(145deg, #E0BBE4, #B3E5FC)',
                  color: 'white',
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.1), inset 1px 1px 3px rgba(255,255,255,0.3)',
                  border: 'none'
                } : {
                  backgroundColor: 'white',
                  borderColor: '#e5e7eb'
                }}
              >
                סמסטר {semester}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">שנה</label>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => onFilterChange('year', filters.year === year ? null : year)}
                className="rounded-2xl text-xs h-9 px-3 transition-all border"
                style={filters.year === year ? {
                  background: 'linear-gradient(145deg, #A8E6CF, #B3E5FC)',
                  color: 'white',
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.1), inset 1px 1px 3px rgba(255,255,255,0.3)',
                  border: 'none'
                } : {
                  backgroundColor: 'white',
                  borderColor: '#e5e7eb'
                }}
              >
                שנה {year === "א" ? "א׳" : year === "ב" ? "ב׳" : year === "ג" ? "ג׳" : "ד׳"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">סוג קורס</label>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => onFilterChange('type', filters.type === type ? null : type)}
                className="rounded-2xl text-xs h-9 px-3 transition-all border"
                style={filters.type === type ? {
                  background: 'linear-gradient(145deg, #FFB6C1, #E0BBE4)',
                  color: 'white',
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.1), inset 1px 1px 3px rgba(255,255,255,0.3)',
                  border: 'none'
                } : {
                  backgroundColor: 'white',
                  borderColor: '#e5e7eb'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
