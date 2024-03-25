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
