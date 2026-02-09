export type ScratchGameIdea = {
  id: string;
  title: string;
  pitch: string;
  coreLoop: string;
  mvpScope: string;
  skillsNeeded: string[];
  starterTutorialTitle: string;
  starterTutorialHref: `/scratch/${string}`;
  stretchIdeas: string[];
  timebox: "30 min" | "60 min" | "90 min";
  difficulty: "starter" | "builder" | "challenge";
  mechanic: string;
  teamSize: "2-3" | "3-4" | "4-5";
};

export const scratchGameIdeas: ScratchGameIdea[] = [
  {
    id: "click-rush",
    title: "Click Rush",
    pitch: "Tap targets quickly before the timer runs out.",
    coreLoop: "Spawn target -> click target -> gain points -> repeat faster.",
    mvpScope:
      "Start with one moving target, one score counter, and a 30-second timer.",
    skillsNeeded: ["events", "variables", "timing"],
    starterTutorialTitle: "Events + Timing",
    starterTutorialHref: "/scratch/events-and-timing",
    stretchIdeas: [
      "Add combo points for fast clicks",
      "Add two target types with different scores",
      "Add start and end screens",
    ],
    timebox: "30 min",
    difficulty: "starter",
    mechanic: "clicker",
    teamSize: "2-3",
  },
  {
    id: "paddle-duel",
    title: "Paddle Duel",
    pitch: "A two-player paddle game with first-to-5 scoring.",
    coreLoop: "Move paddles -> bounce ball -> score when ball passes edge.",
    mvpScope:
      "Start with two paddles, one ball, one scoreboard, and first to 5 points.",
    skillsNeeded: ["motion", "variables", "input"],
    starterTutorialTitle: "Motion + Coordinates",
    starterTutorialHref: "/scratch/motion-and-coordinates",
    stretchIdeas: [
      "Add ball speed increase every 10 seconds",
      "Add sound effects for paddle hits",
      "Add pause and restart buttons",
    ],
    timebox: "60 min",
    difficulty: "builder",
    mechanic: "arcade",
    teamSize: "3-4",
  },
  {
    id: "catch-sort",
    title: "Catch and Sort",
    pitch: "Catch falling items and sort good vs bad choices.",
    coreLoop: "Move basket -> catch items -> update score/lives -> continue.",
    mvpScope:
      "Start with one basket and two types of falling items. Show score and lives.",
    skillsNeeded: ["input", "variables", "clones"],
    starterTutorialTitle: "Input Patterns",
    starterTutorialHref: "/scratch/input-patterns",
    stretchIdeas: [
      "Add level changes by speed",
      "Add list of random item names",
      "Add bonus item with rare spawn",
    ],
    timebox: "60 min",
    difficulty: "builder",
    mechanic: "catch",
    teamSize: "3-4",
  },
  {
    id: "one-button-jumper",
    title: "One-Button Jumper",
    pitch: "Press one key to jump over obstacles and survive.",
    coreLoop: "Jump -> avoid obstacle -> score distance -> repeat.",
    mvpScope:
      "Start with one jumper, one obstacle, and a game-over screen with restart.",
    skillsNeeded: ["events", "variables", "broadcast"],
    starterTutorialTitle: "Broadcasts + Scene Control",
    starterTutorialHref: "/scratch/broadcasts-and-scenes",
    stretchIdeas: [
      "Add double-jump power-up",
      "Add day/night background cycle",
      "Add high-score list",
    ],
    timebox: "60 min",
    difficulty: "builder",
    mechanic: "runner",
    teamSize: "2-3",
  },
  {
    id: "pet-care-loop",
    title: "Pet Care Loop",
    pitch: "Keep a virtual pet healthy by choosing smart actions.",
    coreLoop: "Choose action -> change hunger/energy/happiness -> check status.",
    mvpScope:
      "Start with three pet meters (hunger, energy, happiness) and three care buttons.",
    skillsNeeded: ["variables", "input", "looks"],
    starterTutorialTitle: "Variables + State",
    starterTutorialHref: "/scratch/variables-and-state",
    stretchIdeas: [
      "Add random events every 20 seconds",
      "Add mini-game for bonus energy",
      "Add pet evolution stages",
    ],
    timebox: "90 min",
    difficulty: "challenge",
    mechanic: "simulation",
    teamSize: "3-4",
  },
  {
    id: "quiz-show-live",
    title: "Quiz Show Live",
    pitch: "A classroom quiz with random questions and points.",
    coreLoop: "Show question -> choose answer -> score -> next question.",
    mvpScope:
      "Start with five questions in a list, one score counter, and a win screen.",
    skillsNeeded: ["lists", "variables", "input"],
    starterTutorialTitle: "Lists + Collections",
    starterTutorialHref: "/scratch/lists-and-collections",
    stretchIdeas: [
      "Add a countdown timer",
      "Add category chooser",
      "Add team mode with two scores",
    ],
    timebox: "90 min",
    difficulty: "challenge",
    mechanic: "quiz",
    teamSize: "4-5",
  },
  {
    id: "maze-rescue",
    title: "Maze Rescue",
    pitch: "Guide a character through a maze before time runs out.",
    coreLoop: "Move through maze -> avoid walls -> reach goal.",
    mvpScope: "Start with one maze, one timer, and one finish spot.",
    skillsNeeded: ["motion", "sensing", "debugging"],
    starterTutorialTitle: "Debugging Workflow",
    starterTutorialHref: "/scratch/debugging-workflow",
    stretchIdeas: [
      "Add three maze levels",
      "Add moving obstacles",
      "Add best-time tracker",
    ],
    timebox: "60 min",
    difficulty: "builder",
    mechanic: "maze",
    teamSize: "2-3",
  },
  {
    id: "space-collector",
    title: "Space Collector",
    pitch: "Fly through space collecting fuel and avoiding debris.",
    coreLoop: "Move ship -> collect fuel -> dodge hazards -> survive.",
    mvpScope:
      "Start with one ship, fuel and debris spawns, plus score and lives.",
    skillsNeeded: ["input", "clones", "variables"],
    starterTutorialTitle: "Clones + Spawners",
    starterTutorialHref: "/scratch/clones-and-spawners",
    stretchIdeas: [
      "Add shield power-up",
      "Add boss wave every 30 seconds",
      "Add two ship choices",
    ],
    timebox: "90 min",
    difficulty: "challenge",
    mechanic: "survival",
    teamSize: "3-4",
  },
  {
    id: "story-quest",
    title: "Story Quest",
    pitch: "Players choose actions and unlock different endings.",
    coreLoop: "Read scene -> choose option -> jump to next scene.",
    mvpScope: "Start with three scenes and two possible endings.",
    skillsNeeded: ["broadcast", "variables", "looks"],
    starterTutorialTitle: "Looks + Scenes",
    starterTutorialHref: "/scratch/looks-and-scenes",
    stretchIdeas: [
      "Add inventory choice checks",
      "Add character mood meter",
      "Add secret ending path",
    ],
    timebox: "90 min",
    difficulty: "challenge",
    mechanic: "story",
    teamSize: "4-5",
  },
  {
    id: "mini-builder",
    title: "Mini Builder",
    pitch: "Build and place objects on a simple map.",
    coreLoop: "Pick tool -> place object -> earn build points.",
    mvpScope: "Start with two objects to place and one build score.",
    skillsNeeded: ["my blocks", "input", "variables"],
    starterTutorialTitle: "My Blocks (Functions)",
    starterTutorialHref: "/scratch/my-blocks",
    stretchIdeas: [
      "Add object rotation",
      "Add map themes",
      "Add save/load using lists",
    ],
    timebox: "90 min",
    difficulty: "challenge",
    mechanic: "builder",
    teamSize: "3-4",
  },
];
