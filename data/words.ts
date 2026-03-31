// Word lists for the game - Wordle Clone

// Solution words - common 5-letter words that can be answers
export const SOLUTION_WORDS: string[] = [
  'APPLE', 'BEACH', 'CRANE', 'DREAM', 'EAGLE',
  'FLAME', 'GHOST', 'HEART', 'IVORY', 'JUICE',
  'KNIFE', 'LEMON', 'MANGO', 'NIGHT', 'OCEAN',
  'PIANO', 'QUEEN', 'RIVER', 'STONE', 'TIGER',
  'UNCLE', 'VOICE', 'WATER', 'YOUTH', 'ZEBRA'
];

// All valid guesses - includes solution words plus other acceptable guesses
export const VALID_GUESSES: string[] = [
  'APPLE', 'BEACH', 'CRANE', 'DREAM', 'EAGLE',
  'FLAME', 'GHOST', 'HEART', 'IVORY', 'JUICE',
  'KNIFE', 'LEMON', 'MANGO', 'NIGHT', 'OCEAN',
  'PIANO', 'QUEEN', 'RIVER', 'STONE', 'TIGER',
  'UNCLE', 'VOICE', 'WATER', 'YOUTH', 'ZEBRA',
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE',
  'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
  'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM',
  'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE',
  'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE',
  'ANGRY', 'APART', 'APPLY', 'ARENA', 'ARGUE',
  'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AVOID',
  'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES',
  'BASIC', 'BASIN', 'BASIS', 'BEGAN', 'BEGIN',
  'BEGUN', 'BEING', 'BELOW', 'BENCH', 'BIRTH',
  'BLACK', 'BLADE', 'BLAME', 'BLANK', 'BLAST',
  'BLEND', 'BLESS', 'BLIND', 'BLOCK', 'BLOOD',
  'BLOWN', 'BLUES', 'BOARD', 'BOOST', 'BOOTH',
  'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE',
  'BREAD', 'BREAK', 'BREED', 'BRICK', 'BRIDE',
  'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN',
  'BUILD', 'BUILT', 'BUNCH', 'BURST', 'BUYER',
  'CABLE', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN',
  'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE',
  'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD',
  'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN',
  'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE',
  'CLOTH', 'CLOUD', 'COACH', 'COAST', 'COULD',
  'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH',
  'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN',
  'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DEALT',
  'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING',
  'DOUBT', 'DOZEN', 'DRAFT', 'DRAIN', 'DRAMA',
  'DRESS', 'DRINK', 'DRIVE', 'DROVE', 'DYING',
  'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE',
  'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY',
  'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT',
  'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FANCY',
  'FATAL', 'FAULT', 'FAVOR', 'FIBER', 'FIELD',
  'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST',
  'FIXED', 'FLASH', 'FLEET', 'FLESH', 'FLOAT',
  'FLOOD', 'FLOOR', 'FLOUR', 'FLOWN', 'FLUID',
  'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM',
  'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH',
  'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT',
  'GIVEN', 'GLASS', 'GLOBE', 'GLORY', 'GOING',
  'GRACE', 'GRADE', 'GRAIN', 'GRAND', 'GRANT',
  'GRAPE', 'GRAPH', 'GRASP', 'GRASS', 'GRAVE',
  'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN',
  'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'GUILT',
  'HAPPY', 'HEAVY', 'HENCE', 'HORSE', 'HOTEL',
  'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'IMPLY',
  'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JOINT',
  'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER',
  'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE',
  'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LIMIT',
  'LOCAL', 'LOGIC', 'LOOSE', 'LOWER', 'LUCKY',
  'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER',
  'MARCH', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT',
  'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS',
  'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL',
  'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE',
  'MUSIC', 'NAKED', 'NERVE', 'NEVER', 'NEWLY',
  'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL',
  'NURSE', 'OCCUR', 'OFFER', 'OFTEN', 'ORDER',
  'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER',
  'PARTY', 'PEACE', 'PHASE', 'PHONE', 'PHOTO',
  'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN',
  'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND',
  'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME',
  'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD',
  'PROVE', 'QUICK', 'QUIET', 'QUITE', 'RADIO',
  'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH',
  'READY', 'REFER', 'RELAX', 'REPLY', 'RIGHT',
  'RIVAL', 'RIVER', 'ROBOT', 'ROUGH', 'ROUND',
  'ROUTE', 'ROYAL', 'RURAL', 'SAINT', 'SALAD',
  'SAVED', 'SCALE', 'SCENE', 'SCOPE', 'SCORE',
  'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE',
  'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL',
  'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT',
  'SHORT', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY',
  'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART',
  'SMELL', 'SMILE', 'SMITH', 'SMOKE', 'SNAKE',
  'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH',
  'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND',
  'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF',
  'STAGE', 'STAKE', 'STAND', 'START', 'STATE',
  'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK',
  'STONE', 'STOOD', 'STORE', 'STORM', 'STORY',
  'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE',
  'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'SWING',
  'TABLE', 'TAKEN', 'TASTE', 'TEACH', 'TEETH',
  'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE',
  'THESE', 'THICK', 'THING', 'THINK', 'THIRD',
  'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT',
  'TIMER', 'TIMES', 'TIRED', 'TITLE', 'TODAY',
  'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER',
  'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND',
  'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRUCK',
  'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER',
  'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET',
  'URBAN', 'USUAL', 'VALID', 'VALUE', 'VIDEO',
  'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH',
  'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE',
  'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WORLD',
  'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD',
  'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD',
  'YOUNG', 'YOUTH'
];

// Helper functions
export function isValidWord(word: string): boolean {
  const upperWord = word.toUpperCase();
  return VALID_GUESSES.some(w => w === upperWord);
}

export function isSolutionWord(word: string): boolean {
  const upperWord = word.toUpperCase();
  return SOLUTION_WORDS.some(w => w === upperWord);
}

export function getRandomWord(): string {
  const index = Math.floor(Math.random() * SOLUTION_WORDS.length);
  return SOLUTION_WORDS[index];
}

export function getDailyWord(date: Date = new Date()): string {
  // Use epoch date of Jan 1, 2024
  const epochDate = new Date('2024-01-01');
  const daysSinceEpoch = Math.floor(
    (date.getTime() - epochDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = daysSinceEpoch % SOLUTION_WORDS.length;
  return SOLUTION_WORDS[index];
}