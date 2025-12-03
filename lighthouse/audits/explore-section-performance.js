/**
 * @fileoverview Lighthouse custom audit for ExploreSection WebGIS performance
 * This audit measures the performance of map data loading and marker rendering
 * 
 * Usage:
 * 1. Add this file to your Lighthouse custom audits folder
 * 2. Run Lighthouse with custom config that includes this audit
 * 3. The audit will check User Timing API marks and measures
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Audit = require('lighthouse').Audit;

class ExploreSectionPerformanceAudit extends Audit {
  static get meta() {
    return {
      id: 'explore-section-performance',
      title: 'ExploreSection WebGIS Performance',
      failureTitle: 'ExploreSection WebGIS is slow',
      description: 'Measures the performance of map data loading and marker rendering using User Timing API',
      requiredArtifacts: ['traces', 'devtoolsLogs'],
    };
  }

  static async audit(artifacts) {
    const trace = artifacts.traces[Audit.DEFAULT_PASS];

    // Get User Timing marks and measures
    const processedTrace = await artifacts.requestTraceOfTab(trace);
    const traceEvents = processedTrace.processEvents;

    // Find our custom performance marks
    const exploreMarks = traceEvents.filter(event => 
      event.name && event.name.startsWith('explore-')
    );

    // Extract timing data
    let dataLoadingDuration = null;
    let markersRenderingDuration = null;

    const dataLoadStart = exploreMarks.find(e => e.name === 'explore-data-load-start');
    const dataLoadEnd = exploreMarks.find(e => e.name === 'explore-data-load-end');
    const markersRenderStart = exploreMarks.find(e => e.name === 'explore-markers-render-start');
    const markersRenderEnd = exploreMarks.find(e => e.name === 'explore-markers-render-end');

    if (dataLoadStart && dataLoadEnd) {
      dataLoadingDuration = (dataLoadEnd.ts - dataLoadStart.ts) / 1000; // Convert to ms
    }

    if (markersRenderStart && markersRenderEnd) {
      markersRenderingDuration = (markersRenderEnd.ts - markersRenderStart.ts) / 1000; // Convert to ms
    }

    // Calculate score based on performance
    let score = 1;
    let displayValue = '';
    const details = {
      type: 'table',
      headings: [
        { key: 'metric', itemType: 'text', text: 'Metric' },
        { key: 'value', itemType: 'ms', text: 'Time (ms)' },
        { key: 'status', itemType: 'text', text: 'Status' },
      ],
      items: [],
    };

    // Evaluate data loading performance
    if (dataLoadingDuration !== null) {
      let dataLoadStatus = '✅ Good';
      if (dataLoadingDuration > 1000) {
        score -= 0.3;
        dataLoadStatus = '⚠️ Needs Improvement';
      }
      if (dataLoadingDuration > 2000) {
        score -= 0.2;
        dataLoadStatus = '❌ Poor';
      }
      
      details.items.push({
        metric: 'Data Loading',
        value: dataLoadingDuration.toFixed(2),
        status: dataLoadStatus,
      });
    }

    // Evaluate markers rendering performance
    if (markersRenderingDuration !== null) {
      let renderStatus = '✅ Good';
      if (markersRenderingDuration > 100) {
        score -= 0.3;
        renderStatus = '⚠️ Needs Improvement';
      }
      if (markersRenderingDuration > 300) {
        score -= 0.2;
        renderStatus = '❌ Poor';
      }
      
      details.items.push({
        metric: 'Markers Rendering',
        value: markersRenderingDuration.toFixed(2),
        status: renderStatus,
      });
    }

    // Create display value
    if (dataLoadingDuration && markersRenderingDuration) {
      const total = dataLoadingDuration + markersRenderingDuration;
      displayValue = `Total: ${total.toFixed(2)}ms (Data: ${dataLoadingDuration.toFixed(2)}ms, Render: ${markersRenderingDuration.toFixed(2)}ms)`;
    } else {
      displayValue = 'Performance metrics not available';
      score = 0;
    }

    // Ensure score is between 0 and 1
    score = Math.max(0, Math.min(1, score));

    return {
      score,
      displayValue,
      details,
    };
  }
}

module.exports = ExploreSectionPerformanceAudit;
