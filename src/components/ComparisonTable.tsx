import type { Breakdown } from '../types'
import { fmtDkk, fmtDkk2 } from '../calculations'

interface Offer {
  name: string
  b: Breakdown
}

export function ComparisonTable({ offers }: { offers: Offer[] }) {
  const cheapestTotal = Math.min(...offers.map((o) => o.b.totalDkk))
  const rows: { label: string; get: (b: Breakdown) => string }[] = [
    { label: 'Søfragt + tillæg (USD → DKK)', get: (b) => fmtDkk2(b.usdSubtotalDkk) },
    { label: 'Lokale gebyrer / trucking (DKK)', get: (b) => fmtDkk2(b.localFeesDkk) },
    { label: 'Kostpris pr. måned', get: (b) => fmtDkk(b.costPriceMonthDkk) },
    { label: 'LEA Express avance', get: (b) => fmtDkk(b.marginDkk) },
    { label: 'Total pr. måned (DKK)', get: (b) => fmtDkk(b.totalDkk) },
    { label: 'Volumen pr. måned (cbm)', get: (b) => b.totalVolumeCbm.toLocaleString('da-DK') + ' cbm' },
    { label: 'Pris pr. cbm', get: (b) => fmtDkk2(b.dkkPerCbm) },
  ]

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-slate-500">
            <th className="px-4 py-3 font-medium">Sammenligning</th>
            {offers.map((o) => (
              <th key={o.name} className="px-4 py-3 font-medium">
                {o.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
              <td className="px-4 py-2 text-slate-600">{row.label}</td>
              {offers.map((o) => (
                <td key={o.name} className="px-4 py-2 tabular-nums text-slate-700">
                  {row.get(o.b)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t-2 border-slate-200 bg-blue-50/50">
            <td className="px-4 py-3 font-semibold text-slate-800">Total DKK / md (valgt bedst)</td>
            {offers.map((o) => (
              <td
                key={o.name}
                className={`px-4 py-3 text-base font-bold tabular-nums ${
                  o.b.totalDkk === cheapestTotal ? 'text-green-600' : 'text-slate-700'
                }`}
              >
                {fmtDkk(o.b.totalDkk)}
                {o.b.totalDkk === cheapestTotal && <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">Billigst</span>}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
