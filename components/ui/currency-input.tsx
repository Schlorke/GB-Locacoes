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
      // Remove R$, espaços e pontos (separadores de milhares)
      const cleanStr = str.replace(/[R$\s.]/g, '').replace(',', '.');
      return Number.parseFloat(cleanStr) || 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      const cursorPosition = input.selectionStart || 0;
      let inputValue = e.target.value;
      const oldValue = displayValue;

      // Garante que sempre comece com R$
      if (!inputValue.startsWith('R$ ')) {
        const numericPart = inputValue.replace(/[^\d,]/g, '');
        inputValue = `R$ ${numericPart}`;
      }

      // Extrai apenas a parte numérica
      const numericPart = inputValue.replace('R$ ', '');

      // Permite apenas números, vírgula e pontos (para separadores de milhares)
      const cleanNumericPart = numericPart.replace(/[^\d,.]/g, '');

      // Remove pontos temporariamente para processar
      const tempNumericPart = cleanNumericPart.replace(/\./g, '');

      // Garante apenas uma vírgula
      const commaCount = (tempNumericPart.match(/,/g) || []).length;
      let finalNumericPart = tempNumericPart;

      if (commaCount > 1) {
        let firstCommaFound = false;
        finalNumericPart = tempNumericPart.replace(/,/g, (match) => {
          if (!firstCommaFound) {
            firstCommaFound = true;
            return match;
          }
          return '';
        });
      }

      // Detecta se o usuário está digitando nos centavos
      const oldNumericPart = oldValue.replace('R$ ', '').replace(/\./g, '');
      const oldParts = oldNumericPart.split(',');
      const newParts = finalNumericPart.split(',');

      // Se está digitando nos centavos e já tem 2 dígitos, empurra para a esquerda
      if (newParts.length === 2 && oldParts.length === 2) {
        const oldCentavos = oldParts[1] || '';
        const newCentavos = newParts[1] || '';

        // Se os centavos aumentaram de tamanho (mais de 2 dígitos)
        if (newCentavos.length > 2 && oldCentavos.length === 2) {
          // Pega o dígito extra dos centavos
          const extraDigits = newCentavos.substring(2);
          const keepCentavos = newCentavos.substring(0, 2);

          // Empurra para os reais
          const oldReais = oldParts[0] || '0';
          const newReais = oldReais + extraDigits;

          finalNumericPart = `${newReais},${keepCentavos}`;
        }
      }

      // Garanta que sempre tenha vírgula e duas casas decimais
      if (!finalNumericPart.includes(',')) {
        finalNumericPart = finalNumericPart + ',00';
      } else {
        const parts = finalNumericPart.split(',');
        let integerPart = parts[0] || '0';
        let decimalPart = parts[1] || '';

        // Garante duas casas decimais
        if (decimalPart.length === 0) {
          decimalPart = '00';
        } else if (decimalPart.length === 1) {
          decimalPart = decimalPart + '0';
        } else if (decimalPart.length > 2) {
          decimalPart = decimalPart.substring(0, 2);
        }

        // Adiciona separadores de milhares (pontos) na parte inteira
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        finalNumericPart = `${integerPart},${decimalPart}`;
      }

      const finalValue = `R$ ${finalNumericPart}`;
      setDisplayValue(finalValue);

      // Restaura a posição do cursor
      setTimeout(() => {
        const newCursorPosition = Math.min(cursorPosition, finalValue.length);
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);

      const numericValue = parseCurrency(finalValue);
      onValueChange?.(numericValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      const numericValue = value || 0;
      const editableFormat = `R$ ${numericValue.toFixed(2).replace('.', ',')}`;
      setDisplayValue(editableFormat);

      // NÃO seleciona tudo automaticamente - deixa o cursor onde o usuário clicou
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const numericValue = parseCurrency(displayValue);
      setDisplayValue(formatCurrency(numericValue));
      onValueChange?.(numericValue);
      props.onBlur?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      const cursorPosition = input.selectionStart || 0;

      // Impede que o usuário apague o "R$ "
      if (cursorPosition <= 3 && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault();
        return;
      }

      // Impede que o cursor vá para antes do "R$ "
      if (cursorPosition < 3 && (e.key === 'ArrowLeft' || e.key === 'Home')) {
        e.preventDefault();
        input.setSelectionRange(3, 3);
        return;
      }

      props.onKeyDown?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      const cursorPosition = input.selectionStart || 0;

      // Se clicou antes do "R$ ", move o cursor para depois
      if (cursorPosition < 3) {
        setTimeout(() => {
          input.setSelectionRange(3, 3);
        }, 0);
      }

      props.onClick?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        placeholder="R$ 0,00"
      />
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
