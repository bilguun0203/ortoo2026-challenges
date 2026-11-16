import { Link, useSearchParams } from "react-router";
import { ANNS, FILES, ME, PAGE_SIZE, STUDENTS, portalGpa } from "./data";
import { AdminGrades, AdminPanel, Courses, FragLog, ProfileForms, SettingsForm, UploadForm } from "./forms";
import { K } from "./keys";
import { Button } from "./ui";

const action = "inline-flex h-9 items-center rounded-md border border-input bg-secondary px-4 text-sm font-semibold text-foreground no-underline hover:border-primary hover:text-primary";

export function Dashboard() {
  const me = STUDENTS.find((s) => s.sid === ME)!;
  return (
    <div className="space-y-6">
      <FragLog />
      <h1 data-k={K["dash.greet"]} className="font-heading text-2xl">Сайн байна уу, {STUDENTS[1].name}</h1>{/* greets another student */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[["Бүртгэлтэй хөтөлбөр", me.program], ["Оюутны код", me.sid], ["Төлөв", "Идэвхтэй суралцагч"]].map(([a, b]) => (
          <div key={a} data-k={K[`dash.stat.${a}`]} className="rounded-md border bg-card p-4"><p className="text-xs tracking-wide text-muted-foreground uppercase">{a}</p><p className="mt-1 text-lg font-semibold">{b}</p></div>
        ))}
      </div>
      <section className="space-y-3 rounded-md border bg-card p-4">
        <h2 className="font-heading text-base">Шуурхай үйлдэл</h2>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" data-k={K["dash.transcript"]}>Дүнгийн хуудас татах (PDF)</Button>
          <Link to="/m4/announcements" data-k={K["dash.register"]} className={action}>Хичээл бүртгүүлэх</Link>
          <Link to="/m4/profile" data-k={K["dash.profile"]} className={action}>Профайл засах</Link>
          <Link to="/m4/files" data-k={K["dash.files"]} className={action}>Файл үзэх</Link>
        </div>
      </section>
      <section className="space-y-2 rounded-md border bg-card p-4">
        <h2 className="font-heading text-base">Сүүлийн зарлал</h2>
        <ul className="divide-y text-sm">
          {ANNS.slice(-3).map((a) => <li key={a.id} className="flex justify-between gap-3 py-2"><Link to="/m4/announcements" data-k={K[`dash.ann.${a.id}`]}>{a.title}</Link><span className="shrink-0 text-xs text-muted-foreground">{a.date}</span></li>)}
        </ul>
      </section>
    </div>
  );
}

export function CoursesPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl">Хичээл бүртгэл</h1>
      <Courses />
    </div>
  );
}

export function Profile() {
  const [sp] = useSearchParams();
  const sid = sp.get("sid");
  const me = STUDENTS.find((s) => s.sid === ME)!;
  const s = STUDENTS.find((x) => x.sid === sid) ?? me;
  const own = s.sid === ME;
  const credits = s.transcript.reduce((n, r) => n + r[2], 0);
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl">{s.name} <span className="text-sm font-normal text-muted-foreground">{s.sid} · {s.program}</span></h1>
      {own ? (
        <>
          <ProfileForms email={s.email} phone={s.phone} address={s.address} />
          <p data-k={K["profile.private"]} className="rounded-md border bg-card p-4 text-sm">Тэтгэлэг: {s.scholarship ?? "байхгүй"} · Сахилгын тэмдэглэл: {s.note ?? "байхгүй"}</p>
        </>
      ) : (
        <section data-k={K["profile.other"]} className="space-y-1 rounded-md border bg-card p-4 text-sm">
          <h2 className="font-heading text-base">Оюутны мэдээлэл</h2>
          <p>Имэйл: {s.email} · Утас: {s.phone}</p>
          <p>Хаяг: {s.address}</p>
          <p>Тэтгэлэг: {s.scholarship ?? "байхгүй"} · Сахилгын тэмдэглэл: {s.note ?? "байхгүй"}</p>
        </section>
      )}
      <section className="space-y-2 rounded-md border bg-card p-4">
        <h2 className="font-heading text-base">Дүнгийн хуудас</h2>
        <table data-k={K["profile.transcript"]} className="w-full text-left text-sm">
          <thead className="text-xs text-muted-foreground"><tr className="border-b">{["Код", "Хичээл", "Кредит", "Үнэлгээ"].map((h) => <th key={h} className="py-2 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y">
            {s.transcript.map((r) => <tr key={r[0]}><td className="py-2 font-mono">{r[0]}</td><td>{r[1]}</td><td>{r[2]} кр</td><td>{r[3]}</td></tr>)}
          </tbody>
        </table>
        <p className="text-sm font-semibold">Нийт кредит: {credits}</p>
        <p data-k={K["profile.gpa"]} className="text-sm font-semibold">Голч дүн (GPA): {portalGpa(s.transcript).toFixed(2)}</p>
      </section>
      <section className="space-y-1 rounded-md border bg-card p-4 text-sm">
        <h2 className="font-heading text-base">Бүлгийн гишүүд</h2>
        <ul className="flex flex-wrap gap-2">
          {STUDENTS.map((x) => <li key={x.sid}><Link to={`/m4/profile?sid=${x.sid}`} data-k={K[`profile.member.${x.sid}`]} className="inline-block rounded-md border px-3 py-1.5 text-foreground no-underline hover:border-primary hover:text-primary">{x.name}</Link></li>)}
        </ul>
      </section>
    </div>
  );
}

export function Files() {
  const [sp] = useSearchParams();
  const id = sp.get("f");
  const f = FILES.find((x) => x.id === id);
  const shown = f && FILES.find((x) => x.id === (f.previewOf ?? f.id));
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl">Файл ба материал</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <ul className="divide-y rounded-md border bg-card">
          {FILES.filter((x) => !x.hidden).map((x) => (
            <li key={x.id} className="px-4 py-3 text-sm">
              <Link to={`/m4/files?f=${x.id}`} data-k={K[`files.open.${x.id}`]} className="font-semibold">{x.name}</Link>
              <p className="text-xs text-muted-foreground">{x.folder} · <span data-k={K[`files.size.${x.id}`]}>{x.size}</span></p>
            </li>
          ))}
        </ul>
        <div data-k={K[shown?.hidden ? "files.leak" : "files.preview"]} className="space-y-2 rounded-md border bg-card p-4">
          <h2 className="font-heading text-base">Урьдчилсан харагдац</h2>
          {shown ? <><p className="font-semibold">{shown.name}</p><p className="text-sm">{shown.text}</p></> : <p className="text-sm text-muted-foreground">Файл сонгоно уу.</p>}
        </div>
      </div>
      <UploadForm />
    </div>
  );
}

const garble = (t: string) => new TextDecoder("latin1").decode(new TextEncoder().encode(t));

export function Announcements() {
  const [sp] = useSearchParams();
  const pages = Math.ceil(ANNS.length / PAGE_SIZE);
  const page = Math.min(Math.max(1, Number(sp.get("page")) || 1), pages);
  const offset = page === 1 ? 0 : (page - 1) * PAGE_SIZE - 2;
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl">Зарлал</h1>
      <ul data-k={K["ann.list"]} className="divide-y rounded-md border bg-card">
        {ANNS.slice(offset, offset + PAGE_SIZE).map((a) => (
          <li key={a.id} data-k={K[`ann.item.${a.id}`]} className="px-4 py-3"><p className="font-semibold">{a.garbled ? garble(a.title) : a.title}</p><p className="text-xs text-muted-foreground">{a.date} · {a.author}</p></li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">Нийт {ANNS.length} зарлал · {page}/{pages} хуудас</span>
        <span className="ml-auto flex gap-1">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link key={n} to={`/m4/announcements?page=${n}`} data-k={K[`ann.page.${n}`]} aria-current={n === page ? "page" : undefined}
              className="grid size-8 place-items-center rounded-md border text-foreground no-underline hover:border-primary aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground">{n}</Link>
          ))}
        </span>
      </div>
      <AdminPanel />
    </div>
  );
}

export const SettingsPage = () => (
  <div className="space-y-4">
    <h1 className="font-heading text-2xl">Тохиргоо</h1>
    <SettingsForm />
  </div>
);

export function Admin() {
  return (
    <div data-k={K["admin.page"]} className="space-y-4">
      <h1 className="font-heading text-2xl">Админ самбар</h1>
      <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">Зөвхөн системийн админд зориулсан хэсэг.</p>
      <table className="w-full rounded-md border bg-card text-left text-sm">
        <thead className="text-xs text-muted-foreground"><tr className="border-b">{["Код", "Нэр", "Хөтөлбөр", "GPA"].map((h) => <th key={h} className="px-4 py-2 font-medium">{h}</th>)}</tr></thead>
        <tbody className="divide-y">
          {STUDENTS.map((s) => <tr key={s.sid}><td className="px-4 py-2 font-mono">{s.sid}</td><td>{s.name}</td><td>{s.program}</td><td>{portalGpa(s.transcript).toFixed(2)}</td></tr>)}
        </tbody>
      </table>
      <AdminGrades />
    </div>
  );
}

export const LostFound = () => (
  <div className="space-y-2 rounded-md border bg-card p-4">
    <h1 className="font-heading text-2xl">Олдсон эд зүйлс</h1>
    <p className="text-sm text-muted-foreground">Эзэнгүй нэг код олдлоо. Платформын нууц кодын талбарт оруулаарай.</p>
    <p className="font-mono text-lg font-semibold">EGG-M4-1206</p>
  </div>
);
