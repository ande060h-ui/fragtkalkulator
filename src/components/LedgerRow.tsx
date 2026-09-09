export function LedgerRow({
  label,
  value,
  weight = 'normal',
}: {
  label: string
  value: string
  weight?: 'normal' | 'subtotal' | 'total' | 'quiet'
}) {
  const styles: Record<string, string> = {
    normal: 'text-ink-soft',
    subtotal: 'font-medium text-ink border-t border-rule/70 pt-1 mt-0.5',
    total: 'font-display text-2xl font-bold text-rust',
    quiet: 'text-xs text-ink-soft/70',
  }
  return (
    <div className={`flex items-baseline justify-between gap-3 ${weight === 'total' ? 'py-1' : 'py-0.5'} text-sm ${styles[weight]}`}>
      <span>{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  )
}
