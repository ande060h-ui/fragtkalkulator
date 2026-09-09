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
    { label: 'Lokale gebyrer / trucking', get: (b) => fmtDkk2(b.localFeesDkk) },
    { label: 'Kostpris pr. måned', get: (b) => fmtDkk(b.costPriceMonthDkk) },
    { label: 'LEA Express avance', get: (b) => fmtDkk(b.marginDkk) },
    { label: 'Volumen pr. måned', get: (b) => b.totalVolumeCbm.toLocaleString('da-DK') + ' cbm' },
    { label: 'Pris pr. cbm', get: (b) => fmtDkk2(b.dkkPerCbm) },
  ]

  return (
    <div className="overflow-x-auto border border-ink/20 bg-paper-raised">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="px-4 py-3 text-left font-display text-base font-semibold text-ink">Sammenligning</th>
            {offers.map((o) => (
              <th key={o.name} className="px-4 py-3 text-left font-display text-base font-semibold text-ink">
                {o.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-rule/60">
              <td className="px-4 py-2 text-ink-soft">{row.label}</td>
              {offers.map((o) => (
                <td key={o.name} className="px-4 py-2 text-right font-mono tabular-nums text-ink">
                  {row.get(o.b)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t-2 border-ink">
            <td className="px-4 py-3 font-display text-base font-semibold text-ink">Total DKK / md</td>
            {offers.map((o) => (
              <td key={o.name} className="px-4 py-3 text-right">
                <span className={`font-mono text-base font-semibold tabular-nums ${o.b.totalDkk === cheapestTotal ? 'text-marine' : 'text-ink'}`}>
                  {fmtDkk(o.b.totalDkk)}
                </span>
                {o.b.totalDkk === cheapestTotal && (
                  <span className="ml-2 inline-block -rotate-3 border border-marine px-1.5 py-0.5 font-display text-[10px] font-bold tracking-wide text-marine">
                    BEDSTE PRIS
                  </span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
