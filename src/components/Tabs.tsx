// @/components/Tabs.tsx
'use client';

import React, { useState, ReactNode, Children, isValidElement } from 'react';

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || '');
  
  // Find the first tab value if none provided
  const childArray = Children.toArray(children);
  const firstTabElement = childArray.find((child) => isValidElement<{ value?: string }>(child) && child.props.value);
  const firstTabValue =
    isValidElement<{ value?: string }>(firstTabElement) && firstTabElement.props.value
      ? firstTabElement.props.value
      : '';

  const finalActiveTab = activeTab || defaultValue || firstTabValue;

  return (
    <div className="my-6">
      {Children.map(children, (child) => {
        if (isValidElement<TabsListProps | TabsContentProps>(child)) {
          if (child.type === TabsList) {
            return React.cloneElement(child, { 
              activeTab: finalActiveTab,
              setActiveTab 
            } as React.ComponentProps<typeof TabsList>);
          }
          if (child.type === TabsContent) {
            const contentChild = child as React.ReactElement<TabsContentProps>;
            if (contentChild.props.value === finalActiveTab) {
              return contentChild;
            }
            return null;
          }
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  children: ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

export function TabsList({ 
  children, 
  activeTab, 
  setActiveTab 
}: TabsListProps) {
  return (
    <div className="flex space-x-1 border-b border-gray-200">
      {Children.map(children, (child) => {
        if (isValidElement<TabsTriggerProps>(child)) {
          return React.cloneElement(child, { 
            isActive: child.props.value === activeTab,
            onClick: () => setActiveTab?.(child.props.value)
          } as any);
        }
        return child;
      })}
    </div>
  );
}

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function TabsTrigger({ 
  children, 
  value,
  isActive,
  onClick 
}: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'border-b-2 border-blue-500 text-blue-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
}

export function TabsContent({ children, value }: TabsContentProps) {
  return <div className="mt-4">{children}</div>;
}
