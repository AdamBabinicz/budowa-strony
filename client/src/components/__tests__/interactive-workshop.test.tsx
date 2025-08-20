import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../lib/i18n';
import { InteractiveWorkshop } from '../interactive-workshop';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </QueryClientProvider>
  );
};

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('InteractiveWorkshop', () => {
  it('should render gallery demo and controls', () => {
    render(
      <TestWrapper>
        <InteractiveWorkshop />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('gallery-demo')).toBeInTheDocument();
    expect(screen.getByTestId('bug-button')).toBeInTheDocument();
    expect(screen.getByTestId('copy-code-button')).toBeInTheDocument();
    expect(screen.getByTestId('code-display')).toBeInTheDocument();
  });

  it('should simulate bug when button is clicked', () => {
    render(
      <TestWrapper>
        <InteractiveWorkshop />
      </TestWrapper>
    );
    
    const bugButton = screen.getByTestId('bug-button');
    const codeDisplay = screen.getByTestId('code-display');
    
    // Initially should show "Symuluj Błąd!"
    expect(bugButton).toHaveTextContent('🐛 Symuluj Błąd!');
    
    fireEvent.click(bugButton);
    
    // After click should show "Napraw!"
    expect(bugButton).toHaveTextContent('✅ Napraw!');
    
    // Code should contain bug comments
    expect(codeDisplay).toHaveTextContent('WITH BUG!');
    expect(codeDisplay).toHaveTextContent('BUG: Wrong grid-cols!');
  });

  it('should fix bug when fix button is clicked', () => {
    render(
      <TestWrapper>
        <InteractiveWorkshop />
      </TestWrapper>
    );
    
    const bugButton = screen.getByTestId('bug-button');
    const codeDisplay = screen.getByTestId('code-display');
    
    // First simulate bug
    fireEvent.click(bugButton);
    expect(bugButton).toHaveTextContent('✅ Napraw!');
    
    // Then fix it
    fireEvent.click(bugButton);
    
    // Should be back to original state
    expect(bugButton).toHaveTextContent('🐛 Symuluj Błąd!');
    expect(codeDisplay).toHaveTextContent('FIXED!');
    expect(codeDisplay).not.toHaveTextContent('WITH BUG!');
  });

  it('should copy code to clipboard when copy button is clicked', async () => {
    const mockWriteText = vi.fn();
    navigator.clipboard.writeText = mockWriteText;
    
    render(
      <TestWrapper>
        <InteractiveWorkshop />
      </TestWrapper>
    );
    
    const copyButton = screen.getByTestId('copy-code-button');
    
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled();
    });
  });

  it('should toggle CSS classes on gallery when bug is simulated', () => {
    render(
      <TestWrapper>
        <InteractiveWorkshop />
      </TestWrapper>
    );
    
    const bugButton = screen.getByTestId('bug-button');
    const gallery = screen.getByTestId('gallery-demo');
    
    // Simulate bug
    fireEvent.click(bugButton);
    
    // Check if gallery grid classes are modified
    const grid = gallery.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).not.toHaveClass('grid-cols-2');
    
    // Fix bug
    fireEvent.click(bugButton);
    
    // Check if classes are restored
    expect(grid).toHaveClass('grid-cols-2');
    expect(grid).not.toHaveClass('grid-cols-1');
  });
});
