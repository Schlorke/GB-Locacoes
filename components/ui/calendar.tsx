'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker, useDayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /**
   * Quando true, finais de semana (sábado e domingo) estão incluídos na seleção.
   * Por padrão é false, o que significa que apenas dias úteis (seg-sex) são considerados.
   */
  includeWeekends?: boolean
}

// Componente customizado para MonthCaption - botões dentro da mesma div
function CustomMonthCaption(props: React.ComponentProps<'div'>) {
  const { goToMonth, previousMonth, nextMonth } = useDayPicker()

  return (
    <div className="rdp-month_caption">
      <button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className="rdp-button_previous"
        aria-label="Mês anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="rdp-dropdowns">{props.children}</div>
      <button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className="rdp-button_next"
        aria-label="Próximo mês"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

// Componente customizado para Nav - retorna fragment vazio pois os botões estão no Caption
function CustomNav() {
  return <></>
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  includeWeekends = true,
  modifiers: externalModifiers,
  modifiersClassNames: externalModifiersClassNames,
  ...props
}: CalendarProps) {
  // Função para verificar se uma data é final de semana
  const isWeekend = React.useCallback((date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 = domingo, 6 = sábado
  }, [])

  // Modifiers para finais de semana
  const modifiers = React.useMemo(
    () => ({
      weekend: isWeekend,
      ...externalModifiers,
    }),
    [isWeekend, externalModifiers]
  )

  // Classes para os modifiers
  const modifiersClassNames = React.useMemo(
    () => ({
      weekend: 'rdp-weekend',
      ...externalModifiersClassNames,
    }),
    [externalModifiersClassNames]
  )

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      className={cn('p-2 sm:p-3', className)}
      classNames={{
        root: cn(
          'rdp-root',
          includeWeekends ? 'rdp-include-weekends' : 'rdp-exclude-weekends'
        ),
        months: 'rdp-months flex flex-col gap-4',
        month: 'rdp-month',
        month_caption: 'rdp-month_caption',
        caption_label: 'rdp-caption_label',
        nav: 'rdp-nav',
        button_previous: 'rdp-button_previous',
        button_next: 'rdp-button_next',
        month_grid: 'rdp-month_grid',
        weekdays: 'rdp-weekdays',
        weekday: 'rdp-weekday',
        week: 'rdp-week',
        day: 'rdp-day',
        day_button: 'rdp-day_button',
        range_end: 'rdp-range_end',
        selected: 'rdp-selected',
        today: 'rdp-today',
        outside: 'rdp-outside',
        disabled: 'rdp-disabled',
        range_middle: 'rdp-range_middle',
        range_start: 'rdp-range_start',
        hidden: 'rdp-hidden',
        dropdowns: 'rdp-dropdowns',
        dropdown: 'rdp-dropdown',
        dropdown_root: 'rdp-dropdown_root',
        ...classNames,
      }}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      components={{
        MonthCaption: CustomMonthCaption,
        Nav: CustomNav,
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
