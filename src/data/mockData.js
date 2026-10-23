// ==========================================================================
// AUTOLUX LOOP — MOCK CATALOG & DOMAIN SEED DATA
// ==========================================================================

export const VEHICLE_TYPES = [
  { id: 'cars', name: 'Passenger Cars', icon: 'Car', count: '1,840+ Parts', desc: 'Sedans, hatchbacks, SUVs & luxury coupes' },
  { id: 'ev', name: 'Electric Vehicles', icon: 'Zap', count: '620+ Parts', desc: 'Battery packs, inverters, e-motors & BMS' },
  { id: 'motorcycles', name: 'Motorcycles & Scooters', icon: 'Bike', count: '480+ Parts', desc: 'Performance bikes, scooters & cruisers' },
  { id: 'trucks', name: 'Commercial Trucks', icon: 'Truck', count: '540+ Parts', desc: 'Heavy duty, trailers, haulers & tippers' },
  { id: 'buses', name: 'Transit & Fleet Buses', icon: 'Bus', count: '210+ Parts', desc: 'City buses, intercity coaches & vans' },
  { id: 'equipment', name: 'Heavy & Industrial', icon: 'Wrench', count: '190+ Parts', desc: 'Agricultural, forklifts & tractors' },
];

export const PART_CATEGORIES = [
  { id: 'powertrain', name: 'Powertrain & Engine', count: '840 items', image: '/parts/garrett-gtx3582r-turbo.jpg', popular: true },
  { id: 'braking', name: 'Braking Systems', count: '520 items', image: '/parts/brembo-gt-calipers.jpg', popular: true },
  { id: 'suspension', name: 'Suspension & Steering', count: '630 items', image: '/parts/ohlins-suspension.jpg', popular: true },
  { id: 'ev-battery', name: 'EV Battery & Motors', count: '310 items', image: '/parts/tata-ev-battery-pack.jpg', popular: true },
  { id: 'body', name: 'Body Panels & Exterior', count: '740 items', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80' },
  { id: 'wheels', name: 'Wheels & Tyres', count: '460 items', image: '/parts/bbs-forged-wheels.jpg', popular: true },
  { id: 'lighting', name: 'Matrix LED & Mirrors', count: '390 items', image: '/parts/porsche-matrix-headlight.jpg', popular: true },
  { id: 'interior', name: 'Cabin & Interior', count: '290 items', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-01',
    slug: 'brembo-6-piston-monobloc-calipers-gt',
    title: 'Brembo GT 6-Piston Monobloc Front Caliper Kit',
    category: 'braking',
    vehicleType: 'cars',
    partNumber: 'BRM-6P-992-01',
    oemCode: '992.351.423.B',
    price: 68500,
    originalPrice: 115000,
    condition: 'Certified Refurbished', // 'New OEM', 'Certified Refurbished', 'Tested Used'
    rating: 4.9,
    reviewsCount: 38,
    seller: {
      id: 'sel-101',
      name: 'Apex Precision Recyclers',
      rating: 4.95,
      verified: true,
      location: 'Pune / Mumbai Hub'
    },
    images: [
      '/parts/brembo-gt-calipers.jpg',
      '/parts/brembo-gt-calipers.jpg'
    ],
    compatibility: {
      verified: true,
      makes: ['Porsche', 'Audi', 'Volkswagen'],
      models: ['911 (992 / 991)', 'Taycan 4S', 'RS6 Avant', 'Golf R Mk8'],
      years: '2019 - 2025'
    },
    description: 'Precision dismantled from low-mileage test fleet. Ultrasonic cleaned, piston seals renewed with Viton high-temp compound, and pressure-tested up to 210 bar. Backed by 180-day Autolux mechanical assurance.',
    specs: [
      { label: 'Piston Count', value: '6 Titanium-Alloy Pistons' },
      { label: 'Rotor Compatibility', value: '380mm - 405mm Two-Piece' },
      { label: 'Fluid Spec', value: 'DOT 4 / DOT 5.1 Synthetic' },
      { label: 'Refurbish Standard', value: 'ISO 9001:2015 Recirculation' }
    ],
    inStock: true,
    stockCount: 3,
    featured: true,
    warranty: '180 Days Autolux Certified'
  },
  {
    id: 'prod-02',
    slug: 'tesla-model-3-y-rear-drive-unit-permanent-magnet',
    title: 'Tesla Performance Rear Drive Inverter & Hairpin Motor',
    category: 'ev-battery',
    vehicleType: 'ev',
    partNumber: 'TSL-DU-R-480',
    oemCode: '1120980-00-J',
    price: 185000,
    originalPrice: 320000,
    condition: 'Certified Refurbished',
    rating: 5.0,
    reviewsCount: 19,
    seller: {
      id: 'sel-102',
      name: 'VoltCycle High-Voltage Lab',
      rating: 4.98,
      verified: true,
      location: 'Bengaluru Tech Park'
    },
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=1200&q=80'
    ],
    compatibility: {
      verified: true,
      makes: ['Tesla'],
      models: ['Model 3 Performance', 'Model 3 Long Range', 'Model Y AWD'],
      years: '2020 - 2024'
    },
    description: 'Direct salvaged from an insurance write-off with intact chassis rails. Dyno-tested under continuous 350kW load cycles. Rotor bearings inspected via laser vibrometry. Firmware unlocked for plug-and-play installation.',
    specs: [
      { label: 'Peak Power Output', value: '340 kW (456 hp)' },
      { label: 'Inverter Architecture', value: 'Silicon Carbide (SiC) MOSFETs' },
      { label: 'Operating Voltage', value: '350V - 420V DC' },
      { label: 'Coolant Loop', value: 'Ethylene Glycol 50/50' }
    ],
    inStock: true,
    stockCount: 2,
    featured: true,
    warranty: '1 Year Powertrain Warranty'
  },
  {
    id: 'prod-03',
    slug: 'garrett-gtx3582r-dual-ball-bearing-turbocharger',
    title: 'Garrett Motion Gen II GTX3582R Ball-Bearing Turbo',
    category: 'powertrain',
    vehicleType: 'cars',
    partNumber: 'GRT-GTX35-G2',
    oemCode: '856801-5079S',
    price: 74000,
    originalPrice: 128000,
    condition: 'Tested Used',
    rating: 4.8,
    reviewsCount: 42,
    seller: {
      id: 'sel-103',
      name: 'TurboCraft Engineering',
      rating: 4.91,
      verified: true,
      location: 'Chennai Automotive Corridor'
    },
    images: [
      '/parts/garrett-gtx3582r-turbo.jpg',
      '/parts/garrett-gtx3582r-turbo.jpg'
    ],
    compatibility: {
      verified: true,
      makes: ['BMW', 'Toyota', 'Audi', 'Universal Custom'],
      models: ['B58 3.0L Turbo', '2JZ-GTE Custom', 'EA888 Gen 3/4', 'Supra MK5'],
      years: '2016 - 2025'
    },
    description: 'Fully inspected dual ceramic ball-bearing assembly. Zero shaft play on both axial and radial axes. Billet compressor wheel balanced to 140,000 RPM. Ready for fast spool application.',
    specs: [
      { label: 'Compressor Inducer', value: '66 mm' },
      { label: 'Turbine Wheel', value: '68 mm High Inconel' },
      { label: 'Cooling Method', value: 'Water and Oil Cooled' },
      { label: 'Flange Type', value: 'T3 / V-Band 0.82 A/R' }
    ],
    inStock: true,
    stockCount: 4,
    featured: true,
    warranty: '90 Days Guarantee'
  },
  {
    id: 'prod-04',
    slug: 'ohlins-road-track-adjustable-coilovers-m3-m4',
    title: 'Öhlins Road & Track Dual Flow Valve (DFV) Suspension',
    category: 'suspension',
    vehicleType: 'cars',
    partNumber: 'OHL-BMS-MI20',
    oemCode: 'BMS MI20S1',
    price: 135000,
    originalPrice: 220000,
    condition: 'Certified Refurbished',
    rating: 4.95,
    reviewsCount: 15,
    seller: {
      id: 'sel-101',
      name: 'Apex Precision Recyclers',
      rating: 4.95,
      verified: true,
      location: 'Pune / Mumbai Hub'
    },
    images: [
      '/parts/ohlins-suspension.jpg',
      '/parts/ohlins-suspension.jpg'
    ],
    compatibility: {
      verified: true,
      makes: ['BMW'],
      models: ['M3 (G80 / F80)', 'M4 (G82 / F82)', 'M2 Competition'],
      years: '2018 - 2024'
    },
    description: 'Gold-anodized inverted dampers rebuilt with Swedish factory Öhlins seals and fresh 1309 fluid. Monotube valving with 20-click simultaneous compression and rebound micro-tuning.',
    specs: [
      { label: 'Technology', value: 'DFV (Dual Flow Valve)' },
      { label: 'Height Adjustment', value: '-15mm to -40mm Lowering' },
      { label: 'Spring Rate Front', value: '90 N/mm' },
      { label: 'Spring Rate Rear', value: '160 N/mm' }
    ],
    inStock: true,
    stockCount: 1,
    featured: true,
    warranty: '180 Days Mechanical Warranty'
  },
  {
    id: 'prod-05',
    slug: 'porsche-matrix-led-headlight-assembly-rh',
    title: 'Porsche Taycan / 911 HD-Matrix LED Headlamp (Right)',
    category: 'lighting',
    vehicleType: 'cars',
    partNumber: 'POR-HD-LED-RH',
    oemCode: '9J1.941.036.AH',
    price: 92000,
    originalPrice: 175000,
    condition: 'New OEM',
    rating: 5.0,
    reviewsCount: 8,
    seller: {
      id: 'sel-104',
      name: 'Stuttgart Genuine Exchange',
      rating: 4.99,
      verified: true,
      location: 'New Delhi Aerocity'
    },
    images: [
      '/parts/porsche-matrix-headlight.jpg',
      '/parts/porsche-matrix-headlight.jpg'
    ],
    compatibility: {
      verified: true,
      makes: ['Porsche'],
      models: ['Taycan Turbo / 4S / Cross Turismo', '911 Carrera (992)'],
      years: '2020 - 2025'
    },
    description: 'Factory original boxed stock surplus. Features 32,000 individually addressable micro-LED pixels per unit with dynamic non-glare high beam projection and glacier ice signature DRL.',
    specs: [
      { label: 'Technology', value: 'Micro-LED Matrix (32k Pixels)' },
      { label: 'Lens Material', value: 'Anti-Scratch Polycarbonate' },
      { label: 'ECU Integrated', value: 'Yes, Factory Coded' },
      { label: 'Operating Voltage', value: '12V Auto Regulated' }
    ],
    inStock: true,
    stockCount: 2,
    featured: true,
    warranty: '1 Year Manufacturer Direct'
  },
  {
    id: 'prod-06',
    slug: 'bbs-forged-monobloc-fi-r-wheel-set',
    title: 'BBS FI-R Ultralight Forged Alloy Wheels (Set of 4)',
    category: 'wheels',
    vehicleType: 'cars',
    partNumber: 'BBS-FIR-20-SET',
    oemCode: 'FIR137-FIR138',
    price: 245000,
    originalPrice: 460000,
    condition: 'Certified Refurbished',
    rating: 4.97,
    reviewsCount: 27,
    seller: {
      id: 'sel-101',
      name: 'Apex Precision Recyclers',
      rating: 4.95,
      verified: true,
      location: 'Pune / Mumbai Hub'
    },
    images: [
      '/parts/bbs-forged-wheels.jpg',
      '/parts/bbs-forged-wheels.jpg'
    ],
    compatibility: {
      verified: true,
      makes: ['Porsche', 'BMW', 'Audi'],
      models: ['911 GT3 (991/992)', 'M4 Competition', 'R8 V10'],
      years: '2017 - 2024'
    },
    description: 'Aviation-grade forged 6000-series alloy with relief cutouts on each spoke for extreme unsprung mass reduction. Trued to within 0.15mm runout on Haweka balancing rigs. Ceramic coated in Satin Platinum.',
    specs: [
      { label: 'Dimensions', value: 'Front: 20x9 ET52 | Rear: 20x12 ET44' },
      { label: 'Bolt Pattern', value: 'Center Lock & 5x130 Available' },
      { label: 'Weight Per Rim', value: '7.6 kg (Front) / 9.1 kg (Rear)' },
      { label: 'Finish', value: 'Factory Satin Platinum Ceramic' }
    ],
    inStock: true,
    stockCount: 1,
    featured: true,
    warranty: 'Lifetime Structural Integrity'
  },
  {
    id: 'prod-07',
    slug: 'tata-nexon-ev-liquid-cooled-bms-pack',
    title: 'Tata EV 40.5 kWh High-Energy Prismatic Battery Pack',
    category: 'ev-battery',
    vehicleType: 'ev',
    partNumber: 'TAT-ZIP-40-5',
    oemCode: '542454099901',
    price: 195000,
    originalPrice: 380000,
    condition: 'Certified Refurbished',
    rating: 4.88,
    reviewsCount: 11,
    seller: {
      id: 'sel-102',
      name: 'VoltCycle High-Voltage Lab',
      rating: 4.98,
      verified: true,
      location: 'Bengaluru Tech Park'
    },
    images: [
      '/parts/tata-ev-battery-pack.jpg',
      '/parts/tata-ev-battery-pack.jpg'
    ],
    compatibility: {
      verified: true,
      makes: ['Tata Motors'],
      models: ['Nexon EV Max', 'Nexon EV Long Range', 'Curvv EV'],
      years: '2022 - 2025'
    },
    description: 'State-of-Health certified at 96.2% retention. All 30 modules tested for internal resistance and thermal stability under rapid 50kW DC charging curves. Integrated IP67 aluminum underbody armor.',
    specs: [
      { label: 'Chemistry', value: 'LFP (Lithium Iron Phosphate)' },
      { label: 'Capacity', value: '40.5 kWh Nominal' },
      { label: 'State of Health (SoH)', value: '96.2% Verified' },
      { label: 'Ingress Protection', value: 'IP67 Submersion Sealed' }
    ],
    inStock: true,
    stockCount: 2,
    featured: true,
    warranty: '2 Year Battery Degradation Warranty'
  },
  {
    id: 'prod-08',
    slug: 'mercedes-amg-carbon-ceramic-brake-rotors',
    title: 'Mercedes-AMG CCB 402mm Carbon Ceramic Rotor Set',
    category: 'braking',
    vehicleType: 'cars',
    partNumber: 'MB-AMG-CCB-402',
    oemCode: 'A2314211512',
    price: 142000,
    originalPrice: 285000,
    condition: 'Tested Used',
    rating: 4.9,
    reviewsCount: 14,
    seller: {
      id: 'sel-104',
      name: 'Stuttgart Genuine Exchange',
      rating: 4.99,
      verified: true,
      location: 'New Delhi Aerocity'
    },
    images: [
      '/parts/amg-ceramic-rotors.jpg',
      '/parts/amg-ceramic-rotors.jpg'
    ],
    compatibility: {
      verified: true,
      makes: ['Mercedes-Benz'],
      models: ['AMG GT / GT R', 'C63 S AMG (W205)', 'E63 S AMG (W213)'],
      years: '2016 - 2023'
    },
    description: 'Weighed on laboratory scales showing only 1.2% ceramic surface layer oxidation. Delivers fade-free stopping performance up to 1000°C without brake fluid boiling.',
    specs: [
      { label: 'Diameter', value: '402 mm x 39 mm' },
      { label: 'Weight', value: '6.4 kg per rotor (vs 14kg iron)' },
      { label: 'Hat Material', value: 'Forged 7075-T6 Hardened Alloy' }
    ],
    inStock: true,
    stockCount: 1,
    featured: false,
    warranty: '90 Days Certified'
  }
];

export const INITIAL_PICKUP_REQUESTS = [
  {
    id: 'ALX-PK-8921',
    createdAt: '2026-10-20T10:30:00Z',
    customerName: 'Rohit Verma',
    phone: '+91 98201 44552',
    vehicleType: 'car',
    vehicleDetails: '2014 Honda City i-VTEC (Manual)',
    condition: 'Accident damaged side impact, engine running, wheels intact',
    movable: true,
    address: 'Plot 42, MIDC Industrial Area, Andheri East, Mumbai, Maharashtra 400093',
    city: 'Mumbai',
    preferredDate: '2026-10-25',
    preferredWindow: 'Morning (10:00 AM - 1:00 PM)',
    status: 'Quote Offered', // 'Submitted', 'Under Review', 'Quote Offered', 'Confirmed', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'
    valuationEstimate: 48500,
    quoteNotes: 'Aluminum engine block and driveline verified in good salvage condition. Proposed payout ₹48,500 upon on-site chassis verification.',
    scheduledDate: '2026-10-25',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
    ],
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-10-20T10:30:00Z', note: 'Customer submitted scrap pickup documentation.' },
      { status: 'Under Review', timestamp: '2026-10-20T14:15:00Z', note: 'Technical appraisal team reviewed images and vehicle history.' },
      { status: 'Quote Offered', timestamp: '2026-10-21T09:40:00Z', note: 'Official salvage valuation of ₹48,500 issued to customer.' }
    ]
  },
  {
    id: 'ALX-PK-7419',
    createdAt: '2026-10-18T16:00:00Z',
    customerName: 'Anandita Roy',
    phone: '+91 97112 88910',
    vehicleType: 'motorcycle',
    vehicleDetails: '2016 Royal Enfield Classic 500 (EFI)',
    condition: 'Flood affected, seized engine, frame intact for metallurgical recycling',
    movable: false,
    address: 'Sector 44, Near Golf Course Road, Gurugram, Haryana 122003',
    city: 'Gurugram',
    preferredDate: '2026-10-24',
    preferredWindow: 'Afternoon (2:00 PM - 5:00 PM)',
    status: 'Confirmed',
    valuationEstimate: 16000,
    quoteNotes: 'Hydraulic ramp flatbed assigned. Customer approved quote of ₹16,000.',
    scheduledDate: '2026-10-24',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-10-18T16:00:00Z', note: 'Pickup request created with 3 photos.' },
      { status: 'Under Review', timestamp: '2026-10-19T11:00:00Z', note: 'Inspected for hazardous fluid containment.' },
      { status: 'Quote Offered', timestamp: '2026-10-19T15:30:00Z', note: 'Estimate of ₹16,000 offered.' },
      { status: 'Confirmed', timestamp: '2026-10-20T08:00:00Z', note: 'Customer confirmed pickup proposal.' }
    ]
  },
  {
    id: 'ALX-PK-6102',
    createdAt: '2026-10-15T09:00:00Z',
    customerName: 'Harpreet Singh',
    phone: '+91 99882 12345',
    vehicleType: 'truck',
    vehicleDetails: '2011 Tata 407 LPT Light Commercial Truck',
    condition: 'End of vehicle life (15+ years certificate expired), diesel engine complete',
    movable: true,
    address: 'Transport Nagar, Ring Road, Ludhiana, Punjab 141003',
    city: 'Ludhiana',
    preferredDate: '2026-10-21',
    preferredWindow: 'Morning (9:00 AM - 12:00 PM)',
    status: 'Completed',
    valuationEstimate: 92000,
    quoteNotes: 'Vehicle dismantled at certified recycling facility. RTO certificate of deposit issued.',
    scheduledDate: '2026-10-21',
    images: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
    ],
    statusHistory: [
      { status: 'Submitted', timestamp: '2026-10-15T09:00:00Z', note: 'Scrap request lodged.' },
      { status: 'Quote Offered', timestamp: '2026-10-16T10:00:00Z', note: 'Quote ₹92,000 approved.' },
      { status: 'Confirmed', timestamp: '2026-10-16T14:00:00Z', note: 'Confirmed by owner.' },
      { status: 'Scheduled', timestamp: '2026-10-18T11:00:00Z', note: 'Heavy recovery vehicle routed.' },
      { status: 'In Progress', timestamp: '2026-10-21T09:30:00Z', note: 'Vehicle collected from site.' },
      { status: 'Completed', timestamp: '2026-10-21T17:00:00Z', note: 'Dismantling completed & payment settled.' }
    ]
  }
];

export const METRICS = {
  metalsRecycledKg: 482600,
  co2SavedTons: 1120,
  partsReplacedCount: 8450,
  circularRatePercent: 98.4,
  verifiedSellersCount: 180,
  averagePayoutHours: 4.2
};
