/**
 * Performance utilities for User Timing API
 * Used for Lighthouse custom audits and performance monitoring
 */

// Extend Window interface for performance metrics
declare global {
  interface Window {
    __EXPLORE_SECTION_METRICS__?: {
      getMetrics?: () => PerformanceMetrics;
      getMarks?: () => PerformanceMark[];
      getMeasures?: () => PerformanceMeasure[];
      clear?: () => void;
      log?: () => void;
      totalMarkers?: number;
    };
  }
}

export interface PerformanceMetrics {
  dataLoading?: number;
  markersRendering?: number;
  totalMarkers?: number;
  timestamp: number;
}

/**
 * Get ExploreSection performance metrics
 * This function can be called from Lighthouse custom audits
 */
export function getExploreSectionMetrics(): PerformanceMetrics {
  const measures = performance.getEntriesByType('measure');
  
  const dataLoadMeasure = measures.find(m => m.name === 'explore-data-loading') as PerformanceMeasure | undefined;
  const markersRenderMeasure = measures.find(m => m.name === 'explore-markers-rendering') as PerformanceMeasure | undefined;
  
  return {
    dataLoading: dataLoadMeasure?.duration,
    markersRendering: markersRenderMeasure?.duration,
    timestamp: Date.now(),
  };
}

/**
 * Get all performance marks
 */
export function getPerformanceMarks(): PerformanceMark[] {
  return performance.getEntriesByType('mark') as PerformanceMark[];
}

/**
 * Get all performance measures
 */
export function getPerformanceMeasures(): PerformanceMeasure[] {
  return performance.getEntriesByType('measure') as PerformanceMeasure[];
}

/**
 * Clear all ExploreSection performance entries
 */
export function clearExploreSectionMetrics(): void {
  performance.clearMarks('explore-data-load-start');
  performance.clearMarks('explore-data-load-end');
  performance.clearMarks('explore-markers-render-start');
  performance.clearMarks('explore-markers-render-end');
  performance.clearMeasures('explore-data-loading');
  performance.clearMeasures('explore-markers-rendering');
}

/**
 * Export metrics to console in a formatted way
 */
export function logExploreSectionMetrics(): void {
  const metrics = getExploreSectionMetrics();
  
  console.group('📊 ExploreSection Performance Metrics');
  if (metrics.dataLoading) {
    console.log(`⏱️  Data Loading: ${metrics.dataLoading.toFixed(2)}ms`);
  }
  if (metrics.markersRendering) {
    console.log(`🗺️  Markers Rendering: ${metrics.markersRendering.toFixed(2)}ms`);
  }
  if (metrics.totalMarkers) {
    console.log(`📍 Total Markers: ${metrics.totalMarkers}`);
  }
  console.log(`🕐 Timestamp: ${new Date(metrics.timestamp).toISOString()}`);
  console.groupEnd();
}

/**
 * Make metrics available globally for Lighthouse
 */
if (typeof window !== 'undefined') {
  window.__EXPLORE_SECTION_METRICS__ = {
    getMetrics: getExploreSectionMetrics,
    getMarks: getPerformanceMarks,
    getMeasures: getPerformanceMeasures,
    clear: clearExploreSectionMetrics,
    log: logExploreSectionMetrics,
  };
}
