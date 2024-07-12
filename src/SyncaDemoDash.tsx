import React, { useState } from "react";
import { appConfig } from "./config";
import BaseLayout from "./BaseLayout";
import DashboardContent from "./components/DashboardContent";
import DataImportContent from "./components/DataImportContent";
import TemplatesContent from "./components/TemplatesContent";
import ReviewContent from "./components/ReviewContent";
import ReportContent from "./components/ReportContent";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components";
import { theme } from "./theme";



const SyncaDemoDash: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dataImport");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [activeScreen, setActiveScreen] = useState<string>("home");

  const handleSelectItemClick = (value: string) => {
    setSelectedClient(value);
  };

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "dataImport":
        return <DataImportContent />;
      case "review":
        return <ReviewContent />;
      case "report":
        return <ReportContent />;
      default:
        return null;
    }
  };

  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <>
            <h1 style={{ fontSize: theme.fontSizes.xlarge, fontWeight: 'bold', marginBottom: theme.spacing.large }}>{appConfig.title}</h1>

            <div style={{ marginBottom: theme.spacing.xlarge, maxWidth: '300px' }}>
              <label htmlFor="client-select" style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.small, display: 'block' }}>Select a client</label>
              <Select
                value={selectedClient}
                onValueChange={setSelectedClient}
              >
                <SelectTrigger id="client-select" style={{ backgroundColor: theme.colors.background.secondary, borderColor: theme.colors.border.primary, color: theme.colors.text.primary }}>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: theme.colors.background.secondary, borderColor: theme.colors.border.primary }}>
  <SelectItem value="client1" onClick={(value) => handleSelectItemClick(value)}>Client 1</SelectItem>
  <SelectItem value="client2" onClick={(value) => handleSelectItemClick(value)}>Client 2</SelectItem>
  <SelectItem value="client3" onClick={(value) => handleSelectItemClick(value)}>Client 3</SelectItem>
</SelectContent>
              </Select>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} style={{ marginBottom: theme.spacing.large }}>
              <TabsList style={{ backgroundColor: theme.colors.background.secondary, padding: theme.spacing.small, borderRadius: theme.borderRadius.medium }}>
                {appConfig.tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id} 
                    style={{
                      backgroundColor: activeTab === tab.id ? theme.colors.accent.primary : 'transparent',
                      color: activeTab === tab.id ? theme.colors.text.primary : theme.colors.text.secondary,
                      padding: `${theme.spacing.small} ${theme.spacing.medium}`,
                      borderRadius: theme.borderRadius.small,
                    }}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {appConfig.tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <Card style={{ backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.large, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <CardHeader>
                      <CardTitle style={{ fontSize: theme.fontSizes.large, color: theme.colors.text.primary }}>{tab.label}</CardTitle>
                      <CardDescription style={{ color: theme.colors.text.secondary }}>
                        {tab.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderTabContent(tab.id)}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </>
        );
      case 'analytics':
        return <DashboardContent />;
      case 'templates':
        return <TemplatesContent />;
      default:
        return null;
    }
  };

  return (
    <BaseLayout activeScreen={activeScreen} setActiveScreen={setActiveScreen}>
      {renderScreenContent()}
    </BaseLayout>
  );
};

export default SyncaDemoDash;