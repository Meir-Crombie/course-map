import React from "react";
import { Filter, X } from "lucide-react";

interface FilterPanelProps {
  filters: {
    semester: string | null;
    year: string | null;
    type: string | null;
  };
  onFilterChange: (key: string, value: string | null) => void;
  onClearFilters: () => void;
}

export default function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const hasActiveFilters = filters.semester || filters.year || filters.type;

  return (
    <div
      className="p-5 md:p-6 rounded-[20px] sticky top-24 bg-white/80 backdrop-blur-sm"
      style={{
        boxShadow: '6px 6px 16px rgba(0,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.9)'
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
          <Filter className="w-4 h-4 md:w-5 md:h-5" />
          סינון
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3 md:w-4 md:h-4" />
            נקה
          </button>
        )}
      </div>

      {/* Type Filter */}
      <div className="mb-5">
        <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">סוג קורס</h3>
        <div className="space-y-2">
          {[
            { label: "חובה", value: "mandatory" },
            { label: "בחירה", value: "optional" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onFilterChange("type", filters.type === value ? null : value)}
              className={`w-full px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                filters.type === value
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Semester Filter */}
      <div className="mb-5">
        <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">סמסטר</h3>
        <div className="space-y-2">
          {[
            { label: "סמסטר א'", value: "א" },
            { label: "סמסטר ב'", value: "ב" },
            { label: "שנתי", value: "שנתי" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onFilterChange("semester", filters.semester === value ? null : value)}
              className={`w-full px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                filters.semester === value
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Year Filter */}
      <div>
        <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">שנה</h3>
        <div className="space-y-2">
          {[
            { label: "שנה א'", value: "א" },
            { label: "שנה ב'", value: "ב" },
            { label: "שנה ג'", value: "ג" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onFilterChange("year", filters.year === value ? null : value)}
              className={`w-full px-3 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                filters.year === value
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
