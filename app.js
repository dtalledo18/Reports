// ─────────────────────────────────────────────────────────────
//  APP.JS — Marketing Weekly Report
//  Handles: week selector, reactive inputs, chart, summaries
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    let chart = null;
    let currentWeekIdx = 0;

    // ── DOM refs ─────────────────────────────────────────────
    const weekSelect       = document.getElementById('weekSelect');
    const weekBadge        = document.getElementById('weekBadge');
    const summaryText      = document.getElementById('summaryText');
    const historicalLeads  = document.getElementById('historicalLeads');
    const historicalRange  = document.getElementById('historicalRange');
    const weeklyLeads      = document.getElementById('weeklyLeads');
    const weeklyRange      = document.getElementById('weeklyRange');
    const avgLeads         = document.getElementById('avgLeads');
    const contactsNeeded   = document.getElementById('contactsNeeded');
    const metaTableBody    = document.getElementById('metaTableBody');
    const daysHeader       = document.getElementById('daysHeader');

    // ── Helpers ──────────────────────────────────────────────

    function getHistoricalTotal() {
        return WEEKS_DATA.reduce((sum, w, idx) => {
            if (idx === currentWeekIdx) {
                return sum + getLiveLeadsFromDOM().reduce((s, v) => s + v, 0);
            }
            return sum + w.days.reduce((s, d) => s + (parseInt(d.leads) || 0), 0);
        }, 0);
    }

    function getHistoricalRange() {
        if (!WEEKS_DATA.length) return '';
        const firstPart = WEEKS_DATA[0].shortRange.split('–')[0].trim();
        const lastPart  = WEEKS_DATA[WEEKS_DATA.length - 1].shortRange.split('–')[1].trim();
        return firstPart + ' – ' + lastPart;
    }

    // ── Read live values from editable inputs ────────────────

    function getLiveLeadsFromDOM() {
        return Array.from(document.querySelectorAll('.day-leads-input'))
            .map(inp => parseInt(inp.value, 10) || 0);
    }

    // ── Recompute weekly summary from current DOM inputs ─────

    function recomputeWeeklySummary() {
        const values  = getLiveLeadsFromDOM();
        const total   = values.reduce((s, v) => s + v, 0);
        const avg     = values.length ? total / values.length : 0;

        weeklyLeads.textContent = total;
        historicalLeads.textContent = getHistoricalTotal();
        avgLeads.textContent = Number.isInteger(avg) ? avg : avg.toFixed(1);
    }

    // ── Update chart from DOM inputs ─────────────────────────

    function updateChart() {
        if (!chart) return;
        chart.data.datasets[0].data = getLiveLeadsFromDOM();
        chart.update();
    }

    // ── Build the days header with editable inputs ───────────

    function buildDaysHeader(days) {
        daysHeader.innerHTML = '';

        days.forEach((day, i) => {
            const col = document.createElement('div');
            col.className = 'day-column';

            const nameInp = document.createElement('input');
            nameInp.type        = 'text';
            nameInp.className   = 'day-name-input';
            nameInp.value       = day.name;
            nameInp.spellcheck  = false;
            nameInp.addEventListener('input', () => {
                if (chart) {
                    chart.data.labels[i] = nameInp.value.trim();
                    chart.update();
                }
            });

            const leadsInp = document.createElement('input');
            leadsInp.type      = 'number';
            leadsInp.className = 'day-leads-input';
            leadsInp.value     = day.leads;
            leadsInp.min       = 0;
            leadsInp.addEventListener('input', () => {
                recomputeWeeklySummary();
                updateChart();
            });

            col.appendChild(nameInp);
            col.appendChild(leadsInp);
            daysHeader.appendChild(col);
        });
    }

    // ── Build the Meta table with editable inputs ────────────

    function buildMetaTable(metaRows) {
        metaTableBody.innerHTML = '';

        metaRows.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'perf-row';

            const tdName = document.createElement('td');
            tdName.className = 'perf-name';

            const nameInp = document.createElement('input');
            nameInp.type      = 'text';
            nameInp.className = 'meta-field-input';
            nameInp.value     = row.name;
            nameInp.spellcheck = false;
            tdName.appendChild(nameInp);

            const tdVal = document.createElement('td');
            tdVal.className = 'perf-total';

            const valInp = document.createElement('input');
            valInp.type      = 'text';
            valInp.className = 'meta-field-input meta-value';
            valInp.value     = row.value;
            valInp.spellcheck = false;
            tdVal.appendChild(valInp);

            tr.appendChild(tdName);
            tr.appendChild(tdVal);
            metaTableBody.appendChild(tr);
        });
    }

    // ── Initialize/update chart ──────────────────────────────

    function initChart(days) {
        const ctx    = document.getElementById('leadsSplineChart').getContext('2d');
        const labels = days.map(d => d.name);
        const data   = days.map(d => d.leads);

        if (chart) {
            chart.data.labels             = labels;
            chart.data.datasets[0].data   = data;
            chart.update();
            return;
        }

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Leads per Day',
                    data,
                    borderColor: '#0070f3',
                    borderWidth: 4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#0070f3',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.43,
                    fill: true,
                    backgroundColor: (context) => {
                        const ch = context.chart;
                        const { ctx: c, chartArea } = ch;
                        if (!chartArea) return null;
                        const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        g.addColorStop(0, 'rgba(0, 112, 243, 0.35)');
                        g.addColorStop(1, 'rgba(0, 112, 243, 0.0)');
                        return g;
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                        ticks: { color: '#3b82f6', font: { weight: 'bold', size: 16 }, stepSize: 2 }
                    },
                    x: { display: false }
                }
            }
        });
    }

    // ── Load a week by index ─────────────────────────────────

    function loadWeek(idx) {
        currentWeekIdx = idx;
        const w = WEEKS_DATA[idx];
        if (!w) return;

        // Badge & summary
        weekBadge.textContent = w.range;
        summaryText.innerHTML =
            'This report is based on campaign performance from <strong>' + w.range + '</strong>. ' +
            'All figures and analysis correspond to this reporting period. ' +
            'The corresponding invoices are attached at the end of this document for reference.';

        // Ranges
        historicalRange.textContent = '(' + getHistoricalRange() + ')';
        weeklyRange.textContent     = '(' + w.shortRange + ')';

        // Contacts Needed
        contactsNeeded.value = w.contactsNeeded;

        // Build editable areas
        buildDaysHeader(w.days);
        buildMetaTable(w.meta);

        // Chart
        initChart(w.days);

        // Recompute summaries based on fresh DOM
        recomputeWeeklySummary();
    }

    // ── Build week selector ──────────────────────────────────

    function buildSelector() {
        weekSelect.innerHTML = '';
        WEEKS_DATA.forEach((w, i) => {
            const opt   = document.createElement('option');
            opt.value   = i;
            opt.textContent = w.label;
            weekSelect.appendChild(opt);
        });
        weekSelect.addEventListener('change', () => loadWeek(parseInt(weekSelect.value, 10)));
    }

    // ── Boot ─────────────────────────────────────────────────
    buildSelector();
    const lastIdx = WEEKS_DATA.length - 1;
    weekSelect.value = lastIdx;
    loadWeek(lastIdx);

});