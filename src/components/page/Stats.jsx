import { useEffect, useState } from "react";

const STATS = [
  { label: "Years Experience", value: 2 },
  { label: "Projects Completed", value: 5 },
  { label: "Happy Clients", value: 10 },
  { label: "Technologies", value: 5 },
];

function Counter({ value }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const dur = 1500;
    const start = performance.now();
    let raf = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span>{n}+</span>;
}

export default function Stats() {
  return (
    <section className="px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold">
              <Counter value={s.value} />
            </p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
