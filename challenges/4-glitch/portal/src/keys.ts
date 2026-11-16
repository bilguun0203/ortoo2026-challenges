const P: number[] = [];
for (let n = 2; P.length < 64; n++) if (P.every((p) => n % p)) P.push(n);
const fr = (x: number) => ((x - Math.floor(x)) * 2 ** 32) | 0;
const KK = P.map((p) => fr(Math.cbrt(p)));
const rr = (x: number, n: number) => (x >>> n) | (x << (32 - n));

export function sha256(s: string) {
  const m = new TextEncoder().encode(s);
  const w = new Uint8Array(((m.length + 9 + 63) >> 6) << 6);
  w.set(m);
  w[m.length] = 128;
  const v = new DataView(w.buffer);
  v.setUint32(w.length - 4, m.length * 8);
  let h = P.slice(0, 8).map((p) => fr(Math.sqrt(p)));
  const W = new Int32Array(64);
  for (let o = 0; o < w.length; o += 64) {
    for (let i = 0; i < 64; i++) {
      if (i < 16) W[i] = v.getInt32(o + i * 4);
      else {
        const a = W[i - 15], b = W[i - 2];
        W[i] = W[i - 16] + (rr(a, 7) ^ rr(a, 18) ^ (a >>> 3)) + W[i - 7] + (rr(b, 17) ^ rr(b, 19) ^ (b >>> 10));
      }
    }
    let [a, b, c, d, e, f, g, x] = h;
    for (let i = 0; i < 64; i++) {
      const t1 = x + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & f) ^ (~e & g)) + KK[i] + W[i];
      const t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c));
      x = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h = h.map((y, i) => (y + [a, b, c, d, e, f, g, x][i]) | 0);
  }
  return h.map((y) => (y >>> 0).toString(16).padStart(8, "0")).join("");
}

export const key = (id: string) => sha256("ortoo2026" + id).slice(0, 10);
/** K["some.element.id"] -> data-k */
export const K: Record<string, string> = new Proxy({}, { get: (_, id) => key(String(id)) });
