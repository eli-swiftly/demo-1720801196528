import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent } from '../components';
import { theme } from '../theme';

const ReviewContent: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: theme.spacing.medium, marginBottom: theme.spacing.large }}>
        <Button>View Demo</Button>
        <Button>View Anomalies</Button>
      </div>
      <Card style={{ marginBottom: theme.spacing.large }}>
        <CardHeader>
          <CardTitle>AI-Detected Anomalies & Variances</CardTitle>
        </CardHeader>
        <CardContent>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing.small }}>
              <span style={{ color: theme.colors.accent.warning, marginRight: theme.spacing.small }}>⚠</span>
              Unusual increase in COGS (15% above average)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing.small }}>
              <span style={{ color: theme.colors.accent.warning, marginRight: theme.spacing.small }}>⚠</span>
              New supplier invoice detected: ABC Corp ($5,000)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing.small }}>
              <span style={{ color: theme.colors.accent.danger, marginRight: theme.spacing.small }}>⚠</span>
              Sales 10% below budget
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: theme.colors.accent.success, marginRight: theme.spacing.small }}>✓</span>
              Wages 5% below budget
            </li>
          </ul>
        </CardContent>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="outline">Request Changes</Button>
        <Button>Approve Report</Button>
      </div>
    </div>
  );
};

export default ReviewContent;