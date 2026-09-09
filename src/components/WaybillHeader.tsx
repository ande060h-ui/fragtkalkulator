export function WaybillHeader({ ref, title, mode }: { ref: string; title: string; mode: string }) {
  return (
    <div className="mb-3 flex items-start justify-between border-b-2 border-ink pb-2">
      <div>
        <h3 className="font-display text-xl font-bold leading-none text-ink">{title}</h3>
        <p className="mt-1 text-xs text-ink-soft">{mode}</p>
      </div>
      <span className="font-mono text-[11px] text-ink-soft/80">{ref}</span>
    </div>
  )
}
