// Level definitions. Everything that differs between levels lives here so the
// generator, mesher, renderer, audio and entity director stay level-agnostic.

export type Surface = 'carpet' | 'concrete' | 'metal';
export type FixtureKind = 'troffer' | 'highbay' | 'caged';
export type ExitKind = 'door' | 'hatch' | 'elevator';
export type EntityKind = 'crawler' | 'watcher' | 'smiler' | 'mimic' | 'dweller';

export interface LevelDef {
  id: number;
  key: 'l0' | 'l1' | 'l2';
  name: string;
  subtitle: string;
  /** metres per layout cell */
  cell: number;
  /** floor to ceiling */
  height: number;
  wallThick: number;
  /** ceiling tile size (drop ceiling), 0 = solid ceiling */
  tile: number;
  // --- layout
  openness: [normal: number, open: number, maze: number];
  zoneScale: number;
  darkZone: number; // fbm threshold above which a zone is unlit
  wetZone: number;
  rooms: [number, number];
  enclosedRooms: number;
  pillarChance: number;
  pillarSize: number;
  // --- lighting
  lightPattern: [number, number]; // light in cell when gx % a == 0 && gz % b == 0
  fixture: FixtureKind;
  lightIntensity: number;
  lightColor: [number, number, number];
  accentColor: [number, number, number];
  accentChance: number;
  flickerChance: number;
  deadChance: number;
  ambient: number;
  // --- look
  fogColor: [number, number, number];
  fogDensity: number;
  exposure: number;
  grade: { tint: [number, number, number]; saturation: number; contrast: number; lift: number };
  tex: { wall: string; floor: string; ceil?: string; wallScale: number; floorScale: number; wallTint: [number, number, number] };
  surface: Surface;
  audio: { amb: string; ir: string };
  entities: EntityKind[];
  exit: ExitKind;
  exitDistance: [number, number];
  // prop densities
  outletChance: number;
  almondChance: number;
}

export const LEVELS: LevelDef[] = [
  {
    id: 0,
    key: 'l0',
    name: 'Level 0',
    subtitle: 'The Lobby',
    cell: 2.4384,
    height: 2.7432,
    wallThick: 0.12,
    tile: 0.6096,
    openness: [0.52, 0.88, 0.14],
    zoneScale: 14,
    darkZone: 0.7,
    wetZone: 0.68,
    rooms: [1, 3],
    enclosedRooms: 1,
    pillarChance: 0.25,
    pillarSize: 0.42,
    lightPattern: [2, 1],
    fixture: 'troffer',
    lightIntensity: 1.0,
    lightColor: [1.0, 0.94, 0.76],
    accentColor: [1.0, 0.85, 0.55],
    accentChance: 0.0,
    flickerChance: 0.05,
    deadChance: 0.06,
    ambient: 0.015,
    fogColor: [0.62, 0.55, 0.3],
    fogDensity: 0.026,
    exposure: 0.92,
    grade: { tint: [1.04, 1.0, 0.84], saturation: 0.98, contrast: 1.1, lift: 0.01 },
    tex: { wall: 'l0_wallpaper', floor: 'l0_carpet', ceil: 'l0_ceiling', wallScale: 1.0, floorScale: 0.5, wallTint: [1, 1, 1] },
    surface: 'carpet',
    audio: { amb: 'amb_l0', ir: 'ir_l0' },
    entities: ['crawler', 'watcher', 'smiler', 'mimic'],
    exit: 'door',
    exitDistance: [200, 320],
    outletChance: 0.2,
    almondChance: 0.012,
  },
  {
    id: 1,
    key: 'l1',
    name: 'Level 1',
    subtitle: 'Habitable Zone',
    cell: 4.0,
    height: 4.4,
    wallThick: 0.3,
    tile: 0,
    openness: [0.62, 0.95, 0.3],
    zoneScale: 10,
    darkZone: 0.7,
    wetZone: 0.55,
    rooms: [1, 2],
    enclosedRooms: 0,
    pillarChance: 0.55,
    pillarSize: 0.6,
    lightPattern: [2, 2],
    fixture: 'highbay',
    lightIntensity: 2.6,
    lightColor: [0.86, 0.96, 1.0],
    accentColor: [1.0, 0.56, 0.2],
    accentChance: 0.22,
    flickerChance: 0.08,
    deadChance: 0.18,
    ambient: 0.01,
    fogColor: [0.42, 0.46, 0.48],
    fogDensity: 0.04,
    exposure: 1.05,
    grade: { tint: [0.95, 1.0, 1.03], saturation: 0.8, contrast: 1.1, lift: 0.01 },
    tex: { wall: 'l1_wall', floor: 'l1_floor', wallScale: 2.4, floorScale: 2.0, wallTint: [1, 1, 1] },
    surface: 'concrete',
    audio: { amb: 'amb_l1', ir: 'ir_l1' },
    entities: ['crawler', 'smiler', 'watcher', 'mimic'],
    exit: 'hatch',
    exitDistance: [220, 340],
    outletChance: 0.12,
    almondChance: 0.03,
  },
  {
    id: 2,
    key: 'l2',
    name: 'Level 2',
    subtitle: 'Pipe Dreams',
    cell: 1.6,
    height: 2.35,
    wallThick: 0.2,
    tile: 0,
    openness: [0.22, 0.5, 0.06],
    zoneScale: 12,
    darkZone: 0.6,
    wetZone: 0.6,
    rooms: [0, 1],
    enclosedRooms: 0,
    pillarChance: 0.0,
    pillarSize: 0.3,
    lightPattern: [2, 2],
    fixture: 'caged',
    lightIntensity: 1.1,
    lightColor: [1.0, 0.74, 0.48],
    accentColor: [0.55, 0.05, 0.03],
    accentChance: 0.14,
    flickerChance: 0.15,
    deadChance: 0.2,
    ambient: 0.012,
    fogColor: [0.28, 0.2, 0.16],
    fogDensity: 0.05,
    exposure: 1.1,
    grade: { tint: [1.06, 0.97, 0.9], saturation: 0.85, contrast: 1.12, lift: 0.008 },
    tex: { wall: 'l2_wall', floor: 'l2_floor', wallScale: 1.6, floorScale: 1.0, wallTint: [1, 1, 1] },
    surface: 'metal',
    audio: { amb: 'amb_l2', ir: 'ir_l2' },
    entities: ['dweller', 'smiler', 'crawler', 'mimic'],
    exit: 'elevator',
    exitDistance: [160, 260],
    outletChance: 0.05,
    almondChance: 0.02,
  },
];

export const CHUNK = 16;
