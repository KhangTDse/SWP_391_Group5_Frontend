import React from "react";

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    iconBg: "bg-green-100",
  },
  yellow: {
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    iconBg: "bg-purple-100",
  },
};

function StatCard({ title, value, icon, color = "blue" }) {
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`group relative rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${theme.iconBg} ${theme.text} text-lg transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </p>

        <h3 className={`mt-1 text-xl font-bold ${theme.text}`}>{value}</h3>
      </div>

      {/* Subtle background glow */}
      <div
        className={`absolute -bottom-3 -right-3 h-16 w-16 rounded-full ${theme.bg} blur-2xl opacity-40`}
      ></div>
    </div>
  );
}

export default StatCard;
