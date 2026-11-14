# CrisisCache (OFFGRID): Ideathon Pitch Deck & Presentation Guide

> **Tagline:** *When Networks Collapse, Humans Connect.*  
> **Category:** Disaster Management / Public Safety / Decentralized Mesh Networks  
> **Target Audience:** Ideathon Judges, Disaster Response Agencies (NDRF, Red Cross), Municipal Corporations  

---

## 📌 Slide 1: Title & The Hook

* **Project Name:** **CrisisCache** *(Codename: OFFGRID)*
* **Subheading:** Zero-Infrastructure, Offline-First Peer-to-Peer Disaster Relief & Coordination Mesh
* **Presenter Hook:** *"Good morning respected judges. In recent years, catastrophic floods, landslides, and cyclones left tens of millions of people in total communication blackouts. When cell towers lose power and fiber backhauls snap, how do trapped survivors ask for help? That’s where CrisisCache comes in."*

---

## 📌 Slide 2: The Problem (The Blackout Dilemma)

When severe disasters strike (e.g., Wayanad landslides, Chennai floods, Turkey earthquake):
1. **Infrastructure Fragility:** Cell towers lose grid power or fiber backhauls snap within 30 minutes.
2. **The "Last-Mile Void":** First responders arrive outside the disaster perimeter, but have zero visibility into who is trapped where, medical priorities, or blocked routes.
3. **Misinformation & Panic:** Unverified rumors spread, diverting rescue boats and ambulances to false alarms while critical victims remain stranded.
4. **Current Alternative Failures:** Satellite phones are expensive ($1,000+ / unit), bulky, and not in the pocket of everyday citizens.

---

## 📌 Slide 3: The Solution — What is CrisisCache?

**CrisisCache** turns everyday smartphones into autonomous, decentralized radio nodes that form a self-healing **P2P Mesh Network** using built-in Bluetooth Low Energy (BLE) and Wi-Fi Direct:
* 📴 **100% Offline-First:** Zero reliance on Internet, SIM cards, cellular towers, or central servers.
* ⚡ **Opportunistic Store-and-Forward:** Phones exchange signed crisis events when passing near each other. Packets hop from phone to phone until they reach rescue perimeters.
* 🛡️ **Cryptographic Trust:** Every report is signed with hardware-backed keys (Android Keystore / Ed25519) to prevent spam, spoofing, and tampering.
* 🎯 **Algorithmic Truth:** Uses geographic proximity weighting and exponential time decay to mathematically calculate incident confidence without a central database.

---

## 📌 Slide 4: Real-World Disaster Scenario (How It Works)

```
[Trapped Citizen (No Tower)]
           │ (BLE Radio Hop 1 - P10 SOS)
           ▼
[Walking Volunteer (No Tower)]
           │ (BLE Radio Hop 2 - Store & Forward)
           ▼
[Medical Camp / Rescue Boat] ───► Rescuers receive exact coordinates + medical needs!
```

1. **Ravi** is trapped in a house with flood waters rising. His phone has **no SIM network**.
2. He opens **CrisisCache** and taps **TRIGGER SOS (Priority 10)**.
3. A volunteer on a rescue raft passes within 80 meters. Their phones silently hand off the encrypted distress packet over Bluetooth.
4. When that volunteer reaches the NDRF/Army relief camp, the packet automatically synchronizes onto the base station dashboard with zero internet.

---

## 📌 Slide 5: Technical Architecture & Core Innovation

CrisisCache is built with a strict **4-Tier Resilient Architecture**:

```
┌────────────────────────────────────────────────────────┐
│                   React Native UI                      │
│        Offline Map / SOS / Incident Ledger / Triage    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                 Application Services                   │
│      P2P Sync Engine • Priority Queue • Radio Bridge   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                Domain & Cryptography                   │
│  Ed25519 Signatures • Proximity Math • Time Decay      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    Local Storage                       │
│    Quick-SQLite Event-Sourced Ledger & Projections     │
└───────────────────────────┬────────────────────────────┘
```

### Packet Prioritization Matrix (QoS on Radio)
Not all data is equal during a crisis. Radio bandwidth is strictly governed:
* **Priority 10 (SOS / SOS_UPDATE):** Instant multi-hop flood.
* **Priority 9 (Triage):** Trapped individuals, critical medical needs.
* **Priority 8 (Incidents):** Active hazards (collapsed bridges, power lines).
* **Priority 6–7 (Shelters):** Camp capacity, food and clean water updates.
* **Priority 4–5 (Chat & Verification):** Community votes and text messages.
* **Priority 1–2 (Anti-Entropy Sync):** Background catalog reconciliation.

---

## 📌 Slide 6: The Mathematical Core (Algorithmic Truth)

Judges love algorithmic rigor. Show them how CrisisCache prevents fake news:

### 1. Proximity Weighting ($w_{dist}$)
Votes from people **standing near the disaster** carry significantly more trust than those far away:
$$w_{dist} = \begin{cases} 
1.0 & \text{if } d \le 500\text{ m} \\ 
0.75 & \text{if } 500\text{ m} < d \le 2\text{ km} \\ 
0.50 & \text{if } 2\text{ km} < d \le 5\text{ km} \\ 
0.10 & \text{if } d > 5\text{ km} 
\end{cases}$$
*(Calculated using pure spherical Haversine formula on client devices).*

### 2. Exponential Time Decay ($T(t)$)
A flood report from 3 hours ago may be resolved now. Information ages out deterministically:
$$T(t) = 2^{-\frac{\Delta t}{H}} \quad (\text{Half-life } H = 4\text{ hours})$$

### 3. Consensus Confidence Score ($C$)
$$C = \frac{\sum (\text{Sign} \times w_{dist} \times T(t))}{\sum (w_{dist} \times T(t))}$$
* If $C \ge 0.60$ with $\ge 3$ nearby nodes $\rightarrow$ **HIGH CONFIDENCE (Green Badge)**.
* If $C \le -0.25$ $\rightarrow$ **DISPUTED HAZARD (Red Badge)**.

---

## 📌 Slide 7: Market Potential & Target Users

| User Segment | Value Proposition |
| :--- | :--- |
| **NDRF / SDRF / Military** | Real-time ground truth map before sending reconnaissance teams. |
| **Municipal Disaster Authorities (DDMA)** | Zero infrastructure cost; piggybacks on civilian smartphones. |
| **Hiking / Trekking Expeditions** | Off-grid trail safety in mountain valleys without cellular coverage. |
| **NGOs & Red Cross** | Direct triage tracking and shelter bed availability. |

---

## 📌 Slide 8: Competitive Advantage

| Feature | Standard Apps (WhatsApp / Disaster Apps) | Satellite Messengers (Garmin) | CrisisCache (OFFGRID) |
| :--- | :---: | :---: | :---: |
| **Requires Internet / Cellular** | ❌ Yes (Fails in blackouts) | ❌ Needs clear sky line |  **No (100% Offline)** |
| **Cost to Citizen** | Free (Needs 4G/5G) | \$400 – \$1,200 + Subscription |  **Free ($0)** |
| **Hardware Required** | Existing Smartphone | Proprietary Device |  **Existing Smartphone** |
| **Consensus & Verification** | Manual / Vulnerable to rumors | N/A |  **Proximity Consensus Engine** |
| **Multi-Hop Relay** | ❌ No | ❌ Point-to-Point |  **Store-and-Forward Mesh** |

---

## 📌 Slide 9: Product Roadmap

* **Phase 1 (Current Prototype):** React Native P2P protocol, hardware-backed Ed25519 signatures, SQLite event ledger, dynamic confidence math.
* **Phase 2 (Hardware Bridge):** LoRa (Long Range 433/868 MHz) mesh dongle integration for 15 km long-distance inter-village links.
* **Phase 3 (Enterprise Command Console):** Web-based tactical emergency operations center (EOC) for disaster relief commanders.
* **Phase 4 (Offline AI Triage):** On-device quantized SLM (Small Language Model) to transcribe audio SOS and suggest first-aid steps offline.

---

## 📌 Slide 10: Live Demo Script (What to Say & Show)

Open **[http://localhost:3000/demo.html](http://localhost:3000/demo.html)** on your laptop screen and demonstrate these exact steps:

1. **Step 1: The Overview**
   * *"Here you see the CrisisCache offline node dashboard running directly on our machine without calling any external API."*
2. **Step 2: Trigger SOS (P10)**
   * Click **TRIGGER SOS**. Select `Critical Medical Assistance` and click Broadcast.
   * *"Look at the top banner: a Priority 10 emergency event is signed and flooded to all nearby nodes with high battery-priority transmission."*
3. **Step 3: Verification Engine in Action**
   * Go to **Hazards & Incidents**.
   * Click **+ Confirm** or **- Dispute** on an incident.
   * *"Notice how our consensus score and confidence badge automatically recalculate based on geographic distance and time decay."*
4. **Step 4: Offline Map & Shelters**
   * Switch to **Offline Map** and **Safe Shelters**.
   * *"Survivors can locate nearby camps, see live bed occupancy, and navigate even when GPS towers have failed."*

---

## 🎯 Winning Answers for Anticipated Judge Questions

### Q1: "Bluetooth range is only 50–100 meters. How does this cover an entire flood-affected city?"
> **Answer:** *"Great question. CrisisCache does not rely on continuous connections; it uses an **opportunistic store-and-forward delay-tolerant network (DTN)**. As volunteers, rescue boats, drones, and milk trucks move through the city, their phones silently exchange data packets. Tests on similar DTN models show that in typical urban disaster densities, messages propagate across 5–10 km in under 45 minutes without a single working cell tower."*

### Q2: "What if bad actors spam fake SOS or fake bridge collapses?"
> **Answer:** *"Three security layers prevent this: First, every node has a cryptographic identity generated inside the secure hardware enclave (Android Keystore). Second, our **Proximity Consensus Algorithm** discards votes from devices that aren't physically at the scene. Third, malicious flood attacks are mitigated by rate-limiting signatures per public key in our SQLite event ledger."*

### Q3: "Won't running Bluetooth and scanning drain survivor battery?"
> **Answer:** *"CrisisCache has an adaptive **Battery-Conscious Duty Cycling** mechanism. When battery drops below 30%, continuous BLE advertising drops to low-power duty cycles (scanning for 5 seconds every 2 minutes), preserving battery life for over 72 hours of survival mode."*
