import type { GlobalState, LCLState } from '../types'
import { calcLCL, fmtDkk, fmtDkk2, fmtUsd } from '../calculations'
import { NumberInput } from './NumberInput'
import { LedgerRow } from './LedgerRow'
import { WaybillHeader } from './WaybillHeader'

interface Props {
  state: LCLState
  onChange: (s: LCLState) => void
  global: GlobalState
}

export function OfferLCL({ state, onChange, global }: Props) {
  const b = calcLCL(state, global)
  const set = <K extends keyof LCLState>(key: K, value: LCLState[K]) =>
    onChange({ ...state, [key]: value })

  return (
    <div className="border border-ink/15 bg-paper-raised p-4">
      <WaybillHeader ref="TILBUD 2026-01" title="Samlegods" mode="LCL · pris pr. w/m" />

      <div className="mb-4">
        <NumberInput label="Søfragt / w/m" value={state.seafreightUsdPerWm} onChange={(v) => set('seafreightUsdPerWm', v)} suffix="USD" />
        <NumberInput label="CAF (% af søfragt)" value={state.cafPct} onChange={(v) => set('cafPct', v)} suffix="%" step={0.1} />
        <NumberInput label="BAF / w/m" value={state.bafUsdPerWm} onChange={(v) => set('bafUsdPerWm', v)} suffix="USD" />
        <NumberInput label="THC / cbm" value={state.thcDkkPerCbm} onChange={(v) => set('thcDkkPerCbm', v)} suffix="DKK" />
        <NumberInput label="THC minimum" value={state.thcMinDkk} onChange={(v) => set('thcMinDkk', v)} suffix="DKK" />
        <NumberInput label="Godsafgift havn" value={state.portDutyDkk} onChange={(v) => set('portDutyDkk', v)} suffix="DKK" />
        <NumberInput label="Cbm pr. sending" value={state.cbmPerShipment} onChange={(v) => set('cbmPerShipment', v)} suffix="cbm" />
        <NumberInput label="Sendinger / måned" value={state.shipmentsPerMonth} onChange={(v) => set('shipmentsPerMonth', v)} suffix="stk" />
      </div>

      <div className="mt-4 border-t-2 border-ink pt-2">
        <LedgerRow label="Søfragt pr. sending" value={fmtUsd(b.seafreightUsd)} />
        <LedgerRow label="+ CAF" value={fmtUsd(b.cafUsd)} />
        <LedgerRow label="+ BAF" value={fmtUsd(b.bafUsd)} />
        <LedgerRow label="Søfragt total" value={fmtDkk2(b.usdSubtotalDkk)} weight="subtotal" />
        <LedgerRow label="THC" value={fmtDkk2(b.thcDkk)} />
        <LedgerRow label="Godsafgift havn" value={fmtDkk2(b.portDutyDkk)} />
        <LedgerRow label="Kostpris pr. sending" value={fmtDkk2(b.costPricePerShipmentDkk)} weight="subtotal" />
        <LedgerRow label={`× ${b.shipmentsPerMonth} sendinger (${b.totalVolumeCbm} cbm/md)`} value={fmtDkk(b.costPriceMonthDkk)} weight="subtotal" />
        <LedgerRow label={`LEA avance (${global.marginPct}%)`} value={fmtDkk(b.marginDkk)} />
        <div className="mt-2 flex items-baseline justify-between border-t-2 border-ink pt-2">
          <span className="font-display text-sm font-semibold tracking-wide text-ink">Total / md</span>
          <span className="font-display text-2xl font-bold text-rust">{fmtDkk(b.totalDkk)}</span>
        </div>
        <LedgerRow label="Pris pr. cbm" value={fmtDkk2(b.dkkPerCbm)} weight="quiet" />
      </div>
    </div>
  )
}
