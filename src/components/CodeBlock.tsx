// @/components/CodeBlock.tsx
'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useReaderTheme } from '@/components/ReaderThemeProvider';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useReaderTheme();
  
  // Extract language from className (format: "language-cpp")
  const language = className?.replace('language-', '') || 'text';
  
  // Extract code string from children
  const codeString = Array.isArray(children) 
    ? children.join('')
    : String(children);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div
      className="my-4 overflow-hidden rounded-lg border shadow-sm"
      style={{
        borderColor: 'var(--reader-code-border)',
        boxShadow: theme === 'dark' ? '0 10px 30px rgba(0,0,0,0.22)' : '0 6px 20px rgba(74,31,44,0.08)',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          backgroundColor: theme === 'dark' ? '#130F11' : '#4A1F2C',
        }}
      >
        <span className="font-mono text-sm text-[#F1E8EB]">
          {language.toUpperCase()}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-[#D9C5CC] transition-colors hover:text-white"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : oneLight}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: '0 0 0.5rem 0.5rem',
          fontSize: '0.875rem',
          background: 'var(--reader-code-bg)',
          color: theme === 'dark' ? '#F8EDEF' : '#3F2530',
          borderTop: '1px solid var(--reader-code-border)',
        }}
        codeTagProps={{
          style: {
            color: theme === 'dark' ? '#F8EDEF' : '#3F2530',
          },
        }}
        lineNumberStyle={{
          color: theme === 'dark' ? '#8F6E77' : '#A38A92',
          minWidth: '2.25em',
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
