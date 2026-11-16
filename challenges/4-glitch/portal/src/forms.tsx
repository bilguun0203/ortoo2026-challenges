import { useEffect, useState } from "react";
import { Button, Input, Label } from "./ui";
import { COURSES, DAYS, type Course } from "./data";
import { K } from "./keys";

const box = "space-y-3 rounded-md border bg-card p-4";

export function FragLog() {
  useEffect(() => console.log("404:[NULL]"), []);
  return null;
}

export function Courses() {
  const [q, setQ] = useState("");
  const [mine, setMine] = useState<Course[]>([]);
  const [open, setOpen] = useState<Course | null>(null);
  const [msg, setMsg] = useState("");
  const shown = COURSES.filter((c) => c.indexed !== false && `${c.code} ${c.title} ${c.instructor}`.toLowerCase().includes(q.trim().toLowerCase()));
  const seats = (c: Course) => c.capacity - c.enrolled - mine.filter((m) => m.code === c.code).length;

  const register = (c: Course) => {
    const clash = mine.find((m) => m.code !== c.code && m.day === c.day && m.start === c.start); // only equal start times count as a clash; the same course is not a clash (M01)
    // no duplicate, seats, credit-limit (M08) or prerequisite (H08) check
    if (clash) return setMsg(`Хуваарь давхцаж байна: ${clash.code}`);
    setMine([...mine, c]);
    setMsg(`${c.code} - амжилттай бүртгэгдлээ.`);
  };

  return (
    <div className="space-y-6">
      <Input data-k={K["courses.search"]} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Хичээл хайх (код, нэр, багш)" />
      {msg && <p className="text-sm font-semibold">{msg}</p>}
      {!shown.length && <p className="text-muted-foreground">Илэрц олдсонгүй.</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {shown.map((c) => (
          <div key={c.code} data-k={K[`courses.card.${c.code}`]} className={box}>
            <h3 className="font-heading">{c.code} - {c.title}</h3>
            <p className="text-sm text-muted-foreground">
              <span data-k={K[`courses.credits.${c.code}`]}>{c.cardCredits ?? c.credits} кредит</span> ·{" "}
              <span data-k={K[`courses.seats.${c.code}`]}>Сул суудал: {seats(c)}/{c.capacity}</span>
            </p>
            <p className="text-sm text-muted-foreground">{c.instructor} · <span data-k={K[`courses.time.${c.code}`]}>{DAYS[c.day]} {c.start}–{c.end}</span> · {c.room}</p>
            {c.prereq && <p data-k={K[`courses.prereq.${c.code}`]} className="text-sm text-muted-foreground">Өмнөх холбоо: {c.prereq}</p>}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" data-k={K[`courses.more.${c.code}`]} onClick={() => setOpen(open?.code === c.code ? null : c)}>Дэлгэрэнгүй</Button>
              <Button size="sm" data-k={K[`courses.reg.${c.code}`]} onClick={() => register(c)}>Бүртгүүлэх</Button>
            </div>
            {open?.code === c.code && (
              <div data-k={K["courses.detail"]} className="border-t pt-2 text-sm">
                <p>{c.about}</p>
                <p>Кредит: {c.credits}</p>
              </div>
            )}
          </div>
        ))}
        {q.trim() === "404" && (
          <div data-k={K["courses.egg"]} className={box}>
            <h3 className="font-heading">CS404½ - Олдохгүй хичээл</h3>
            <p className="text-sm text-muted-foreground">Энэ хичээл байхгүй. Гэхдээ код нь байна: <b className="font-mono">EGG-M4-0404</b></p>
          </div>
        )}
      </div>

      <section data-k={K["courses.mine"]} className={box}>
        <h2 className="font-heading text-base">Миний бүртгэл</h2>
        {!mine.length && <p className="text-sm text-muted-foreground">Бүртгэл алга.</p>}
        <ul className="divide-y">
          {mine.map((c, i) => (
            <li key={i} className="flex items-center justify-between py-1 text-sm">
              <span>{c.code} - {c.title} ({c.credits} кр)</span>
              <Button size="xs" variant="ghost" data-k={K[`courses.drop.${c.code}`]} onClick={() => setMine(mine.slice(0, -1))}>Хасах</Button>
            </li>
          ))}
        </ul>
        <p data-k={K["courses.total"]} className="text-sm font-semibold">Нийт кредит: {mine.reduce((s, c) => s + c.credits, 0)}</p>
        <p data-k={K["courses.limit"]} className="text-xs text-muted-foreground">Улиралд дээд тал нь 15 кредит бүртгүүлнэ.</p>
      </section>

      <section data-k={K["courses.schedule"]} className={box}>
        <h2 className="font-heading text-base">Долоо хоногийн хуваарь</h2>
        <ul className="text-sm">
          {[...mine].sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)).map((c, i) => (
            <li key={i}>{DAYS[c.day]} {c.start}–{c.end} · {c.code}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Field({ id, label, ...p }: { id: string; label: string } & React.ComponentProps<"input">) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} data-k={K[id]} {...p} />
    </div>
  );
}

export function ProfileForms({ email, phone, address }: { email: string; phone: string; address: string }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <form className={box} onSubmit={(e) => { e.preventDefault(); setA("Амжилттай хадгалагдлаа."); }}>
        <h2 className="font-heading text-base">Хувийн мэдээлэл</h2>
        <Field id="profile.email" label="Имэйл" defaultValue={email} />
        <Field id="profile.phone" label="Утас" defaultValue={phone} />
        <Field id="profile.address" label="Хаяг" defaultValue={address} />
        {a && <p className="text-sm font-semibold">{a}</p>}
        <Button type="submit" data-k={K["profile.personal.save"]}>Хадгалах</Button>
      </form>
      <form className={box} onSubmit={(e) => { e.preventDefault(); setB("Яаралтай холбоо хадгалагдлаа."); }}>
        <h2 className="font-heading text-base">Яаралтай үед холбоо барих</h2>
        <Field id="profile.emergency.name" label="Нэр *" defaultValue="Ганзориг Б." />
        <Field id="profile.emergency.relation" label="Таны хэн болох" defaultValue="Эцэг" />
        <Field id="profile.emergency.phone" label="Утасны дугаар *" defaultValue="8811-4455" />
        {b && <p className="text-sm font-semibold">{b}</p>}
        <Button type="submit" data-k={K["profile.emergency.save"]}>Хадгалах</Button>
      </form>
    </div>
  );
}

export function SettingsForm() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [nu, setNu] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <form
        className={box}
        onSubmit={(e) => {
          e.preventDefault();
          setMsg("");
          setErr("");
          if (nu.length < 6) return setErr("Нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой."); // M07: 6-7 chars pass
          setMsg("Нууц үг амжилттай солигдлоо."); // the current password (M06) and the confirmation (M02) are never checked
        }}
      >
        <h2 className="font-heading text-base">Нууц үг солих</h2>
        <Field id="settings.password.current" label="Одоогийн нууц үг" type="password" />
        <Field id="settings.password.new" label="Шинэ нууц үг" type="password" value={nu} onChange={(e) => setNu(e.target.value)} />
        <Field id="settings.password.confirm" label="Баталгаажуулах" type="password" />
        {err && <p className="text-sm text-destructive">{err}</p>}
        {msg && <p className="text-sm font-semibold">{msg}</p>}
        <Button type="submit" data-k={K["settings.password.save"]}>Нууц үг солих</Button>
      </form>
      <div className={box}>
        <h2 className="font-heading text-base">Ерөнхий</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Хоёр шатлалт баталгаажуулалт</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Имэйл мэдэгдэл</label>
        <label className="flex items-center gap-2 text-sm">
          Хэл
          <select className="rounded-md border px-2 py-1 [&>option]:bg-background"><option>Монгол</option><option>English</option></select>
        </label>
      </div>
    </div>
  );
}

export function AdminPanel() {
  const [msg, setMsg] = useState("");
  return (
    <section className={box}>
      <h2 className="font-heading text-base">Админ үйлдэл</h2>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" data-k={K["ann.admin.pin"]} onClick={() => setMsg("Зарлал бүх хэрэглэгчид бэхлэгдлээ.")}>Бүх хэрэглэгчид бэхлэх</Button>
        <Button size="sm" variant="outline" data-k={K["ann.admin.delete"]} onClick={() => setMsg("Энэ үйлдлийг зөвхөн админ хийнэ.")}>Зарлалыг устгах</Button>
      </div>
      {msg && <p className="text-sm font-semibold">{msg}</p>}
    </section>
  );
}

/** Coursework upload: claims "PDF only, up to 5 MB" but accepts any file, even an empty one (M09). Nothing leaves the browser. */
export function UploadForm() {
  const [msg, setMsg] = useState("");
  return (
    <form
      data-k={K["files.upload"]}
      className={box}
      onSubmit={(e) => {
        e.preventDefault();
        const f = (e.currentTarget.elements.namedItem("file") as HTMLInputElement).files?.[0];
        setMsg(f ? `Амжилттай илгээгдлээ: ${f.name} (${f.size} байт)` : "Файл сонгоно уу.");
      }}
    >
      <h2 className="font-heading text-base">Даалгавар илгээх</h2>
      <p className="text-sm text-muted-foreground">Зөвхөн PDF файл, 5 MB хүртэл.</p>
      <Input name="file" type="file" data-k={K["files.upload.input"]} />
      {msg && <p className="text-sm font-semibold">{msg}</p>}
      <Button type="submit" data-k={K["files.upload.btn"]}>Илгээх</Button>
    </form>
  );
}

/** Hidden /m4/admin: a student can edit grades (H07). Local state only. */
export function AdminGrades() {
  const [msg, setMsg] = useState("");
  return (
    <form className={box} onSubmit={(e) => { e.preventDefault(); setMsg("Дүн амжилттай засагдлаа."); }}>
      <h2 className="font-heading text-base">Дүн засах</h2>
      <Field id="admin.grade.sid" label="Оюутны код" defaultValue="22B1NUM0427" />
      <Field id="admin.grade.course" label="Хичээл" defaultValue="PHYS101" />
      <Field id="admin.grade.value" label="Шинэ үнэлгээ" defaultValue="A" />
      {msg && <p className="text-sm font-semibold">{msg}</p>}
      <Button type="submit" data-k={K["admin.grade.save"]}>Хадгалах</Button>
    </form>
  );
}
