# Lighthouse Custom Audit - ExploreSection Performance

Direktori ini berisi custom audit untuk Lighthouse yang mengukur performa WebGIS di ExploreSection.

## 📊 Apa yang Diukur

Custom audit ini menggunakan **User Timing API** untuk mengukur:

1. **Data Loading Time** - Waktu yang dibutuhkan untuk:
   - Fetch data peta GeoJSON (`biduk_biduk.json`)
   - Fetch data destinasi dari API
   - Total waktu loading data

2. **Markers Rendering Time** - Waktu yang dibutuhkan untuk:
   - Render semua marker lokasi di peta
   - Projecting koordinat geografis ke koordinat layar
   - Rendering SVG markers

## 🔍 Performance Marks & Measures

### Marks (Titik Waktu)
- `explore-data-load-start` - Mulai loading data
- `explore-data-load-end` - Selesai loading data
- `explore-markers-render-start` - Mulai rendering markers
- `explore-markers-render-end` - Selesai rendering markers

### Measures (Durasi)
- `explore-data-loading` - Durasi total data loading
- `explore-markers-rendering` - Durasi total markers rendering

## 🚀 Cara Menggunakan

### 1. Install Dependencies

```bash
npm install -g lighthouse
# atau
yarn global add lighthouse
```

### 2. Run Lighthouse dengan Custom Audit

```bash
# Local development
lighthouse http://localhost:3000 --config-path=./lighthouse/lighthouse-config.js --view

# Production
lighthouse https://bidukbiduk.com --config-path=./lighthouse/lighthouse-config.js --view
```

### 3. Lihat Hasil di Browser Console

Buka browser DevTools Console untuk melihat performance metrics:

```javascript
// Get metrics programmatically
window.__EXPLORE_SECTION_METRICS__.getMetrics()

// Log formatted metrics
window.__EXPLORE_SECTION_METRICS__.log()

// Get all performance marks
window.__EXPLORE_SECTION_METRICS__.getMarks()

// Get all performance measures
window.__EXPLORE_SECTION_METRICS__.getMeasures()

// Clear all metrics
window.__EXPLORE_SECTION_METRICS__.clear()
```

## 📈 Performance Thresholds

### Data Loading
- ✅ **Good**: < 1000ms
- ⚠️ **Needs Improvement**: 1000-2000ms
- ❌ **Poor**: > 2000ms

### Markers Rendering
- ✅ **Good**: < 100ms
- ⚠️ **Needs Improvement**: 100-300ms
- ❌ **Poor**: > 300ms

## 🔧 Struktur File

```
lighthouse/
├── audits/
│   └── explore-section-performance.js   # Custom audit implementation
├── lighthouse-config.js                 # Lighthouse configuration
└── README.md                           # Documentation (this file)
```

## 📝 Example Output

```
📊 [ExploreSection Performance Metrics]
  ⏱️  Data Loading: 456.23ms
  🗺️  Markers Rendering: 78.45ms
  📍 Total Markers: 12
```

## 🛠️ Development

### Menambah Performance Mark Baru

Edit `/src/components/home/ExploreSection.tsx`:

```typescript
// Add mark
performance.mark('custom-mark-name');

// Add measure between two marks
performance.measure('custom-measure', 'start-mark', 'end-mark');
```

### Update Custom Audit

Edit `/lighthouse/audits/explore-section-performance.js` untuk menambah threshold atau metric baru.

## 🔗 Resources

- [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)
- [Lighthouse Custom Audits](https://github.com/GoogleChrome/lighthouse/blob/master/docs/custom-audits.md)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)

## 📊 Performance Utilities

File `/src/lib/performance.ts` menyediakan helper functions:

```typescript
import { 
  getExploreSectionMetrics,
  getPerformanceMarks,
  getPerformanceMeasures,
  clearExploreSectionMetrics,
  logExploreSectionMetrics 
} from '@/lib/performance';

// Get metrics object
const metrics = getExploreSectionMetrics();

// Log to console
logExploreSectionMetrics();

// Clear all metrics
clearExploreSectionMetrics();
```

## 🎯 Best Practices

1. **Clear metrics** setelah selesai mengukur untuk menghindari memory leak
2. **Use requestAnimationFrame** untuk mengukur setelah rendering selesai
3. **Log metrics** ke console untuk debugging
4. **Export ke window** agar bisa diakses dari Lighthouse
5. **Set meaningful mark names** yang descriptive

## 🐛 Troubleshooting

### Metrics tidak muncul di Lighthouse
- Pastikan website sudah fully loaded
- Check browser console untuk error
- Pastikan ExploreSection component sudah di-render

### Performance marks not found
- Clear browser cache dan reload
- Pastikan tidak ada error di console
- Check bahwa `performance.mark()` dipanggil

### Nilai metrics terlalu tinggi
- Optimize data fetching dengan caching
- Reduce jumlah markers yang di-render
- Use virtualization untuk banyak markers
- Optimize SVG rendering

---

Made with ❤️ for Biduk-Biduk Tourism Website
