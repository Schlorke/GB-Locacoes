/**
 * ÍCONES LUCIDE DISPONÍVEIS PARA CATEGORIAS
 *
 * Lista curada de ícones Lucide React adequados para categorização
 * de equipamentos de construção civil e outras categorias genéricas.
 *
 * @author GB-Locações Team
 * @see https://lucide.dev/icons/
 */

import type * as LucideIcons from 'lucide-react'

/**
 * Ícones disponíveis para seleção em categorias
 * Organizados por tema para facilitar navegação
 */
export const AVAILABLE_CATEGORY_ICONS: ReadonlyArray<keyof typeof LucideIcons> =
  [
    // === CONSTRUÇÃO & FERRAMENTAS ===
    'Package',
    'Wrench',
    'Hammer',
    'Building',
    'Building2',
    'Warehouse',
    'Factory',
    'Home',

    // === TRANSPORTE & LOGÍSTICA ===
    'Truck',
    'Car',
    'Bus',
    'Bike',
    'Plane',
    'Ship',
    'Train',

    // === TECNOLOGIA ===
    'Settings',
    'Cog',
    'Box',
    'Cpu',
    'Database',
    'Server',
    'HardDrive',
    'Monitor',

    // === PESSOAS & ORGANIZAÇÃO ===
    'Users',
    'User',
    'UserCog',
    'Contact',
    'IdCard',
    'Store',

    // === TEMPO & AGENDA ===
    'Calendar',
    'CalendarDays',
    'CalendarCheck',
    'CalendarX',
    'CalendarPlus',
    'CalendarMinus',
    'Clock',
    'Timer',
    'AlarmClock',

    // === LOCALIZAÇÃO ===
    'MapPin',
    'Map',
    'Navigation',
    'Compass',
    'Route',
    'Globe',

    // === COMUNICAÇÃO ===
    'Phone',
    'PhoneCall',
    'PhoneIncoming',
    'PhoneOutgoing',
    'Mail',
    'Send',
    'MessageCircle',
    'MessageSquare',
    'Inbox',

    // === SEGURANÇA ===
    'Shield',
    'ShieldCheck',
    'ShieldX',
    'ShieldAlert',
    'Lock',
    'Unlock',
    'Key',
    'KeyRound',

    // === AVALIAÇÃO & STATUS ===
    'Star',
    'Heart',
    'ThumbsUp',
    'CheckCircle',
    'AlertCircle',
    'Info',
    'HelpCircle',
    'Award',
    'Trophy',
    'Medal',
    'Crown',

    // === NAVEGAÇÃO ===
    'Search',
    'Filter',
    'Plus',
    'Minus',
    'X',
    'Check',
    'ChevronDown',
    'ChevronUp',
    'ChevronLeft',
    'ChevronRight',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',

    // === AÇÕES ===
    'Upload',
    'Download',
    'RefreshCw',
    'RotateCcw',
    'Copy',
    'Save',
    'Edit',
    'Edit2',
    'Edit3',
    'PenTool',

    // === ARQUIVOS ===
    'FileText',
    'File',
    'Folder',
    'FolderOpen',
    'Archive',
    'Trash',
    'Trash2',

    // === MÍDIA ===
    'Image',
    'Camera',
    'Video',
    'Music',
    'Headphones',
    'Mic',
    'Speaker',
    'Volume1',
    'Volume2',
    'VolumeX',
    'Play',
    'Pause',
    'Square',
    'SkipBack',
    'SkipForward',
    'Repeat',
    'Shuffle',

    // === CONECTIVIDADE ===
    'Wifi',
    'WifiOff',
    'Bluetooth',
    'Battery',
    'BatteryLow',
    'Power',
    'PowerOff',
    'Zap',

    // === CLIMA ===
    'Sun',
    'Moon',
    'Cloud',
    'CloudRain',
    'CloudSnow',
    'Umbrella',
    'Wind',
    'CloudLightning',
    'Tornado',
    'Rainbow',
    'Sunrise',
    'Sunset',
    'Stars',
    'Sparkles',
    'Flame',
    'Snowflake',
    'Droplet',

    // === ELETRÔNICOS ===
    'Smartphone',
    'Tablet',
    'Laptop',
    'Tv',
    'Watch',
    'Printer',
    'Radio',

    // === INTERAÇÃO ===
    'Eye',
    'EyeOff',
    'MousePointer',
    'Mouse',
    'Keyboard',
    'Gamepad',
    'Usb',
    'Touchpad',
    'Fingerprint',
    'Scan',

    // === FINANÇAS ===
    'CreditCard',
    'DollarSign',
    'PoundSterling',
    'Euro',
    'Bitcoin',
    'Coins',
    'Banknote',
    'Receipt',
    'PiggyBank',
    'Wallet',

    // === TENDÊNCIAS ===
    'TrendingUp',
    'TrendingDown',
    'BarChart',
    'BarChart2',
    'BarChart3',
    'PieChart',
    'LineChart',
    'Activity',
    'Target',

    // === MARCADORES ===
    'Flag',
    'Tag',
    'Bookmark',
    'BookmarkPlus',
    'BookmarkMinus',
    'BookmarkCheck',
    'BookmarkX',

    // === CONECTIVIDADE & LINKS ===
    'Paperclip',
    'Link',
    'Unlink',
    'ExternalLink',
    'Share',
    'Share2',

    // === COMPRAS ===
    'Gift',
    'ShoppingBag',
    'ShoppingCart',

    // === NOTIFICAÇÕES ===
    'Bell',
    'BellOff',
    'BellRing',

    // === MULTIMÍDIA ===
    'Film',
    'Disc',
    'Album',
    'FastForward',
    'Rewind',
    'MicOff',
    'Voicemail',

    // === FORMATAÇÃO ===
    'Type',
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'AlignLeft',
    'AlignCenter',
    'AlignRight',
    'AlignJustify',
    'List',
    'Indent',
    'Outdent',
    'Quote',

    // === DESENVOLVIMENTO ===
    'Code',
    'Terminal',
    'FileCode',
    'Bug',
    'GitBranch',
    'GitCommit',
    'GitMerge',
    'GitFork',
    'GitPullRequest',

    // === MATEMÁTICA ===
    'Hash',
    'AtSign',
    'Percent',
    'Slash',
    'Asterisk',
    'Equal',
    'Divide',
    'Calculator',
    'Sigma',
    'Pi',
    'Infinity',

    // === MEDIÇÃO ===
    'Thermometer',
    'Gauge',
    'Ruler',

    // === FORMAS ===
    'Triangle',
    'Circle',
    'Hexagon',
    'Pentagon',
    'Octagon',
    'Diamond',

    // === MOVIMENTO ===
    'Move',
    'Hand',
    'Grab',
    'Pointer',

    // === ZOOM & CONTROLE ===
    'Shrink',
    'Expand',
    'Minimize',
    'Maximize',
    'ZoomIn',
    'ZoomOut',
    'Fullscreen',
    'Minimize2',
    'Maximize2',

    // === LAYOUT ===
    'MoreHorizontal',
    'MoreVertical',
    'Menu',
    'Grid',
    'Columns',
    'Rows',
    'Layout',
    'LayoutGrid',
    'LayoutList',
    'Sidebar',
    'PanelLeft',
    'PanelRight',
    'PanelTop',
    'PanelBottom',
    'Split',
    'Combine',
    'Merge',

    // === CIÊNCIA ===
    'TestTube',
    'FlaskConical',
    'Beaker',
    'Atom',
    'Dna',
    'Microscope',
    'Telescope',
    'Binoculars',

    // === ESPAÇO ===
    'Rocket',
    'Satellite',
    'Earth',
    'Orbit',

    // === TEMPO ===
    'Hourglass',

    // === EDUCAÇÃO ===
    'Book',
    'BookOpen',
    'Library',
    'GraduationCap',
    'School',
    'University',

    // === COMIDA & BEBIDA ===
    'Cake',
    'Wine',
    'Coffee',
    'Beer',
    'Martini',
    'Pizza',
    'Apple',
    'Banana',
    'Cherry',
    'Grape',
    'Carrot',
    'Wheat',

    // === NATUREZA ===
    'Leaf',
    'TreePine',
    'Flower',
    'Sprout',
    'Clover',
    'Shell',
    'Fish',
    'Bird',
    'Cat',
    'Dog',
    'Rabbit',
    'Squirrel',
    'Turtle',
    'Snail',

    // === CINEMA & CRIAÇÃO ===
    'Clapperboard',
    'Images',
    'FileImage',
    'Palette',
    'Brush',
    'Paintbrush',
    'Pen',
    'Pencil',
    'Eraser',

    // === DIVERSOS ===
    'Glasses',
    'QrCode',
    'ScanLine',
    'Focus',
    'SearchCheck',
    'SearchX',
    'Crosshair',
    'Fuel',
    'ParkingCircle',
  ] as const

/**
 * Tipo para ícones de categoria (type-safe)
 */
export type CategoryIcon = (typeof AVAILABLE_CATEGORY_ICONS)[number]

/**
 * Número total de ícones disponíveis
 */
export const TOTAL_CATEGORY_ICONS = AVAILABLE_CATEGORY_ICONS.length

/**
 * Ícones organizados por categoria para UI de seleção
 */
export const ICONS_BY_CATEGORY = {
  construction: [
    'Package',
    'Wrench',
    'Hammer',
    'Building',
    'Warehouse',
    'Factory',
  ] as const,
  transport: ['Truck', 'Car', 'Bus', 'Bike', 'Plane', 'Ship'] as const,
  technology: [
    'Settings',
    'Cog',
    'Cpu',
    'Database',
    'Server',
    'Monitor',
  ] as const,
  people: ['Users', 'User', 'Contact', 'IdCard', 'Store'] as const,
  time: ['Calendar', 'Clock', 'Timer', 'AlarmClock'] as const,
  communication: ['Phone', 'Mail', 'MessageCircle', 'Send'] as const,
  security: ['Shield', 'Lock', 'Key', 'ShieldCheck'] as const,
  media: ['Image', 'Camera', 'Video', 'Music', 'Headphones'] as const,
} as const
