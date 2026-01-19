'use client';

import { useState, useEffect, useCallback } from 'react';

type LED = {
  on: boolean;
  color: string;
};

type Matrix = LED[][];

type Example = {
  pattern: number[][];
  colors: string[];
};

const examples: Record<string, Example> = {
  'Earth 🌍': {
    pattern: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 2, 2, 1, 1, 0],
      [1, 1, 2, 2, 2, 2, 1, 1],
      [1, 1, 2, 2, 2, 2, 1, 1],
      [0, 1, 1, 2, 2, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ],
    colors: ['#000000', '#0000FF', '#00FF00'],
  },
  'Star ⭐': {
    pattern: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 1],
    ],
    colors: ['#000000', '#FFFF00'],
  },
  'Rocket 🚀': {
    pattern: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 2, 1, 1, 2, 1, 0],
      [1, 1, 2, 1, 1, 2, 1, 1],
      [1, 3, 3, 0, 0, 3, 3, 1],
    ],
    colors: ['#000000', '#CCCCCC', '#FF0000', '#FFA500'],
  },
  'Smiley 😊': {
    pattern: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 2, 1, 1, 2, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 2, 1, 1, 2, 1, 1],
      [1, 1, 1, 2, 2, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors: ['#000000', '#FFFF00', '#000000'],
  },
  'Heart ❤️': {
    pattern: [
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors: ['#000000', '#FF0000'],
  },
  'Moon 🌙': {
    pattern: [
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 0, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
    ],
    colors: ['#000000', '#FFFFFF'],
  },
  'Astronaut 👨‍🚀': {
    pattern: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 2, 1, 1, 2, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 3, 3, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
    ],
    colors: ['#000000', '#CCCCCC', '#0000FF', '#FF0000'],
  },
  'Flag 🏴': {
    pattern: [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 2, 2, 2, 0, 0, 0, 0],
      [1, 2, 2, 2, 0, 0, 0, 0],
      [1, 2, 2, 2, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors: ['#000000', '#CCCCCC', '#0000FF'],
  },
};

const createEmptyMatrix = (): Matrix =>
  Array(8)
    .fill(null)
    .map(() =>
      Array(8)
        .fill(null)
        .map(() => ({ on: false, color: '#FF0000' }))
    );

export default function AstroPiPage() {
  const [matrix, setMatrix] = useState<Matrix>(createEmptyMatrix);
  const [currentColor, setCurrentColor] = useState('#FF0000');
  const [drawMode, setDrawMode] = useState<'draw' | 'erase' | 'eyedropper'>('draw');
  const [brightness, setBrightness] = useState(0.5);
  const [history, setHistory] = useState<Matrix[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [teamName, setTeamName] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'info'>('info');
  const [stars, setStars] = useState<Array<{ left: number; top: number; delay: number }>>([]);

  const MAX_HISTORY = 50;

  const showStatus = useCallback((message: string, type: 'success' | 'info') => {
    setStatusMessage(message);
    setStatusType(type);
    setTimeout(() => {
      setStatusMessage('');
    }, 4000);
  }, []);

  const saveState = (newMatrix: Matrix) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newMatrix)));

    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
      setHistory(newHistory);
      setHistoryIndex(MAX_HISTORY - 1);
    } else {
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setMatrix(JSON.parse(JSON.stringify(history[newIndex])));
      showStatus('Undone! ↶', 'info');
    }
  }, [historyIndex, history, showStatus]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setMatrix(JSON.parse(JSON.stringify(history[newIndex])));
      showStatus('Redone! ↷', 'info');
    }
  }, [historyIndex, history, showStatus]);

  // Initialize stars and initial state once
  useEffect(() => {
    // Create stars
    const newStars = Array.from({ length: 100 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setStars(newStars);

    // Save initial state
    const initialMatrix = createEmptyMatrix();
    setHistory([initialMatrix]);
    setHistoryIndex(0);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const toggleLED = (row: number, col: number) => {
    const newMatrix = JSON.parse(JSON.stringify(matrix)) as Matrix;
    const led = newMatrix[row][col];

    if (drawMode === 'draw') {
      led.on = true;
      led.color = currentColor;
    } else if (drawMode === 'erase') {
      led.on = false;
    } else if (drawMode === 'eyedropper') {
      if (led.on) {
        setCurrentColor(led.color);
        setDrawMode('draw');
        showStatus('Color picked! 💧', 'success');
        return;
      }
    }

    setMatrix(newMatrix);
    saveState(newMatrix);
  };

  const adjustBrightness = (color: string, brightness: number): string => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    const newR = Math.round(r * brightness);
    const newG = Math.round(g * brightness);
    const newB = Math.round(b * brightness);

    return (
      '#' +
      newR.toString(16).padStart(2, '0') +
      newG.toString(16).padStart(2, '0') +
      newB.toString(16).padStart(2, '0')
    );
  };

  const clearMatrix = () => {
    const newMatrix = createEmptyMatrix();
    setMatrix(newMatrix);
    saveState(newMatrix);
    showStatus('Matrix cleared! 🗑️', 'success');
  };

  const fillMatrix = () => {
    const newMatrix = Array(8)
      .fill(null)
      .map(() =>
        Array(8)
          .fill(null)
          .map(() => ({ on: true, color: currentColor }))
      );
    setMatrix(newMatrix);
    saveState(newMatrix);
    showStatus('Matrix filled! ⬛', 'success');
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    if (drawMode !== 'draw') {
      setDrawMode('draw');
    }
  };

  const loadExample = (data: Example) => {
    const newMatrix = data.pattern.map((row) =>
      row.map((val) => ({
        on: val > 0,
        color: val > 0 ? data.colors[val] : '#000000',
      }))
    );
    setMatrix(newMatrix);
    saveState(newMatrix);
    showStatus('Example loaded! ✨ Now you can edit it!', 'success');
  };

  const generatePythonCode = () => {
    const team = teamName.trim() || 'My Awesome Team';

    let code = `# Team: ${team}\n`;
    code += '# Paste this code into your Mission Zero program template\n';
    code += '# Replace the color definitions and image array in your template\n\n';

    const colorMap = new Map<string, string>();
    let colorIndex = 0;
    const colorVars: string[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const led = matrix[row][col];
        if (led.on && !colorMap.has(led.color)) {
          const varName = String.fromCharCode(97 + colorIndex);
          colorMap.set(led.color, varName);
          const r = Math.round(parseInt(led.color.substring(1, 3), 16) * brightness);
          const g = Math.round(parseInt(led.color.substring(3, 5), 16) * brightness);
          const b = Math.round(parseInt(led.color.substring(5, 7), 16) * brightness);
          colorVars.push(`${varName} = (${r}, ${g}, ${b})`);
          colorIndex++;
        }
      }
    }

    code += '# Define your colors\n';
    code += 'o = (0, 0, 0)  # Black/Off\n';
    colorVars.forEach((cv) => {
      code += cv + '\n';
    });

    code += '\n# Your image design\n';
    code += 'image = [\n';

    for (let row = 0; row < 8; row++) {
      code += '    ';
      for (let col = 0; col < 8; col++) {
        const led = matrix[row][col];
        if (led.on) {
          code += colorMap.get(led.color);
        } else {
          code += 'o';
        }
        if (row < 7 || col < 7) {
          code += ', ';
        }
      }
      code += '\n';
    }

    code += ']\n\n';
    code += '# Display the image\n';
    code += 'sense.set_pixels(image)\n';

    return code;
  };

  const copyCode = () => {
    const code = generatePythonCode();
    navigator.clipboard.writeText(code).then(
      () => {
        showStatus('Code copied to clipboard! 📋 Now paste it into Mission Zero!', 'success');
      },
      () => {
        showStatus('Code copied to clipboard! 📋', 'success');
      }
    );
  };

  return (
    <>
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <div className="relative min-h-screen bg-gradient-to-br from-[#0a1128] via-[#1a2332] to-[#2d1b4e] p-5 text-white">
        {/* Stars */}
        <div className="pointer-events-none fixed left-0 top-0 h-full w-full">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animation: `twinkle 3s infinite`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Container */}
        <div className="relative z-10 mx-auto max-w-[1400px] rounded-3xl bg-white/95 p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-800 p-6 text-center text-white">
            <h1 className="mb-3 text-4xl font-bold">🚀 Astro Pi Mission Zero 🛰️</h1>
            <p className="text-xl opacity-95">Design your message for the International Space Station!</p>
            <p className="mt-4 rounded-lg bg-white/20 p-3">
              Your design will be displayed on the Sense HAT&apos;s 8×8 LED matrix aboard the ISS
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-purple-800 p-5 text-white">
            <h3 className="mb-3 text-lg font-bold">📋 How to Use This Tool:</h3>
            <ol className="ml-5 list-decimal space-y-1 leading-relaxed">
              <li>
                <strong>Enter your team name</strong> in the box below
              </li>
              <li>
                <strong>Choose a tool:</strong> Draw to paint LEDs, Erase to turn them off, or Pick Color to copy a
                color
              </li>
              <li>
                <strong>Select colors</strong> from the palette or use the color picker
              </li>
              <li>
                <strong>Click on the LEDs</strong> to create your design - each LED can be a different color!
              </li>
              <li>
                <strong>Use Undo/Redo</strong> buttons if you make a mistake (or press Ctrl+Z / Ctrl+Y)
              </li>
              <li>
                <strong>Try examples</strong> below or create your own space-themed design
              </li>
              <li>
                <strong>Click &quot;Show Python Code Snippet&quot;</strong> when ready - copy and paste it into your
                Mission Zero program template
              </li>
            </ol>
          </div>

          {/* Main Content Grid */}
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Matrix Section */}
            <div className="flex flex-col items-center rounded-2xl bg-gray-100 p-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">🎨 Your LED Matrix Design</h2>
              <div className="mb-5 grid grid-cols-8 gap-1 rounded-2xl bg-[#1a1a1a] p-4 shadow-inner">
                {matrix.map((row, rowIndex) =>
                  row.map((led, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`h-[50px] w-[50px] cursor-pointer rounded-full border-2 transition-all duration-150 hover:scale-110 ${
                        led.on ? 'border-white' : 'border-gray-700 bg-[#2a2a2a]'
                      }`}
                      style={
                        led.on
                          ? {
                              background: adjustBrightness(led.color, brightness),
                              boxShadow: `0 0 20px ${adjustBrightness(led.color, brightness)}, inset 0 2px 5px rgba(255, 255, 255, 0.3)`,
                            }
                          : {}
                      }
                      onClick={() => toggleLED(rowIndex, colIndex)}
                    />
                  ))
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  ↶ Undo
                </button>
                <button
                  className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  ↷ Redo
                </button>
                <button
                  className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={clearMatrix}
                >
                  🗑️ Clear All
                </button>
                <button
                  className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={fillMatrix}
                >
                  ⬛ Fill All
                </button>
              </div>
            </div>

            {/* Controls Section */}
            <div className="space-y-6 rounded-2xl bg-gray-100 p-6">
              {/* Team Name */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="mb-3 border-b-2 border-purple-600 pb-2 text-xl font-bold text-gray-800">
                  👥 Team Information
                </h3>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your team name here..."
                  maxLength={50}
                  className="mt-3 w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-800"
                />
                <p className="mt-2 text-sm italic text-gray-600">This will appear in your Python code as a comment</p>
              </div>

              {/* Drawing Tools */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="mb-3 border-b-2 border-purple-600 pb-2 text-xl font-bold text-gray-800">
                  🖌️ Drawing Tools
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    className={`rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                      drawMode === 'draw' ? 'bg-green-500 shadow-green-500/50' : 'bg-purple-600'
                    }`}
                    onClick={() => setDrawMode('draw')}
                  >
                    ✏️ Draw
                  </button>
                  <button
                    className={`rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                      drawMode === 'erase' ? 'bg-green-500 shadow-green-500/50' : 'bg-gray-600'
                    }`}
                    onClick={() => setDrawMode('erase')}
                  >
                    🧹 Erase
                  </button>
                  <button
                    className={`rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                      drawMode === 'eyedropper' ? 'bg-green-500 shadow-green-500/50' : 'bg-gray-600'
                    }`}
                    onClick={() => setDrawMode('eyedropper')}
                  >
                    💧 Pick Color
                  </button>
                </div>
              </div>

              {/* Color Palette */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="mb-3 border-b-2 border-purple-600 pb-2 text-xl font-bold text-gray-800">
                  🎨 Color Palette
                </h3>
                <div className="mb-3 flex items-center gap-4">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded-lg border-none"
                  />
                  <span className="text-gray-800">Custom Color</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {[
                    { color: '#FF0000', label: 'Red' },
                    { color: '#00FF00', label: 'Green' },
                    { color: '#0000FF', label: 'Blue' },
                    { color: '#FFFF00', label: 'Yellow' },
                    { color: '#FF00FF', label: 'Magenta' },
                    { color: '#00FFFF', label: 'Cyan' },
                    { color: '#FFFFFF', label: 'White' },
                    { color: '#FFA500', label: 'Orange' },
                  ].map((preset) => (
                    <div
                      key={preset.color}
                      className="flex h-12 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 text-sm font-bold text-white shadow-sm transition-all hover:scale-105 hover:border-gray-600"
                      style={{
                        background: preset.color,
                        color: preset.color === '#FFFF00' || preset.color === '#00FFFF' || preset.color === '#FFFFFF' ? '#333' : 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      }}
                      onClick={() => setColor(preset.color)}
                    >
                      {preset.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Brightness Control */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="mb-3 border-b-2 border-purple-600 pb-2 text-xl font-bold text-gray-800">
                  💡 Brightness Control
                </h3>
                <div className="mt-3">
                  <label className="mb-2 block font-semibold text-gray-800">
                    LED Brightness: <span className="text-purple-600">{Math.round(brightness * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={brightness * 100}
                    step="10"
                    onChange={(e) => setBrightness(parseInt(e.target.value) / 100)}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 outline-none"
                  />
                  <p className="mt-2 text-sm italic text-gray-600">Lower brightness saves power on the ISS!</p>
                </div>
              </div>

              {/* Get Code Button */}
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="mb-3 border-b-2 border-purple-600 pb-2 text-xl font-bold text-gray-800">
                  📤 Get Your Code Snippet
                </h3>
                <button
                  className="w-full rounded-lg bg-green-500 px-6 py-4 text-lg font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={() => setShowCode(true)}
                >
                  🐍 Show Python Code Snippet
                </button>
                <p className="mt-2 text-sm italic text-gray-600">
                  This generates only the colors and image array to paste into your Mission Zero template
                </p>
              </div>
            </div>
          </div>

          {/* Examples Section */}
          <div className="mb-8 rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-5 text-center text-2xl font-bold text-gray-800">
              ✨ Space-Themed Examples - Click to Load!
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8">
              {Object.entries(examples).map(([name, data]) => (
                <div
                  key={name}
                  className="cursor-pointer rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => loadExample(data)}
                >
                  <div className="mb-2 grid grid-cols-8 gap-[1px] rounded-md bg-[#1a1a1a] p-1">
                    {data.pattern.map((row, rowIdx) =>
                      row.map((pixel, colIdx) => (
                        <div
                          key={`${rowIdx}-${colIdx}`}
                          className={`aspect-square rounded-sm ${pixel > 0 ? '' : 'bg-[#2a2a2a]'}`}
                          style={pixel > 0 ? { background: data.colors[pixel] } : {}}
                        />
                      ))
                    )}
                  </div>
                  <p className="text-center text-sm font-semibold text-gray-800">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Section */}
          {showCode && (
            <div className="mb-8 rounded-2xl bg-gray-100 p-6">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">🐍 Your Python Code Snippet</h2>
              <div className="mb-4 text-center">
                <button
                  className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={copyCode}
                >
                  📋 Copy Code to Clipboard
                </button>
                <button
                  className="ml-3 rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={() => setShowCode(false)}
                >
                  ❌ Close
                </button>
              </div>
              <p className="mb-4 text-center text-sm font-bold text-gray-800">
                <strong>Instructions:</strong> Copy this code and paste it into your Mission Zero program template.
                <br />
                Replace the color definitions and image array that are already in your template.
              </p>
              <pre className="max-h-96 overflow-y-auto rounded-lg bg-[#1a1a1a] p-5 font-mono text-sm leading-relaxed text-green-400">
                {generatePythonCode()}
              </pre>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`rounded-lg p-4 text-center font-semibold ${
                statusType === 'success' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
              }`}
            >
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
