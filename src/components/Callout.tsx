// @/components/Callout.tsx
// ⚠️ NO 'use client' - This is a Server Component

interface CalloutProps {
    children: React.ReactNode;
    type?: 'info' | 'warning' | 'danger' | 'success';
    title?: string;
  }
  
  export default function Callout({ children, type = 'info', title }: CalloutProps) {
    const colors = {
      info: {
        border: 'border-blue-500',
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        icon: '💡'
      },
      warning: {
        border: 'border-yellow-500',
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        icon: '⚠️'
      },
      danger: {
        border: 'border-red-500',
        bg: 'bg-red-50',
        text: 'text-red-800',
        icon: '🚨'
      },
      success: {
        border: 'border-green-500',
        bg: 'bg-green-50',
        text: 'text-green-800',
        icon: '✅'
      },
    };
  
    const current = colors[type];
  
    return (
      <div className={`my-6 p-4 border-l-4 rounded-r ${current.border} ${current.bg} ${current.text}`}>
        <div className="flex items-start">
          <span className="mr-2 text-lg">{current.icon}</span>
          <div className="flex-1">
            {title && (
              <h4 className="font-bold mb-2">{title}</h4>
            )}
            <div>{children}</div>
          </div>
        </div>
      </div>
    );
  }