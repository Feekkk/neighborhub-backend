# Heatmap API Documentation

This document describes the heatmap endpoints for visualizing emergency report data on Google Maps in your Flutter application.

## Base URL
```
/api/reports/heatmap
```

## Endpoints

### 1. Get Heatmap Data
**GET** `/heatmap/data`

Returns aggregated data for heatmap visualization with clustering/grid-based aggregation.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| neLat | float | Yes | Northeast latitude bound |
| neLng | float | Yes | Northeast longitude bound |
| swLat | float | Yes | Southwest latitude bound |
| swLng | float | Yes | Southwest longitude bound |
| gridSize | float | No | Grid cell size for clustering (default: 0.01) |

#### Example Request
```
GET /api/reports/heatmap/data?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000&gridSize=0.01
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "latitude": 3.15,
      "longitude": 101.68,
      "count": 5,
      "highPriority": 2,
      "mediumPriority": 2,
      "lowPriority": 1,
      "weight": 11
    }
  ],
  "bounds": {
    "northEast": { "lat": 3.25, "lng": 101.7 },
    "southWest": { "lat": 3.0, "lng": 101.5 }
  },
  "gridSize": 0.01,
  "timestamp": "2025-07-08T10:30:00.000Z"
}
```

### 2. Get Reports in Bounds
**GET** `/heatmap/bounds`

Returns individual report markers within the specified geographic bounds.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| neLat | float | Yes | Northeast latitude bound |
| neLng | float | Yes | Northeast longitude bound |
| swLat | float | Yes | Southwest latitude bound |
| swLng | float | Yes | Southwest longitude bound |

#### Example Request
```
GET /api/reports/heatmap/bounds?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-123",
      "latitude": 3.1516,
      "longitude": 101.6874,
      "priority": "HIGH",
      "createdAt": "2025-07-08T08:30:00.000Z",
      "title": "Emergency Report Title"
    }
  ],
  "count": 1,
  "bounds": {
    "northEast": { "lat": 3.25, "lng": 101.7 },
    "southWest": { "lat": 3.0, "lng": 101.5 }
  }
}
```

### 3. Get Heatmap Statistics
**GET** `/heatmap/stats`

Returns statistical information about reports in the specified area.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| neLat | float | Yes | Northeast latitude bound |
| neLng | float | Yes | Northeast longitude bound |
| swLat | float | Yes | Southwest latitude bound |
| swLng | float | Yes | Southwest longitude bound |

#### Example Request
```
GET /api/reports/heatmap/stats?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000
```

#### Response
```json
{
  "success": true,
  "stats": {
    "totalReports": 25,
    "priorityBreakdown": {
      "high": 8,
      "medium": 12,
      "low": 5
    },
    "recentActivity": {
      "last24Hours": 3,
      "last7Days": 10,
      "last30Days": 20
    }
  },
  "bounds": {
    "northEast": { "lat": 3.25, "lng": 101.7 },
    "southWest": { "lat": 3.0, "lng": 101.5 }
  }
}
```

### 4. Get Time-Based Heatmap Data
**GET** `/heatmap/time-based`

Returns report data filtered by time periods.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| neLat | float | Yes | Northeast latitude bound |
| neLng | float | Yes | Northeast longitude bound |
| swLat | float | Yes | Southwest latitude bound |
| swLng | float | Yes | Southwest longitude bound |
| timeFilter | string | No | Time filter: "24h", "7d", "30d", "all" (default: "all") |

#### Example Request
```
GET /api/reports/heatmap/time-based?neLat=3.2500&neLng=101.7000&swLat=3.0000&swLng=101.5000&timeFilter=7d
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-123",
      "latitude": 3.1516,
      "longitude": 101.6874,
      "priority": "HIGH",
      "createdAt": "2025-07-08T08:30:00.000Z",
      "title": "Emergency Report Title"
    }
  ],
  "count": 1,
  "bounds": {
    "northEast": { "lat": 3.25, "lng": 101.7 },
    "southWest": { "lat": 3.0, "lng": 101.5 }
  },
  "timeFilter": "7d"
}
```

## Usage Guide for Flutter

### 1. Basic Heatmap Implementation

```dart
// Get bounds from your Google Map
LatLngBounds bounds = await mapController.getVisibleRegion();

// Build API URL
String url = '/api/reports/heatmap/data?'
    'neLat=${bounds.northeast.latitude}&'
    'neLng=${bounds.northeast.longitude}&'
    'swLat=${bounds.southwest.latitude}&'
    'swLng=${bounds.southwest.longitude}&'
    'gridSize=0.01';

// Make API call and use data for Google Maps heatmap
```

### 2. Weight Calculation

The `weight` field in heatmap data is calculated as:
- HIGH priority = 3 points
- MEDIUM priority = 2 points  
- LOW priority = 1 point

Use this weight for Google Maps heatmap intensity.

### 3. Dynamic Updates

Call the API when:
- Map bounds change significantly
- User selects different time filters
- Real-time updates are needed

### 4. Performance Tips

- Use appropriate `gridSize` values (0.001 for detailed, 0.01 for balanced, 0.1 for overview)
- Cache results for repeated requests with same bounds
- Implement debouncing for map movement events

## Error Responses

All endpoints return standardized error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `400` - Bad Request (missing required parameters)
- `500` - Internal Server Error

## Authentication

- Most heatmap endpoints are public for visualization
- Ensure your Flutter app handles authentication for any protected features
- Consider rate limiting for production use
