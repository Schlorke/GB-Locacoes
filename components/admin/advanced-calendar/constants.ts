export const HOUR_ROW_HEIGHT = 60
export const HOUR_ROW_BORDER_WIDTH = 1
export const HOUR_SLOT_HEIGHT = HOUR_ROW_HEIGHT + HOUR_ROW_BORDER_WIDTH
// MINUTE_HEIGHT usa HOUR_ROW_HEIGHT (60px) porque os slots visuais têm h-[60px]
// não 61px. Isso garante alinhamento preciso: 1px por minuto
export const MINUTE_HEIGHT = HOUR_ROW_HEIGHT / 60
export const TIME_INDICATOR_LINE_HEIGHT = 2 // pixels, matches tailwind h-0.5
