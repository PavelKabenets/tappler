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
  govornorate: string
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
    name: "Alshurook City",
    govornorate: "cairo",
    area: "new_cairo",
  },
  {
    id: "1",
    name: "Alshurook City",
    govornorate: "cairo",
    area: "new_cairo",
  },
  {
    id: "2",
    name: "Alshurook City",
    govornorate: "cairo",
    area: "new_cairo",
  },
  {
    id: "3",
    name: "6th Neighborhood",
    govornorate: "cairo",
    area: "new_cairo",
  },
  {
    id: "4",
    name: "6th Neighborhood",
    govornorate: "cairo",
    area: "new_cairo",
  },
  {
    id: "5",
    name: "Alshurook City",
    govornorate: "cairo",
    area: "new_cairo",
  },
]
