interface TabConfig {
  id: string;
  label: string;
  description: string;
}

interface AppConfig {
  title: string;
  tabs: TabConfig[];
}

export const appConfig: AppConfig = {
  title: "Welcome!",
  tabs: [
    {
      id: "dataImport",
      label: "Data Import",
      description: "Import and process client data",
    },
    {
      id: "review",
      label: "Review & Approve",
      description: "Review and approve generated proposals",
    },
    {
      id: "report",
      label: "Generate Report",
      description: "Create and send final proposals",
    },
  ],
};