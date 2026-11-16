import { useEffect, useRef, useState } from "react";
import { CATALOG } from "./catalog";
import { CATEGORIES } from "./data";

const W = { easy: 1, medium: 2, hard: 4 };
const TOTAL = CATALOG.reduce((s, b) => s + W[b.d], 0);
const LS = "glitch-portal";
const css = `body.reporting [data-k]:hover:not(:has([data-k]:hover)){outline:2px dashed #f59e0b;outline-offset:2px;cursor:crosshair}
[data-sel]{outline:3px solid #ef4444!important;outline-offset:2px}`;
const btn = "h-10 cursor-pointer rounded-full px-6 text-sm font-extrabold disabled:opacity-50";
const field = "h-10 w-full rounded-[10px] border-[1.5px] border-[#bfa6bb]/35 bg-[#150a1a] px-2 text-sm text-[#f7eadf] outline-none focus-visible:border-[#ffa133]";

type St = { found: number[]; wrong: number };
const load = (): St => {
  try {
    const s = JSON.parse(localStorage.getItem(LS) ?? "");
    if (Array.isArray(s.found) && typeof s.wrong === "number") return s;
  } catch { /* no storage: start fresh */ }
  return { found: [], wrong: 0 };
};

export function Reporter() {
  const [on, setOn] = useState(false);
  const [sel, setSel] = useState<{ key: string; label: string } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [st, setSt] = useState(load);
  const picked = useRef<Element | null>(null);

  useEffect(() => {
    try { localStorage.setItem(LS, JSON.stringify(st)); } catch { /* ignore */ }
  }, [st]);

  useEffect(() => {
    if (!on) return;
    document.body.classList.add("reporting");
    const h = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("[data-reporter]")) return;
      e.preventDefault();
      e.stopPropagation();
      const el = t.closest("[data-k]");
      if (!el) return;
      picked.current?.removeAttribute("data-sel");
      el.setAttribute("data-sel", "");
      picked.current = el;
      setSel({ key: el.getAttribute("data-k")!, label: (el.textContent || el.getAttribute("placeholder") || "").trim().slice(0, 40) });
      setMsg(null);
    };
    document.addEventListener("click", h, true);
    return () => {
      document.removeEventListener("click", h, true);
      document.body.classList.remove("reporting");
      picked.current?.removeAttribute("data-sel");
    };
  }, [on]);

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cat = new FormData(e.currentTarget).get("category") as string;
    const hits = CATALOG.flatMap((b, i) => (b.k.includes(sel!.key) && b.cats.includes(cat) ? [i] : []));
    const fresh = hits.find((i) => !st.found.includes(i));
    if (fresh !== undefined) { setSt({ ...st, found: [...st.found, fresh] }); setMsg("Зөв! Алдаа бүртгэгдлээ."); }
    else if (hits.length) setMsg("Энэ алдааг аль хэдийн олсон байна.");
    else { setSt({ ...st, wrong: st.wrong + 1 }); setMsg("Буруу: энэ элемент эсвэл ангилал алдаа биш байна."); }
  };

  const pts = st.found.reduce((s, i) => s + W[CATALOG[i].d], 0);
  return (
    <div data-reporter className="fixed right-4 bottom-4 z-50 flex max-w-xs flex-col items-end gap-2 text-[#f7eadf]">
      <style>{css}</style>
      {on && (
        <div className="w-72 space-y-2 rounded-md border border-white/10 bg-[#231228] p-3 text-sm shadow-xl">
          <p className="text-xs text-[#bfa6bb]">Олсон: {st.found.length}/{CATALOG.length} алдаа · {pts}/{TOTAL} оноо · Буруу: {st.wrong}</p>
          {!sel ? <p>Алдаатай гэж үзсэн элемент дээр дарна уу.</p> : (
            <form onSubmit={send} className="space-y-2">
              <p>Сонгосон: <b>{sel.label || "(нэргүй элемент)"}</b></p>
              <select name="category" required defaultValue="" className={field}>
                <option value="" disabled>Ангилал сонгох...</option>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <button type="submit" className={`${btn} bg-[#ffa133] text-[#150a1a]`}>Илгээх</button>
            </form>
          )}
          {msg && <p className="font-semibold">{msg}</p>}
          <button type="button" className="text-xs text-[#bfa6bb] underline" onClick={() => { if (confirm("Явцыг устгах уу?")) { setSt({ found: [], wrong: 0 }); setMsg(null); } }}>Дахин эхлэх</button>
        </div>
      )}
      <button type="button" className={`${btn} ${on ? "bg-[#ff4038] text-[#150a1a]" : "bg-[#ffa133] text-[#150a1a]"}`} onClick={() => { setOn(!on); setSel(null); setMsg(null); }}>
        {on ? "Мэдээлэх горимыг хаах" : "Алдаа мэдээлэх"}
      </button>
    </div>
  );
}
