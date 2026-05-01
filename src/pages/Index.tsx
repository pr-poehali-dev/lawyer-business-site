import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/files/1c86a162-60ec-4a68-8b04-b7f36c6721d3.jpg";
const LAWYER_IMG = "https://cdn.poehali.dev/projects/30f39cb8-21e6-4c97-bb68-43a5e6ae7b05/files/40a1ea20-84b1-484c-86c8-315117f70099.jpg";

const ACCENT = "hsl(var(--gold))"; // grey accent (mapped via CSS var)

const lawyers = [
  {
    id: 1,
    name: "Андрей Смирнов",
    title: "Партнёр, адвокат",
    specialization: "Гражданское право",
    experience: "18 лет практики",
    education: "МГУ им. Ломоносова, юридический факультет",
    description:
      "Специализируется на сложных корпоративных спорах, защите прав собственности и договорных отношениях. Представлял интересы клиентов в судах всех инстанций.",
    cases: 340,
    img: LAWYER_IMG,
  },
  {
    id: 2,
    name: "Елена Волкова",
    title: "Партнёр, адвокат",
    specialization: "Административное право",
    experience: "14 лет практики",
    education: "МГЮА им. Кутафина",
    description:
      "Ведёт дела, связанные с обжалованием решений государственных органов, административными нарушениями и защитой прав предпринимателей.",
    cases: 280,
    img: LAWYER_IMG,
  },
];

const services = [
  { icon: "Scale", title: "Гражданские споры", desc: "Защита интересов в имущественных, наследственных и семейных делах" },
  { icon: "Building2", title: "Административные дела", desc: "Обжалование решений госорганов, административные правонарушения" },
  { icon: "FileText", title: "Договорная работа", desc: "Составление, анализ и сопровождение договоров любой сложности" },
  { icon: "Briefcase", title: "Корпоративное право", desc: "Регистрация, реорганизация, сделки M&A, корпоративные конфликты" },
  { icon: "Home", title: "Недвижимость", desc: "Сделки с недвижимостью, земельные споры, долевое строительство" },
  { icon: "Shield", title: "Защита прав", desc: "Представительство интересов физических и юридических лиц в суде" },
];

const cases = [
  { category: "Гражданское", title: "Взыскание задолженности по договору поставки", sum: "12,4 млн ₽", result: "Выиграно", year: "2024" },
  { category: "Административное", title: "Обжалование отказа в выдаче лицензии", sum: "—", result: "Выиграно", year: "2024" },
  { category: "Гражданское", title: "Раздел совместно нажитого имущества", sum: "8,7 млн ₽", result: "Выиграно", year: "2023" },
  { category: "Административное", title: "Отмена штрафа ФАС на предприятие", sum: "3,2 млн ₽", result: "Выиграно", year: "2023" },
  { category: "Корпоративное", title: "Защита прав акционера при допэмиссии", sum: "—", result: "Выиграно", year: "2023" },
  { category: "Недвижимость", title: "Признание права собственности на объект", sum: "15 млн ₽", result: "Выиграно", year: "2022" },
];

const prices = [
  { title: "Устная консультация", price: "от 5 000 ₽", desc: "До 60 минут, анализ ситуации и рекомендации" },
  { title: "Письменное заключение", price: "от 15 000 ₽", desc: "Правовой анализ документов с письменным ответом" },
  { title: "Составление договора", price: "от 10 000 ₽", desc: "Разработка договора под вашу ситуацию" },
  { title: "Представительство в суде", price: "от 50 000 ₽", desc: "Ведение дела в суде первой инстанции" },
  { title: "Сопровождение сделки", price: "от 25 000 ₽", desc: "Полное юридическое сопровождение сделки" },
  { title: "Абонентское обслуживание", price: "от 30 000 ₽/мес", desc: "Комплексное юридическое обслуживание бизнеса" },
];

const faqs = [
  {
    q: "Как проходит первая консультация?",
    a: "На первой встрече мы изучаем вашу ситуацию, задаём уточняющие вопросы и даём предварительную оценку перспектив дела. Это занимает 45–60 минут. Вы можете записаться онлайн или позвонить нам.",
  },
  {
    q: "Сколько времени занимает судебное дело?",
    a: "Продолжительность зависит от сложности дела и инстанций. Как правило, суд первой инстанции занимает 3–6 месяцев. Мы честно информируем о реальных сроках с первой встречи.",
  },
  {
    q: "Работаете ли вы с физическими лицами?",
    a: "Да, мы консультируем и ведём дела как для физических лиц, так и для бизнеса — ИП и юридических лиц любых организационных форм.",
  },
  {
    q: "Можно ли провести консультацию онлайн?",
    a: "Да, проводим консультации по видеосвязи или телефону. Для первичной встречи рекомендуем личный визит, однако это не обязательно.",
  },
  {
    q: "Как формируется стоимость услуг?",
    a: "Стоимость зависит от сложности дела, объёма работ и срочности. После первичной консультации мы предоставляем точный расчёт и согласовываем условия до начала работы.",
  },
  {
    q: "Даёте ли гарантии результата?",
    a: "Мы честны с клиентами: гарантировать судебный результат не может ни один юрист. Однако мы гарантируем профессиональный подход, полную прозрачность и защиту ваших интересов на каждом этапе.",
  },
];

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  useReveal();

  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState({ lawyer: "", date: "", time: "", name: "", phone: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [contact, setContact] = useState({ name: "", phone: "", message: "" });
  const [contactDone, setContactDone] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const navItems = [
    { id: "about", label: "О нас" },
    { id: "services", label: "Услуги" },
    { id: "cases", label: "Дела" },
    { id: "prices", label: "Цены" },
    { id: "faq", label: "FAQ" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "cases", "prices", "faq", "contacts"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = (e: React.FormEvent) => { e.preventDefault(); setBookingDone(true); };
  const handleContact = (e: React.FormEvent) => { e.preventDefault(); setContactDone(true); };

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    if (d.getDay() === 0 || d.getDay() === 6) return null;
    return d;
  }).filter(Boolean) as Date[];

  const formatDate = (d: Date) =>
    d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", weekday: "short" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--cream))", color: "hsl(var(--text-primary))", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "hsl(var(--navy))", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

          {/* Logo + name */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group">
            <img
              src={LOGO_URL}
              alt="Логотип"
              className="w-10 h-10 object-contain"
              style={{ filter: "invert(1) brightness(0.85)", mixBlendMode: "screen" }}
            />
            <div className="hidden sm:flex flex-col items-start">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "white", fontSize: 17, fontWeight: 600, lineHeight: 1.1, letterSpacing: "0.03em" }}>
                Гречко и Партнёры
              </span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 1 }}>
                Юридические услуги
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link text-xs font-medium tracking-widest uppercase transition-colors"
                style={{ color: activeNav === item.id ? ACCENT : "rgba(255,255,255,0.55)" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("booking")}
            className="hidden lg:block px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-opacity hover:opacity-80"
            style={{ border: "1px solid rgba(255,255,255,0.35)", color: "white" }}
          >
            Записаться
          </button>

          {/* Contact info — desktop */}
          <div className="hidden lg:flex flex-col items-end">
            <a href="tel:+79528137492" className="text-xs font-medium text-white hover:opacity-70 transition-opacity" style={{ letterSpacing: "0.03em" }}>
              +7 952 813-74-92
            </a>
            <a href="mailto:krasnodarlaw23@yandex.ru" className="text-xs mt-0.5 hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}>
              krasnodarlaw23@yandex.ru
            </a>
          </div>

          {/* Contact info — mobile (left of burger) */}
          <div className="lg:hidden flex flex-col items-end">
            <a href="tel:+79528137492" className="text-xs font-medium text-white hover:opacity-70 transition-opacity" style={{ letterSpacing: "0.02em" }}>
              +7 952 813-74-92
            </a>
            <a href="mailto:krasnodarlaw23@yandex.ru" className="text-xs mt-0.5 hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}>
              krasnodarlaw23@yandex.ru
            </a>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ backgroundColor: "hsl(var(--navy-light))", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="text-left text-xs font-medium tracking-widest uppercase py-1"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  {item.label}
                </button>
              ))}
              <button onClick={() => scrollTo("booking")}
                className="mt-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "white" }}>
                Записаться на консультацию
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-16" style={{ backgroundColor: "hsl(var(--navy))" }}>
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,1) 60px, rgba(255,255,255,1) 61px)" }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16">

            {/* Logo large */}
            <div className="hidden lg:flex flex-shrink-0 items-center justify-center w-64 h-64 opacity-20">
              <img src={LOGO_URL} alt="Герб" className="w-full h-full object-contain" style={{ filter: "invert(1)", mixBlendMode: "screen" }} />
            </div>

            <div className="max-w-2xl text-center lg:text-left">
              <p className="animate-fade-in opacity-0 text-xs tracking-[0.35em] uppercase mb-6"
                style={{ color: ACCENT, animationFillMode: "forwards" }}>
                Юридическая практика · Краснодар
              </p>
              <h1 className="animate-fade-in opacity-0 text-white leading-[1.05] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 7vw, 5.5rem)", animationDelay: "0.1s", animationFillMode: "forwards" }}>
                Гречко<br />и Партнёры
              </h1>
              <p className="animate-fade-in opacity-0 text-base tracking-[0.2em] uppercase mb-8"
                style={{ color: "rgba(255,255,255,0.35)", animationDelay: "0.15s", animationFillMode: "forwards" }}>
                Юридические услуги
              </p>
              <p className="animate-fade-in opacity-0 text-base leading-relaxed max-w-lg mb-12"
                style={{ color: "rgba(255,255,255,0.5)", animationDelay: "0.2s", animationFillMode: "forwards" }}>
                Профессиональная юридическая помощь в области гражданского и административного права. Более 600 успешных дел за 18 лет практики.
              </p>
              <div className="animate-fade-in opacity-0 flex flex-wrap gap-4"
                style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                <button onClick={() => scrollTo("booking")}
                  className="px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-200"
                  style={{ backgroundColor: "white", color: "hsl(var(--navy))" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(var(--cream-dark))")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}>
                  Записаться на консультацию
                </button>
                <button onClick={() => scrollTo("services")}
                  className="px-8 py-4 text-sm font-medium tracking-wider uppercase transition-colors hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.22)", color: "white" }}>
                  Наши услуги
                </button>
              </div>

              <div className="animate-fade-in opacity-0 flex gap-12 mt-16 pt-10"
                style={{ borderTop: "1px solid rgba(255,255,255,0.09)", animationDelay: "0.5s", animationFillMode: "forwards" }}>
                {[["18+", "лет практики"], ["600+", "дел решено"], ["2", "партнёра"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: "white", lineHeight: 1 }}>{num}</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors"
          style={{ color: "rgba(255,255,255,0.25)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
          <span className="text-xs tracking-widest uppercase">Листайте</span>
          <Icon name="ChevronDown" size={18} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-32" style={{ backgroundColor: "hsl(var(--cream))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>О специалистах</p>
            <h2 className="gold-line" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,4rem)", color: "hsl(var(--navy))" }}>
              Опыт и профессионализм
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {lawyers.map((l, i) => (
              <div key={l.id} className={`reveal ${i === 1 ? "md:mt-12" : ""}`}>
                <div className="group overflow-hidden" style={{ backgroundColor: "white", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
                  <div className="relative overflow-hidden h-80">
                    <img src={l.img} alt={l.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,22,26,0.88) 0%, transparent 55%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{l.specialization}</p>
                      <h3 className="text-white font-semibold text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{l.name}</h3>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{l.title}</p>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--text-secondary))" }}>{l.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-6" style={{ borderTop: "1px solid hsl(var(--cream-dark))" }}>
                      <div>
                        <p className="text-xs tracking-wider uppercase mb-1" style={{ color: ACCENT }}>Опыт</p>
                        <p className="text-sm font-medium" style={{ color: "hsl(var(--navy))" }}>{l.experience}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-wider uppercase mb-1" style={{ color: ACCENT }}>Дел закрыто</p>
                        <p className="text-sm font-medium" style={{ color: "hsl(var(--navy))" }}>{l.cases}+</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs tracking-wider uppercase mb-1" style={{ color: ACCENT }}>Образование</p>
                        <p className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{l.education}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-32" style={{ backgroundColor: "hsl(var(--navy))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Практика</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,4rem)", color: "white", lineHeight: 1.1 }}>
              Направления<br /><em style={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>работы</em>
            </h2>
            <div className="w-14 h-px mt-4" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3"
            style={{ border: "1px solid rgba(255,255,255,0.07)", borderRight: "none", borderBottom: "none" }}>
            {services.map((s) => (
              <div key={s.title} className="reveal group p-8 lg:p-10 transition-colors duration-300 cursor-default"
                style={{ borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", backgroundColor: "hsl(var(--navy))" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(var(--navy))")}>
                <div className="w-10 h-10 flex items-center justify-center mb-6" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  <Icon name={s.icon as "Scale"} size={16} style={{ color: "rgba(255,255,255,0.45)" }} />
                </div>
                <h3 className="text-white text-xl mb-3 transition-colors duration-200"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "white")}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 lg:py-32" style={{ backgroundColor: "hsl(var(--cream))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Результаты</p>
            <h2 className="gold-line" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,4rem)", color: "hsl(var(--navy))" }}>
              Избранные дела
            </h2>
          </div>

          <div style={{ borderTop: "1px solid hsl(var(--cream-dark))" }}>
            {cases.map((c, i) => (
              <div key={i} className="reveal flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-6 -mx-4 px-4 transition-colors duration-200"
                style={{ borderBottom: "1px solid hsl(var(--cream-dark))" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.65)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                <div className="flex-shrink-0 w-36">
                  <span className="text-xs tracking-widest uppercase px-2 py-1 inline-block"
                    style={{ backgroundColor: "hsl(var(--cream-dark))", color: "hsl(var(--navy))" }}>
                    {c.category}
                  </span>
                </div>
                <div className="flex-grow text-sm font-medium" style={{ color: "hsl(var(--navy))" }}>{c.title}</div>
                {c.sum !== "—" && (
                  <div className="flex-shrink-0 text-xl font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--text-secondary))" }}>
                    {c.sum}
                  </div>
                )}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-sm text-green-600 font-medium">{c.result}</span>
                </div>
                <div className="flex-shrink-0 text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{c.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 lg:py-32" style={{ backgroundColor: "hsl(var(--navy-light))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Стоимость</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,4rem)", color: "white", lineHeight: 1.1 }}>
              Прозрачные<br /><em style={{ color: "rgba(255,255,255,0.5)" }}>цены</em>
            </h2>
            <div className="w-14 h-px mt-4" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prices.map((p, i) => (
              <div key={p.title} className="reveal p-8 transition-transform duration-200 hover:-translate-y-1"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", animationDelay: `${i * 0.07}s` }}>
                <h3 className="font-semibold text-white mb-2 text-sm">{p.title}</h3>
                <p className="text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "white" }}>{p.price}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-8 p-6 flex items-start gap-4"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Icon name="Info" size={17} className="flex-shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Окончательная стоимость определяется индивидуально после анализа вашей ситуации. Возможна оплата в рассрочку по договорённости.
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 lg:py-32" style={{ backgroundColor: "hsl(var(--cream))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Запись</p>
            <h2 className="gold-line" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,4rem)", color: "hsl(var(--navy))" }}>
              Онлайн-запись на<br />консультацию
            </h2>
          </div>

          {bookingDone ? (
            <div className="reveal max-w-lg p-12 text-center" style={{ backgroundColor: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "hsl(var(--cream))", border: "1px solid hsl(var(--cream-dark))" }}>
                <Icon name="Check" size={26} style={{ color: "hsl(var(--navy))" }} />
              </div>
              <h3 className="text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--navy))" }}>Запись принята</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--text-secondary))" }}>
                Мы свяжемся с вами в течение рабочего дня для подтверждения времени встречи.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="reveal max-w-3xl">
              <div className="grid gap-7">
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: "hsl(var(--text-secondary))" }}>Выберите специалиста</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lawyers.map((l) => (
                      <button type="button" key={l.id} onClick={() => setBooking({ ...booking, lawyer: l.name })}
                        className="p-4 text-left flex items-center gap-4 transition-all duration-150"
                        style={{
                          border: `2px solid ${booking.lawyer === l.name ? "hsl(var(--navy))" : "hsl(var(--cream-dark))"}`,
                          backgroundColor: booking.lawyer === l.name ? "hsl(var(--cream-dark))" : "white",
                        }}>
                        <img src={l.img} alt={l.name} className="w-12 h-12 object-cover object-top flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "hsl(var(--navy))" }}>{l.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-secondary))" }}>{l.specialization}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: "hsl(var(--text-secondary))" }}>Выберите дату</label>
                  <div className="flex flex-wrap gap-2">
                    {dates.slice(0, 10).map((d, i) => {
                      const formatted = formatDate(d);
                      const active = booking.date === formatted;
                      return (
                        <button type="button" key={i} onClick={() => setBooking({ ...booking, date: formatted })}
                          className="px-3 py-2 text-xs transition-all duration-150"
                          style={{
                            border: `1px solid ${active ? "hsl(var(--navy))" : "hsl(var(--cream-dark))"}`,
                            backgroundColor: active ? "hsl(var(--navy))" : "white",
                            color: active ? "white" : "hsl(var(--text-primary))",
                            fontWeight: active ? 600 : 400,
                          }}>
                          {formatted}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: "hsl(var(--text-secondary))" }}>Время</label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((t) => {
                      const active = booking.time === t;
                      return (
                        <button type="button" key={t} onClick={() => setBooking({ ...booking, time: t })}
                          className="px-5 py-2 text-sm font-medium transition-all duration-150"
                          style={{
                            border: `1px solid ${active ? "hsl(var(--navy))" : "hsl(var(--cream-dark))"}`,
                            backgroundColor: active ? "hsl(var(--navy))" : "white",
                            color: active ? "white" : "hsl(var(--text-primary))",
                            fontWeight: active ? 600 : 400,
                          }}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Ваше имя", type: "text", placeholder: "Иван Петров" },
                    { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (900) 000-00-00" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "hsl(var(--text-secondary))" }}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={booking[f.key as "name" | "phone"]}
                        onChange={(e) => setBooking({ ...booking, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-150"
                        style={{ border: "1px solid hsl(var(--cream-dark))", backgroundColor: "white", color: "hsl(var(--text-primary))" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(var(--navy))")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(var(--cream-dark))")} />
                    </div>
                  ))}
                </div>

                <div>
                  <button type="submit"
                    className="px-10 py-4 text-sm font-semibold tracking-wider uppercase transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "hsl(var(--navy))", color: "white" }}>
                    Подтвердить запись
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-32" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Вопросы</p>
            <h2 className="gold-line" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,4rem)", color: "hsl(var(--navy))" }}>
              Часто задают
            </h2>
          </div>

          <div className="max-w-3xl">
            {faqs.map((f, i) => (
              <div key={i} className="reveal py-6"
                style={{ borderBottom: "1px solid hsl(var(--cream-dark))", borderTop: i === 0 ? "1px solid hsl(var(--cream-dark))" : "none" }}>
                <button className="w-full text-left flex items-start justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span className="text-sm font-medium leading-snug" style={{ color: "hsl(var(--navy))" }}>{f.q}</span>
                  <Icon name={activeFaq === i ? "Minus" : "Plus"} size={17} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                </button>
                {activeFaq === i && (
                  <p className="text-sm leading-relaxed mt-4 animate-fade-in" style={{ color: "hsl(var(--text-secondary))" }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 lg:py-32" style={{ backgroundColor: "hsl(var(--navy))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Контакты</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,4rem)", color: "white", lineHeight: 1.1 }}>
              Свяжитесь<br /><em style={{ color: "rgba(255,255,255,0.5)" }}>с нами</em>
            </h2>
            <div className="w-14 h-px mt-4" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
            <div className="reveal space-y-8">
              {[
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Тверская, д. 12, оф. 304" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "Email", value: "info@grechko-partners.ru" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00–19:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Icon name={c.icon as "MapPin"} size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{c.label}</p>
                    <p className="text-sm text-white">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal">
              {contactDone ? (
                <div className="p-12 text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <Icon name="CheckCircle" size={38} className="mx-auto mb-4" style={{ color: "rgba(255,255,255,0.6)" }} />
                  <h3 className="text-2xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Сообщение отправлено</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Ответим в течение рабочего дня</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  {[
                    { key: "name", label: "Имя", type: "text", placeholder: "Ваше имя" },
                    { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (900) 000-00-00" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={contact[f.key as "name" | "phone"]}
                        onChange={(e) => setContact({ ...contact, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-150 bg-transparent text-white"
                        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")} />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Сообщение</label>
                    <textarea rows={4} required placeholder="Опишите вашу ситуацию..."
                      value={contact.message}
                      onChange={(e) => setContact({ ...contact, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-150 bg-transparent text-white resize-none"
                      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")} />
                  </div>
                  <button type="submit"
                    className="w-full py-4 text-sm font-semibold tracking-wider uppercase transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "white", color: "hsl(var(--navy))" }}>
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ backgroundColor: "hsl(var(--navy-light))", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Лого" className="w-7 h-7 object-contain opacity-30" style={{ filter: "invert(1)", mixBlendMode: "screen" }} />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2024 Гречко и Партнёры. Все права защищены.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="text-xs tracking-wider uppercase transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}