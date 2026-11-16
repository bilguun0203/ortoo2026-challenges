export const ME = "22B1NUM0427";
export const DAYS = ["", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];

export const CATEGORIES = [
  { value: "ui_action", label: "Товч / UI үйлдэл ажиллахгүй" },
  { value: "navigation", label: "Навигаци / чиглүүлэлт" },
  { value: "search", label: "Хайлт" },
  { value: "validation", label: "Оролтын баталгаажуулалт" },
  { value: "data_display", label: "Өгөгдөл буруу харагдах" },
  { value: "persistence", label: "Өгөгдөл хадгалалт" },
  { value: "business_logic", label: "Бизнес дүрэм / логик" },
  { value: "calculation", label: "Тооцоолол" },
  { value: "access_control", label: "Хандалтын эрх / аюулгүй байдал" },
  { value: "pagination", label: "Хуудаслалт" },
  { value: "file_handling", label: "Файлтай ажиллах" },
] as const;

export type Course = {
  code: string; title: string; credits: number; cardCredits?: number; indexed?: boolean; prereq?: string; instructor: string;
  day: number; start: string; end: string; room: string; capacity: number; enrolled: number; about: string;
};
export const COURSES: Course[] = [
  { code: "CS101", title: "Программчлалын үндэс", credits: 3, instructor: "Д. Мөнхбат", day: 2, start: "08:00", end: "09:30", room: "7-р байр 301", capacity: 60, enrolled: 48, about: "Хувьсагч, нөхцөл, давталт, функц, массив." },
  { code: "CS202", title: "Өгөгдлийн бүтэц", credits: 3, instructor: "Б. Энхжаргал", day: 1, start: "10:00", end: "11:30", room: "7-р байр 214", capacity: 45, enrolled: 37, about: "Жагсаалт, стек, мод, граф, хэш хүснэгт." },
  { code: "CS303", title: "Өгөгдлийн сангийн систем", credits: 3, indexed: false, instructor: "Г. Оюунчимэг", day: 3, start: "13:00", end: "14:30", room: "Лаб 402", capacity: 50, enrolled: 35, about: "SQL, нормчлол, transaction, индекс." },
  { code: "CS404", title: "Системийн шинжилгээ ба зохиомж", credits: 3, cardCredits: 4, instructor: "Ц. Батсүх", day: 4, start: "09:40", end: "11:10", room: "7-р байр 105", capacity: 40, enrolled: 35, about: "Шаардлага, UML загварчлал, системийн амьдралын мөчлөг." },
  { code: "AI301", title: "Хиймэл оюуны үндэс", credits: 3, instructor: "Э. Солонго", day: 1, start: "10:40", end: "12:10", room: "Лаб 408", capacity: 40, enrolled: 20, about: "Хайлтын алгоритм, машин сургалтын үндэс." },
  { code: "IS210", title: "Мэдээллийн системийн менежмент", credits: 3, instructor: "Н. Ариунаа", day: 5, start: "11:20", end: "12:50", room: "7-р байр 220", capacity: 35, enrolled: 35, about: "IT засаглал, төслийн удирдлагын үндэс." },
  { code: "SE220", title: "Програм хангамжийн тестчилгээ", credits: 2, prereq: "CS202", instructor: "О. Тэмүүлэн", day: 2, start: "08:00", end: "09:30", room: "Лаб 310", capacity: 30, enrolled: 22, about: "Тест кейс, алдааны тайлан, автомат тест." },
  { code: "MATH201", title: "Дискрет математик", credits: 3, instructor: "Ж. Ганболд", day: 3, start: "08:00", end: "07:30", room: "1-р байр 201", capacity: 70, enrolled: 51, about: "Олонлог, логик, комбинаторик, граф онол." },
];

type Row = [code: string, title: string, credits: number, grade: string, points: number];
export type Student = {
  sid: string; name: string; program: string; email: string; phone: string; address: string;
  scholarship: string | null; note: string | null; transcript: Row[];
};
export const STUDENTS: Student[] = [
  {
    sid: ME, name: "Ганзоригийн Тэмүүжин", program: "Програм хангамж", email: "temuujin.g@stud.ortoo.example", phone: "9911-2233",
    address: "Улаанбаатар, Сүхбаатар дүүрэг, 1-р хороо", scholarship: null, note: null,
    transcript: [
      ["CS100", "Компьютер тооцооллын зарчим", 3, "A", 4.0], ["MATH101", "Математик анализ I", 4, "C+", 2.3], ["ENG101", "Англи хэл I", 2, "A", 4.0],
      ["PHYS101", "Физик I", 4, "C", 2.0], ["IT102", "Веб технологийн үндэс", 3, "A-", 3.7], ["MATH102", "Шугаман алгебр", 4, "B-", 2.7],
      ["CS150", "Объект хандалтат программчлал", 3, "B+", 3.3], ["PE101", "Биеийн тамир", 1, "A", 4.0],
    ],
  },
  {
    sid: "22B1NUM0311", name: "Энхболдын Саруул", program: "Програм хангамж", email: "saruul.e@stud.ortoo.example", phone: "8800-1177",
    address: "Улаанбаатар, Баянзүрх дүүрэг, 26-р хороо", scholarship: "Ректорын нэрэмжит тэтгэлэг - 100%", note: null,
    transcript: [["CS100", "Компьютер тооцооллын зарчим", 3, "A", 4.0], ["MATH101", "Математик анализ I", 4, "A-", 3.7], ["IT102", "Веб технологийн үндэс", 3, "A", 4.0]],
  },
  {
    sid: "22B1NUM0512", name: "Түмэнбаярын Билгүүн", program: "Мэдээллийн систем", email: "bilguun.t@stud.ortoo.example", phone: "9505-6612",
    address: "Улаанбаатар, Хан-Уул дүүрэг, 15-р хороо", scholarship: null, note: "2023-11: Шалгалтын журам зөрчсөн тул сануулга өгсөн",
    transcript: [["CS100", "Компьютер тооцооллын зарчим", 3, "C+", 2.3], ["MATH101", "Математик анализ I", 4, "D", 1.0], ["IS110", "Мэдээллийн системийн үндэс", 3, "B", 3.0]],
  },
];

/** The portal's GPA: plain mean of grade points (the correct value is credit-weighted). */
export const portalGpa = (rows: Row[]) => rows.reduce((s, r) => s + r[4], 0) / rows.length;

export type PFile = { id: string; name: string; folder: string; size: string; text: string; previewOf?: string; hidden?: boolean };
export const FILES: PFile[] = [
  { id: "f01", name: "IT_Department_Guide.pdf", folder: "Тэнхимийн баримт", size: "2.4 MB", text: "Мэдээллийн технологийн тэнхимийн танилцуулга, хөтөлбөр, лабораториуд." },
  { id: "f02", name: "Lab_Safety_Rules.pdf", folder: "Тэнхимийн баримт", size: "310 KB", text: "Лабораторийн аюулгүй байдлын дүрэм." },
  { id: "f03", name: "Grade_Changes_2026.xlsx", folder: "Багшийн хавтас", size: "88 KB", hidden: true, text: "Дүн засварын бүртгэл: 22B1NUM0512 MATH101 D → B (зөвшөөрөл: хоосон)." },
  { id: "f04", name: "Staff_Contacts.xlsx", folder: "Захиргаа", size: "52 KB", hidden: true, text: "Багш, ажилтны хувийн утас, гэрийн хаяг." },
  { id: "f05", name: "System_Analysis_Syllabus.pdf", folder: "Хичээлийн материал", size: "640 KB", previewOf: "f10", text: "CS404 - Системийн шинжилгээ ба зохиомж: хөтөлбөр, долоо хоног тус бүрийн сэдэв, үнэлгээ." },
  { id: "f06", name: "Data_Structures_Lecture03.pptx", folder: "Хичээлийн материал", size: "5.1 MB", text: "CS202 - Холбоост жагсаалт ба стек." },
  { id: "f07", name: "Database_Lab02_Instructions.pdf", folder: "Хичээлийн материал", size: "420 KB", text: "CS303 - SQL JOIN-ны лабораторийн заавар." },
  { id: "f08", name: "CS404_Final_Exam_Answers.pdf", folder: "Багшийн хавтас", size: "190 KB", hidden: true, text: "CS404 улирлын шалгалтын хариу: 1-B, 2-D, 3-A, 4-C, 5-B... (зөвхөн багшид)." },
  { id: "f09", name: "Scholarship_Committee_Notes.docx", folder: "Захиргаа", size: "36 KB", hidden: true, text: "Тэтгэлгийн хорооны хурлын тэмдэглэл: нэр дэвшигчид, санал хураалт." },
  { id: "f10", name: "Student_Handbook.pdf", folder: "Оюутны гарын авлага", size: "3.2 MB", text: "Оюутны гарын авлага: сургуулийн дүрэм, шалгалтын журам, тэтгэлгийн нөхцөл." },
  { id: "f11", name: "Exam_Regulations_2026.pdf", folder: "Оюутны гарын авлага", size: "280 KB", text: "2026 оны шалгалтын журам." },
  { id: "f12", name: "Course_Withdrawal_Form.docx", folder: "Маягт", size: "NaN undefined", text: "Хичээлээс хасагдах өргөдлийн маягт." },
];

export type Ann = { id: string; title: string; date: string; author: string; garbled?: boolean };
export const ANNS: Ann[] = [
  { id: "a01", title: "Намрын улирлын хичээл бүртгэл нээгдлээ", date: "2026-10-12", author: "Сургалтын алба" },
  { id: "a02", title: "IT Adventure Challenge 2026 - бүртгэл", date: "2026-10-11", author: "Оюутны холбоо" },
  { id: "a03", title: "Портал системийн шинэчлэл", date: "2026-10-10", author: "Системийн админ" },
  { id: "a04", title: "Ректорын нэрэмжит тэтгэлэгт материал хүлээн авна", date: "2026-10-09", author: "Оюутны хөгжлийн төв" },
  { id: "a05", title: "Номын сангийн цагийн хуваарь өөрчлөгдлөө", date: "2026-10-08", author: "Номын сан" },
  { id: "a06", title: "CS303 лабораторийн өрөө солигдлоо", date: "2026-10-07", author: "Г. Оюунчимэг" },
  { id: "a07", title: "Хакатон: Ухаалаг кампус", date: "2026-10-06", author: "Инновацын клуб", garbled: true },
  { id: "a08", title: "Төлөвлөгөөт засвар: 10/05 02:00–04:00", date: "2026-10-05", author: "Системийн админ" },
];
export const PAGE_SIZE = 5;
