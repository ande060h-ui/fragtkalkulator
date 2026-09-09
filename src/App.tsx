import { useState } from 'react'
import type { FCLState, GlobalState, LCLState } from './types'
import { calcFCL, calcLCL } from './calculations'
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
    { name: 'Tilbud 1 (LCL)', b: calcLCL(lcl, global) },
    { name: "Tilbud 2 (20' FCL)", b: calcFCL(fcl20, global) },
    { name: "Tilbud 3 (40' FCL)", b: calcFCL(fcl40, global) },
  ]

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Fragtkalkulator – Birgers Møbler</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sammenligning af 3 søfragttilbud fra A-Line · Viborg → San Francisco · speditør LEA Express
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <section className="flex flex-wrap gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="min-w-[220px]">
            <h2 className="mb-2 text-sm font-semibold text-slate-700">Globale parametre</h2>
            <NumberInput label="Valutakurs" value={global.fxRate} onChange={(v) => setGlobal({ ...global, fxRate: v })} suffix="DKK/USD" step={0.01} />
            <NumberInput label="LEA Express avance" value={global.marginPct} onChange={(v) => setGlobal({ ...global, marginPct: v })} suffix="%" step={0.1} />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <OfferLCL state={lcl} onChange={setLcl} global={global} />
          <OfferFCL state={fcl20} onChange={setFcl20} global={global} title="Tilbud 2 · 20' FCL container" subtitle="A-Line · fast container-pris" />
          <OfferFCL state={fcl40} onChange={setFcl40} global={global} title="Tilbud 3 · 40' FCL container" subtitle="A-Line · fast container-pris" />
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-700">Sammenligning</h2>
          <ComparisonTable offers={offers} />
        </section>

        <AssumptionsBox />
      </main>
    </div>
  )
}

export default App
