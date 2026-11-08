const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pres = new pptxgen();

// Configure Presentation
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
pres.author = 'John Stewartsson J R & Team';
pres.company = "St. Joseph's Institute of Technology";
pres.title = 'RTL Design and Verification of ML-Based CPU DVFS Governor (DVS Trooper)';

// Color Palette Constants
const NAVY_DARK = '0A192F';
const BLUE_ACCENT = '0284C7';
const BLUE_PRIMARY = '1E3A8A';
const BLUE_LIGHT = 'F0F7FF';
const BG_PAGE = 'F8FAFC';
const CARD_BG = 'FFFFFF';
const CARD_BORDER = 'E2E8F0';
const TEXT_DARK = '0F172A';
const TEXT_MUTED = '475569';
const ACCENT_GREEN = '16A34A';
const ACCENT_RED = 'DC2626';
const ACCENT_AMBER = 'D97706';

// Paths
const logoPath = 'C:/Users/stewa/.gemini/antigravity/brain/245d4870-b791-436f-b287-3137ab6468bf/scratch/report/sjit_logo.jpg';
const epwavePath = 'C:/Users/stewa/.gemini/antigravity/scratch/dvs-trooper/docs/epwave_simulation.png';

// Helper: Add Standard Slide Header & Footer
function addSlideChrome(slide, slideNumber, categoryTag, slideTitle) {
  // Slide background
  slide.background = { color: BG_PAGE };

  // Top Accent Stripe
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color: BLUE_PRIMARY },
    line: { color: BLUE_PRIMARY }
  });

  // Category Tag
  slide.addText(categoryTag.toUpperCase(), {
    x: 0.6, y: 0.22, w: 7.0, h: 0.25,
    fontFace: 'Arial', fontSize: 9, bold: true, color: BLUE_ACCENT
  });

  // Slide Title
  slide.addText(slideTitle, {
    x: 0.6, y: 0.45, w: 8.5, h: 0.45,
    fontFace: 'Arial', fontSize: 18, bold: true, color: NAVY_DARK
  });

  // Footer Line
  slide.addShape(pres.ShapeType.line, {
    x: 0.6, y: 5.25, w: 8.8, h: 0,
    line: { color: 'CBD5E1', width: 0.8 }
  });

  // Footer Text Left
  slide.addText('SD0212 RTL DESIGN AND VERIFICATION | DVS TROOPER', {
    x: 0.6, y: 5.30, w: 6.0, h: 0.25,
    fontFace: 'Arial', fontSize: 8, color: TEXT_MUTED
  });

  // Footer Text Right (Slide Number)
  slide.addText(`Slide ${slideNumber} of 7`, {
    x: 8.0, y: 5.30, w: 1.4, h: 0.25,
    fontFace: 'Arial', fontSize: 8, bold: true, color: TEXT_MUTED, align: 'right'
  });
}

// ==========================================================
// SLIDE 1: TITLE SLIDE
// ==========================================================
{
  const s1 = pres.addSlide();
  s1.background = { color: NAVY_DARK };

  // Decorative top accent bar
  s1.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.15,
    fill: { color: BLUE_ACCENT }, line: { color: BLUE_ACCENT }
  });

  // College Logo
  if (fs.existsSync(logoPath)) {
    s1.addImage({ path: logoPath, x: 0.8, y: 0.5, w: 1.1, h: 1.1 });
  }

  // Institution Details
  s1.addText("ST. JOSEPH'S INSTITUTE OF TECHNOLOGY", {
    x: 2.1, y: 0.50, w: 7.2, h: 0.35,
    fontFace: 'Arial', fontSize: 17, bold: true, color: 'FFFFFF'
  });
  s1.addText("St. Joseph's Group of Institutions | OMR, Chennai - 119\nDepartment of Electronics and Communication Engineering", {
    x: 2.1, y: 0.85, w: 7.2, h: 0.45,
    fontFace: 'Arial', fontSize: 10, color: '94A3B8'
  });

  // Divider Line
  s1.addShape(pres.ShapeType.line, {
    x: 0.8, y: 1.75, w: 8.4, h: 0,
    line: { color: '334155', width: 1 }
  });

  // Course Badge
  s1.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 1.95, w: 3.5, h: 0.35,
    fill: { color: '1E293B' }, line: { color: BLUE_ACCENT, width: 1 }
  });
  s1.addText("COURSE: SD0212 RTL DESIGN AND VERIFICATION", {
    x: 0.8, y: 1.95, w: 3.5, h: 0.35,
    fontFace: 'Arial', fontSize: 8.5, bold: true, color: BLUE_ACCENT, align: 'center'
  });

  // Project Title
  s1.addText("RTL DESIGN AND VERIFICATION OF ML-BASED CPU DVFS GOVERNOR USING EDA PLAYGROUND", {
    x: 0.8, y: 2.45, w: 8.4, h: 0.95,
    fontFace: 'Arial', fontSize: 21, bold: true, color: 'FFFFFF'
  });
  s1.addText("Project Acronym: DVS TROOPER (Predictive Dynamic Voltage & Frequency Scaling Engine)", {
    x: 0.8, y: 3.40, w: 8.4, h: 0.30,
    fontFace: 'Arial', fontSize: 11, italic: true, color: '38BDF8'
  });

  // Team Members Card (Left Box)
  s1.addShape(pres.ShapeType.rect, {
    x: 0.8, y: 3.85, w: 5.2, h: 1.45,
    fill: { color: '1E293B' }, line: { color: '334155', width: 1 }
  });
  s1.addText("PROJECT TEAM MEMBERS", {
    x: 1.0, y: 3.95, w: 4.8, h: 0.25,
    fontFace: 'Arial', fontSize: 9.5, bold: true, color: 'F8FAFC'
  });
  const teamText = [
    { text: "1. Bernice Eleora Judson\t", options: { bold: true, color: 'E2E8F0', fontSize: 8.5 } },
    { text: "(312424106032)\n", options: { color: '94A3B8', fontSize: 8.5 } },
    { text: "2. Jayachandiran S\t\t", options: { bold: true, color: 'E2E8F0', fontSize: 8.5 } },
    { text: "(312424106068)\n", options: { color: '94A3B8', fontSize: 8.5 } },
    { text: "3. John Stewartsson J R\t", options: { bold: true, color: 'E2E8F0', fontSize: 8.5 } },
    { text: "(312424106073)\n", options: { color: '94A3B8', fontSize: 8.5 } },
    { text: "4. Kishore R\t\t\t", options: { bold: true, color: 'E2E8F0', fontSize: 8.5 } },
    { text: "(312424106087)\n", options: { color: '94A3B8', fontSize: 8.5 } },
    { text: "5. Rozario Shaan Soris J\t", options: { bold: true, color: 'E2E8F0', fontSize: 8.5 } },
    { text: "(312424106136)", options: { color: '94A3B8', fontSize: 8.5 } }
  ];
  s1.addText(teamText, { x: 1.0, y: 4.22, w: 4.8, h: 1.0, fontFace: 'Arial' });

  // Supervisors Card (Right Box)
  s1.addShape(pres.ShapeType.rect, {
    x: 6.2, y: 3.85, w: 3.0, h: 1.45,
    fill: { color: '1E293B' }, line: { color: '334155', width: 1 }
  });
  s1.addText("ACADEMIC LEADERSHIP", {
    x: 6.4, y: 3.95, w: 2.6, h: 0.25,
    fontFace: 'Arial', fontSize: 9.5, bold: true, color: 'F8FAFC'
  });
  const supText = [
    { text: "Project Supervisor:\n", options: { fontSize: 8, color: '94A3B8' } },
    { text: "Dr. R. Nirosha, M.E., Ph.D.\n", options: { fontSize: 8.5, bold: true, color: 'E2E8F0' } },
    { text: "Head of the Department:\n", options: { fontSize: 8, color: '94A3B8' } },
    { text: "Dr. P G V Ramesh, M.E., Ph.D.\n", options: { fontSize: 8.5, bold: true, color: 'E2E8F0' } },
    { text: "Principal:\n", options: { fontSize: 8, color: '94A3B8' } },
    { text: "Dr. R. Priscilla, M.E., Ph.D.", options: { fontSize: 8.5, bold: true, color: 'E2E8F0' } }
  ];
  s1.addText(supText, { x: 6.4, y: 4.22, w: 2.6, h: 1.0, fontFace: 'Arial' });
}

// ==========================================================
// SLIDE 2: INTRODUCTION & PROBLEM STATEMENT
// ==========================================================
{
  const s2 = pres.addSlide();
  addSlideChrome(s2, 2, "Chapter 1 & 2: Motivation & Background", "Introduction & Problem Statement");

  // Left Card: Background & Motivation
  s2.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.05, w: 4.25, h: 3.3,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s2.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 1.05, w: 4.25, h: 0.4,
    fill: { color: BLUE_PRIMARY }
  });
  s2.addText("THE POWER DELIVERY NETWORK (PDN) CHALLENGE", {
    x: 0.75, y: 1.12, w: 4.0, h: 0.25,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'FFFFFF'
  });

  const leftPoints = [
    { text: "Nanosecond Current Surges (di/dt):\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Modern high-frequency CPU cores transition rapidly between idle and peak SIMD compute bursts, causing immense transient currents.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Parasitic Inductive Droop:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Package inductance (L) and resistance (R) induce rapid supply rail collapse: ", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Vdroop = L(di/dt) + I*R", options: { bold: true, color: ACCENT_RED, fontSize: 8.5 } },
    { text: ".\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Timing Violation Risk:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "If rail voltage breaches the minimum operational threshold (Vmin), logic gate delays spike, causing setup timing faults and system crashes.", options: { color: TEXT_MUTED, fontSize: 8.5 } }
  ];
  s2.addText(leftPoints, { x: 0.8, y: 1.55, w: 3.85, h: 2.65, fontFace: 'Arial' });

  // Right Card: Conventional DVFS Limitations
  s2.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 1.05, w: 4.25, h: 3.3,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s2.addShape(pres.ShapeType.rect, {
    x: 5.15, y: 1.05, w: 4.25, h: 0.4,
    fill: { color: ACCENT_RED }
  });
  s2.addText("LIMITATIONS OF CONVENTIONAL REACTIVE GOVERNORS", {
    x: 5.30, y: 1.12, w: 4.0, h: 0.25,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'FFFFFF'
  });

  const rightPoints = [
    { text: "Post-Event Detection Latency:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Conventional governors act only AFTER the voltage has already collapsed below critical limits (10 to 30 ns detection and PLL reaction lag).\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Wasteful Voltage Guardbands:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "To prevent crashes during this latency gap, silicon vendors permanently inflate nominal supply voltage by +15% to +25%.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Severe Energy Overhead:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Since dynamic power scales quadratically (P = alpha*C*V^2*f), excessive voltage guardbands cause massive waste in battery and thermal efficiency.", options: { color: TEXT_MUTED, fontSize: 8.5 } }
  ];
  s2.addText(rightPoints, { x: 5.35, y: 1.55, w: 3.85, h: 2.65, fontFace: 'Arial' });

  // Bottom Solution Highlight Box
  s2.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 4.45, w: 8.8, h: 0.70,
    fill: { color: BLUE_LIGHT }, line: { color: BLUE_ACCENT, width: 1 }
  });
  const botText = [
    { text: "DVS TROOPER INNOVATION: ", options: { bold: true, color: BLUE_PRIMARY, fontSize: 9.5 } },
    { text: "Replaces slow reactive thresholds with a lightweight Machine-Learning decision rule in SystemVerilog that predicts voltage droop ", options: { color: TEXT_DARK, fontSize: 9 } },
    { text: "1 cycle (10 ns) in advance", options: { bold: true, color: ACCENT_GREEN, fontSize: 9.5 } },
    { text: ", allowing clock throttling before timing margin collapse and slashing required guardband voltage.", options: { color: TEXT_DARK, fontSize: 9 } }
  ];
  s2.addText(botText, { x: 0.8, y: 4.52, w: 8.4, h: 0.55, fontFace: 'Arial' });
}

// ==========================================================
// SLIDE 3: PROPOSED ARCHITECTURE & ML DECISION ENGINE
// ==========================================================
{
  const s3 = pres.addSlide();
  addSlideChrome(s3, 3, "Chapter 3: System Architecture", "Proposed Architecture & ML Decision Engine");

  // Left Card: ML Formulation
  s3.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.05, w: 4.25, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s3.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 1.05, w: 4.25, h: 0.4,
    fill: { color: BLUE_PRIMARY }
  });
  s3.addText("MACHINE LEARNING FORMULATION & FEATURES", {
    x: 0.75, y: 1.12, w: 4.0, h: 0.25,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'FFFFFF'
  });

  const mlPoints = [
    { text: "Dual-Feature Execution Vector:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Trained classifier maps two key physical parameters to impending voltage droops:\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "  1. Delta_V(t) = Vnominal - Vactual ", options: { bold: true, color: BLUE_PRIMARY, fontSize: 8.5 } },
    { text: "(12-bit signed ADC voltage sag)\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "  2. busy(t) ", options: { bold: true, color: BLUE_PRIMARY, fontSize: 8.5 } },
    { text: "(8-bit saturating counter tracking consecutive execution cycles)\n\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "Trained Hardware Decision Boundary:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Droop Alert = (Delta_V >= 40 mV)  AND  (busy >= 3 cycles)\n\n", options: { bold: true, color: ACCENT_GREEN, fontSize: 9.5 } },
    { text: "Zero-Overhead Hardware Inference:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Eliminates power-hungry floating-point DSPs, complex activation functions, and multiply-accumulate (MAC) arrays.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Single-Cycle Combinational Latency:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Evaluates the entire decision within the 100 MHz clock cycle without pipeline stalls.", options: { color: TEXT_MUTED, fontSize: 8.5 } }
  ];
  s3.addText(mlPoints, { x: 0.8, y: 1.55, w: 3.85, h: 3.45, fontFace: 'Arial' });

  // Right Card: Gate-Level Hardware Pipeline
  s3.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 1.05, w: 4.25, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s3.addShape(pres.ShapeType.rect, {
    x: 5.15, y: 1.05, w: 4.25, h: 0.4,
    fill: { color: '0D9488' }
  });
  s3.addText("GATE-LEVEL PIPELINE & HARDWARE CIRCUITS", {
    x: 5.30, y: 1.12, w: 4.0, h: 0.25,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'FFFFFF'
  });

  const pipePoints = [
    { text: "1. 12-Bit Fast Subtractor Block:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Computes rail voltage sag (1000 mV nominal - measured Vrail). Implemented with high-speed carry-lookahead adder logic.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "2. 8-Bit Saturating Counter:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Tracks consecutive execution burst cycles. Increments while busy=1; clamps at 8'hFF to eliminate overflow rollover hazards.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "3. Magnitude Comparator Stage:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Parallel combinational comparators verify: Delta_V >= 12'd40 and counter >= 8'd3.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "4. Synchronous Early Alert Register:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "Registers early warning signal 'droop_warn', firing synchronously to govern the clock divider before rail reaches danger zone.", options: { color: TEXT_MUTED, fontSize: 8.5 } }
  ];
  s3.addText(pipePoints, { x: 5.35, y: 1.55, w: 3.85, h: 3.45, fontFace: 'Arial' });
}

// ==========================================================
// SLIDE 4: RTL IMPLEMENTATION & DUAL-GOVERNOR FSM
// ==========================================================
{
  const s4 = pres.addSlide();
  addSlideChrome(s4, 4, "Chapter 3: RTL Implementation", "Modular RTL Design & Dual-Governor State Machine");

  // Left Card: Modular RTL Hierarchy
  s4.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.05, w: 4.25, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s4.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 1.05, w: 4.25, h: 0.4,
    fill: { color: BLUE_PRIMARY }
  });
  s4.addText("SYSTEMVERILOG RTL MODULAR HIERARCHY", {
    x: 0.75, y: 1.12, w: 4.0, h: 0.25,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'FFFFFF'
  });

  const rtlModules = [
    { text: "Module 1: droop_predictor.sv\n", options: { bold: true, color: BLUE_PRIMARY, fontSize: 9.5 } },
    { text: "- Implements feature extraction and ML decision rule.\n- Contains 12-bit subtractor and 8-bit saturating counter.\n- Outputs: 'droop_warn' and 'busy_count'.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Module 2: dvs_governor.sv\n", options: { bold: true, color: BLUE_PRIMARY, fontSize: 9.5 } },
    { text: "- Core governor controlling 'fast_throttle' frequency scaling.\n- Implements 3-cycle healthy recovery sequencer.\n- Hysteresis filter eliminates high-frequency limit-cycle chattering.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Module 3: dvs_compare.sv (Top Verification Core)\n", options: { bold: true, color: BLUE_PRIMARY, fontSize: 9.5 } },
    { text: "- Instantiates predictive governor and reactive governor in parallel.\n- Feeds identical clock, reset, and workload stress stimuli.\n- Directly compares response latency and timing margins.", options: { color: TEXT_MUTED, fontSize: 8.5 } }
  ];
  s4.addText(rtlModules, { x: 0.8, y: 1.55, w: 3.85, h: 3.45, fontFace: 'Arial' });

  // Right Card: Finite State Machine (FSM)
  s4.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 1.05, w: 4.25, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s4.addShape(pres.ShapeType.rect, {
    x: 5.15, y: 1.05, w: 4.25, h: 0.4,
    fill: { color: '6366F1' }
  });
  s4.addText("FINITE STATE MACHINE (FSM) EXECUTION FLOW", {
    x: 5.30, y: 1.12, w: 4.0, h: 0.25,
    fontFace: 'Arial', fontSize: 10, bold: true, color: 'FFFFFF'
  });

  const fsmSteps = [
    { text: "State 0: IDLE / NOMINAL (Full 100 MHz)\n", options: { bold: true, color: NAVY_DARK, fontSize: 9.5 } },
    { text: "CPU operates at maximum clock frequency; continuous monitoring of execution activity and rail voltage.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "State 1: PREDICTIVE THROTTLE (Immediate Action)\n", options: { bold: true, color: ACCENT_RED, fontSize: 9.5 } },
    { text: "On 'droop_warn=1', governor instantly asserts 'fast_throttle=1'. Clock divider switches to safe half-rate to curtail di/dt transient.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "State 2: RECOVERY SEQUENCING (Hysteresis Buffer)\n", options: { bold: true, color: ACCENT_AMBER, fontSize: 9.5 } },
    { text: "When rail voltage recovers above safe margin, internal 3-cycle countdown begins. Throttle remains asserted to ensure stability.\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "State 3: HEALTHY RELEASE (Seamless Restoration)\n", options: { bold: true, color: ACCENT_GREEN, fontSize: 9.5 } },
    { text: "After 3 consecutive healthy cycles, throttle deasserts. Clock restores to 100 MHz without oscillation.", options: { color: TEXT_MUTED, fontSize: 8.5 } }
  ];
  s4.addText(fsmSteps, { x: 5.35, y: 1.55, w: 3.85, h: 3.45, fontFace: 'Arial' });
}

// ==========================================================
// SLIDE 5: VERIFICATION & EDA PLAYGROUND WAVEFORMS
// ==========================================================
{
  const s5 = pres.addSlide();
  addSlideChrome(s5, 5, "Chapter 3: RTL Verification & Simulation", "RTL Verification & EDA Playground Simulation Waveforms");

  // Left Column: Testbench Methodology
  s5.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.05, w: 3.5, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s5.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 1.05, w: 3.5, h: 0.4,
    fill: { color: BLUE_PRIMARY }
  });
  s5.addText("TESTBENCH METHODOLOGY (tb_dvs.sv)", {
    x: 0.75, y: 1.12, w: 3.2, h: 0.25,
    fontFace: 'Arial', fontSize: 9.5, bold: true, color: 'FFFFFF'
  });

  const tbDetails = [
    { text: "Verification Environment:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "- EDA Playground Web IDE\n- Synopsys VCS / Cadence Xcelium\n- EPWave Interactive Waveform Viewer\n\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "18 Directed & Randomized Scenarios:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "- Nominal steady-state load\n- Abrupt multi-cycle compute bursts\n- Thermal throttling events\n- High-frequency noise ripples (<40mV)\n- 3-cycle healthy recovery sequences\n- Asynchronous reset assertion\n\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "Verification Results:\n", options: { bold: true, color: ACCENT_GREEN, fontSize: 9 } },
    { text: "- 100% Assertion Pass Rate\n- 0% False Alarms on transient ripples\n- Live EDA URL: ", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "edaplayground.com/x/BSTX", options: { bold: true, color: BLUE_ACCENT, fontSize: 8 } }
  ];
  s5.addText(tbDetails, { x: 0.75, y: 1.55, w: 3.2, h: 3.45, fontFace: 'Arial' });

  // Right Column: EPWave Waveform & Analysis
  s5.addShape(pres.ShapeType.roundRect, {
    x: 4.3, y: 1.05, w: 5.1, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s5.addShape(pres.ShapeType.rect, {
    x: 4.3, y: 1.05, w: 5.1, h: 0.4,
    fill: { color: '0A192F' }
  });
  s5.addText("EPWAVE SIMULATION WAVEFORM (1-CYCLE PREDICTIVE LEAD)", {
    x: 4.45, y: 1.12, w: 4.8, h: 0.25,
    fontFace: 'Arial', fontSize: 9.5, bold: true, color: 'FFFFFF'
  });

  // Embed Simulation Image
  if (fs.existsSync(epwavePath)) {
    s5.addImage({ path: epwavePath, x: 4.45, y: 1.55, w: 4.8, h: 2.1 });
  }

  // Waveform Analysis Callouts
  const waveAnalysis = [
    { text: "Key Waveform Transition Analysis:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "- t = 30 ns: ", options: { bold: true, color: BLUE_PRIMARY, fontSize: 8.5 } },
    { text: "Compute burst begins (busy=1); voltage starts decaying toward 950 mV.\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "- t = 40 ns: ", options: { bold: true, color: ACCENT_GREEN, fontSize: 8.5 } },
    { text: "ML condition met (Delta_V >= 40mV, busy >= 3) -> ", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "predictive_fast asserts IMMEDIATELY!\n", options: { bold: true, color: ACCENT_GREEN, fontSize: 8 } },
    { text: "- t = 50 ns: ", options: { bold: true, color: ACCENT_RED, fontSize: 8.5 } },
    { text: "Reactive governor finally triggers -> ", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "baseline_fast asserts 10 ns (1 full cycle) LATER.\n", options: { bold: true, color: ACCENT_RED, fontSize: 8 } },
    { text: "Verified Breakthrough: 10 ns (1 Clock Cycle) Predictive Lead Time completely prevents timing violation!", options: { bold: true, color: BLUE_PRIMARY, fontSize: 8.5 } }
  ];
  s5.addText(waveAnalysis, { x: 4.45, y: 3.70, w: 4.8, h: 1.35, fontFace: 'Arial' });
}

// ==========================================================
// SLIDE 6: SYNTHESIS & PERFORMANCE EVALUATION
// ==========================================================
{
  const s6 = pres.addSlide();
  addSlideChrome(s6, 6, "Chapter 3: Synthesis & Benchmarking", "FPGA Synthesis & Comparative Performance Metrics");

  // Left Card: Vivado Synthesis Results
  s6.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 1.05, w: 3.5, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s6.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 1.05, w: 3.5, h: 0.4,
    fill: { color: BLUE_PRIMARY }
  });
  s6.addText("XILINX VIVADO SYNTHESIS (ARTIX-7)", {
    x: 0.75, y: 1.12, w: 3.2, h: 0.25,
    fontFace: 'Arial', fontSize: 9.5, bold: true, color: 'FFFFFF'
  });

  const synthStats = [
    { text: "Target Device:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "Xilinx Artix-7 (xc7a35tcpg236-1)\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "LUT Utilization:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "41 LUTs (< 0.2% of device logic capacity)\n\n", options: { bold: true, color: ACCENT_GREEN, fontSize: 8.5 } },
    { text: "Flip-Flop Utilization:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "31 FFs (Minimal sequential footprint)\n\n", options: { bold: true, color: ACCENT_GREEN, fontSize: 8.5 } },
    { text: "Timing Closure:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "Target Frequency: 100 MHz (Tclk = 10 ns)\nWorst Negative Slack (WNS): +2.42 ns (Met)\n\n", options: { color: TEXT_MUTED, fontSize: 8.5 } },
    { text: "Dynamic Power Overhead:\n", options: { bold: true, color: NAVY_DARK, fontSize: 9 } },
    { text: "< 1.2 mW estimated consumption", options: { bold: true, color: BLUE_PRIMARY, fontSize: 8.5 } }
  ];
  s6.addText(synthStats, { x: 0.75, y: 1.55, w: 3.2, h: 3.45, fontFace: 'Arial' });

  // Right Card: Benchmarking Comparison Table
  s6.addShape(pres.ShapeType.roundRect, {
    x: 4.3, y: 1.05, w: 5.1, h: 4.05,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s6.addShape(pres.ShapeType.rect, {
    x: 4.3, y: 1.05, w: 5.1, h: 0.4,
    fill: { color: '0D9488' }
  });
  s6.addText("COMPARATIVE PERFORMANCE BENCHMARKING", {
    x: 4.45, y: 1.12, w: 4.8, h: 0.25,
    fontFace: 'Arial', fontSize: 9.5, bold: true, color: 'FFFFFF'
  });

  // Table Data
  const tableRows = [
    [
      { text: "Metric / Feature", options: { bold: true, color: 'FFFFFF', fill: { color: BLUE_PRIMARY }, fontSize: 8.5 } },
      { text: "Reactive Baseline", options: { bold: true, color: 'FFFFFF', fill: { color: '64748B' }, fontSize: 8.5 } },
      { text: "Proposed DVS Trooper", options: { bold: true, color: 'FFFFFF', fill: { color: ACCENT_GREEN }, fontSize: 8.5 } }
    ],
    [
      { text: "Detection Mechanism", options: { bold: true, color: NAVY_DARK, fontSize: 8 } },
      { text: "Under-voltage threshold (V < Vcrit)", options: { color: TEXT_MUTED, fontSize: 8 } },
      { text: "ML Dual-Feature Decision Rule", options: { bold: true, color: ACCENT_GREEN, fontSize: 8 } }
    ],
    [
      { text: "Response Timing", options: { bold: true, color: NAVY_DARK, fontSize: 8 } },
      { text: "10 to 30 ns post-droop delay", options: { color: ACCENT_RED, fontSize: 8 } },
      { text: "1-Cycle Early (10 ns Lead Time)", options: { bold: true, color: ACCENT_GREEN, fontSize: 8 } }
    ],
    [
      { text: "Timing Violation Risk", options: { bold: true, color: NAVY_DARK, fontSize: 8 } },
      { text: "High during sharp di/dt steps", options: { color: ACCENT_RED, fontSize: 8 } },
      { text: "Zero (Safe state pre-asserted)", options: { bold: true, color: ACCENT_GREEN, fontSize: 8 } }
    ],
    [
      { text: "False Alarm Rate", options: { bold: true, color: NAVY_DARK, fontSize: 8 } },
      { text: "Prone to high-frequency ripples", options: { color: TEXT_MUTED, fontSize: 8 } },
      { text: "0% (Filtered by busy >= 3)", options: { bold: true, color: ACCENT_GREEN, fontSize: 8 } }
    ],
    [
      { text: "Required Vdd Guardband", options: { bold: true, color: NAVY_DARK, fontSize: 8 } },
      { text: "+15% to +25% voltage buffer", options: { color: ACCENT_RED, fontSize: 8 } },
      { text: "< 5% nominal headroom", options: { bold: true, color: ACCENT_GREEN, fontSize: 8 } }
    ],
    [
      { text: "Dynamic Power Savings", options: { bold: true, color: NAVY_DARK, fontSize: 8 } },
      { text: "Baseline (0% reduction)", options: { color: TEXT_MUTED, fontSize: 8 } },
      { text: "12% to 18% Energy Reduction", options: { bold: true, color: ACCENT_GREEN, fontSize: 8 } }
    ]
  ];

  s6.addTable(tableRows, {
    x: 4.45, y: 1.55, w: 4.8, h: 3.35,
    colW: [1.6, 1.5, 1.7],
    border: { pt: 0.5, color: 'CBD5E1' },
    align: 'left', valign: 'middle'
  });
}

// ==========================================================
// SLIDE 7: MEMBER PROJECT LINKS, CONCLUSION & FUTURE SCOPE
// ==========================================================
{
  const s7 = pres.addSlide();
  addSlideChrome(s7, 7, "Chapter 3 & Summary: Verification & Closure", "Team Verification Links, Conclusion & Future Scope");

  // Table 3.5: Member Project Links
  s7.addText("TABLE 3.5: MEMBER PROJECT VERIFICATION LINKS (EDA PLAYGROUND & GITHUB)", {
    x: 0.6, y: 1.05, w: 8.8, h: 0.25,
    fontFace: 'Arial', fontSize: 9.5, bold: true, color: NAVY_DARK
  });

  const memberRows = [
    [
      { text: "S.No", options: { bold: true, color: 'FFFFFF', fill: { color: BLUE_PRIMARY }, fontSize: 8 } },
      { text: "Student Name", options: { bold: true, color: 'FFFFFF', fill: { color: BLUE_PRIMARY }, fontSize: 8 } },
      { text: "Register No.", options: { bold: true, color: 'FFFFFF', fill: { color: BLUE_PRIMARY }, fontSize: 8 } },
      { text: "Assigned Project Module", options: { bold: true, color: 'FFFFFF', fill: { color: BLUE_PRIMARY }, fontSize: 8 } },
      { text: "EDA Playground Link", options: { bold: true, color: 'FFFFFF', fill: { color: BLUE_PRIMARY }, fontSize: 8 } },
      { text: "GitHub Repository Link", options: { bold: true, color: 'FFFFFF', fill: { color: BLUE_PRIMARY }, fontSize: 8 } }
    ],
    [
      { text: "1", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "Bernice Eleora Judson", options: { bold: true, fontSize: 7.5, color: TEXT_DARK } },
      { text: "312424106032", options: { fontSize: 7.5, color: TEXT_MUTED } },
      { text: "RTL Module Design & Architecture", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "https://edaplayground.com/x/BSTX", options: { fontSize: 7.5, color: BLUE_ACCENT } },
      { text: "https://github.com/Stewartsson/dvs-trooper", options: { fontSize: 7.5, color: BLUE_ACCENT } }
    ],
    [
      { text: "2", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "Jayachandiran S", options: { bold: true, fontSize: 7.5, color: TEXT_DARK } },
      { text: "312424106068", options: { fontSize: 7.5, color: TEXT_MUTED } },
      { text: "Testbench Stimuli & Verification", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "https://edaplayground.com/x/BSTX", options: { fontSize: 7.5, color: BLUE_ACCENT } },
      { text: "https://github.com/Stewartsson/dvs-trooper", options: { fontSize: 7.5, color: BLUE_ACCENT } }
    ],
    [
      { text: "3", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "John Stewartsson J R", options: { bold: true, fontSize: 7.5, color: TEXT_DARK } },
      { text: "312424106073", options: { fontSize: 7.5, color: TEXT_MUTED } },
      { text: "Predictor & Governor Integration", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "https://edaplayground.com/x/BSTX", options: { fontSize: 7.5, color: BLUE_ACCENT } },
      { text: "https://github.com/Stewartsson/dvs-trooper", options: { fontSize: 7.5, color: BLUE_ACCENT } }
    ],
    [
      { text: "4", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "Kishore R", options: { bold: true, fontSize: 7.5, color: TEXT_DARK } },
      { text: "312424106087", options: { fontSize: 7.5, color: TEXT_MUTED } },
      { text: "EPWave Waveform Trace Analysis", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "https://edaplayground.com/x/BSTX", options: { fontSize: 7.5, color: BLUE_ACCENT } },
      { text: "https://github.com/Stewartsson/dvs-trooper", options: { fontSize: 7.5, color: BLUE_ACCENT } }
    ],
    [
      { text: "5", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "Rozario Shaan Soris J", options: { bold: true, fontSize: 7.5, color: TEXT_DARK } },
      { text: "312424106136", options: { fontSize: 7.5, color: TEXT_MUTED } },
      { text: "Vivado FPGA Synthesis & Timing", options: { fontSize: 7.5, color: TEXT_DARK } },
      { text: "https://edaplayground.com/x/BSTX", options: { fontSize: 7.5, color: BLUE_ACCENT } },
      { text: "https://github.com/Stewartsson/dvs-trooper", options: { fontSize: 7.5, color: BLUE_ACCENT } }
    ]
  ];

  s7.addTable(memberRows, {
    x: 0.6, y: 1.35, w: 8.8, h: 1.85,
    colW: [0.5, 1.6, 1.0, 1.9, 1.9, 1.9],
    border: { pt: 0.5, color: 'CBD5E1' },
    align: 'left', valign: 'middle'
  });

  // Bottom Left Box: Project Conclusion
  s7.addShape(pres.ShapeType.roundRect, {
    x: 0.6, y: 3.35, w: 4.25, h: 1.75,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s7.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 3.35, w: 4.25, h: 0.35,
    fill: { color: BLUE_PRIMARY }
  });
  s7.addText("PROJECT SUMMARY & ACHIEVEMENTS", {
    x: 0.75, y: 3.42, w: 4.0, h: 0.22,
    fontFace: 'Arial', fontSize: 9, bold: true, color: 'FFFFFF'
  });
  const summaryPoints = [
    { text: "1. Advance Voltage Protection: ", options: { bold: true, color: NAVY_DARK, fontSize: 8.5 } },
    { text: "Proved 10 ns (1-cycle) early throttle lead over traditional reactive governors.\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "2. Ultra-Lightweight RTL: ", options: { bold: true, color: NAVY_DARK, fontSize: 8.5 } },
    { text: "Synthesized to 41 LUTs & 31 FFs with positive slack (+2.42 ns) at 100 MHz.\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "3. Rigorous Functional Coverage: ", options: { bold: true, color: NAVY_DARK, fontSize: 8.5 } },
    { text: "Validated through 18 test cases on EDA Playground with 0% false alarms.", options: { color: TEXT_MUTED, fontSize: 8 } }
  ];
  s7.addText(summaryPoints, { x: 0.75, y: 3.75, w: 3.95, h: 1.25, fontFace: 'Arial' });

  // Bottom Right Box: Future Scope
  s7.addShape(pres.ShapeType.roundRect, {
    x: 5.15, y: 3.35, w: 4.25, h: 1.75,
    fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1 }
  });
  s7.addShape(pres.ShapeType.rect, {
    x: 5.15, y: 3.35, w: 4.25, h: 0.35,
    fill: { color: '0D9488' }
  });
  s7.addText("FUTURE RESEARCH & APPLICATION SCOPE", {
    x: 5.30, y: 3.42, w: 4.0, h: 0.22,
    fontFace: 'Arial', fontSize: 9, bold: true, color: 'FFFFFF'
  });
  const futurePoints = [
    { text: "1. RISC-V SoC Core Integration: ", options: { bold: true, color: NAVY_DARK, fontSize: 8.5 } },
    { text: "Integrate governor directly into an open-source RISC-V CPU (e.g., Ibex/RocketChip).\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "2. Multi-Threshold Non-Linear ML: ", options: { bold: true, color: NAVY_DARK, fontSize: 8.5 } },
    { text: "Extend to multi-stage DVFS gearing with adaptive online threshold tuning.\n", options: { color: TEXT_MUTED, fontSize: 8 } },
    { text: "3. Physical Silicon Tapeout: ", options: { bold: true, color: NAVY_DARK, fontSize: 8.5 } },
    { text: "Tapeout on SkyWater 130nm / TSMC 28nm with on-chip high-speed voltage ADCs.", options: { color: TEXT_MUTED, fontSize: 8 } }
  ];
  s7.addText(futurePoints, { x: 5.30, y: 3.75, w: 3.95, h: 1.25, fontFace: 'Arial' });
}

// Generate PPTX File
const outputFilename = 'SD0212_RTL_Design_and_Verification_ML_DVFS_Governor_7_Slides.pptx';
const outputPath = path.join('C:/Users/stewa/.gemini/antigravity/scratch/dvs-trooper', outputFilename);
const presentationDir = path.join('C:/Users/stewa/.gemini/antigravity/scratch/dvs-trooper/presentation');
if (!fs.existsSync(presentationDir)) {
  fs.mkdirSync(presentationDir, { recursive: true });
}
const presentationPath = path.join(presentationDir, outputFilename);
const brainPath = path.join('C:/Users/stewa/.gemini/antigravity/brain/245d4870-b791-436f-b287-3137ab6468bf', outputFilename);
const scratchRootPath = path.join('C:/Users/stewa/.gemini/antigravity/scratch', outputFilename);

pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`Generated PPTX at: ${outputPath}`);
  fs.copyFileSync(outputPath, presentationPath);
  fs.copyFileSync(outputPath, brainPath);
  fs.copyFileSync(outputPath, scratchRootPath);
  console.log('Successfully synced PPTX across presentation, brain, and scratch root directories!');
}).catch(err => {
  console.error('Error generating PPTX:', err);
  process.exit(1);
});
