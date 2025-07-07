'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { AlertTriangle, Edit, Palette, Save, Search, Tag, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface CategoryData {
  id?: string;
  name: string;
  description: string;
  backgroundColor: string;
  fontColor: string;
  icon: keyof typeof LucideIcons;
  iconColor: string;
}

interface ModernCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (_data: CategoryData) => Promise<void>;
  initialData?: CategoryData;
  title?: string;
  saveButtonText?: string;
}

const ICON_OPTIONS: (keyof typeof LucideIcons)[] = [
  'Package',
  'Wrench',
  'Hammer',
  'Drill',
  'Building',
  'Truck',
  'HardHat',
  'Ruler',
  'Paintbrush',
  'Shovel',
  'Screwdriver',
  'Settings',
  'Box',
  'Warehouse',
  'Tool',
  'Cog',
  'Gear',
  'Home',
  'Factory',
  'Car',
  'Users',
  'User',
  'Calendar',
  'Clock',
  'MapPin',
  'Phone',
  'Mail',
  'Globe',
  'Shield',
  'Star',
  'Heart',
  'ThumbsUp',
  'CheckCircle',
  'AlertCircle',
  'Info',
  'HelpCircle',
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
  'Upload',
  'Download',
  'RefreshCw',
  'RotateCcw',
  'Copy',
  'Cut',
  'Paste',
  'Save',
  'FileText',
  'File',
  'Folder',
  'FolderOpen',
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
  'Wifi',
  'WifiOff',
  'Bluetooth',
  'Battery',
  'BatteryLow',
  'Power',
  'PowerOff',
  'Zap',
  'Sun',
  'Moon',
  'Cloud',
  'CloudRain',
  'CloudSnow',
  'Umbrella',
  'Wind',
  'Eye',
  'EyeOff',
  'Lock',
  'Unlock',
  'Key',
  'CreditCard',
  'DollarSign',
  'PoundSterling',
  'Euro',
  'Yen',
  'Bitcoin',
  'TrendingUp',
  'TrendingDown',
  'BarChart',
  'PieChart',
  'Activity',
  'Target',
  'Flag',
  'Award',
  'Gift',
  'ShoppingBag',
  'ShoppingCart',
  'Tag',
  'Bookmark',
  'Paperclip',
  'Link',
  'Unlink',
  'ExternalLink',
  'Share',
  'Share2',
  'MessageCircle',
  'MessageSquare',
  'Send',
  'Mail',
  'Inbox',
  'Bell',
  'BellOff',
  'Smartphone',
  'Tablet',
  'Laptop',
  'Monitor',
  'Tv',
  'Watch',
  'Camera',
  'Printer',
  'Scanner',
  'HardDrive',
  'Cpu',
  'Memory',
  'Database',
  'Server',
  'Cloud',
  'Wifi',
  'Bluetooth',
  'Usb',
  'MousePointer',
  'Mouse',
  'Keyboard',
  'Gamepad',
  'Headphones',
  'Mic',
  'Speaker',
  'Radio',
  'Tv',
  'Film',
  'Camera',
  'Video',
  'Image',
  'Music',
  'Disc',
  'Cassette',
  'Album',
  'Repeat',
  'Shuffle',
  'Play',
  'Pause',
  'Square',
  'SkipBack',
  'SkipForward',
  'FastForward',
  'Rewind',
  'VolumeX',
  'Volume1',
  'Volume2',
  'Mic',
  'MicOff',
  'PhoneCall',
  'PhoneOff',
  'PhoneIncoming',
  'PhoneOutgoing',
  'Voicemail',
  'MessageCircle',
  'MessageSquare',
  'Mail',
  'Send',
  'Inbox',
  'Outbox',
  'Archive',
  'Trash',
  'Trash2',
  'Edit',
  'Edit2',
  'Edit3',
  'FilePen',
  'PenTool',
  'Highlighter',
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
  'ListOrdered',
  'Indent',
  'Outdent',
  'Quote',
  'Code',
  'Terminal',
  'FileCode',
  'Bug',
  'Zap',
  'Hash',
  'AtSign',
  'Percent',
  'Slash',
  'Backslash',
  'Asterisk',
  'Equal',
  'Plus',
  'Minus',
  'Divide',
  'Calculator',
  'Sigma',
  'Pi',
  'Infinity',
  'BarChart2',
  'BarChart3',
  'LineChart',
  'PieChart',
  'TrendingUp',
  'TrendingDown',
  'Activity',
  'Pulse',
  'Heart',
  'Thermometer',
  'Gauge',
  'Speedometer',
  'Timer',
  'Clock',
  'Stopwatch',
  'AlarmClock',
  'Calendar',
  'CalendarDays',
  'CalendarCheck',
  'CalendarX',
  'CalendarPlus',
  'CalendarMinus',
  'Date',
  'Time',
  'Sunrise',
  'Sunset',
  'Sun',
  'Moon',
  'Star',
  'Stars',
  'Sparkles',
  'Zap',
  'Flame',
  'Snowflake',
  'Droplet',
  'Cloud',
  'CloudRain',
  'CloudSnow',
  'CloudLightning',
  'Umbrella',
  'Wind',
  'Tornado',
  'Rainbow',
  'Globe',
  'Map',
  'MapPin',
  'Navigation',
  'Compass',
  'Route',
  'Car',
  'Truck',
  'Bus',
  'Bike',
  'Motorcycle',
  'Plane',
  'Ship',
  'Train',
  'Fuel',
  'ParkingCircle',
  'Traffic',
  'Home',
  'Building',
  'Building2',
  'Factory',
  'Warehouse',
  'Store',
  'ShoppingBag',
  'ShoppingCart',
  'Package',
  'Box',
  'Archive',
  'Inbox',
  'Outbox',
  'Bookmark',
  'Tag',
  'Flag',
  'MapPin',
  'Target',
  'Crosshair',
  'Focus',
  'Search',
  'SearchCheck',
  'SearchX',
  'Filter',
  'ScanLine',
  'QrCode',
  'Barcode',
  'Eye',
  'EyeOff',
  'Glasses',
  'SunglassesIcon',
  'Telescope',
  'Microscope',
  'Binoculars',
  'Camera',
  'Video',
  'Film',
  'Clapperboard',
  'Image',
  'Images',
  'FileImage',
  'Gallery',
  'Palette',
  'Brush',
  'Paintbrush',
  'Pen',
  'PenTool',
  'Pencil',
  'Eraser',
  'Ruler',
  'Triangle',
  'Square',
  'Circle',
  'Hexagon',
  'Pentagon',
  'Octagon',
  'Diamond',
  'Heart',
  'Star',
  'Move',
  'Hand',
  'Grab',
  'GrabHand',
  'Pointer',
  'MousePointer',
  'Mouse',
  'Touchpad',
  'Fingerprint',
  'Scan',
  'Shield',
  'ShieldCheck',
  'ShieldX',
  'ShieldAlert',
  'Lock',
  'Unlock',
  'Key',
  'KeyRound',
  'UserCheck',
  'UserX',
  'UserPlus',
  'UserMinus',
  'Users',
  'UsersRound',
  'UserCog',
  'Contact',
  'Contacts',
  'AddressBook',
  'IdCard',
  'CreditCard',
  'Wallet',
  'Coins',
  'DollarSign',
  'PoundSterling',
  'Euro',
  'Yen',
  'Bitcoin',
  'Banknote',
  'Receipt',
  'Calculator',
  'PiggyBank',
  'TrendingUp',
  'TrendingDown',
  'Growth',
  'Shrink',
  'Expand',
  'Minimize',
  'Maximize',
  'ZoomIn',
  'ZoomOut',
  'FullScreen',
  'Minimize2',
  'Maximize2',
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
  'GitBranch',
  'GitCommit',
  'GitMerge',
  'GitFork',
  'GitPullRequest',
  'Code',
  'Terminal',
  'FileCode',
  'Bug',
  'TestTube',
  'FlaskConical',
  'Beaker',
  'Atom',
  'Dna',
  'Microscope',
  'Telescope',
  'Rocket',
  'Satellite',
  'Globe',
  'Earth',
  'Moon',
  'Sun',
  'Star',
  'Planet',
  'Orbit',
  'Gauge',
  'Speedometer',
  'Timer',
  'Clock',
  'Stopwatch',
  'Hourglass',
  'Calendar',
  'Date',
  'Time',
  'Bell',
  'BellRing',
  'AlarmClock',
  'Reminder',
  'Bookmark',
  'BookmarkPlus',
  'BookmarkMinus',
  'BookmarkCheck',
  'BookmarkX',
  'Book',
  'BookOpen',
  'Library',
  'GraduationCap',
  'School',
  'University',
  'Certificate',
  'Award',
  'Trophy',
  'Medal',
  'Crown',
  'Gift',
  'Party',
  'Cake',
  'Wine',
  'Coffee',
  'Tea',
  'Beer',
  'Martini',
  'Cocktail',
  'Pizza',
  'Sandwich',
  'Salad',
  'Apple',
  'Banana',
  'Cherry',
  'Grape',
  'Lemon',
  'Orange',
  'Carrot',
  'Corn',
  'Wheat',
  'Leaf',
  'Tree',
  'TreePine',
  'Flower',
  'Rose',
  'Tulip',
  'Sprout',
  'Seedling',
  'Herb',
  'Clover',
  'Shamrock',
  'Cactus',
  'Shell',
  'Fish',
  'Bird',
  'Cat',
  'Dog',
  'Rabbit',
  'Squirrel',
  'Bear',
  'Lion',
  'Tiger',
  'Elephant',
  'Horse',
  'Cow',
  'Pig',
  'Sheep',
  'Chicken',
  'Duck',
  'Turtle',
  'Snail',
  'Bug',
  'Butterfly',
  'Bee',
  'Spider',
  'Ant',
  'Worm',
  'Microbe',
  'Virus',
  'Bacteria',
  'Dna',
  'Helix',
  'Atom',
  'Molecule',
  'Flask',
  'TestTube',
  'Beaker',
  'Microscope',
  'Stethoscope',
  'Thermometer',
  'Pill',
  'Syringe',
  'Bandage',
  'Heart',
  'Heartbeat',
  'Pulse',
  'Activity',
  'Brain',
  'Bone',
  'Tooth',
  'Eye',
  'Ear',
  'Nose',
  'Mouth',
  'Tongue',
  'Hand',
  'Foot',
  'Fingerprint',
  'Baby',
  'Child',
  'Adult',
  'Elderly',
  'Male',
  'Female',
  'Couple',
  'Family',
  'Group',
  'Team',
  'Community',
  'Network',
  'Connection',
  'Link',
  'Chain',
  'Anchor',
  'Bridge',
  'Road',
  'Path',
  'Trail',
  'Journey',
  'Destination',
  'Arrival',
  'Departure',
  'Distance',
  'Speed',
  'Acceleration',
  'Brake',
  'Stop',
  'Go',
  'Direction',
  'Turn',
  'Curve',
  'Straight',
  'Intersection',
  'Crossroads',
  'Fork',
  'Split',
  'Merge',
  'Join',
  'Connect',
  'Disconnect',
  'Plug',
  'Unplug',
  'Socket',
  'Cable',
  'Wire',
  'Cord',
  'Rope',
  'Chain',
  'String',
  'Thread',
  'Needle',
  'Pin',
  'Clip',
  'Clamp',
  'Grip',
  'Hold',
  'Release',
  'Open',
  'Close',
  'Push',
  'Pull',
  'Lift',
  'Drop',
  'Carry',
  'Transport',
  'Deliver',
  'Receive',
  'Send',
  'Give',
  'Take',
  'Get',
  'Put',
  'Place',
  'Position',
  'Location',
  'Spot',
  'Point',
  'Mark',
  'Sign',
  'Symbol',
  'Icon',
  'Logo',
  'Brand',
  'Label',
  'Name',
  'Title',
  'Heading',
  'Text',
  'Font',
  'Size',
  'Color',
  'Style',
  'Format',
  'Design',
  'Layout',
  'Structure',
  'Framework',
  'Foundation',
  'Base',
  'Support',
  'Platform',
  'Stage',
  'Level',
  'Floor',
  'Ground',
  'Surface',
  'Top',
  'Bottom',
  'Side',
  'Edge',
  'Corner',
  'Center',
  'Middle',
  'Inside',
  'Outside',
  'Interior',
  'Exterior',
  'Front',
  'Back',
  'Left',
  'Right',
  'Up',
  'Down',
  'Forward',
  'Backward',
  'Inward',
  'Outward',
  'Upward',
  'Downward',
  'Sideways',
  'Diagonal',
  'Horizontal',
  'Vertical',
  'Parallel',
  'Perpendicular',
  'Angle',
  'Rotation',
  'Spin',
  'Twist',
  'Turn',
  'Flip',
  'Mirror',
  'Reflect',
  'Reverse',
  'Invert',
  'Opposite',
  'Contrast',
  'Compare',
  'Match',
  'Pair',
  'Couple',
  'Double',
  'Triple',
  'Multiple',
  'Single',
  'Unique',
  'Special',
  'Common',
  'Normal',
  'Regular',
  'Standard',
  'Custom',
  'Personal',
  'Private',
  'Public',
  'Shared',
  'Open',
  'Closed',
  'Secret',
  'Hidden',
  'Visible',
  'Clear',
  'Blur',
  'Focus',
  'Sharp',
  'Soft',
  'Hard',
  'Solid',
  'Liquid',
  'Gas',
  'Plasma',
  'Matter',
  'Material',
  'Substance',
  'Element',
  'Compound',
  'Mixture',
  'Solution',
  'Crystal',
  'Metal',
  'Wood',
  'Stone',
  'Glass',
  'Plastic',
  'Rubber',
  'Fabric',
  'Paper',
  'Cardboard',
  'Foam',
  'Gel',
  'Liquid',
  'Water',
  'Oil',
  'Acid',
  'Base',
  'Salt',
  'Sugar',
  'Protein',
  'Vitamin',
  'Mineral',
  'Nutrient',
  'Food',
  'Drink',
  'Medicine',
  'Drug',
  'Chemical',
  'Poison',
  'Toxin',
  'Antidote',
  'Cure',
  'Treatment',
  'Therapy',
  'Surgery',
  'Operation',
  'Procedure',
  'Process',
  'Method',
  'Technique',
  'Skill',
  'Ability',
  'Talent',
  'Gift',
  'Power',
  'Strength',
  'Energy',
  'Force',
  'Pressure',
  'Tension',
  'Stress',
  'Strain',
  'Load',
  'Weight',
  'Mass',
  'Volume',
  'Density',
  'Temperature',
  'Heat',
  'Cold',
  'Fire',
  'Ice',
  'Steam',
  'Smoke',
  'Ash',
  'Dust',
  'Sand',
  'Rock',
  'Stone',
  'Pebble',
  'Boulder',
  'Mountain',
  'Hill',
  'Valley',
  'River',
  'Lake',
  'Ocean',
  'Sea',
  'Beach',
  'Shore',
  'Coast',
  'Island',
  'Continent',
  'Country',
  'State',
  'City',
  'Town',
  'Village',
  'Neighborhood',
  'Street',
  'Road',
  'Avenue',
  'Lane',
  'Path',
  'Trail',
  'Bridge',
  'Tunnel',
  'Gate',
  'Door',
  'Window',
  'Wall',
  'Roof',
  'Floor',
  'Ceiling',
  'Room',
  'Hall',
  'Corridor',
  'Stairs',
  'Elevator',
  'Escalator',
  'Ramp',
  'Balcony',
  'Porch',
  'Deck',
  'Patio',
  'Garden',
  'Yard',
  'Park',
  'Forest',
  'Field',
  'Farm',
  'Ranch',
  'Factory',
  'Plant',
  'Mill',
  'Workshop',
  'Studio',
  'Office',
  'Store',
  'Shop',
  'Market',
  'Mall',
  'Center',
  'Complex',
  'Building',
  'Structure',
  'Architecture',
  'Construction',
  'Engineering',
  'Design',
  'Plan',
  'Blueprint',
  'Sketch',
  'Drawing',
  'Painting',
  'Picture',
  'Photo',
  'Image',
  'Graphic',
  'Chart',
  'Graph',
  'Diagram',
  'Map',
  'Model',
  'Prototype',
  'Template',
  'Pattern',
  'Sample',
  'Example',
  'Instance',
  'Case',
  'Situation',
  'Scenario',
  'Context',
  'Environment',
  'Setting',
  'Background',
  'Foreground',
  'Scene',
  'View',
  'Sight',
  'Vision',
  'Perspective',
  'Angle',
  'Position',
  'Stance',
  'Posture',
  'Attitude',
  'Approach',
  'Strategy',
  'Tactic',
  'Plan',
  'Goal',
  'Objective',
  'Target',
  'Aim',
  'Purpose',
  'Intent',
  'Intention',
  'Motive',
  'Reason',
  'Cause',
  'Effect',
  'Result',
  'Outcome',
  'Consequence',
  'Impact',
  'Influence',
  'Change',
  'Transformation',
  'Evolution',
  'Development',
  'Growth',
  'Progress',
  'Advancement',
  'Improvement',
  'Enhancement',
  'Upgrade',
  'Update',
  'Revision',
  'Modification',
  'Adjustment',
  'Correction',
  'Fix',
  'Repair',
  'Maintenance',
  'Service',
  'Support',
  'Help',
  'Assistance',
  'Aid',
  'Relief',
  'Rescue',
  'Save',
  'Protect',
  'Guard',
  'Defend',
  'Shield',
  'Cover',
  'Hide',
  'Conceal',
  'Reveal',
  'Show',
  'Display',
  'Present',
  'Demonstrate',
  'Exhibit',
  'Perform',
  'Act',
  'Play',
  'Game',
  'Sport',
  'Competition',
  'Contest',
  'Challenge',
  'Test',
  'Exam',
  'Quiz',
  'Question',
  'Answer',
  'Solution',
  'Problem',
  'Issue',
  'Matter',
  'Topic',
  'Subject',
  'Theme',
  'Concept',
  'Idea',
  'Thought',
  'Mind',
  'Brain',
  'Intelligence',
  'Wisdom',
  'Knowledge',
  'Information',
  'Data',
  'Facts',
  'Truth',
  'Reality',
  'Fiction',
  'Fantasy',
  'Dream',
  'Imagination',
  'Creativity',
  'Innovation',
  'Invention',
  'Discovery',
  'Finding',
  'Research',
  'Study',
  'Analysis',
  'Investigation',
  'Exploration',
  'Adventure',
  'Journey',
  'Trip',
  'Travel',
  'Vacation',
  'Holiday',
  'Break',
  'Rest',
  'Sleep',
  'Dream',
  'Wake',
  'Rise',
  'Stand',
  'Sit',
  'Lie',
  'Walk',
  'Run',
  'Jump',
  'Hop',
  'Skip',
  'Dance',
  'Move',
  'Motion',
  'Action',
  'Activity',
  'Exercise',
  'Workout',
  'Training',
  'Practice',
  'Rehearsal',
  'Preparation',
  'Planning',
  'Organization',
  'Management',
  'Control',
  'Direction',
  'Leadership',
  'Authority',
  'Power',
  'Influence',
  'Impact',
  'Effect',
  'Result',
  'Success',
  'Achievement',
  'Accomplishment',
  'Victory',
  'Win',
  'Triumph',
  'Glory',
  'Honor',
  'Pride',
  'Joy',
  'Happiness',
  'Pleasure',
  'Fun',
  'Entertainment',
  'Amusement',
  'Enjoyment',
  'Satisfaction',
  'Contentment',
  'Peace',
  'Calm',
  'Quiet',
  'Silence',
  'Noise',
  'Sound',
  'Music',
  'Song',
  'Melody',
  'Rhythm',
  'Beat',
  'Tempo',
  'Harmony',
  'Discord',
  'Note',
  'Chord',
  'Scale',
  'Key',
  'Instrument',
  'Voice',
  'Speak',
  'Talk',
  'Say',
  'Tell',
  'Explain',
  'Describe',
  'Express',
  'Communicate',
  'Message',
  'Signal',
  'Sign',
  'Symbol',
  'Code',
  'Language',
  'Word',
  'Letter',
  'Character',
  'Symbol',
  'Number',
  'Digit',
  'Figure',
  'Amount',
  'Quantity',
  'Count',
  'Total',
  'Sum',
  'Addition',
  'Subtraction',
  'Multiplication',
  'Division',
  'Calculation',
  'Mathematics',
  'Algebra',
  'Geometry',
  'Trigonometry',
  'Calculus',
  'Statistics',
  'Probability',
  'Logic',
  'Reasoning',
  'Thinking',
  'Mind',
  'Consciousness',
  'Awareness',
  'Perception',
  'Sensation',
  'Feeling',
  'Emotion',
  'Mood',
  'Attitude',
  'Behavior',
  'Action',
  'Reaction',
  'Response',
  'Feedback',
  'Input',
  'Output',
  'Process',
  'System',
  'Network',
  'Connection',
  'Relationship',
  'Bond',
  'Link',
  'Tie',
  'Association',
  'Partnership',
  'Collaboration',
  'Cooperation',
  'Teamwork',
  'Unity',
  'Harmony',
  'Balance',
  'Equilibrium',
  'Stability',
  'Security',
  'Safety',
  'Protection',
  'Defense',
  'Attack',
  'Conflict',
  'War',
  'Battle',
  'Fight',
  'Struggle',
  'Effort',
  'Work',
  'Labor',
  'Job',
  'Task',
  'Duty',
  'Responsibility',
  'Obligation',
  'Commitment',
  'Promise',
  'Agreement',
  'Contract',
  'Deal',
  'Bargain',
  'Trade',
  'Exchange',
  'Transaction',
  'Business',
  'Commerce',
  'Industry',
  'Economy',
  'Market',
  'Finance',
  'Money',
  'Currency',
  'Cash',
  'Credit',
  'Debt',
  'Loan',
  'Investment',
  'Profit',
  'Loss',
  'Gain',
  'Benefit',
  'Advantage',
  'Disadvantage',
  'Risk',
  'Danger',
  'Threat',
  'Warning',
  'Alert',
  'Alarm',
  'Emergency',
  'Crisis',
  'Problem',
  'Trouble',
  'Difficulty',
  'Challenge',
  'Obstacle',
  'Barrier',
  'Block',
  'Stop',
  'Halt',
  'Pause',
  'Break',
  'Interruption',
  'Delay',
  'Wait',
  'Time',
  'Duration',
  'Period',
  'Interval',
  'Moment',
  'Instant',
  'Second',
  'Minute',
  'Hour',
  'Day',
  'Week',
  'Month',
  'Year',
  'Decade',
  'Century',
  'Millennium',
  'Age',
  'Era',
  'Epoch',
  'History',
  'Past',
  'Present',
  'Future',
  'Tomorrow',
  'Today',
  'Yesterday',
  'Now',
  'Then',
  'When',
  'Where',
  'Why',
  'How',
  'What',
  'Who',
  'Which',
  'Whose',
  'Whom',
];

export function ModernCategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title = 'Nova Categoria',
  saveButtonText = 'Criar Categoria',
}: ModernCategoryModalProps) {
  const [formData, setFormData] = useState<CategoryData>({
    name: '',
    description: '',
    backgroundColor: '#3b82f6',
    fontColor: '#ffffff',
    icon: 'Package',
    iconColor: '#ffffff',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    submit?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [iconFilter, setIconFilter] = useState('');

  // Inicializar dados quando a modal abre
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          description: '',
          backgroundColor: '#3b82f6',
          fontColor: '#ffffff',
          icon: 'Package',
          iconColor: '#ffffff',
        });
      }
      setErrors({});
      setIsSubmitting(false);
      setIsDesignOpen(false);
      setIconFilter('');
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da categoria é obrigatório';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Nome deve ter no máximo 50 caracteres';
    }

    if (formData.description.length > 200) {
      newErrors.description = 'Descrição deve ter no máximo 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Erro ao salvar categoria',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName: keyof typeof LucideIcons, size = 20) => {
    const IconComponent = LucideIcons[iconName] as React.ComponentType<{ size: number }>;
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg max-h-[90vh] p-0 gap-0 bg-white border-0 shadow-2xl rounded-lg fixed inset-0 m-auto h-fit overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Tag className="w-4 h-4" />
            </div>
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Conteúdo */}
        <ScrollArea className="flex-1 max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6">
            {/* Preview da Categoria */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">Preview da Categoria</h3>
                <Popover open={isDesignOpen} onOpenChange={setIsDesignOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs font-medium border-slate-300 hover:border-slate-400 hover:bg-white transition-all duration-200 rounded-lg shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1.5" />
                      Editar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[calc(100vw-2rem)] max-w-md p-0 shadow-2xl border-0 rounded-lg bg-white z-50 max-h-[calc(100vh-8rem)] overflow-hidden"
                    align="center"
                    side="bottom"
                    sideOffset={8}
                    alignOffset={0}
                    avoidCollisions={true}
                    collisionPadding={16}
                    sticky="always"
                  >
                    <div className="max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                      <div className="p-4 space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <Palette className="w-3.5 h-3.5 text-white" />
                            </div>
                            <h4 className="font-semibold text-base text-slate-800">
                              Personalizar Design
                            </h4>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setFormData({ ...formData, icon: '' as keyof typeof LucideIcons });
                              }}
                              className="text-slate-400 hover:text-red-500 h-7 px-2 rounded-lg transition-colors text-xs"
                              title="Remover ícone"
                            >
                              Remove
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsDesignOpen(false)}
                              className="text-slate-400 hover:text-slate-600 h-7 px-2 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Search Filter */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="Buscar ícone..."
                            value={iconFilter}
                            onChange={(e) => setIconFilter(e.target.value)}
                            className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm placeholder:text-slate-400 rounded-lg focus:bg-white transition-colors"
                          />
                        </div>

                        {/* Icons Grid */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-medium text-slate-700">Ícone</h5>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                              {ICON_OPTIONS.filter((iconName) =>
                                iconName.toLowerCase().includes(iconFilter.toLowerCase()),
                              )
                                .slice(0, 48)
                                .map((iconName) => (
                                  <button
                                    key={iconName}
                                    type="button"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        icon: iconName as keyof typeof LucideIcons,
                                      })
                                    }
                                    className={cn(
                                      'p-3 rounded-lg border transition-all duration-200 hover:scale-105 flex items-center justify-center group',
                                      formData.icon === iconName
                                        ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-white bg-white text-slate-600 hover:shadow-sm',
                                    )}
                                    title={iconName}
                                  >
                                    {renderIcon(iconName as keyof typeof LucideIcons, 20)}
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>

                        {/* Color Sections */}
                        <div className="space-y-3">
                          <h5 className="text-sm font-medium text-slate-700">Cores</h5>
                          <div className="flex gap-4 justify-center">
                            {/* Background Color */}
                            <div className="flex items-center gap-3">
                              <input
                                type="color"
                                value={formData.backgroundColor}
                                onChange={(e) =>
                                  setFormData({ ...formData, backgroundColor: e.target.value })
                                }
                                className="w-8 h-8 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                                title="Selecionar cor de fundo"
                              />
                              <span className="font-medium text-slate-700 text-sm">
                                Cor de Fundo
                              </span>
                            </div>

                            {/* Font Color */}
                            <div className="flex items-center gap-3">
                              <input
                                type="color"
                                value={formData.fontColor}
                                onChange={(e) =>
                                  setFormData({ ...formData, fontColor: e.target.value })
                                }
                                className="w-8 h-8 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                                title="Selecionar cor da fonte"
                              />
                              <span className="font-medium text-slate-700 text-sm">
                                Cor da Fonte
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Save Button */}
                        <Button
                          onClick={() => setIsDesignOpen(false)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-3 font-semibold px-5 py-3 rounded-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: formData.backgroundColor,
                    color: formData.fontColor,
                    boxShadow: `0 4px 20px ${formData.fontColor}15, 0 2px 10px ${formData.fontColor}10`,
                  }}
                >
                  <span style={{ color: formData.iconColor }}>{renderIcon(formData.icon, 20)}</span>
                  <span className="text-sm font-semibold">
                    {formData.name || 'Nome da Categoria'}
                  </span>
                </Badge>
              </div>

              {formData.description && (
                <div className="text-center mt-4">
                  <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                    {formData.description}
                  </p>
                </div>
              )}
            </div>

            {/* Nome */}
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Nome da Categoria *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Ferramentas de Construção"
                className={cn(
                  'h-11 text-sm bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-lg focus:ring-2 focus:ring-slate-500/20',
                  errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                )}
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
              <p className="text-xs text-slate-500">{formData.name.length}/50 caracteres</p>
            </div>

            {/* Descrição */}
            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                Descrição (Opcional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva brevemente esta categoria..."
                rows={3}
                className={cn(
                  'text-sm bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none rounded-lg focus:ring-2 focus:ring-slate-500/20',
                  errors.description && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                )}
              />
              {errors.description && (
                <div className="flex items-center gap-2 text-red-600 text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.description}
                </div>
              )}
              <p className="text-xs text-slate-500">{formData.description.length}/200 caracteres</p>
            </div>

            {/* Erro de Envio */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-lg border border-red-200 bg-red-50"
                >
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">{errors.submit}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Footer */}
        <DialogFooter className="p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-11 rounded-lg border-slate-300 hover:bg-slate-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name.trim()}
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {saveButtonText}
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
