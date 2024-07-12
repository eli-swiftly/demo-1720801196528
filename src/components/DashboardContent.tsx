import React from 'react';
import StatusCard from './StatusCard';
import Chart from './Chart';
import DataTable from './DataTable';
import { theme } from '../theme';

interface ChartData {
  name: string;
  proposals: number;
  accepted: number;
  value: number;
}

interface TableData {
  client: string;
  project: string;
  value: string;
  status: string;
}

const DashboardContent: React.FC = () => {
  const chartData: ChartData[] = [
    { name: 'Jan', proposals: 10, accepted: 7, value: 70000 },
    { name: 'Feb', proposals: 15, accepted: 10, value: 100000 },
    { name: 'Mar', proposals: 20, accepted: 15, value: 150000 },
    { name: 'Apr', proposals: 25, accepted: 18, value: 180000 },
  ];

  const tableData: TableData[] = [
    { client: 'Client A', project: 'Website Redesign', value: '$15,000', status: 'Pending' },
    { client: 'Client B', project: 'SEO Optimization', value: '$5,000', status: 'Accepted' },
    { client: 'Client C', project: 'E-commerce Platform', value: '$25,000', status: 'In Negotiation' },
    { client: 'Client D', project: 'Mobile App Development', value: '$30,000', status: 'Drafting' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: theme.fontSizes.xlarge, fontWeight: 'bold', marginBottom: theme.spacing.large }}>Proposal Analytics</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.medium, marginBottom: theme.spacing.large }}>
        <StatusCard title="Total Proposals" value="70" color={theme.colors.accent.primary} />
        <StatusCard title="Accepted Proposals" value="50" color={theme.colors.accent.success} />
        <StatusCard title="Pending Proposals" value="15" color={theme.colors.accent.warning} />
        <StatusCard title="Conversion Rate" value="71.4%" color={theme.colors.accent.info} />
      </div>
      <div style={{ marginBottom: theme.spacing.large }}>
        <h3 style={{ fontSize: theme.fontSizes.large, marginBottom: theme.spacing.medium }}>Proposal Metrics</h3>
        <Chart 
          data={chartData}
          dataKeys={[
            { dataKey: 'proposals', color: '#8884d8', name: 'Total Proposals' },
            { dataKey: 'accepted', color: '#82ca9d', name: 'Accepted Proposals' },
            { dataKey: 'value', color: '#ffc658', name: 'Value ($)' },
          ]}
        />
      </div>
      <div>
        <h3 style={{ fontSize: theme.fontSizes.large, marginBottom: theme.spacing.medium }}>Recent Proposals</h3>
        <DataTable 
          headers={['Client', 'Project', 'Value', 'Status']}
          data={tableData.map(item => [item.client, item.project, item.value, item.status])}
        />
      </div>
    </div>
  );
};

export default DashboardContent;