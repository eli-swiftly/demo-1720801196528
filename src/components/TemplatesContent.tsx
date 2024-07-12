import React from 'react';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent } from '../components';
import { theme } from '../theme';

const TemplatesContent: React.FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: theme.fontSizes.xlarge, fontWeight: 'bold', marginBottom: theme.spacing.large }}>Templates</h1>
      <Card style={{ marginBottom: theme.spacing.large }}>
        <CardHeader>
          <CardTitle>Create New Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ marginBottom: theme.spacing.medium }}>
            <Label htmlFor="template-name">Template Name</Label>
            <Input id="template-name" placeholder="Enter template name" />
          </div>
          <div style={{ marginBottom: theme.spacing.medium }}>
            <Label htmlFor="template-description">Description</Label>
            <Input id="template-description" placeholder="Enter template description" />
          </div>
          <Button>Create Template</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.medium }}>
              <span>Email Automation</span>
              <div>
                <Button style={{ marginRight: theme.spacing.small }}>Edit</Button>
                <Button variant="outline">Delete</Button>
              </div>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Presentable Materials Automation</span>
              <div>
                <Button style={{ marginRight: theme.spacing.small }}>Edit</Button>
                <Button variant="outline">Delete</Button>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesContent;