function StatCard({ title, value, icon, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>

      <div
        className={`w-10 h-10 flex items-center justify-center rounded-xl ${colorMap[color]}`}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;
