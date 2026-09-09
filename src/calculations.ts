import type { Breakdown, FCLState, GlobalState, LCLState } from './types'

export function calcLCL(state: LCLState, global: GlobalState): Breakdown {
  const seafreightUsd = state.seafreightUsdPerWm * state.cbmPerShipment
  const cafUsd = seafreightUsd * (state.cafPct / 100)
  const bafUsd = state.bafUsdPerWm * state.cbmPerShipment
  const amsUsd = 0

  const usdSubtotal = seafreightUsd + cafUsd + bafUsd + amsUsd
  const usdSubtotalDkk = usdSubtotal * global.fxRate

  const thcDkk = Math.max(state.thcDkkPerCbm * state.cbmPerShipment, state.thcMinDkk)
  const portDutyDkk = state.portDutyDkk

  const localFeesDkk = thcDkk + portDutyDkk

  const costPricePerShipmentDkk = usdSubtotalDkk + localFeesDkk
  const costPriceMonthDkk = costPricePerShipmentDkk * state.shipmentsPerMonth
  const totalVolumeCbm = state.cbmPerShipment * state.shipmentsPerMonth

  const marginDkk = costPriceMonthDkk * (global.marginPct / 100)
  const totalDkk = costPriceMonthDkk + marginDkk
  const dkkPerCbm = totalVolumeCbm > 0 ? totalDkk / totalVolumeCbm : 0

  return {
    seafreightUsd,
    cafUsd,
    bafUsd,
    amsUsd,
    usdSubtotal,
    usdSubtotalDkk,
    thcDkk,
    ispsDkk: 0,
    portDutyDkk,
    truckingGrossDkk: 0,
    feederCompDkk: 0,
    fuelFeeDkk: 0,
    truckingNetDkk: 0,
    localFeesDkk,
    costPricePerShipmentDkk,
    shipmentsPerMonth: state.shipmentsPerMonth,
    totalVolumeCbm,
    costPriceMonthDkk,
    marginDkk,
    totalDkk,
    dkkPerCbm,
  }
}

export function calcFCL(state: FCLState, global: GlobalState): Breakdown {
  const seafreightUsd = state.seafreightUsd
  const cafUsd = seafreightUsd * (state.cafPct / 100)
  const bafUsd = state.bafUsd
  const amsUsd = state.amsUsd

  const usdSubtotal = seafreightUsd + cafUsd + bafUsd + amsUsd
  const usdSubtotalDkk = usdSubtotal * global.fxRate

  const truckingGrossDkk = state.route === 'aarhus' ? state.truckingAarhusDkk : state.truckingHamborgDkk
  const feederCompDkk = state.route === 'hamborg' ? state.feederCompensationDkk : 0
  const fuelFeeDkk = truckingGrossDkk * (state.fuelFeePct / 100)
  const truckingNetDkk = truckingGrossDkk - feederCompDkk + fuelFeeDkk

  const localFeesDkk = state.thcDkk + state.ispsDkk + truckingNetDkk

  const costPricePerShipmentDkk = usdSubtotalDkk + localFeesDkk
  const costPriceMonthDkk = costPricePerShipmentDkk * state.shipmentsPerMonth
  const totalVolumeCbm = state.utilizedCbm

  const marginDkk = costPriceMonthDkk * (global.marginPct / 100)
  const totalDkk = costPriceMonthDkk + marginDkk
  const dkkPerCbm = totalVolumeCbm > 0 ? totalDkk / totalVolumeCbm : 0

  return {
    seafreightUsd,
    cafUsd,
    bafUsd,
    amsUsd,
    usdSubtotal,
    usdSubtotalDkk,
    thcDkk: state.thcDkk,
    ispsDkk: state.ispsDkk,
    portDutyDkk: 0,
    truckingGrossDkk,
    feederCompDkk,
    fuelFeeDkk,
    truckingNetDkk,
    localFeesDkk,
    costPricePerShipmentDkk,
    shipmentsPerMonth: state.shipmentsPerMonth,
    totalVolumeCbm,
    costPriceMonthDkk,
    marginDkk,
    totalDkk,
    dkkPerCbm,
  }
}

export function fmtDkk(n: number): string {
  return n.toLocaleString('da-DK', { maximumFractionDigits: 0 }) + ' kr.'
}

export function fmtDkk2(n: number): string {
  return n.toLocaleString('da-DK', { maximumFractionDigits: 2 }) + ' kr.'
}

export function fmtUsd(n: number): string {
  return n.toLocaleString('da-DK', { maximumFractionDigits: 2 }) + ' USD'
}
