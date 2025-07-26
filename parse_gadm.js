const fs = require('fs');

// Baca file JSON (bukan geojson)
const rawData = fs.readFileSync('./src/data/gadm41_IDN_4.json');
const geoJSON = JSON.parse(rawData);

console.log('Total features di GADM:', geoJSON.features.length);

// Filter untuk Desa Biduk-Biduk berdasarkan GID_4
const filteredGeoJSON = {
  type: 'FeatureCollection',
  features: geoJSON.features.filter(item => item.properties.GID_4 === 'IDN.34.2.3.1_1'),
};

console.log('Features yang cocok dengan GID_4 IDN.34.2.3.1_1:', filteredGeoJSON.features.length);

// Jika tidak ada yang cocok, coba cari berdasarkan nama desa
if (filteredGeoJSON.features.length === 0) {
  console.log('Tidak ditemukan dengan GID_4, mencoba berdasarkan NAME_4...');
  
  // Cari semua variasi nama Biduk-Biduk
  const nameVariations = geoJSON.features.filter(item => {
    const name = item.properties.NAME_4?.toLowerCase() || '';
    return name.includes('biduk') || name.includes('bidukbiduk');
  });
  
  console.log('Variasi nama yang mengandung "biduk":', nameVariations.length);
  nameVariations.forEach((item, index) => {
    console.log(`${index + 1}. NAME_4: ${item.properties.NAME_4}, GID_4: ${item.properties.GID_4}`);
  });
  
  // Gunakan yang pertama jika ada
  if (nameVariations.length > 0) {
    filteredGeoJSON.features = nameVariations;
  }
}

// Tampilkan informasi dari feature yang ditemukan
if (filteredGeoJSON.features.length > 0) {
  console.log('Data ditemukan:');
  filteredGeoJSON.features.forEach((feature, index) => {
    console.log(`Feature ${index + 1}:`);
    console.log('  NAME_4:', feature.properties.NAME_4);
    console.log('  GID_4:', feature.properties.GID_4);
    console.log('  NAME_3:', feature.properties.NAME_3);
    console.log('  NAME_2:', feature.properties.NAME_2);
    console.log('  NAME_1:', feature.properties.NAME_1);
    console.log('  Geometry type:', feature.geometry.type);
  });
}

// Simpan hasil ke file baru
fs.writeFileSync('./src/data/biduk_biduk.geojson', JSON.stringify(filteredGeoJSON, null, 2));

console.log('GeoJSON untuk Biduk-Biduk telah disimpan ke src/data/biduk_biduk.geojson');
