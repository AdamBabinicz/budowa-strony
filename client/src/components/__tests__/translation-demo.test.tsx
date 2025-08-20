import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../lib/i18n';
import { TranslationDemo } from '../translation-demo';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
);

describe('TranslationDemo', () => {
  it('should render translation input and results', () => {
    render(
      <TestWrapper>
        <TranslationDemo />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('translation-key-input')).toBeInTheDocument();
    expect(screen.getByTestId('translation-pl')).toBeInTheDocument();
    expect(screen.getByTestId('translation-en')).toBeInTheDocument();
    expect(screen.getByTestId('translation-ja')).toBeInTheDocument();
  });

  it('should show default translations for hero.title', () => {
    render(
      <TestWrapper>
        <TranslationDemo />
      </TestWrapper>
    );
    
    const plTranslation = screen.getByTestId('translation-pl');
    const enTranslation = screen.getByTestId('translation-en');
    const jaTranslation = screen.getByTestId('translation-ja');
    
    expect(plTranslation).toHaveTextContent('AI Genesis: Interaktywny Meta-Tutorial');
    expect(enTranslation).toHaveTextContent('AI Genesis: Interactive Meta-Tutorial');
    expect(jaTranslation).toHaveTextContent('AI ジェネシス: インタラクティブメタチュートリアル');
  });

  it('should update translations when input changes', () => {
    render(
      <TestWrapper>
        <TranslationDemo />
      </TestWrapper>
    );
    
    const input = screen.getByTestId('translation-key-input');
    const plTranslation = screen.getByTestId('translation-pl');
    const enTranslation = screen.getByTestId('translation-en');
    const jaTranslation = screen.getByTestId('translation-ja');
    
    // Change to nav.home
    fireEvent.change(input, { target: { value: 'nav.home' } });
    
    expect(plTranslation).toHaveTextContent('Strona główna');
    expect(enTranslation).toHaveTextContent('Home');
    expect(jaTranslation).toHaveTextContent('ホーム');
  });

  it('should show "not found" message for invalid keys', () => {
    render(
      <TestWrapper>
        <TranslationDemo />
      </TestWrapper>
    );
    
    const input = screen.getByTestId('translation-key-input');
    const plTranslation = screen.getByTestId('translation-pl');
    const enTranslation = screen.getByTestId('translation-en');
    const jaTranslation = screen.getByTestId('translation-ja');
    
    // Change to invalid key
    fireEvent.change(input, { target: { value: 'invalid.key' } });
    
    expect(plTranslation).toHaveTextContent('Klucz nie znaleziony');
    expect(enTranslation).toHaveTextContent('Key not found');
    expect(jaTranslation).toHaveTextContent('キーが見つかりません');
  });

  it('should handle contact.title translation', () => {
    render(
      <TestWrapper>
        <TranslationDemo />
      </TestWrapper>
    );
    
    const input = screen.getByTestId('translation-key-input');
    const plTranslation = screen.getByTestId('translation-pl');
    const enTranslation = screen.getByTestId('translation-en');
    const jaTranslation = screen.getByTestId('translation-ja');
    
    // Change to contact.title
    fireEvent.change(input, { target: { value: 'contact.title' } });
    
    expect(plTranslation).toHaveTextContent('Kontakt');
    expect(enTranslation).toHaveTextContent('Contact');
    expect(jaTranslation).toHaveTextContent('お問い合わせ');
  });
});
