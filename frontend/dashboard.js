/**
 * ResilienceSim - Simulated Dashboard Logic for Environmental Intelligence
 * Handles real-time telemetry and state management for the premium UI.
 */
class ResilienceSim {
    constructor() {
        this.state = {
            hwi: 104.2,
            humidity: 12,
            windSpeed: 48.5,
            impact: 'L4',
            signals: [
                { id: 1, type: 'thermal', message: 'Thermal Spike Detected', sector: 'Sector 7G', time: '02 MINS AGO', active: true },
                { id: 2, type: 'pressure', message: 'Pressure Gradient Normalizing', sector: 'Coastal Line', time: '14 MINS AGO', active: false },
                { id: 3, type: 'particulate', message: 'Particulate Baseline Shift', sector: 'Urban Core', time: '28 MINS AGO', active: false }
            ]
        };
        this.init();
    }

    init() {
        console.log("RESQ.AI Intelligence Simulation Initialized");
        this.startTelemetry();
        this.setupNavigation();
    }

    // Simulate real-time metric fluctuations
    startTelemetry() {
        setInterval(() => {
            // Random walk for HWI
            this.state.hwi += (Math.random() - 0.5) * 0.2;
            const hwiEl = document.querySelector('[data-metric="hwi"]');
            if (hwiEl) {
                hwiEl.textContent = this.state.hwi.toFixed(1);
                // Add a small bounce effect on update
                hwiEl.style.transform = 'scale(1.05)';
                setTimeout(() => hwiEl.style.transform = 'scale(1)', 100);
            }

            // Random walk for Humidity
            this.state.humidity += (Math.random() - 0.5) * 0.5;
            this.state.humidity = Math.max(5, Math.min(95, this.state.humidity));
            const humEl = document.querySelector('[data-metric="humidity"]');
            if (humEl) humEl.textContent = Math.round(this.state.humidity);

            // Update Alert Banner based on HWI
            this.updateAlertBanner();
            // Pulse indicators based on severity
            this.updateAlertStatus();
        }, 2000);
    }

    updateAlertBanner() {
        const banner = document.querySelector('section.bg-error-container\\/20');
        const bannerText = banner?.querySelector('p');
        const hwiValue = this.state.hwi;

        if (banner && bannerText) {
            if (hwiValue > 105) {
                banner.classList.remove('hidden');
                bannerText.textContent = `CRITICAL: Thermal peak at ${hwiValue.toFixed(1)}°F in Sector 7G. Immediate action required.`;
            } else if (hwiValue > 103) {
                banner.classList.remove('hidden');
                bannerText.textContent = `WARNING: Elevated heat levels detected. Monitoring Sector 7G.`;
            } else {
                banner.classList.add('opacity-50'); // Just dim it if it's cooling down
            }
        }
    }

    updateAlertStatus() {
        const hwiValue = this.state.hwi;
        const alertStatus = document.querySelector('[data-status="hwi"]');
        if (alertStatus) {
            if (hwiValue > 105) {
                alertStatus.textContent = "CRITICAL";
                alertStatus.className = "text-[10px] text-error font-bold uppercase tracking-widest";
            } else if (hwiValue > 100) {
                alertStatus.textContent = "WARNING";
                alertStatus.className = "text-[10px] text-primary font-bold uppercase tracking-widest";
            } else {
                alertStatus.textContent = "NORMAL";
                alertStatus.className = "text-[10px] text-on-surface-variant font-bold uppercase tracking-widest";
            }
        }
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('nav a');
        const sections = {
            'nav-dash': ['main > section:nth-child(1)', 'main > section:nth-child(2)', 'main > section:nth-child(3)', 'main > section:nth-child(4)'],
            'nav-signals': ['main > section:nth-child(5)'],
            'nav-reports': ['main > section:nth-child(4)'], // Reuse metrics for now
            'nav-alerts': ['main > section:nth-child(1)'] // Reuse Banner/Response for now
        };

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const id = item.id;

                // Update navigation UI
                navItems.forEach(n => {
                    n.classList.remove('bg-primary', 'text-background', 'nav-active');
                    n.classList.add('text-on-surface-variant/60');
                });
                item.classList.remove('text-on-surface-variant/60');
                item.classList.add('bg-primary', 'text-background', 'nav-active');

                this.switchView(id, sections);
            });
        });
    }

    switchView(activeId, mapping) {
        // Simple fade out/in effect
        const main = document.querySelector('main');
        main.style.opacity = '0';
        main.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Hide all sections first
            document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));

            // Show only relevant ones
            const toShow = mapping[activeId] || mapping['nav-dash'];
            toShow.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) el.classList.remove('hidden');
            });

            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }, 300);
    }

    addSignal(message, sector, type = 'sensors') {
        const signalList = document.querySelector('[data-section="signals-list"]');
        if (!signalList) return;

        const time = 'JUST NOW';
        const newSignal = document.createElement('div');
        newSignal.className = "flex items-center gap-6 p-5 glass-card rounded-2xl mb-2 hover:bg-surface-container-high transition-all group opacity-0 translate-y-4";
        newSignal.innerHTML = `
            <div class="relative">
                <div class="w-3 h-3 rounded-full bg-primary animate-ping absolute inset-0"></div>
                <div class="w-3 h-3 rounded-full bg-primary relative"></div>
            </div>
            <div class="flex-1">
                <div class="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">${message}</div>
                <div class="text-[9px] text-on-surface-variant font-black uppercase mt-1 tracking-widest">${time} · ${sector}</div>
            </div>
            <span class="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">${type}</span>
        `;

        signalList.prepend(newSignal);

        // Trigger animation
        requestAnimationFrame(() => {
            newSignal.classList.replace('opacity-0', 'opacity-100');
            newSignal.classList.replace('translate-y-4', 'translate-y-0');
        });
    }

    // Protocol Flow Logic
    openProtocol() {
        const overlay = document.getElementById('wizard-overlay');
        const sheet = document.getElementById('wizard-sheet');
        overlay.classList.remove('pointer-events-none');
        overlay.classList.replace('opacity-0', 'opacity-100');
        sheet.classList.replace('translate-y-full', 'translate-y-0');
        this.currentStep = 1;
        this.renderStep1();
    }

    closeProtocol() {
        const overlay = document.getElementById('wizard-overlay');
        const sheet = document.getElementById('wizard-sheet');
        overlay.classList.add('pointer-events-none');
        overlay.classList.replace('opacity-100', 'opacity-0');
        sheet.classList.replace('translate-y-0', 'translate-y-full');
    }

    renderStep1() {
        const btn = document.getElementById('confirm-secure');
        const next = document.getElementById('next-protocol');
        if (btn && next) {
            btn.addEventListener('click', () => {
                btn.classList.toggle('confirmed');
                btn.classList.toggle('bg-primary/20');
                next.disabled = !btn.classList.contains('confirmed');
            }, { once: true });
        }
    }

    nextProtocolStep() {
        this.currentStep++;
        this.updateIndicators();
        if (this.currentStep === 2) this.renderStep2();
        if (this.currentStep === 3) this.renderStep3();
    }

    updateIndicators() {
        const dots = document.querySelectorAll('#step-indicators > div');
        dots.forEach((d, i) => {
            d.className = i < this.currentStep ? "h-1 w-8 rounded-full bg-primary" : "h-1 w-8 rounded-full bg-white/10";
        });
    }

    renderStep2() {
        const content = document.getElementById('wizard-content');
        content.innerHTML = `
            <div class="space-y-8 animate-in slide-in-from-right duration-500">
                <div>
                    <h2 class="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-2">SYSTEM ACTIVATION</h2>
                    <h1 class="text-3xl font-black text-on-surface tracking-tighter leading-tight">Activating Atmospheric Filtration</h1>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
                        <span>Filtration Matrix</span>
                        <span id="progress-val">0%</span>
                    </div>
                    <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div id="progress-bar" class="h-full bg-primary w-0 transition-all duration-300"></div>
                    </div>
                </div>

                <div class="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-high/40">
                    <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center animate-spin">
                        <span class="material-symbols-outlined text-primary text-sm">settings</span>
                    </div>
                    <p class="text-xs text-on-surface-variant font-medium">Calibrating particulate sensors and cycling intake valves...</p>
                </div>
            </div>
        `;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => this.nextProtocolStep(), 800);
            }
            document.getElementById('progress-bar').style.width = `${progress}%`;
            document.getElementById('progress-val').textContent = `${Math.round(progress)}%`;
        }, 400);
    }

    renderStep3() {
        const content = document.getElementById('wizard-content');
        content.innerHTML = `
            <div class="flex flex-col items-center justify-center text-center space-y-6 pt-8 animate-in zoom-in duration-500">
                <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center relative">
                    <div class="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
                    <span class="material-symbols-outlined text-primary text-5xl">check_circle</span>
                </div>
                <div>
                    <h1 class="text-3xl font-black text-on-surface tracking-tighter mb-2">Protocol Secured</h1>
                    <p class="text-sm text-on-surface-variant font-medium opacity-80 max-w-[240px] mx-auto">Filtration active. Interior pressure stable at L1 nominal levels.</p>
                </div>
                <button onclick="window.sim.closeProtocol()" class="w-full py-6 bg-primary text-background rounded-3xl font-black text-xs tracking-[0.2em] uppercase mt-8">
                    Return to Dashboard
                </button>
            </div>
        `;
    }

    // Search & Location Logic
    openSearch() {
        const overlay = document.getElementById('search-overlay');
        overlay.classList.remove('pointer-events-none');
        overlay.classList.replace('opacity-0', 'opacity-100');
    }

    closeSearch() {
        const overlay = document.getElementById('search-overlay');
        overlay.classList.add('pointer-events-none');
        overlay.classList.replace('opacity-100', 'opacity-0');
    }

    selectSector(name) {
        const locEl = document.querySelector('header .font-headline');
        if (locEl) locEl.textContent = name;
        this.closeSearch();
        this.addSignal(`Link established with ${name}`, 'Telemetry Sync', 'sync');
    }

    // Metric Detail Logic
    openMetric(title, analysis) {
        const overlay = document.getElementById('metric-overlay');
        const sheet = document.getElementById('metric-sheet');
        const titleEl = document.getElementById('metric-title-main');
        const analysisEl = document.getElementById('metric-ai-text');

        if (titleEl) titleEl.textContent = title;
        if (analysisEl) analysisEl.textContent = analysis;

        overlay.classList.remove('pointer-events-none');
        overlay.classList.replace('opacity-0', 'opacity-100');
        sheet.classList.replace('translate-y-full', 'translate-y-0');
    }

    closeMetric() {
        const overlay = document.getElementById('metric-overlay');
        const sheet = document.getElementById('metric-sheet');
        overlay.classList.add('pointer-events-none');
        overlay.classList.replace('opacity-100', 'opacity-0');
        sheet.classList.replace('translate-y-0', 'translate-y-full');
    }
}

// Start simulation on load
window.addEventListener('DOMContentLoaded', () => {
    window.sim = new ResilienceSim();

    // Initial random alert simulation after 5 seconds
    setTimeout(() => {
        window.sim.addSignal("Seismic Tremor Detected", "Sector 3B", "waves");
    }, 5000);
});
