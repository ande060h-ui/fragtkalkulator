import { useState } from 'react'
import type { FCLState, GlobalState, LCLState } from './types'
import { calcFCL, calcLCL, fmtDkk } from './calculations'
import { NumberInput } from './components/NumberInput'
import { OfferLCL } from './components/OfferLCL'
import { OfferFCL } from './components/OfferFCL'
import { ComparisonTable } from './components/ComparisonTable'
import { AssumptionsBox } from './components/AssumptionsBox'

const initialGlobal: GlobalState = {
  fxRate: 6.0,
  marginPct: 10,
}

const initialLCL: LCLState = {
  seafreightUsdPerWm: 65,
  cafPct: 6,
  bafUsdPerWm: 29,
  thcDkkPerCbm: 75,
  thcMinDkk: 275,
  portDutyDkk: 152,
  shipmentsPerMonth: 4,
  cbmPerShipment: 8,
}

const initial20: FCLState = {
  label: "20' FCL",
  seafreightUsd: 1600,
  cafPct: 6,
  bafUsd: 635,
  amsUsd: 40,
  thcDkk: 1100,
  ispsDkk: 110,
  truckingAarhusDkk: 1600,
  truckingHamborgDkk: 3400,
  feederCompensationDkk: 1000,
  fuelFeePct: 12,
  route: 'aarhus',
  capacityCbm: 33,
  utilizedCbm: 33,
  shipmentsPerMonth: 1,
}

const initial40: FCLState = {
  label: "40' FCL",
  seafreightUsd: 1900,
  cafPct: 6,
  bafUsd: 1270,
  amsUsd: 40,
  thcDkk: 1100,
  ispsDkk: 110,
  truckingAarhusDkk: 1600,
  truckingHamborgDkk: 3400,
  feederCompensationDkk: 2000,
  fuelFeePct: 12,
  route: 'aarhus',
  capacityCbm: 67,
  utilizedCbm: 67,
  shipmentsPerMonth: 1,
}

function App() {
  const [global, setGlobal] = useState<GlobalState>(initialGlobal)
  const [lcl, setLcl] = useState<LCLState>(initialLCL)
  const [fcl20, setFcl20] = useState<FCLState>(initial20)
  const [fcl40, setFcl40] = useState<FCLState>(initial40)

  const offers = [
    { name: 'Samlegods', b: calcLCL(lcl, global) },
    { name: "20' FCL", b: calcFCL(fcl20, global) },
    { name: "40' FCL", b: calcFCL(fcl40, global) },
  ]
  const cheapest = offers.reduce((a, o) => (o.b.totalDkk < a.b.totalDkk ? o : a))

  return (
    <div className="min-h-screen bg-paper pb-16">
      <header className="border-b-4 border-ink bg-ink text-paper-raised">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-paper-raised/60">
                LEA Express fragttilbud · Birgers Møbler
              </p>
              <h1 className="font-display text-[2.75rem] font-bold leading-[0.95] tracking-tight sm:text-6xl">
                Viborg <span className="text-rust">→</span> San Francisco
              </h1>
              <p className="mt-2 max-w-md text-sm text-paper-raised/70">
                Tre søfragttilbud fra A-Line, sammenlignet til DKK inkl. speditøravance.
              </p>
            </div>

            <div className="border border-paper-raised/25 px-5 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper-raised/60">Bedste tilbud nu</p>
              <p className="font-display text-4xl font-bold text-rust">{fmtDkk(cheapest.b.totalDkk)}</p>
              <p className="font-mono text-xs text-paper-raised/70">pr. måned · {cheapest.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <section className="flex flex-wrap items-start gap-x-10 gap-y-2 border border-dashed border-ink/40 bg-paper-raised px-5 py-3">
          <div className="w-64 max-w-full">
            <NumberInput label="Valutakurs" value={global.fxRate} onChange={(v) => setGlobal({ ...global, fxRate: v })} suffix="DKK/USD" step={0.01} />
          </div>
          <div className="w-64 max-w-full">
            <NumberInput label="LEA Express avance" value={global.marginPct} onChange={(v) => setGlobal({ ...global, marginPct: v })} suffix="%" step={0.1} />
          </div>
        </section>

        <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
          <OfferLCL state={lcl} onChange={setLcl} global={global} />
          <OfferFCL state={fcl20} onChange={setFcl20} global={global} refCode="TILBUD 2026-02" title="20' container" mode="FCL · fast pris" />
          <OfferFCL state={fcl40} onChange={setFcl40} global={global} refCode="TILBUD 2026-03" title="40' container" mode="FCL · fast pris" />
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-ink">Sammenligning</h2>
          <ComparisonTable offers={offers} />
        </section>

        <AssumptionsBox />
      </main>
    </div>
  )
}

export default App
