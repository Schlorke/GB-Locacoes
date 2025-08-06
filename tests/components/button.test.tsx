// tests/components/button.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Botão', () => {
  it('deve renderizar o texto corretamente', () => {
    render(<Button>Alugar</Button>)
    expect(screen.getByText('Alugar')).toBeInTheDocument()
  })
})
