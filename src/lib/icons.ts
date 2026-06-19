// Minimal stroke icons keyed by solution-type facet id. currentColor, 24x24 viewBox.
// Inline so the hub ships no icon dependency.
export const facetIcons: Record<string, string> = {
  // computer-vision — aperture
  cv: '<circle cx="12" cy="12" r="9"/><path d="M12 3v6M21 12h-6M12 21v-6M3 12h6M6 6l4 4M18 6l-4 4M18 18l-4-4M6 18l4-4"/>',
  // 3D-simulation/physics — orbiting particles
  sim: '<circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/>',
  // digital-twin/ontology — linked nodes
  twin: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.6 7.4l3 8.2M16.6 8.6l-3.4 7M8 6.4h7.6"/>',
  // optimization/OR — merging flows
  opt: '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="12" r="2.2"/><path d="M8 7.2c2 1.4 5 2.6 8 3.6M8 16.8c2-1.4 5-2.6 8-3.6"/>',
  // condition-monitoring/time-series — waveform
  cm: '<path d="M2 12h3l2-7 3 14 3-11 2 6 2-2h5"/>',
  // geospatial/remote-sensing — map / layers
  geo: '<polygon points="9 4 3 6 3 20 9 18 15 20 21 18 21 4 15 6 9 4"/><path d="M9 4v14M15 6v14"/>',
  // forecasting/econometrics — trend
  fc: '<path d="M3 17l6-6 4 4 7-8"/><path d="M21 7v5h-5"/>',
  // 3D-viz/mine-design — block / box
  viz: '<path d="M12 2.5l8.5 4.9v9.2L12 21.5 3.5 16.6V7.4L12 2.5z"/><path d="M12 12l8.5-4.6M12 12v9.5M12 12L3.5 7.4"/>',
};
