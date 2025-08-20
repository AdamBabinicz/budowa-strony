import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../lib/i18n';
import { ThemeProvider } from '../theme-provider';
import { ControlHub } from '../control-hub';

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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

describe('ControlHub', () => {
  it('should render with collapsed state initially', () => {
    render(
      <TestWrapper>
        <ControlHub />
      </TestWrapper>
    );
    
    const hub = screen.getByTestId('control-hub');
    expect(hub).toHaveClass('control-hub-collapsed');
  });

  it('should expand on mouse enter', async () => {
    render(
      <TestWrapper>
        <ControlHub />
      </TestWrapper>
    );
    
    const hub = screen.getByTestId('control-hub');
    
    fireEvent.mouseEnter(hub);
    
    await waitFor(() => {
      expect(hub).toHaveClass('control-hub-expanded');
    });
  });

  it('should collapse on mouse leave', async () => {
    render(
      <TestWrapper>
        <ControlHub />
      </TestWrapper>
    );
    
    const hub = screen.getByTestId('control-hub');
    
    fireEvent.mouseEnter(hub);
    await waitFor(() => {
      expect(hub).toHaveClass('control-hub-expanded');
    });
    
    fireEvent.mouseLeave(hub);
    await waitFor(() => {
      expect(hub).toHaveClass('control-hub-collapsed');
    });
  });

  it('should have navigation links for all phases', () => {
    render(
      <TestWrapper>
        <ControlHub />
      </TestWrapper>
    );

    expect(screen.getByTestId('nav-iskra')).toBeInTheDocument();
    expect(screen.getByTestId('nav-fundamenty')).toBeInTheDocument();
    expect(screen.getByTestId('nav-innowacja')).toBeInTheDocument();
    expect(screen.getByTestId('nav-development')).toBeInTheDocument();
    expect(screen.getByTestId('nav-zasieg')).toBeInTheDocument();
    expect(screen.getByTestId('nav-final')).toBeInTheDocument();
  });

  it('should have language selector', () => {
    render(
      <TestWrapper>
        <ControlHub />
      </TestWrapper>
    );

    const languageSelector = screen.getByTestId('language-selector');
    expect(languageSelector).toBeInTheDocument();
  });

  it('should have theme toggle', () => {
    render(
      <TestWrapper>
        <ControlHub />
      </TestWrapper>
    );

    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
  });

  it('should scroll to section when navigation link is clicked', () => {
    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    const mockGetElementById = vi.fn();
    
    Object.defineProperty(document, 'getElementById', {
      value: mockGetElementById,
      writable: true,
    });
    
    mockGetElementById.mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });

    render(
      <TestWrapper>
        <ControlHub />
      </TestWrapper>
    );

    const iskraLink = screen.getByTestId('nav-iskra');
    fireEvent.click(iskraLink);

    expect(mockGetElementById).toHaveBeenCalledWith('phase-0');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
