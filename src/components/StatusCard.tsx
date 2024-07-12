import React from 'react';

interface StatusCardProps {
  title: string;
  value: string;
  color: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, color }) => (
  <div className={`bg-[#252525] p-4 rounded-lg`}>
    <h3 className="text-gray-400 mb-2">{title}</h3>
    <p className={`text-2xl font-bold text-[${color}]`}>{value}</p>
  </div>
);

export default StatusCard;