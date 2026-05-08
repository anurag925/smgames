# Undercover Game - Design & Implementation Document

## 1. Overview

**Undercover** is an offline, pass-the-device social deduction party game for 4–10 players. One device is shared among all players — each player picks a card to secretly learn their role and word, then the group discusses and votes to eliminate suspects. The game is fully client-side with no server/WebSocket requirements.

---

## 2. Game Rules

### 2.1 Roles

| Role | Description | Word? |
|------|-------------|-------|
| **Civilian** | The majority. They receive the **main secret word**. | ✅ Yes |
| **Undercover** | The infiltrator(s). They receive a **similar but different word**. | ✅ Yes (different) |
| **Mr. White** | The wildcard. They receive **no word at all**. | ❌ None |

### 2.2 Player & Role Distribution (Defaults)

| Total Players | Civilians | Undercover | Mr. White |
|---------------|-----------|------------|-----------|
| 4             | 3         | 1          | 0         |
| 5             | 3         | 1          | 1         |
| 6             | 4         | 1          | 1         |
| 7             | 5         | 1          | 1         |
| 8             | 5         | 2          | 1         |
| 9             | 6         | 2          | 1         |
| 10            | 7         | 2          | 1         |

> Users can also customize undercover (1–3) and Mr. White (0–1) counts during setup.

### 2.3 Gameplay Flow

```
Setup → Card Pick → Discussion → Voting → Elimination → [Repeat or Game Over]
```

1. **Setup Phase**: Configure player count, role distribution, enter player names.
2. **Card Pick Phase**: Device is passed around. Each player taps a face-down card to privately see their role and secret word. They tap "OK" and pass the device to the next player.
3. **Discussion Phase**: Players take turns giving a **one-word or short phrase** clue about their word (verbal, in-person). The app shows the turn order and current speaker.
4. **Voting Phase**: After discussion, players openly vote on who to eliminate. The app can track votes by passing the device or via open discussion.
5. **Elimination**: The voted-out player's role is revealed to all.
6. **Mr. White's Last Chance**: If Mr. White is eliminated, they get ONE guess at the civilian word. If correct → Mr. White wins instantly.
7. Repeat from Discussion Phase until a win condition is met.

### 2.4 Win Conditions

| Winner | Condition |
|--------|-----------|
| **Civilians** | All Undercover agents AND Mr. White are eliminated |
| **Undercover** | Survives until only 2 players remain (1 Undercover vs 1 Civilian) |
| **Mr. White** | When eliminated, correctly guesses the civilian word |

---

## 3. Screens & Navigation

```
/games/undercover            → Landing Page
/games/undercover/rules      → Rules Page
/games/undercover/setup      → Game Setup
/games/undercover/play       → Game Play (all phases handled via state)
```

### 3.1 Landing Page (`/games/undercover`)

- Large game title "UNDERCOVER" with gradient text
- Brief tagline: "Find the impostor among you"
- Two CTAs: **Play** (→ setup) and **How to Play** (→ rules)
- Uses dark gaming theme with glow effects
- Back link to homepage

### 3.2 Rules Page (`/games/undercover/rules`)

- Scrollable page with sections:
  - **Overview** — what the game is
  - **Roles** — Civilian, Undercover, Mr. White with icons
  - **How to Play** — step-by-step
  - **Win Conditions** — who wins when
  - **Tips** — strategy hints
- Back button to landing page

### 3.3 Setup Page (`/games/undercover/setup`)

- **Player count** slider/stepper (4–10)
- **Role distribution** panel:
  - Civilians count (auto-calculated)
  - Undercover count (adjustable, 1–3)
  - Mr. White toggle (0 or 1)
- **Player name entry**: Each player enters a name (max 10 chars) — displayed as a list with avatar initials
- **Start Game** button (validates: enough players, names filled)

### 3.4 Game Play Page (`/games/undercover/play`)

All game phases managed by a state machine in a single page component:

#### Phase: `card-pick`
- Header: "Player X — Please pick a card"
- Grid of face-down mystery cards (matching player count)
- On tap → modal/overlay reveals:
  - Player name + avatar initial
  - Role badge (Civilian / Undercover / Mr. White)
  - Secret word (or "You have no secret word" for Mr. White)
  - "OK" button → marks card as picked, moves to next player
- Shows remaining infiltrator count
- After all players pick → transition to discussion

#### Phase: `discussion`
- Round number indicator
- Player turn order list (highlight current speaker)
- "Next Player" button to advance speaker
- "Start Voting" button after all have spoken

#### Phase: `voting`
- Grid of alive player cards
- Each player taps who they want to eliminate
- "Confirm Elimination" button

#### Phase: `elimination`
- Dramatic reveal of eliminated player
- Show their role + word
- If Mr. White → transition to `mr-white-guess`
- If game continues → "Next Round" → back to discussion
- If win condition met → transition to `game-over`

#### Phase: `mr-white-guess`
- Prompt: "Mr. White, guess the civilian word!"
- Text input for guess
- Submit → check against civilian word (case-insensitive)
- If correct → Mr. White wins → game-over
- If wrong → continue checking remaining win conditions

#### Phase: `game-over`
- Winner announcement with celebration effects
- Winning team/role displayed
- Reveal all players' roles and words
- "Play Again" → back to setup
- "Home" → back to landing

---

## 4. Data Architecture

### 4.1 Word Pairs

Stored in `src/app/games/undercover/data/word-pairs.ts`:

```typescript
export interface WordPair {
  civilian: string;
  undercover: string;
}

export const wordPairs: WordPair[] = [
  { civilian: "Apple", undercover: "Pear" },
  { civilian: "Coffee", undercover: "Tea" },
  // ... 100+ pairs
];
```

Categories of word pairs:
- **Food & Drinks**: Apple/Pear, Coffee/Tea, Pizza/Burger, etc.
- **Animals**: Dog/Wolf, Cat/Lion, Dolphin/Whale, etc.
- **Places**: Beach/Desert, Mountain/Hill, Ocean/Lake, etc.
- **Objects**: Guitar/Violin, Book/Magazine, Phone/Tablet, etc.
- **Concepts**: Love/Friendship, Summer/Spring, Dream/Nightmare, etc.
- **Activities**: Swimming/Diving, Running/Jogging, Cooking/Baking, etc.
- **People/Characters**: Batman/Superman, Doctor/Nurse, King/Queen, etc.

### 4.2 Game State

```typescript
interface Player {
  id: number;
  name: string;
  role: 'civilian' | 'undercover' | 'mr-white';
  word: string | null;       // null for Mr. White
  isAlive: boolean;
  hasPickedCard: boolean;
  votedFor: number | null;   // player id they voted for
}

interface GameState {
  phase: 'card-pick' | 'discussion' | 'voting' | 'elimination' | 'mr-white-guess' | 'game-over';
  players: Player[];
  currentPlayerIndex: number;
  round: number;
  eliminatedPlayer: Player | null;
  winner: 'civilians' | 'undercover' | 'mr-white' | null;
  wordPair: WordPair;
  cardSlots: number[];       // shuffled indices for card pick grid
}
```

State is stored in React `useState` — no persistence needed (single session game).

---

## 5. UI/UX Design

### Theme
- **Dark gaming aesthetic** consistent with SM Games design system
- Colors: `slate-900`/`slate-950` backgrounds, `indigo-500` primary, `pink-500`/`purple-500` accents
- Glow effects on interactive elements
- Gradient text for headings

### Role Colors
| Role | Color | Badge Style |
|------|-------|-------------|
| Civilian | Blue (`indigo-500`) | Solid blue badge |
| Undercover | Red/Pink (`pink-500`) | Solid pink badge |
| Mr. White | White/Gray (`slate-300`) | Outline white badge |

### Card Design
- Face-down: Amber/yellow gradient cards with `?` silhouette (inspired by reference UI)
- Face-up: Role-colored card with word reveal
- Flip animation on pick

### Components Used from Design System
- `Button` (hero, primary, danger variants)
- `H1`, `H2`, `H3`, `GradientText` for typography
- `Badge`, `SolidBadge` for role indicators
- `BasicCard` for player cards
- `ProgressBar` / `StepsIndicator` for round tracking
- `Avatar` (initials-based) for player identification
- `Input` for player name entry and Mr. White guess

---

## 6. File Structure

```
src/app/games/undercover/
├── page.tsx                  # Landing page
├── rules/
│   └── page.tsx              # Rules page
├── setup/
│   └── page.tsx              # Game setup page
├── play/
│   └── page.tsx              # Main game play (all phases)
└── data/
    └── word-pairs.ts         # Word pair database (100+ pairs)
```

---

## 7. Implementation Order

1. Word pairs data file — foundation for the game
2. Landing page — entry point
3. Rules page — standalone, no game logic
4. Setup page — player/role configuration
5. Game play page — core game with all phases
6. Homepage integration — add to game listing
7. Testing — end-to-end flow verification

---

## 8. Future Enhancements (v2)

- Word categories (Food, Animals, Places, etc.)
- Custom word pairs
- Timer for discussion rounds
- Sound effects and haptic feedback
- Game history / statistics
- Special roles (e.g., Detective — can peek at one player's card)
- Animations and transitions between phases