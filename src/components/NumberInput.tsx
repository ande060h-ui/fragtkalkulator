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
    <label className="flex items-center justify-between gap-3 py-1 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="flex items-center gap-1">
        <input
          type="number"
          className="w-24 rounded border border-slate-300 px-2 py-1 text-right text-sm tabular-nums focus:border-blue-500 focus:outline-none"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          min={min}
          onChange={(e) => onChange(e.target.value === '' ? 0 : parseFloat(e.target.value))}
        />
        {suffix && <span className="w-10 text-xs text-slate-400">{suffix}</span>}
      </span>
    </label>
  )
}
