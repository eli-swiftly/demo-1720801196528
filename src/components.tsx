import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, CSSProperties, MouseEvent as ReactMouseEvent } from "react";

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  style?: CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({ children, defaultValue, onValueChange, style }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className="font-sans text-white" style={style}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsContentProps {
  children: ReactNode;
  value: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ children, value }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs");
  }

  const { activeTab } = context;
  if (value !== activeTab) return null;
  return <div>{children}</div>;
};

interface TabsListProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const TabsList: React.FC<TabsListProps> = ({ children, style }) => (
  <div className="flex bg-[#161717] rounded-lg p-1 mb-5" style={style}>
    {children}
  </div>
);

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  style?: CSSProperties;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, value, style }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs");
  }

  const { activeTab, setActiveTab } = context;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-5 py-2 m-1 rounded-lg cursor-pointer ${
        activeTab === value
          ? "bg-[#8AB4F8] font-bold text-white"
          : "bg-transparent text-gray-400"
      }`}
      style={style}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, style }) => (
  <div className="rounded-lg p-5 my-2 bg-[#161717] text-white" style={style}>
    {children}
  </div>
);

interface CardContentProps {
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => <div className="mt-2">{children}</div>;

interface CardDescriptionProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, style }) => <p className="text-gray-400 mt-1" style={style}>{children}</p>;

interface CardFooterProps {
  children: ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => <div className="mt-5 border-t border-gray-600 pt-2">{children}</div>;

interface CardHeaderProps {
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => <div>{children}</div>;

interface CardTitleProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => <h2 className="mb-2 text-white" style={style}>{children}</h2>;

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  variant?: "outline";
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant, style, className, disabled }) => (
  <button 
    onClick={onClick} 
    style={style}
    className={`px-5 py-2 m-1 rounded-lg cursor-pointer font-medium ${
      variant === "outline"
        ? "bg-transparent border border-[#00A3FF] text-[#00A3FF]"
        : "bg-[#8AB4F8] text-white"
    } ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);

interface InputProps {
  type?: string; 
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, id, className }) => (
  <input
    type={type} 
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    id={id}
    className={`px-4 py-2 mb-1 rounded-lg border border-gray-700 bg-[#1E1E1E] text-white w-full ${className}`}
  />
);

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block mb-1 text-gray-400">{children}</label>
);

interface SelectProps {
  children: ReactNode;
  onValueChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ children, onValueChange, value, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="relative inline-block w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer border border-gray-700 px-4 py-2 rounded-lg bg-[#1E1E1E] text-white flex justify-between items-center"
      >
        {value || placeholder || "Select..."}
        <span className="ml-2">▼</span>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1E1E1E] border border-gray-700 border-t-0 rounded-b-lg z-50 max-h-40 overflow-y-auto">
          {React.Children.map(children, (child) =>
            child && React.isValidElement(child) ? (
              React.cloneElement(child as React.ReactElement<{ value: string; onClick: () => void; }>, {
                onClick: () => {
                  if (child.props && 'value' in child.props) {
                    onValueChange(child.props.value);
                    setIsOpen(false);
                  }
                },
              })
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

interface SelectItemProps {
  children: ReactNode;
  value: string;
  onClick: (value: string) => void;
  style?: CSSProperties;
}

interface SelectTriggerProps {
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, style, id }) => <div id={id} style={style}>{children}</div>;

export const SelectItem: React.FC<SelectItemProps> = ({ children, value, onClick, style }) => (
  <div
    onClick={() => onClick(value)}
    className="px-4 py-2 cursor-pointer text-white hover:bg-[#252525]"
    style={style}
  >
    {children}
  </div>
);



export const SelectValue: React.FC<{ placeholder?: string; style?: CSSProperties }> = ({ placeholder, style }) => <span style={style}>{placeholder}</span>;

export const SelectContent: React.FC<{ children: ReactNode; style?: CSSProperties }> = ({ children, style }) => <div style={style}>{children}</div>;