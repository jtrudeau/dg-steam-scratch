'use client';

import { useState, useEffect, useCallback } from 'react';

type LED = {
  on: boolean;
  color: string;
};

type Matrix = LED[][];

type Frame = {
  matrix: Matrix;
  history: Matrix[];
  historyIndex: number;
};

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

const createEmptyFrame = (): Frame => ({
  matrix: createEmptyMatrix(),
  history: [createEmptyMatrix()],
  historyIndex: 0,
});

export default function AstroPiPage() {
  const [frames, setFrames] = useState<Frame[]>([createEmptyFrame()]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [frameDelay, setFrameDelay] = useState(1.0);
  const [currentColor, setCurrentColor] = useState('#FF0000');
  const [drawMode, setDrawMode] = useState<'draw' | 'erase' | 'eyedropper'>('draw');
  const [brightness, setBrightness] = useState(1.0);
  const [teamName, setTeamName] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'info'>('info');

  const MAX_HISTORY = 50;

  // Convenience accessors for current frame
  const currentFrame = frames[currentFrameIndex];
  const matrix = currentFrame.matrix;
  const history = currentFrame.history;
  const historyIndex = currentFrame.historyIndex;

  const showStatus = useCallback((message: string, type: 'success' | 'info') => {
    setStatusMessage(message);
    setStatusType(type);
    setTimeout(() => {
      setStatusMessage('');
    }, 4000);
  }, []);

  const updateCurrentFrame = useCallback((updater: (frame: Frame) => Frame) => {
    setFrames(prev => prev.map((frame, idx) =>
      idx === currentFrameIndex ? updater(frame) : frame
    ));
  }, [currentFrameIndex]);

  const saveState = useCallback((newMatrix: Matrix) => {
    updateCurrentFrame(frame => {
      const newHistory = frame.history.slice(0, frame.historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(newMatrix)));

      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
        return {
          ...frame,
          matrix: newMatrix,
          history: newHistory,
          historyIndex: MAX_HISTORY - 1,
        };
      } else {
        return {
          ...frame,
          matrix: newMatrix,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      }
    });
  }, [updateCurrentFrame]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      updateCurrentFrame(frame => ({
        ...frame,
        matrix: JSON.parse(JSON.stringify(frame.history[newIndex])),
        historyIndex: newIndex,
      }));
      showStatus('Undone! ↶', 'info');
    }
  }, [historyIndex, updateCurrentFrame, showStatus]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      updateCurrentFrame(frame => ({
        ...frame,
        matrix: JSON.parse(JSON.stringify(frame.history[newIndex])),
        historyIndex: newIndex,
      }));
      showStatus('Redone! ↷', 'info');
    }
  }, [historyIndex, history.length, updateCurrentFrame, showStatus]);


  // Frame management functions
  const addFrame = useCallback(() => {
    setFrames(prev => [...prev, createEmptyFrame()]);
    setCurrentFrameIndex(frames.length);
    showStatus(`Frame ${frames.length + 1} added! 🎬`, 'success');
  }, [frames.length, showStatus]);

  const duplicateFrame = useCallback(() => {
    const newFrame: Frame = {
      matrix: JSON.parse(JSON.stringify(matrix)),
      history: [JSON.parse(JSON.stringify(matrix))],
      historyIndex: 0,
    };
    setFrames(prev => [...prev, newFrame]);
    setCurrentFrameIndex(frames.length);
    showStatus(`Frame duplicated! 📋`, 'success');
  }, [matrix, frames.length, showStatus]);

  const deleteFrame = useCallback(() => {
    if (frames.length <= 1) {
      showStatus('Cannot delete the only frame!', 'info');
      return;
    }
    setFrames(prev => prev.filter((_, idx) => idx !== currentFrameIndex));
    setCurrentFrameIndex(prev => Math.min(prev, frames.length - 2));
    showStatus('Frame deleted! 🗑️', 'success');
  }, [frames.length, currentFrameIndex, showStatus]);

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
    saveState(newMatrix);
    showStatus('Example loaded! ✨ Now you can edit it!', 'success');
  };

  const generatePythonCode = () => {
    const team = teamName.trim() || 'My Awesome Team';

    let code = `# Team: ${team}\n`;
    code += '# Paste this code into your Mission Zero program template\n';
    code += '# Replace the color definitions and image array(s) in your template\n\n';

    // Collect all unique colors across all frames
    const colorMap = new Map<string, string>();
    let colorIndex = 0;
    const colorVars: string[] = [];

    for (const frame of frames) {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const led = frame.matrix[row][col];
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
    }

    code += '# Define your colors\n';
    code += 'o = (0, 0, 0)  # Black/Off\n';
    colorVars.forEach((cv) => {
      code += cv + '\n';
    });

    // Generate each frame's image array
    frames.forEach((frame, frameIdx) => {
      const imageName = frameIdx === 0 ? 'image' : `image${frameIdx + 1}`;
      code += `\n# ${frameIdx === 0 ? 'Your image design' : `Frame ${frameIdx + 1}`}\n`;
      code += `${imageName} = [\n`;

      for (let row = 0; row < 8; row++) {
        code += '    ';
        for (let col = 0; col < 8; col++) {
          const led = frame.matrix[row][col];
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
      code += ']\n';
    });

    // Generate display code
    code += '\n# Display the image(s)\n';
    if (frames.length === 1) {
      code += 'sense.set_pixels(image)\n';
    } else {
      frames.forEach((_, frameIdx) => {
        const imageName = frameIdx === 0 ? 'image' : `image${frameIdx + 1}`;
        code += `sense.set_pixels(${imageName})\n`;
        if (frameIdx < frames.length - 1) {
          code += `sleep(${frameDelay})\n`;
        }
      });
    }

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
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 space-y-3">
        <span className="tag">Astro Pi</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Mission Zero — LED Image Designer
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          Design your message for the International Space Station!
          Your image will be displayed on the Sense HAT&apos;s 8×8 LED matrix aboard the ISS.
        </p>
      </div>

      {/* Instructions */}
      <div className="panel mb-8 p-5">
        <h3 className="mb-3 font-display text-lg font-black text-[var(--ink)]">How to Use This Tool</h3>
        <ol className="ml-5 list-decimal space-y-1 text-sm font-semibold leading-relaxed text-[var(--ink)]">
          <li><strong>Enter your team name</strong> in the box below</li>
          <li><strong>Choose a tool:</strong> Draw to paint LEDs, Erase to turn them off, or Pick Color to copy a color</li>
          <li><strong>Select colors</strong> from the palette or use the color picker</li>
          <li><strong>Click on the LEDs</strong> to create your design — each LED can be a different color!</li>
          <li><strong>Use Undo/Redo</strong> if you make a mistake (or press Ctrl+Z / Ctrl+Y)</li>
          <li><strong>Add frames</strong> for animations — click Add Frame or Duplicate to create multiple images with a delay</li>
          <li><strong>Try examples</strong> below or create your own space-themed design</li>
          <li><strong>Click &quot;Show Python Code Snippet&quot;</strong> when ready — copy and paste it into your Mission Zero template</li>
        </ol>
      </div>

      {/* Frame Navigation */}
      <div className="panel mb-8 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-display text-lg font-black text-[var(--ink)]">Frames ({frames.length})</h3>
          <div className="flex flex-wrap gap-3">
            <button
              className="btn btn-primary text-xs"
              onClick={addFrame}
            >
              + Add Frame
            </button>
            <button
              className="btn btn-primary text-xs"
              onClick={duplicateFrame}
            >
              Duplicate
            </button>
            <button
              className="btn btn-secondary text-xs disabled:cursor-not-allowed disabled:opacity-50"
              onClick={deleteFrame}
              disabled={frames.length <= 1}
            >
              Delete
            </button>
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-[var(--ink)]">Delay:</label>
              <input
                type="number"
                min="0.1"
                max="10"
                step="0.1"
                value={frameDelay}
                onChange={(e) => setFrameDelay(Math.max(0.1, Math.min(10, parseFloat(e.target.value) || 1)))}
                className="w-20 border-3 border-[var(--ink)] px-2 py-1 text-center text-sm font-bold text-[var(--ink)]"
              />
              <span className="text-sm font-semibold text-[var(--ink)]">sec</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {frames.map((frame, idx) => (
            <div
              key={idx}
              className={`cursor-pointer border-3 p-2 transition-all hover:scale-105 ${
                idx === currentFrameIndex
                  ? 'border-[var(--ink)] bg-[var(--scratch-orange)] shadow-[3px_3px_0_var(--ink)]'
                  : 'border-[var(--ink)] bg-white'
              }`}
              onClick={() => setCurrentFrameIndex(idx)}
            >
              <div className="mb-1 grid grid-cols-8 gap-[1px] bg-[#1a1a1a] p-1">
                {frame.matrix.map((row, rowIdx) =>
                  row.map((led, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className="aspect-square h-[6px] w-[6px]"
                      style={{
                        background: led.on ? adjustBrightness(led.color, brightness) : '#2a2a2a',
                      }}
                    />
                  ))
                )}
              </div>
              <p className={`text-center text-xs font-black ${
                idx === currentFrameIndex ? 'text-[#1d1200]' : 'text-[var(--ink)]'
              }`}>
                {idx + 1}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Matrix Section */}
        <div className="panel flex flex-col items-center p-6">
          <h2 className="mb-4 font-display text-xl font-black text-[var(--ink)]">
            Your LED Matrix {frames.length > 1 && `(Frame ${currentFrameIndex + 1})`}
          </h2>
          <div className="mb-5 grid grid-cols-8 gap-2 border-3 border-[var(--ink)] bg-[#1a1a1a] p-4">
            {matrix.map((row, rowIndex) =>
              row.map((led, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-[44px] w-[44px] cursor-pointer rounded-full border-2 transition-all duration-150 hover:scale-110 ${
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
              className="btn btn-primary text-xs disabled:cursor-not-allowed disabled:opacity-50"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              Undo
            </button>
            <button
              className="btn btn-primary text-xs disabled:cursor-not-allowed disabled:opacity-50"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              Redo
            </button>
            <button
              className="btn btn-secondary text-xs"
              onClick={clearMatrix}
            >
              Clear All
            </button>
            <button
              className="btn btn-secondary text-xs"
              onClick={fillMatrix}
            >
              Fill All
            </button>
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          {/* Team Name */}
          <div className="panel p-5">
            <h3 className="mb-3 border-b-2 border-[var(--ink)] pb-2 font-display text-base font-black text-[var(--ink)]">
              Team Information
            </h3>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name here..."
              maxLength={50}
              className="mt-3 w-full border-3 border-[var(--ink)] px-4 py-3 text-sm font-semibold text-[var(--ink)]"
            />
            <p className="mt-2 text-xs font-semibold text-[var(--ink)] opacity-60">This will appear in your Python code as a comment</p>
          </div>

          {/* Drawing Tools */}
          <div className="panel p-5">
            <h3 className="mb-3 border-b-2 border-[var(--ink)] pb-2 font-display text-base font-black text-[var(--ink)]">
              Drawing Tools
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                className={`btn text-xs ${
                  drawMode === 'draw' ? 'bg-[var(--scratch-green)] text-white' : 'btn-secondary'
                }`}
                onClick={() => setDrawMode('draw')}
              >
                Draw
              </button>
              <button
                className={`btn text-xs ${
                  drawMode === 'erase' ? 'bg-[var(--scratch-green)] text-white' : 'btn-secondary'
                }`}
                onClick={() => setDrawMode('erase')}
              >
                Erase
              </button>
              <button
                className={`btn text-xs ${
                  drawMode === 'eyedropper' ? 'bg-[var(--scratch-green)] text-white' : 'btn-secondary'
                }`}
                onClick={() => setDrawMode('eyedropper')}
              >
                Pick Color
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div className="panel p-5">
            <h3 className="mb-3 border-b-2 border-[var(--ink)] pb-2 font-display text-base font-black text-[var(--ink)]">
              Color Palette
            </h3>
            <div className="mb-3 flex items-center gap-4">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 cursor-pointer border-2 border-[var(--ink)]"
              />
              <span className="text-sm font-bold text-[var(--ink)]">Custom Color</span>
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
                  className="flex h-10 cursor-pointer items-center justify-center border-3 border-[var(--ink)] text-xs font-black uppercase tracking-wide transition-all hover:scale-105"
                  style={{
                    background: preset.color,
                    color: preset.color === '#FFFF00' || preset.color === '#00FFFF' || preset.color === '#FFFFFF' ? '#1a1a1a' : 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                  }}
                  onClick={() => setColor(preset.color)}
                >
                  {preset.label}
                </div>
              ))}
            </div>
          </div>

          {/* Brightness Control */}
          <div className="panel p-5">
            <h3 className="mb-3 border-b-2 border-[var(--ink)] pb-2 font-display text-base font-black text-[var(--ink)]">
              Brightness
            </h3>
            <div className="mt-3">
              <label className="mb-2 block text-sm font-bold text-[var(--ink)]">
                LED Brightness: <span className="text-[var(--scratch-blue)]">{Math.round(brightness * 100)}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness * 100}
                step="10"
                onChange={(e) => setBrightness(parseInt(e.target.value) / 100)}
                className="h-2 w-full cursor-pointer appearance-none bg-gray-300 outline-none"
              />
              <p className="mt-2 text-xs font-semibold text-[var(--ink)] opacity-60">Lower brightness saves power on the ISS!</p>
            </div>
          </div>

          {/* Get Code Button */}
          <div className="panel p-5">
            <h3 className="mb-3 border-b-2 border-[var(--ink)] pb-2 font-display text-base font-black text-[var(--ink)]">
              Get Your Code Snippet
            </h3>
            <button
              className="btn w-full bg-[var(--scratch-green)] text-sm text-white"
              onClick={() => setShowCode(true)}
            >
              Show Python Code Snippet
            </button>
            <p className="mt-2 text-xs font-semibold text-[var(--ink)] opacity-60">
              Generates colors and image array(s) for your Mission Zero template
              {frames.length > 1 && ` — ${frames.length} frames, ${frameDelay}s delay`}
            </p>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div className="panel mb-8 p-6">
        <h2 className="mb-5 font-display text-xl font-black text-[var(--ink)]">
          Space-Themed Examples — Click to Load
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8">
          {Object.entries(examples).map(([name, data]) => (
            <div
              key={name}
              className="cursor-pointer border-3 border-[var(--ink)] bg-white p-3 transition-all hover:-translate-y-1 hover:shadow-[3px_3px_0_var(--ink)]"
              onClick={() => loadExample(data)}
            >
              <div className="mb-2 grid grid-cols-8 gap-[1px] bg-[#1a1a1a] p-1">
                {data.pattern.map((row, rowIdx) =>
                  row.map((pixel, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className="aspect-square"
                      style={{ background: pixel > 0 ? data.colors[pixel] : '#2a2a2a' }}
                    />
                  ))
                )}
              </div>
              <p className="text-center text-xs font-black text-[var(--ink)]">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Section */}
      {showCode && (
        <div className="panel mb-8 p-6">
          <h2 className="mb-4 font-display text-xl font-black text-[var(--ink)]">Your Python Code Snippet</h2>
          <div className="mb-4 flex flex-wrap gap-3">
            <button
              className="btn bg-[var(--scratch-green)] text-xs text-white"
              onClick={copyCode}
            >
              Copy Code to Clipboard
            </button>
            <button
              className="btn btn-secondary text-xs"
              onClick={() => setShowCode(false)}
            >
              Close
            </button>
          </div>
          <p className="mb-4 text-sm font-bold text-[var(--ink)]">
            Copy this code and paste it into your Mission Zero program template.
            Replace the color definitions and image array already in your template.
          </p>
          <pre className="max-h-96 overflow-y-auto border-3 border-[var(--ink)] bg-[#1a1a1a] p-5 font-mono text-sm leading-relaxed text-green-400">
            {generatePythonCode()}
          </pre>
        </div>
      )}

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`border-3 border-[var(--ink)] p-4 text-center text-sm font-black ${
            statusType === 'success'
              ? 'bg-[var(--scratch-green)] text-white'
              : 'bg-[var(--scratch-blue)] text-white'
          }`}
        >
          {statusMessage}
        </div>
      )}
    </section>
  );
}
