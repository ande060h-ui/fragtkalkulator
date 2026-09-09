import type { FCLState, GlobalState } from '../types'
import { calcFCL, fmtDkk, fmtDkk2, fmtUsd } from '../calculations'
import { NumberInput } from './NumberInput'
import { LedgerRow } from './LedgerRow'
import { WaybillHeader } from './WaybillHeader'

interface Props {
  state: FCLState
  onChange: (s: FCLState) => void
  global: GlobalState
  refCode: string
  title: string
  mode: string
}

export function OfferFCL({ state, onChange, global, refCode, title, mode }: Props) {
  const b = calcFCL(state, global)
  const set = <K extends keyof FCLState>(key: K, value: FCLState[K]) =>
    onChange({ ...state, [key]: value })

  return (
    <div className="border border-ink/15 bg-paper-raised p-4">
      <WaybillHeader ref={refCode} title={title} mode={mode} />

      <div className="mb-4">
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

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-ink-soft">Trucking-rute</span>
          <div className="flex overflow-hidden border border-ink/30 text-xs">
            <button
              type="button"
              onClick={() => set('route', 'aarhus')}
              className={`px-2 py-1 font-mono transition-colors ${state.route === 'aarhus' ? 'bg-ink text-paper-raised' : 'bg-transparent text-ink-soft'}`}
            >
              Å–V–Å
            </button>
            <button
              type="button"
              onClick={() => set('route', 'hamborg')}
              className={`border-l border-ink/30 px-2 py-1 font-mono transition-colors ${state.route === 'hamborg' ? 'bg-ink text-paper-raised' : 'bg-transparent text-ink-soft'}`}
            >
              Å–V–Hamborg
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t-2 border-ink pt-2">
        <LedgerRow label="Søfragt" value={fmtUsd(b.seafreightUsd)} />
        <LedgerRow label="+ CAF" value={fmtUsd(b.cafUsd)} />
        <LedgerRow label="+ BAF" value={fmtUsd(b.bafUsd)} />
        <LedgerRow label="+ AMS fee" value={fmtUsd(b.amsUsd)} />
        <LedgerRow label="Søfragt total" value={fmtDkk2(b.usdSubtotalDkk)} weight="subtotal" />
        <LedgerRow label="THC" value={fmtDkk2(b.thcDkk)} />
        <LedgerRow label="ISPS" value={fmtDkk2(b.ispsDkk)} />
        <LedgerRow label="Trucking (brutto)" value={fmtDkk2(b.truckingGrossDkk)} />
        {b.feederCompDkk > 0 && <LedgerRow label="− Feeder-kompensation" value={`−${fmtDkk2(b.feederCompDkk)}`} />}
        <LedgerRow label="+ Fuel fee" value={fmtDkk2(b.fuelFeeDkk)} />
        <LedgerRow label="Trucking netto" value={fmtDkk2(b.truckingNetDkk)} weight="subtotal" />
        <LedgerRow label="Kostpris pr. sending" value={fmtDkk2(b.costPricePerShipmentDkk)} weight="subtotal" />
        <LedgerRow label={`× ${b.shipmentsPerMonth} sending/md`} value={fmtDkk(b.costPriceMonthDkk)} weight="subtotal" />
        <LedgerRow label={`LEA avance (${global.marginPct}%)`} value={fmtDkk(b.marginDkk)} />
        <div className="mt-2 flex items-baseline justify-between border-t-2 border-ink pt-2">
          <span className="font-display text-sm font-semibold tracking-wide text-ink">Total / md</span>
          <span className="font-display text-2xl font-bold text-rust">{fmtDkk(b.totalDkk)}</span>
        </div>
        <LedgerRow label={`Pris pr. cbm (${b.totalVolumeCbm} cbm)`} value={fmtDkk2(b.dkkPerCbm)} weight="quiet" />
      </div>
    </div>
  )
}
