interface Props {
  label: string
  value: number
  onChange: (v: number) => void
  suffix?: string
  step?: number
  min?: number
}

export function NumberInput({ label, value, onChange, suffix, step = 1, min = 0 }: Props) {
  return (
    <div className="flex items-baseline gap-2 py-1.5 text-sm">
      <span className="whitespace-nowrap text-ink-soft">{label}</span>
      <span
        aria-hidden
        className="h-[1em] flex-1 border-b border-dotted border-rule translate-y-[3px]"
      />
      <span className="flex items-baseline gap-1.5">
        <input
          type="number"
          aria-label={label}
          className="w-[5.5rem] border-b border-ink/20 bg-transparent text-right font-mono text-sm tabular-nums text-ink focus:border-rust focus:outline-none"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          min={min}
          onChange={(e) => onChange(e.target.value === '' ? 0 : parseFloat(e.target.value))}
        />
        {suffix && <span className="w-9 shrink-0 font-mono text-xs text-ink-soft">{suffix}</span>}
      </span>
    </div>
  )
}
