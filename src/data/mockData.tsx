export type MockAllServicesSubItemType = {
  title: string
  id: string
  descr: string
}

export type MockAllServicesItemType = {
  title: string
  id: string
  subItems: MockAllServicesSubItemType[]
}

export type MockSearchItemType = {
  id: string
  name: string
  area: string
  governorate: string
  coords: {
    lat: number
    lon: number
  }
}

export const subItems: MockAllServicesSubItemType[] = [
  {
    title: "Stand in Line",
    id: "0",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
  {
    title: "Stand in Line",
    id: "1",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
  {
    title: "Stand in Line",
    id: "2",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
  {
    title: "Pick me up from Airport",
    id: "3",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
  {
    title: "Pick me up from Airport",
    id: "4",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
  {
    title: "Stand in Line",
    id: "5",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
  {
    title: "Stand in Line",
    id: "6",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
  {
    title: "Pick me up from Airport",
    id: "7",
    descr:
      "Waiting in line is a service provided by people or Companies for the purpose of reducing the waiting burden on customersIn crowded places for a fee agreed upon between the parties.",
  },
]

export const mockAllServicesData: MockAllServicesItemType[] = [
  {
    id: "0",
    title: "Only on tappler",
    subItems,
  },
  {
    id: "1",
    title: "Home Services (Cleaning - Repairs- Installations)",
    subItems,
  },
  {
    id: "2",
    title: "Car, Motorcycles, Boats Maintenance & Repairs",
    subItems,
  },
  {
    id: "3",
    title: "Technology Services (Computer, Mobile, Satellite …)",
    subItems,
  },
  {
    id: "4",
    title: "Personal Care (Hair Salons, Makeup, Massage, …)",
    subItems,
  },
  {
    id: "5",
    title: "Construction Work, Interior Design & Decoration",
    subItems,
  },
  {
    id: "6",
    title: "Gardens and Swimming Pool Services",
    subItems,
  },
]

export const mockGovornorateSearchData: MockSearchItemType[] = [
  {
    id: "0",
    name: "new_cairo",
    area: "new_cairo",
    governorate: "cairo",
    coords: {
      lat: 30.037874126070808,
      lon: 31.329847479547986,
    },
  },
  {
    id: "1",
    name: "nasr_city",
    area: "nasr_city",
    governorate: "cairo",
    coords: {
      lat: 30.037874126070808,
      lon: 31.476473034283032,
    },
  },
]

// {
//   streetAddress: "19 Tripoli Street"
//   unitNumber: "1105"
//   city: "Alshurook City - new Cairo"
//   governorate: "Cairo"
//   longitude: 38.8951
//   latitude: -77.0364
// }

export type MockReviewsDataType = {
  id: number
  title: string
  descr: string
  rate: number
  created_at: string
  photos?: { id: number; url: string }[]
}

export const reviewsMockData: MockReviewsDataType[] = [
  {
    id: 19213,
    title: "Great product",
    descr:
      "I am very satisfied with this product. It matches the description and is very convenient to use.",
    rate: 5,
    created_at: "2023-05-20T08:45:00Z",
    photos: [
      { id: 100, url: "https://via.placeholder.com/500" },
      { id: 200, url: "https://via.placeholder.com/600" },
      { id: 300, url: "https://via.placeholder.com/700" },
    ],
  },
  {
    id: 29213,
    title: "Good value for money",
    descr: "This product exceeded my expectations. It's worth every penny!",
    rate: 4.5,
    created_at: "2023-06-10T14:20:00Z",
    photos: [
      { id: 400, url: "https://via.placeholder.com/550" },
      { id: 500, url: "https://via.placeholder.com/650" },
    ],
  },
  {
    id: 39213,
    title: "Average product",
    descr:
      "It's okay for the price. Nothing extraordinary, but gets the job done.",
    rate: 3,
    created_at: "2023-07-05T11:30:00Z",
    photos: [{ id: 600, url: "https://via.placeholder.com/800" }],
  },
  {
    id: 49213,
    title: "Disappointing quality",
    descr: "Not satisfied with the quality. It feels cheap and flimsy.",
    rate: 2,
    created_at: "2023-08-01T16:50:00Z",
    photos: [],
  },
  {
    id: 59213,
    title: "Excellent service",
    descr: "The delivery was prompt and the customer service was very helpful.",
    rate: 5,
    created_at: "2023-09-02T09:15:00Z",
    photos: [{ id: 700, url: "https://via.placeholder.com/700" }],
  },
  {
    id: 69213,
    title: "Poor packaging",
    descr:
      "The packaging was damaged upon arrival. The product itself seems fine though.",
    rate: 2.5,
    created_at: "2023-10-10T13:40:00Z",
    photos: [
      { id: 800, url: "https://via.placeholder.com/600" },
      { id: 900, url: "https://via.placeholder.com/750" },
    ],
  },
  {
    id: 79213,
    title: "Highly recommended",
    descr:
      "I would highly recommend this product to anyone looking for quality at a reasonable price.",
    rate: 4.8,
    created_at: "2023-11-12T10:00:00Z",
    photos: [
      { id: 1000, url: "https://via.placeholder.com/500" },
      { id: 1100, url: "https://via.placeholder.com/650" },
    ],
  },
  {
    id: 89213,
    title: "Not as described",
    descr:
      "The product received doesn't match the description. Very disappointed.",
    rate: 1.5,
    created_at: "2023-12-05T15:20:00Z",
    photos: [],
  },
  {
    id: 99213,
    title: "Decent product",
    descr:
      "It's a decent product for the price. Nothing exceptional but serves its purpose.",
    rate: 3.5,
    created_at: "2024-01-03T11:55:00Z",
    photos: [
      { id: 1200, url: "https://via.placeholder.com/550" },
      { id: 1300, url: "https://via.placeholder.com/700" },
    ],
  },
  {
    id: 109213,
    title: "Outstanding performance",
    descr:
      "This product exceeded my expectations in terms of performance. Very impressed.",
    rate: 4.9,
    created_at: "2024-02-08T08:30:00Z",
    photos: [{ id: 1400, url: "https://via.placeholder.com/600" }],
  },
]

export type MyPointsActivityItemMockType = {
  title: string
  status: "expired" | "pending" | "done"
  cost: number
  created_at: string
}

export const mockMyPointsData: MyPointsActivityItemMockType[] = [
  {
    title: "Purchase at Grocery Store",
    status: "done",
    cost: 25,
    created_at: "2024-04-25T08:00:00Z",
  },
  {
    title: "Online Shopping",
    status: "pending",
    cost: -10,
    created_at: "2024-05-01T14:30:00Z",
  },
  {
    title: "Subscription Renewal",
    status: "done",
    cost: -15,
    created_at: "2024-04-20T10:15:00Z",
  },
  {
    title: "Dining Out",
    status: "done",
    cost: 40,
    created_at: "2024-04-28T19:45:00Z",
  },
  {
    title: "Movie Ticket Purchase",
    status: "expired",
    cost: -8,
    created_at: "2024-03-15T20:00:00Z",
  },
  {
    title: "Fuel Purchase",
    status: "pending",
    cost: 30,
    created_at: "2024-05-05T09:10:00Z",
  },
]

export type MyPointsVoucherItemMockType = {
  title: string
  cost: number
  expired_at: string
}

export const mockMyPoinstVouchersData: MyPointsVoucherItemMockType[] = [
  {
    title: "5 Points Vouchers",
    cost: 5,
    expired_at: "22/12/2024",
  },
]
