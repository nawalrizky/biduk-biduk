/**
 * @fileoverview Lighthouse custom configuration for Biduk-Biduk website
 * Includes custom audit for ExploreSection WebGIS performance
 * 
 * Usage:
 * lighthouse https://bidukbiduk.com --config-path=./lighthouse/lighthouse-config.js --view
 */

module.exports = {
  extends: 'lighthouse:default',
  
  settings: {
    onlyAudits: [
      // Default performance audits
      'first-contentful-paint',
      'largest-contentful-paint',
      'speed-index',
      'total-blocking-time',
      'cumulative-layout-shift',
      'user-timings',
      
      // Custom audit
      'explore-section-performance',
    ],
  },

  audits: [
    // Add custom audit
    { path: './audits/explore-section-performance.js' },
  ],

  categories: {
    performance: {
      title: 'Performance',
      description: 'Metrics and audits for site performance',
      auditRefs: [
        { id: 'first-contentful-paint', weight: 10 },
        { id: 'largest-contentful-paint', weight: 25 },
        { id: 'speed-index', weight: 10 },
        { id: 'total-blocking-time', weight: 30 },
        { id: 'cumulative-layout-shift', weight: 15 },
        { id: 'user-timings', weight: 5 },
        
        // Custom audit with weight
        { id: 'explore-section-performance', weight: 5 },
      ],
    },
  },
};
