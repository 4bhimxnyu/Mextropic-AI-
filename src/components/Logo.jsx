export default function Logo({ size = 22, stroke = 'currentColor' }) {
  // Mextropic mark, exported from Figma
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.30762L21.2308 18.4615H2.76923L12 2.30762Z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M12 8.76904L16.1538 15.6921H7.84615L12 8.76904Z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}
