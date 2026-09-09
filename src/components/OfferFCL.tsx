import type { FCLState, GlobalState } from '../types'
import { calcFCL, fmtDkk, fmtDkk2, fmtUsd } from '../calculations'
import { NumberInput } from './NumberInput'

interface Props {
  state: FCLState
  onChange: (s: FCLState) => void
  global: GlobalState
  title: string
  subtitle: string
}

export function OfferFCL({ state, onChange, global, title, subtitle }: Props) {
  const b = calcFCL(state, global)
  const set = <K extends keyof FCLState>(key: K, value: FCLState[K]) =>
    onChange({ ...state, [key]: value })

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-base font-semibold text-slate-800">{title}</h3>
      <p className="mb-3 text-xs text-slate-400">{subtitle}</p>

      <div className="mb-3 divide-y divide-slate-100 rounded-lg bg-slate-50 px-3">
        <NumberInput label="Søfragt (fast)" value={state.seafreightUsd} onChange={(v) => set('seafreightUsd', v)} suffix="USD" />
        <NumberInput label="CAF (% af søfragt)" value={state.cafPct} onChange={(v) => set('cafPct', v)} suffix="%" step={0.1} />
        <NumberInput label="BAF (fast)" value={state.bafUsd} onChange={(v) => set('bafUsd', v)} suffix="USD" />
        <NumberInput label="AMS fee" value={state.amsUsd} onChange={(v) => set('amsUsd', v)} suffix="USD" />
        <NumberInput label="THC" value={state.thcDkk} onChange={(v) => set('thcDkk', v)} suffix="DKK" />
        <NumberInput label="ISPS" value={state.ispsDkk} onChange={(v) => set('ispsDkk', v)} suffix="DKK" />
        <NumberInput label="Trucking Å-V-Å" value={state.truckingAarhusDkk} onChange={(v) => set('truckingAarhusDkk', v)} suffix="DKK" />
        <NumberInput label="Trucking Å-V-Hamborg" value={state.truckingHamborgDkk} onChange={(v) => set('truckingHamborgDkk', v)} suffix="DKK" />
        <NumberInput label="Feeder-kompensation" value={state.feederCompensationDkk} onChange={(v) => set('feederCompensationDkk', v)} suffix="DKK" />
        <NumberInput label="Fuel fee (% af trucking)" value={state.fuelFeePct} onChange={(v) => set('fuelFeePct', v)} suffix="%" step={0.1} />
        <NumberInput label="Udnyttet volumen" value={state.utilizedCbm} onChange={(v) => set('utilizedCbm', v)} suffix="cbm" />
        <NumberInput label="Sendinger / måned" value={state.shipmentsPerMonth} onChange={(v) => set('shipmentsPerMonth', v)} suffix="stk" />

        <div className="flex items-center justify-between py-2 text-sm">
          <span className="text-slate-600">Trucking-rute</span>
          <div className="flex overflow-hidden rounded border border-slate-300 text-xs">
            <button
              type="button"
              onClick={() => set('route', 'aarhus')}
              className={`px-2 py-1 ${state.route === 'aarhus' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}
            >
              Å-V-Å
            </button>
            <button
              type="button"
              onClick={() => set('route', 'hamborg')}
              className={`px-2 py-1 ${state.route === 'hamborg' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}
            >
              Å-V-Hamborg
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-1 text-sm">
        <Row label="Søfragt" value={fmtUsd(b.seafreightUsd)} />
        <Row label="+ CAF" value={fmtUsd(b.cafUsd)} />
        <Row label="+ BAF" value={fmtUsd(b.bafUsd)} />
        <Row label="+ AMS fee" value={fmtUsd(b.amsUsd)} />
        <Row label="Søfragt total" value={`${fmtUsd(b.usdSubtotal)} = ${fmtDkk2(b.usdSubtotalDkk)}`} bold />
        <Row label="THC" value={fmtDkk2(b.thcDkk)} />
        <Row label="ISPS" value={fmtDkk2(b.ispsDkk)} />
        <Row label="Trucking (brutto)" value={fmtDkk2(b.truckingGrossDkk)} />
        {b.feederCompDkk > 0 && <Row label="− Feeder-kompensation" value={`−${fmtDkk2(b.feederCompDkk)}`} />}
        <Row label="+ Fuel fee" value={fmtDkk2(b.fuelFeeDkk)} />
        <Row label="Trucking netto" value={fmtDkk2(b.truckingNetDkk)} bold />
        <Row label="Kostpris pr. sending" value={fmtDkk2(b.costPricePerShipmentDkk)} bold />
        <Row label={`× ${b.shipmentsPerMonth} sending/md`} value={fmtDkk(b.costPriceMonthDkk)} bold />
        <Row label={`LEA avance (${global.marginPct}%)`} value={fmtDkk(b.marginDkk)} />
        <div className="my-1 border-t border-slate-200" />
        <Row label="Total pr. måned" value={fmtDkk(b.totalDkk)} big />
        <Row label={`Pris pr. cbm (${b.totalVolumeCbm} cbm)`} value={fmtDkk2(b.dkkPerCbm)} muted />
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
