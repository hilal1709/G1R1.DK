export default function BatikPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="batik-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Motif Kawung - Traditional Javanese Pattern */}
          <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="75" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="25" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="75" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="1.5"/>

          {/* Decorative dots */}
          <circle cx="50" cy="25" r="2" fill="currentColor"/>
          <circle cx="50" cy="75" r="2" fill="currentColor"/>
          <circle cx="25" cy="50" r="2" fill="currentColor"/>
          <circle cx="75" cy="50" r="2" fill="currentColor"/>

          {/* Corner ornaments */}
          <path d="M 0 0 Q 5 5 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M 100 0 Q 95 5 100 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M 0 100 Q 5 95 0 90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M 100 100 Q 95 95 100 90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik-pattern)" />
    </svg>
  );
}
