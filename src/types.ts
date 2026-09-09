export interface GlobalState {
  fxRate: number
  marginPct: number
}

export interface LCLState {
  seafreightUsdPerWm: number
  cafPct: number
  bafUsdPerWm: number
  thcDkkPerCbm: number
  thcMinDkk: number
  portDutyDkk: number
  shipmentsPerMonth: number
  cbmPerShipment: number
}

export type TruckingRoute = 'aarhus' | 'hamborg'

export interface FCLState {
  label: string
  seafreightUsd: number
  cafPct: number
  bafUsd: number
  amsUsd: number
  thcDkk: number
  ispsDkk: number
  truckingAarhusDkk: number
  truckingHamborgDkk: number
  feederCompensationDkk: number
  fuelFeePct: number
  route: TruckingRoute
  capacityCbm: number
  utilizedCbm: number
  shipmentsPerMonth: number
}

export interface Breakdown {
  seafreightUsd: number
  cafUsd: number
  bafUsd: number
  amsUsd: number
  usdSubtotal: number
  usdSubtotalDkk: number
  thcDkk: number
  ispsDkk: number
  portDutyDkk: number
  truckingGrossDkk: number
  feederCompDkk: number
  fuelFeeDkk: number
  truckingNetDkk: number
  localFeesDkk: number
  costPricePerShipmentDkk: number
  shipmentsPerMonth: number
  totalVolumeCbm: number
  costPriceMonthDkk: number
  marginDkk: number
  totalDkk: number
  dkkPerCbm: number
}
