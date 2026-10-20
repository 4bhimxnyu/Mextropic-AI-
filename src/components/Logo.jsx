export default function Logo({ size = 22, stroke = 'var(--accent-primary)' }) {
  // Mextropic mark, exported from Figma. Iteration 6 sets it in the accent.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.30762L21.2308 18.4615H2.76923L12 2.30762Z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 8.76904L16.1538 15.6921H7.84615L12 8.76904Z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}
