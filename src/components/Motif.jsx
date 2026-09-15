/* Generated scientific motifs for the catalogue cards — helix, association
   curve, dose-response sigmoid, well plate, mass spectrum, crystal lattice,
   pathway graph, methylation lollipops, chemistry ring. Drawn rather than
   photographed so nothing is invented or unlicensed. */

const W = 300;
const H = 250;

const builders = {
  helix() {
    let a = "", b = "";
    for (let i = 0; i < 60; i++) {
      const t = i / 59, x = t * W, y = H / 2 + 40 * Math.sin(t * 6);
      a += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1) + " ";
      b += (i ? "L" : "M") + x.toFixed(1) + " " + (H / 2 - 40 * Math.sin(t * 6)).toFixed(1) + " ";
    }
    return [
      <path key="a" d={a} stroke="#fff" strokeWidth="2" fill="none" />,
      <path key="b" d={b} stroke="#fff" strokeWidth="2" fill="none" />,
    ];
  },
  curve() {
    let d = `M0 ${H - 40}`;
    for (let i = 1; i <= 48; i++) {
      const t = i / 48, x = t * W;
      const y = H - 40 - (t < 0.5
        ? 120 * (1 - Math.exp(-t * 8))
        : 120 * (1 - Math.exp(-4)) * Math.exp(-(t - 0.5) * 2.4));
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return <path d={d} stroke="#fff" strokeWidth="2.4" fill="none" />;
  },
  sigmoid() {
    let d = `M0 ${H - 40}`;
    for (let i = 1; i <= 48; i++) {
      const t = i / 48, x = t * W;
      const y = H - 40 - 120 / (1 + Math.exp(-(t - 0.5) * 12));
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return <path d={d} stroke="#fff" strokeWidth="2.4" fill="none" />;
  },
  wells() {
    const out = [];
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 14; c++)
        out.push(
          <circle key={`${r}-${c}`} cx={14 + c * 21} cy={40 + r * 32} r="6" fill="#fff"
            opacity={(r * 14 + c) % 7 === 0 ? 0.95 : 0.35} />
        );
    return out;
  },
  bars() {
    const n = 26, seed = 2.3, out = [];
    for (let i = 0; i < n; i++) {
      const h = 16 + Math.abs(Math.sin((i + 1) * seed)) * 140;
      out.push(
        <rect key={i} x={(8 + i * ((W - 16) / n)).toFixed(1)} y={(H - 24 - h).toFixed(1)}
          width={(((W - 16) / n) - 3).toFixed(1)} height={h.toFixed(1)} fill="#fff"
          opacity={i % 5 === 2 ? 0.95 : 0.4} />
      );
    }
    return out;
  },
  lattice() {
    const out = [];
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 5; j++) {
        const x = 18 + i * 38, y = 34 + j * 42;
        if (i < 7) out.push(<path key={`h${i}${j}`} d={`M${x} ${y}H${x + 38}`} stroke="#fff" strokeWidth="1.2" opacity="0.45" />);
        if (j < 4) out.push(<path key={`v${i}${j}`} d={`M${x} ${y}V${y + 42}`} stroke="#fff" strokeWidth="1.2" opacity="0.45" />);
        out.push(<circle key={`c${i}${j}`} cx={x} cy={y} r="3.6" fill="#fff" opacity={(i + j) % 4 === 0 ? 0.95 : 0.5} />);
      }
    return out;
  },
  graph() {
    const P = [[54, 64], [130, 40], [212, 74], [264, 48], [86, 150], [170, 168], [248, 142]];
    const E = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [2, 5], [1, 4]];
    return [
      ...E.map(([a, b], i) => (
        <path key={`e${i}`} d={`M${P[a][0]} ${P[a][1]} L${P[b][0]} ${P[b][1]}`} stroke="#fff" strokeWidth="1.4" opacity="0.5" />
      )),
      ...P.map((p, i) => (
        <circle key={`n${i}`} cx={p[0]} cy={p[1]} r={i % 3 === 0 ? 7 : 5} fill="#fff" opacity={i % 3 === 0 ? 0.95 : 0.6} />
      )),
    ];
  },
  lolli() {
    const hs = [96, 54, 124, 40, 84, 140, 64, 104];
    return [
      <path key="base" d={`M10 ${H - 46}H${W - 10}`} stroke="#fff" strokeWidth="1.6" opacity="0.6" />,
      ...hs.flatMap((h, i) => {
        const x = 24 + i * ((W - 48) / (hs.length - 1));
        return [
          <path key={`s${i}`} d={`M${x.toFixed(1)} ${H - 46}V${H - 46 - h}`} stroke="#fff" strokeWidth="1.4" opacity="0.55" />,
          <circle key={`d${i}`} cx={x.toFixed(1)} cy={H - 46 - h} r="6" fill="#fff" opacity={i % 3 === 0 ? 0.95 : 0.6} />,
        ];
      }),
    ];
  },
  ring() {
    const cx = W / 2, cy = H / 2 - 10, r = 52, pts = [];
    for (let i = 0; i < 6; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 3;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return [
      <path key="ring" d={`M${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L")}Z`}
        stroke="#fff" strokeWidth="2.2" fill="none" />,
      ...pts.map((p, i) => <circle key={i} cx={p[0].toFixed(1)} cy={p[1].toFixed(1)} r="5" fill="#fff" />),
    ];
  },
};

export default function Motif({ kind }) {
  const build = builders[kind] || builders.curve;
  return (
    <svg className="motif" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      {build()}
    </svg>
  );
}
