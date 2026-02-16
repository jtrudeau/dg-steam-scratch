---
id: "session-03"
title: "Systems Thinking & Debugging Warmups"
phase: "onboarding"
meetingNumber: 3
studentObjective: "Practice debugging and map how events and messages connect scenes and sprites."
teacherGoal: "Introduce the debugging protocol, highlight cause/effect chains, and prep teams for ideation."
scratchFocus:
  - "Events"
  - "Broadcast"
  - "Sensing"
artifacts:
  - "debugging log"
  - "mystery bug checklist"
delivery:
  worksheets:
    - "debugging-log"
  resources:
    - "debug-like-a-scientist"
    - "broadcast-receive-patterns"
flow:
  - title: "System map warmup"
    duration: "10 min"
    description: "Paper exercise: draw arrows between inputs (keys, clicks) and outputs (sprite actions) for a sample Scratch scene."
  - title: "Bug hunt lab"
    duration: "20 min"
    description: "Pairs debug a provided project with 3 planted issues (event order, broadcast missing, sensing typo)."
  - title: "Broadcast patterns mini-lesson"
    duration: "10 min"
    description: "Show how to broadcast scene changes and coordinate sprites; students sketch a messaging map."
  - title: "Reflection & prep"
    duration: "5 min"
    description: "Teams note their biggest debugging trick and one question for next session’s ideation workshop."
teacherMoves:
  - "Use the debugging protocol aloud: observe → predict → test → adjust. Have students narrate their predictions."
  - "If a team stalls, point them to the micro-tutorial steps before giving a direct fix."
  - "Capture misconceptions around broadcast vs. events to revisit in Session 5 storyboarding."
---

## Debug Like a Scientist

Today you learn how Scratch projects really work — by breaking them and fixing them.

### Step 1: Map the System

Grab a piece of paper. Look at the sample Scratch scene on the board.

**Draw arrows connecting:**

- **Inputs** (keys pressed, clicks, green flag) on the left
- **Outputs** (what the sprites do) on the right

Every input should have an arrow to at least one output. If you can't find the connection, that's a clue — something might be missing.

### Step 2: Bug Hunt

You and a partner get a Scratch project with **3 bugs** hidden in it. Your job: find and fix all three.

**Use this process every time:**

1. **Observe** — What happens when you run the project? What's wrong?
2. **Predict** — What do you think is causing it?
3. **Test** — Change one thing and run it again
4. **Adjust** — Did it work? If not, go back to step 1

The bugs are related to:
- Event order (things happening in the wrong sequence)
- A missing broadcast
- A sensing block typo

**Keep track of each bug you find in your debugging log.**

### Step 3: Broadcasts and Scenes

Broadcasts are how sprites talk to each other in Scratch.

Watch the mini-lesson, then sketch a **messaging map** for a simple two-scene project:
- What broadcasts are sent?
- Who receives them?
- What happens when they're received?

This is how bigger projects stay organized — every scene change starts with a broadcast.

### Step 4: Reflect

Before we wrap up, write down:

- **Your team's best debugging trick** — what worked for finding bugs?
- **One question** you want answered in the next session
