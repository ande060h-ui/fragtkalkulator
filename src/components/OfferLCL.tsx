import type { GlobalState, LCLState } from '../types'
import { calcLCL, fmtDkk, fmtDkk2, fmtUsd } from '../calculations'
import { NumberInput } from './NumberInput'

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
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-base font-semibold text-slate-800">Tilbud 1 · Samlegods (LCL)</h3>
      <p className="mb-3 text-xs text-slate-400">A-Line · pris pr. w/m</p>

      <div className="mb-3 divide-y divide-slate-100 rounded-lg bg-slate-50 px-3">
        <NumberInput label="Søfragt / w/m" value={state.seafreightUsdPerWm} onChange={(v) => set('seafreightUsdPerWm', v)} suffix="USD" />
        <NumberInput label="CAF (% af søfragt)" value={state.cafPct} onChange={(v) => set('cafPct', v)} suffix="%" step={0.1} />
        <NumberInput label="BAF / w/m" value={state.bafUsdPerWm} onChange={(v) => set('bafUsdPerWm', v)} suffix="USD" />
        <NumberInput label="THC / cbm" value={state.thcDkkPerCbm} onChange={(v) => set('thcDkkPerCbm', v)} suffix="DKK" />
        <NumberInput label="THC minimum" value={state.thcMinDkk} onChange={(v) => set('thcMinDkk', v)} suffix="DKK" />
        <NumberInput label="Godsafgift havn" value={state.portDutyDkk} onChange={(v) => set('portDutyDkk', v)} suffix="DKK" />
        <NumberInput label="Cbm pr. sending" value={state.cbmPerShipment} onChange={(v) => set('cbmPerShipment', v)} suffix="cbm" />
        <NumberInput label="Sendinger / måned" value={state.shipmentsPerMonth} onChange={(v) => set('shipmentsPerMonth', v)} suffix="stk" />
      </div>

      <div className="mt-auto space-y-1 text-sm">
        <Row label="Søfragt (pr. sending)" value={fmtUsd(b.seafreightUsd)} />
        <Row label="+ CAF" value={fmtUsd(b.cafUsd)} />
        <Row label="+ BAF" value={fmtUsd(b.bafUsd)} />
        <Row label="Søfragt total" value={`${fmtUsd(b.usdSubtotal)} = ${fmtDkk2(b.usdSubtotalDkk)}`} bold />
        <Row label="THC" value={fmtDkk2(b.thcDkk)} />
        <Row label="Godsafgift havn" value={fmtDkk2(b.portDutyDkk)} />
        <Row label="Kostpris pr. sending" value={fmtDkk2(b.costPricePerShipmentDkk)} bold />
        <Row label={`× ${b.shipmentsPerMonth} sendinger/md (${b.totalVolumeCbm} cbm)`} value={fmtDkk(b.costPriceMonthDkk)} bold />
        <Row label={`LEA avance (${global.marginPct}%)`} value={fmtDkk(b.marginDkk)} />
        <div className="my-1 border-t border-slate-200" />
        <Row label="Total pr. måned" value={fmtDkk(b.totalDkk)} big />
        <Row label="Pris pr. cbm" value={fmtDkk2(b.dkkPerCbm)} muted />
      </div>
    </div>
  )
}

function Row({ label, value, bold, big, muted }: { label: string; value: string; bold?: boolean; big?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${big ? 'text-base font-bold text-blue-700' : bold ? 'font-medium text-slate-700' : muted ? 'text-xs text-slate-400' : 'text-slate-600'}`}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  )
}
