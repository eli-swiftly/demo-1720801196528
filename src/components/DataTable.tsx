import React from 'react';

interface DataTableProps {
  headers: string[];
  data: string[][];
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-700">
          {headers.map((header, index) => (
            <th key={index} className="py-2 px-4 font-medium text-gray-300">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-700">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 px-4 text-gray-300">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;