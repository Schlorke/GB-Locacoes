'use client';

import type * as React from 'react';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Input } from './input';

interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number;
  onValueChange?: (_value: number) => void;
  currency?: string;
  locale?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value = 0, onValueChange, currency = 'BRL', locale = 'pt-BR', ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const formatCurrency = useCallback(
      (num: number): string => {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(num);
      },
      [locale, currency],
    );

    useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatCurrency(value || 0));
      }
    }, [value, isFocused, formatCurrency]);

    const parseCurrency = (str: string): number => {
      // Remove tudo exceto números, vírgula e ponto
      const cleanStr = str.replace(/[^\d,.]/g, '');

      // Se tem vírgula e ponto, assume formato brasileiro (1.234,56)
      if (cleanStr.includes(',') && cleanStr.includes('.')) {
        const normalizedStr = cleanStr.replace(/\./g, '').replace(',', '.');
        return Number.parseFloat(normalizedStr) || 0;
      }

      // Se só tem vírgula, assume decimal brasileiro (123,45)
      if (cleanStr.includes(',') && !cleanStr.includes('.')) {
        const normalizedStr = cleanStr.replace(',', '.');
        return Number.parseFloat(normalizedStr) || 0;
      }

      // Se só tem ponto, assume decimal americano (123.45)
      return Number.parseFloat(cleanStr) || 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      const numericValue = parseCurrency(inputValue);
      onValueChange?.(numericValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Mostra apenas o número para facilitar edição
      const numericValue = value || 0;
      setDisplayValue(numericValue.toString().replace('.', ','));
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const numericValue = parseCurrency(displayValue);
      setDisplayValue(formatCurrency(numericValue));
      onValueChange?.(numericValue);
      props.onBlur?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="R$ 0,00"
      />
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
