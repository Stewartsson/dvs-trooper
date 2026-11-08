# RTL Design and Verification of ML-Based CPU DVFS Governor (DVS Trooper)

[![Course](https://img.shields.io/badge/Course-SD0212%20RTL%20Design%20%26%20Verification-blue.svg)](https://github.com/Stewartsson/dvs-trooper)
[![Institution](https://img.shields.io/badge/Institution-St.%20Joseph's%20Institute%20of%20Technology-red.svg)](https://stjosephstechnology.ac.in)
[![Simulation](https://img.shields.io/badge/EDA%20Playground-Verified%20Pass-brightgreen.svg)](https://www.edaplayground.com/)
[![FPGA Target](https://img.shields.io/badge/Vivado-100MHz%20Timing%20Closure-orange.svg)](https://www.xilinx.com)

---

## 📌 Project Overview
**DVS Trooper** is a Machine Learning-assisted Dynamic Voltage and Frequency Scaling (DVFS) CPU governor designed and verified in **SystemVerilog**. It addresses the latency limitations of traditional reactive DVFS governors by predicting imminent power supply voltage droops before hardware alarm thresholds are violated.

The design compares two distinct governors under identical workload, voltage samples, and fault profiles:
1. **Baseline Governor (Reactive)**: Throttles clock frequency from **FAST** (1) to **SLOW** (0) only after a physical droop or thermal alarm is asserted.
2. **Predictive Governor (ML-Assisted)**: Employs a trained digital predictor evaluating cycle-to-cycle voltage drops ($\Delta V \ge 40\text{ mV}$) and sustained active workload samples ($busy \ge 3$) to request SLOW **one clock cycle earlier** than the reactive baseline, actively preventing droop-induced timing faults.

---

## 👥 Student Team & Project Metadata
**Institution**: St. Joseph’s Institute of Technology (Autonomous), Chennai – 600 119  
**Department**: Electronics and Communication Engineering (ECE)  
**Course**: SD0212 RTL DESIGN AND VERIFICATION (EEC Project)  
**Batch**: 2024–2028 | **Academic Year**: 2026–2027  

### Team Members
| S.No | Student Name | Register Number | GitHub Profile |
|:---:|:---|:---:|:---|
| 1 | **Bernice Eleora Judson** | `312424106032` | [@bernice](https://github.com) |
| 2 | **Jayachandiran S** | `312424106068` | [@jayachandiran](https://github.com) |
| 3 | **John Stewartsson J R** | `312424106073` | [@Stewartsson](https://github.com/Stewartsson) |
| 4 | **Kishore R** | `312424106087` | [@kishore-r](https://github.com) |
| 5 | **Rozario Shaan Soris J** | `312424106136` | [@rozario-shaan](https://github.com) |

### Faculty Mentors
- **Supervisor**: Dr. R. Nirosha, M.E., Ph.D., Assistant Professor, ECE
- **Head of the Department**: Dr. P G V Ramesh, M.Tech., Ph.D., Professor & HOD, ECE
- **Principal**: Dr. R. Priscilla, M.E., Ph.D.

---

## 🏗️ Hardware Architecture & Gate-Level Design

### 1. Droop Predictor (`droop_predictor.sv`)
- **12-bit Voltage Subtractor**: Computes non-negative voltage delta: $drop = \max(V_{previous} - V_{sample}, 0)$.
- **8-bit Saturating Counter**: Tracks sustained active workload duration ($busy == 1$), saturating at 255.
- **Learned Threshold Comparators**:
  - Voltage drop threshold: $\Delta V \ge 40\text{ mV}$
  - Sustained workload threshold: $busy\_count \ge 3$
- **AND Decision Tree**: Asserts early warning signal `warn` on registered clock edge when conditions match.

### 2. DVFS Governor (`dvs_governor.sv`)
- **Fault Priority Logic**: Immediate asynchronous/synchronous override on `hot`, `droop`, or predictive `early_warn`.
- **Hysteresis Recovery Sequencer**: Requires 3 consecutive healthy cycles before restoring FAST clock speed, preventing limit-cycle oscillation.

### 3. Integrated Comparison Top (`dvs_compare.sv`)
- Synthesizes both the baseline governor (`early_warn = 0`) and the ML predictive governor (`early_warn = warn`) side-by-side on identical workload vectors.

---

## 💻 Simulation & Verification in EDA Playground

The project includes a self-checking SystemVerilog testbench (`tb_dvs.sv`) with automatic assertion verification and VCD waveform output for EPWave.

### Steps to Run:
1. Open **[EDA Playground](https://www.edaplayground.com/)**.
2. **Settings (Left Panel)**:
   - **Language**: `SystemVerilog/Verilog`
   - **Simulator**: `Icarus Verilog 12.0` (or `Synopsys VCS 2023.3` / `Aldec Riviera-PRO`)
   - **Top module**: `tb_dvs`
   - Check **"Open EPWave after run"**
3. **Source Files**:
   - Paste `droop_predictor.sv`, `dvs_governor.sv`, and `dvs_compare.sv` into **`design.sv`**.
   - Paste `tb_dvs.sv` into **`testbench.sv`**.
4. Click **Run**.
5. Console output will report:
   ```text
   ===============================================================
   STARTING SIMULATION: DVS TROOPER ML-ASSISTED DVFS GOVERNOR
   Course: SD0212 RTL DESIGN AND VERIFICATION
   ===============================================================
   [PASS] Time 26 ns (Check 1): v_mv=1000 mV, warn=0, base_fast=1, pred_fast=1
   ...
   ===============================================================
   SUCCESS: ALL 18 CHECKS PASSED PERFECTLY!
   DVS Trooper predictive governor correctly beat baseline by 1 cycle!
   ===============================================================
   ```

---

## ⚡ Synthesis & FPGA Implementation Results

Synthesized and placed & routed targeting AMD / Xilinx 7-Series FPGA architecture in Vivado:

| Metric | Baseline Governor | DVS Trooper (Predictive Top) | Device Available | Utilization |
|:---|:---:|:---:|:---:|:---:|
| **Slice LUTs** | 9 | **41** | 53,200 | 0.08% |
| **Slice Registers (FFs)** | 5 | **31** | 106,400 | 0.03% |
| **Occupied Slices** | 4 | **18** | 13,300 | 0.14% |
| **Target Clock Frequency** | 100 MHz | **100 MHz** | — | Timing Met |
| **Worst Negative Slack (WNS)** | — | **+5.327 ns** | — | Clean Setup |
| **Worst Hold Slack (WHS)** | — | **+0.167 ns** | — | Clean Hold |

---

## 📂 Repository File Tree
```
dvs-trooper/
├── .gitignore
├── README.md
├── droop_predictor.sv    # ML droop prediction logic
├── dvs_compare.sv        # Top-level comparison module
├── dvs_governor.sv       # DVFS governor with recovery state machine
├── tb_dvs.sv             # Self-checking verification testbench
└── report/
    └── SD0212_RTL_Design_and_Verification_ML_DVFS_Governor_Final.pdf  # 24-page Project Report
```

---

## 📜 Full Project Report
The official 24-page college project report prepared according to the Anna University / Autonomous St. Joseph’s Institute of Technology format is available in [`report/SD0212_RTL_Design_and_Verification_ML_DVFS_Governor_Final.pdf`](report/SD0212_RTL_Design_and_Verification_ML_DVFS_Governor_Final.pdf).
