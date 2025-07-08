// Heatmap API Test Examples
// Run these in your REST client (Postman, Thunder Client, etc.) or use curl

const BASE_URL = 'http://localhost:3000/api/reports';

// Test coordinates for Kuala Lumpur area
const testBounds = {
  neLat: 3.2500,  // Northeast latitude
  neLng: 101.7000, // Northeast longitude  
  swLat: 3.0000,   // Southwest latitude
  swLng: 101.5000  // Southwest longitude
};

// 1. Test Heatmap Data Endpoint
const testHeatmapData = async () => {
  const url = `${BASE_URL}/heatmap/data?neLat=${testBounds.neLat}&neLng=${testBounds.neLng}&swLat=${testBounds.swLat}&swLng=${testBounds.swLng}&gridSize=0.01`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Heatmap Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 2. Test Reports in Bounds Endpoint
const testReportsInBounds = async () => {
  const url = `${BASE_URL}/heatmap/bounds?neLat=${testBounds.neLat}&neLng=${testBounds.neLng}&swLat=${testBounds.swLat}&swLng=${testBounds.swLng}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Reports in Bounds:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 3. Test Heatmap Statistics Endpoint
const testHeatmapStats = async () => {
  const url = `${BASE_URL}/heatmap/stats?neLat=${testBounds.neLat}&neLng=${testBounds.neLng}&swLat=${testBounds.swLat}&swLng=${testBounds.swLng}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Heatmap Stats:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 4. Test Time-Based Heatmap Data
const testTimeBasedHeatmap = async (timeFilter = '7d') => {
  const url = `${BASE_URL}/heatmap/time-based?neLat=${testBounds.neLat}&neLng=${testBounds.neLng}&swLat=${testBounds.swLat}&swLng=${testBounds.swLng}&timeFilter=${timeFilter}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Time-based Heatmap (${timeFilter}):`, data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// CURL Commands for testing:

/*
1. Get Heatmap Data:
curl "http://localhost:3000/api/reports/heatmap/data?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000&gridSize=0.01"

2. Get Reports in Bounds:
curl "http://localhost:3000/api/reports/heatmap/bounds?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000"

3. Get Heatmap Statistics:
curl "http://localhost:3000/api/reports/heatmap/stats?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000"

4. Get Time-based Data (last 7 days):
curl "http://localhost:3000/api/reports/heatmap/time-based?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000&timeFilter=7d"
*/

// Sample Flutter Integration Code:

/*
// In your Flutter app, you can use these endpoints like this:

class HeatmapService {
  static const String baseUrl = 'http://your-backend-url.com/api/reports';
  
  static Future<List<HeatmapPoint>> getHeatmapData(LatLngBounds bounds) async {
    final url = '$baseUrl/heatmap/data?'
        'neLat=${bounds.northeast.latitude}&'
        'neLng=${bounds.northeast.longitude}&'
        'swLat=${bounds.southwest.latitude}&'
        'swLng=${bounds.southwest.longitude}&'
        'gridSize=0.01';
    
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return (data['data'] as List)
          .map((item) => HeatmapPoint(
                location: LatLng(item['latitude'], item['longitude']),
                weight: item['weight'].toDouble(),
              ))
          .toList();
    }
    throw Exception('Failed to load heatmap data');
  }
}
*/

module.exports = {
  testHeatmapData,
  testReportsInBounds, 
  testHeatmapStats,
  testTimeBasedHeatmap
};
