#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Set CI to false to ignore warnings
process.env.CI = 'false';

// Path to react-scripts
const reactScriptsPath = path.join(__dirname, 'node_modules', 'react-scripts', 'bin', 'react-scripts.js');

// Run the build
const build = spawn('node', [reactScriptsPath, 'build'], {
  stdio: 'inherit',
  env: process.env
});

build.on('close', (code) => {
  process.exit(code);
});
