"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Flag,
  Gem,
  Instagram,
  MapPin,
  MessageCircle,
  MoveRight,
  Music2,
  Phone,
  PlayCircle,
  Ruler,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  X
} from "lucide-react";

const WHATSAPP_NUMBER = "5585992468886";
const INSTAGRAM_URL = "https://www.instagram.com/ami.fitnesss";
const WBARBER_CHANNEL_URL = "https://whatsapp.com/channel/0029VbCi2aI1XquXkOvKVN1y";
const LAUNCH_DATE = new Date("2026-05-25T08:00:00-03:00");
const SHORT_PHOTO_URL = "/short-capa.jpeg";
// const TIKTOK_URL = "#";

const preorderMessage =
  "Olá! Quero entrar na pré-venda do calção masculino de corrida AMÍ e garantir acesso antecipado.";

const partnershipMessage =
  "Olá! Faço parte de um grupo de corrida e queria entender como funciona a parceria especial com a AMÍ para o calção masculino de corrida.";

const initialForm = {
  name: "",
  whatsapp: "",
  size: "M",
  color: "Preto",
  quantity: 1,
  isRunningGroupMember: false,
  runningGroupName: ""
};

const benefits = [
  {
    icon: Timer,
    title: "Construído para movimento contínuo",
    text: "Tecido com elasticidade bidirecional que não prende na passada nem deixa marcas de costura após longa distância."
  },
  {
    icon: Dumbbell,
    title: "Um short que dispensa legenda",
    text: "Silhueta pensada para quem prefere que o produto fale por si. Sem logos desnecessários, sem excesso."
  },
  {
    icon: ShieldCheck,
    title: "Cor Preto. Sem ruído.",
    text: "Paleta intencional para quem não precisa de destaque no visual. Duas cores que funcionam em qualquer rota."
  },
  {
    icon: Gem,
    title: "Acesso antes da abertura geral",
    text: "Quem entrar na lista recebe condição especial e prioridade no atendimento antes do público."
  }
];

const colors = [
  { name: "Preto", value: "#020305", border: "rgba(255,255,255,0.18)" },
];

const productSlides = [
  {
    title: "Frente",
    caption: "Foto frontal do calção.",
    mediaType: "image",
    src: "/perfil.jpeg",
    badge: "Foto 01",
    gradient: "linear-gradient(135deg,#171b22,#030405 52%,#10141c)",
    angleClass: "rotate-0 scale-100",
    logo: "ami"
  },
  {
    title: "Lado",
    caption: "Foto lateral do calção.",
    mediaType: "image",
    src: "/novolado.jpeg",
    badge: "Foto 02",
    gradient: "linear-gradient(135deg,#132c4d,#07111f 54%,#020305)",
    angleClass: "-rotate-6 scale-95 skew-x-3",
    logo: "clean"
  },
  {
    title: "Bolso",
    caption: "Detalhe do bolso e acabamento.",
    mediaType: "image",
    src: "/ladoItems.png",
    badge: "Foto 03",
    gradient: "linear-gradient(135deg,#20242b,#050608 50%,#111827)",
    angleClass: "rotate-3 scale-100",
    logo: "ami-small"
  },
  {
    title: "Corpo",
    caption: "Caimento do short no corpo em movimento.",
    mediaType: "image",
    src: "/mostragem.jpeg",
    badge: "Foto 04",
    gradient: "linear-gradient(135deg,#151820,#030405 50%,#1b1025)",
    angleClass: "-rotate-2 scale-100",
    logo: "ami-small"
  },
  {
    title: "Detalhes",
    caption: "Vídeo demonstrando o short em uso.",
    mediaType: "video",
    src: "/demonstragem.mp4",
    badge: "Vídeo",
    gradient: "linear-gradient(135deg,#050608,#0d2747 56%,#020305)",
    angleClass: "rotate-0 scale-100",
    logo: "clean"
  }
];

const fabricSpecs = [
  { label: "Poliamida", value: "88%" },
  { label: "Elastano", value: "12%" },
  { label: "Gramatura", value: "350 g" }
];

const founderVideoUrl = "/videoregis.mp4";

const sizeChart = [
  // { size: "P", number: "34/36" },
  { size: "M", number: "38/40" },
  { size: "G", number: "42/44" }
];

const initialLaunchCountdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isFinished: false,
  isReady: false
};

function getLaunchCountdown() {
  const distance = Math.max(LAUNCH_DATE.getTime() - Date.now(), 0);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return { days, hours, minutes, seconds, isFinished: distance === 0, isReady: true };
}

function whatsappUrl(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}

function buildPreorderWhatsappMessage(payload) {
  const groupInfo = payload.isRunningGroupMember
    ? `Sim${payload.runningGroupName ? ` - ${payload.runningGroupName}` : ""}`
    : "Não";

  return [
    "Olá! Quero entrar na pré-venda do calção masculino de corrida AMÍ.",
    "",
    "Dados do pedido:",
    `Nome: ${payload.name}`,
    `WhatsApp: ${payload.whatsapp}`,
    `Tamanho: ${payload.size}`,
    `Cor: ${payload.color}`,
    `Quantidade: ${payload.quantity}`,
    `Grupo de corrida: ${groupInfo}`,
    "",
    "Quero garantir meu acesso antecipado."
  ].join("\n");
}

const footerLinks = [
  { label: "Pré-venda", href: "#pre-venda" },
  { label: "Produto", href: "#produto" },
  { label: "Vídeo", href: "#video-fundador" },
  { label: "Grupos", href: "#grupos" }
];

async function submitPreorder(payload) {
  const preorderPayload = {
    name: payload.name,
    whatsapp: payload.whatsapp,
    size: payload.size,
    color: payload.color,
    quantity: Number(payload.quantity),
    isRunningGroupMember: payload.isRunningGroupMember,
    runningGroupName: payload.runningGroupName || undefined
  };

  console.info("Pré-venda AMÍ pronta para integração:", preorderPayload);

  const message = buildPreorderWhatsappMessage(preorderPayload);
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");

  return { ok: true };
}

function AmiMark() {
  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-black shadow-metal sm:h-20 sm:w-20">
      <Image
        alt="Logo Amí Fitness - Corredores"
        className="h-full w-full object-cover"
        height={160}
        priority
        src="/amimen.png"
        width={160}
      />
    </div>
  );
}

function PrimaryButton({ children, href, type = "button", className = "" }) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-white/20";

  if (href) {
    return (
      <a className={`${base} ${className}`} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${className}`} type={type}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, href, className = "" }) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/[0.06] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:border-white/35 hover:bg-white/[0.1] focus:outline-none focus:ring-4 focus:ring-white/10 ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}

function ShortMockup({ slide }) {
  if (slide.mediaType === "video") {
    return (
      <div className="relative min-h-[15rem] overflow-hidden rounded-2xl bg-black/28 sm:min-h-[18rem]">
        {slide.src ? (
          <video className="h-full min-h-[15rem] w-full object-cover sm:min-h-[18rem]" controls playsInline preload="metadata" src={slide.src}>
            Seu navegador não suporta vídeo.
          </video>
        ) : (
          <div className="grid min-h-[15rem] place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(214,217,222,0.16),transparent_30%),linear-gradient(135deg,#050608,#0d2747_55%,#020305)] p-6 text-center sm:min-h-[18rem]">
            <div>
              <PlayCircle className="mx-auto h-14 w-14 text-white/90" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Demonstração</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-300">
                Espaço reservado para o vídeo do short em movimento.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (slide.src) {
    return (
      <div className="relative min-h-[15rem] overflow-hidden rounded-2xl bg-black/28 sm:min-h-[18rem]">
        <Image alt={`Foto do short - ${slide.title}`} className="h-full min-h-[15rem] w-full object-cover sm:min-h-[18rem]" height={720} src={slide.src} width={960} />
      </div>
    );
  }

  return (
    <div className="relative grid min-h-[15rem] place-items-center rounded-2xl bg-black/28 sm:min-h-[18rem]">
      <div className="absolute h-52 w-52 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.13),transparent_68%)] sm:h-64 sm:w-64" />
      <div
        className={`shorts-shape relative h-40 w-52 border border-white/14 shadow-[0_28px_70px_rgba(0,0,0,0.65)] transition-transform duration-500 sm:h-52 sm:w-64 ${slide.angleClass}`}
        style={{ background: slide.gradient }}
      >
        <div className="absolute inset-x-0 top-0 h-12 border-b border-white/12 bg-black/40 sm:h-14" />
        <div className="absolute left-1/2 top-4 h-20 w-px -translate-x-1/2 bg-white/10 sm:h-24" />
        <div className="absolute right-6 top-16 h-12 w-11 rounded-lg border border-white/10 bg-white/[0.035] sm:right-8 sm:top-20 sm:h-16 sm:w-14" />
        <div className="absolute bottom-4 left-6 h-px w-14 bg-white/12 sm:left-8 sm:w-20" />
        <div className="absolute bottom-4 right-6 h-px w-14 bg-white/12 sm:right-8 sm:w-20" />

        {slide.logo === "ami" && (
          <div className="absolute left-6 top-16 h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/55 sm:left-8 sm:top-20">
            <Image alt="Aplicação AMÍ no short" className="h-full w-full object-cover" height={80} src="/amimen.png" width={80} />
          </div>
        )}

        {slide.logo === "ami-small" && (
          <div className="absolute bottom-9 right-9 h-7 w-7 overflow-hidden rounded-lg border border-white/10 bg-black/60">
            <Image alt="Logo AMÍ discreta" className="h-full w-full object-cover" height={56} src="/amimen.png" width={56} />
          </div>
        )}

        {slide.logo === "wbarber" && (
          <div className="absolute left-7 top-16 grid h-14 w-16 place-items-center rounded-xl border border-white/10 bg-black/70 p-1 sm:left-9 sm:top-20 sm:h-16 sm:w-20">
            <Image
              alt="Adesivo WBarber Runners no short"
              className="h-auto w-full drop-shadow-[0_0_14px_rgba(168,85,247,0.25)]"
              height={58}
              src="/runnersW.jpeg"
              width={78}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSizeButtonExpanded, setIsSizeButtonExpanded] = useState(false);
  const [isSizeDrawerOpen, setIsSizeDrawerOpen] = useState(false);
  const [activeProductSlide, setActiveProductSlide] = useState(0);
  const [launchCountdown, setLaunchCountdown] = useState(initialLaunchCountdown);
  const preorderSectionRef = useRef(null);
  const currentProductSlide = productSlides[activeProductSlide];

  const isWbarberMember = useMemo(() => {
    return form.isRunningGroupMember && form.runningGroupName.trim().toLowerCase() === "wbarber runners";
  }, [form.isRunningGroupMember, form.runningGroupName]);

  useEffect(() => {
    const preorderSection = preorderSectionRef.current;

    if (!preorderSection) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
        setIsSizeButtonExpanded(entry.isIntersecting);

        if (!entry.isIntersecting) {
          setIsSizeDrawerOpen(false);
        }
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.18
      }
    );

    observer.observe(preorderSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isFormVisible) {
      return undefined;
    }

    const retractTimer = window.setTimeout(() => {
      setIsSizeButtonExpanded(false);
    }, 3000);

    return () => window.clearTimeout(retractTimer);
  }, [isFormVisible]);

  useEffect(() => {
    setLaunchCountdown(getLaunchCountdown());

    const countdownTimer = window.setInterval(() => {
      setLaunchCountdown(getLaunchCountdown());
    }, 1000);

    return () => window.clearInterval(countdownTimer);
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    try {
      await submitPreorder(form);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const preorderForm = (
    <form className="relative rounded-[1.25rem] border border-white/10 bg-black/30 p-4 pt-8 sm:p-5 sm:pt-8" onSubmit={handleSubmit}>
      <div className="absolute -right-2 -top-5 z-10 rotate-3 rounded-2xl border border-white/20 bg-white px-3 py-2 text-left text-black shadow-[0_18px_42px_rgba(0,0,0,0.42)] sm:-right-3">
        <p className="text-[0.58rem] font-black uppercase tracking-[0.12em] text-zinc-600">Valor no</p>
        <p className="text-[0.58rem] font-black uppercase tracking-[0.12em] text-zinc-600">Lançamento</p>
        <p className="text-xl font-black leading-none">R$ 120,00</p>
        {/* <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-zinc-600">10% OFF</p> */}
      </div>

      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Acesso antecipado</p>
          <h2 className="mt-1 text-xl font-black text-white">Garanta o seu</h2>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-zinc-300">Nome</span>
          <input
            className="field"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Seu nome"
            required
            value={form.name}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-zinc-300">WhatsApp</span>
          <input
            className="field"
            inputMode="tel"
            onChange={(event) => updateField("whatsapp", event.target.value)}
            placeholder="(00) 00000-0000"
            required
            value={form.whatsapp}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-zinc-300">Tamanho</span>
          <select className="field" onChange={(event) => updateField("size", event.target.value)} value={form.size}>
            {["M", "G"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-semibold text-zinc-300">Cor</span>
          <select className="field" onChange={(event) => updateField("color", event.target.value)} value={form.color}>
            {["Preto"].map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-zinc-300">Quantidade</span>
          <input
            className="field"
            min="1"
            onChange={(event) => updateField("quantity", event.target.value)}
            required
            type="number"
            value={form.quantity}
          />
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:col-span-2">
          <input
            checked={form.isRunningGroupMember}
            className="h-5 w-5 accent-white"
            onChange={(event) => updateField("isRunningGroupMember", event.target.checked)}
            type="checkbox"
          />
          <span className="text-sm font-semibold text-zinc-200">Faço parte de um grupo de corrida</span>
        </label>
        {form.isRunningGroupMember && (
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-zinc-300">Nome do grupo</span>
            <select
              className="field"
              onChange={(event) => updateField("runningGroupName", event.target.value)}
              required
              value={form.runningGroupName}
            >
              <option value="">Selecione o grupo</option>
              <option value="Wbarber Runners">Wbarber Runners</option>
            </select>
          </label>
        )}
      </div>

      {isWbarberMember && (
        <div className="mt-4 rounded-xl border border-white/20 bg-white/[0.08] p-3 text-sm font-semibold text-zinc-100">
          Benefício de parceria identificado: adesivo exclusivo Wbarber Runners.
        </div>
      )}

      {status === "success" && (
        <div className="mt-4 rounded-xl border border-emerald-300/25 bg-emerald-400/10 p-3 text-sm font-semibold text-emerald-100">
          Você está na lista. Quando os pedidos abrirem, a AMÍ entra em contato no seu WhatsApp com acesso prioritário.
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-xl border border-red-300/25 bg-red-400/10 p-3 text-sm font-semibold text-red-100">
          Não foi possível registrar agora. Tente novamente ou fale com a AMÍ no WhatsApp.
        </div>
      )}

      <PrimaryButton className="mt-5 w-full" type="submit">
        {status === "loading" ? "Enviando..." : "Quero acesso antecipado + 10% off"} <ChevronRight className="h-4 w-4" />
      </PrimaryButton>
      <p className="mt-3 text-center text-sm leading-5 text-zinc-500">
        Prioridade no atendimento · 10% OFF · <br /> 1 Carbo Gel no lançamento.
      </p>
    </form>
  );

  return (
    <main className="min-h-screen overflow-hidden bg-graphite text-white">
      <a
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition hover:scale-105"
        href={whatsappUrl(preorderMessage)}
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <button
        aria-label="Abrir tabela de tamanhos"
        className={`fixed left-0 top-1/2 z-50 flex -translate-y-1/2 items-center gap-2 overflow-hidden rounded-r-2xl border border-l-0 border-white/15 bg-white px-3 py-3 text-black shadow-[0_18px_45px_rgba(0,0,0,0.42)] transition-all duration-500 ease-out hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-white/20 ${isFormVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
          } ${isSizeButtonExpanded ? "w-56" : "w-12"}`}
        onClick={() => {
          setIsSizeDrawerOpen(true);
          setIsSizeButtonExpanded(true);
        }}
        type="button"
      >
        <Ruler className="h-5 w-5 shrink-0" />
        <span
          className={`whitespace-nowrap text-xs font-black uppercase tracking-[0.1em] transition-all duration-500 ${isSizeButtonExpanded ? "max-w-36 opacity-100" : "max-w-0 opacity-0"
            }`}
        >
          Tabela de tamanhos
        </span>
      </button>

      <div
        className={`fixed inset-0 z-[60] transition ${isSizeDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        aria-hidden={!isSizeDrawerOpen}
      >
        <button
          aria-label="Fechar tabela de tamanhos"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${isSizeDrawerOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsSizeDrawerOpen(false)}
          type="button"
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[min(24rem,92vw)] overflow-y-auto border-r border-white/10 bg-[#050608] p-5 shadow-[30px_0_90px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out ${isSizeDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Guia rápido</p>
              <h2 className="mt-2 text-2xl font-black text-white">Tabela de tamanhos</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Medidas de referência para escolher o calção com mais segurança antes da pré-venda.
              </p>
            </div>
            <button
              aria-label="Fechar"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:bg-white/[0.12]"
              onClick={() => setIsSizeDrawerOpen(false)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-2 bg-white/[0.08] px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-zinc-300">
              <span>Tam.</span>
              <span>Numeração</span>
            </div>
            {sizeChart.map((item) => (
              <div
                className="grid grid-cols-2 border-t border-white/10 px-4 py-4 text-sm text-zinc-300"
                key={item.size}
              >
                <strong className="text-white">{item.size}</strong>
                <span>{item.number}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-midnight/40 p-4">
            <p className="text-sm font-bold text-white">Na dúvida entre dois tamanhos?</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Para corrida, escolha o tamanho que deixa a cintura firme sem apertar. Se preferir mais liberdade, vá no maior.
            </p>
          </div>

        </aside>
      </div>

      <section className="relative min-h-[92svh] px-4 pb-10 pt-5 sm:min-h-screen sm:px-8 sm:pb-14 lg:px-10">
        <div className="mesh-line absolute inset-x-0 top-0 h-96 opacity-40" />
        <div className="absolute right-[-12rem] top-20 h-[28rem] w-[28rem] rounded-full bg-navy/30 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AmiMark />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">AMÍ Fitness - Corredores</p>
                {/* Tagline no header — origem como identidade */}
                <p className="mt-1 text-sm text-zinc-500">Desenhado em Fortaleza. Feito para qualquer rota.</p>
              </div>
            </div>
            <a className="hidden text-sm font-semibold text-zinc-300 transition hover:text-white sm:block" href="#pre-venda">
              Entrar na lista
            </a>
          </header>

          <div className="grid items-start gap-7 lg:grid-cols-[0.94fr_0.82fr]">
            <div className="max-w-3xl pt-1 lg:pt-10">

              {/* HEADLINE REESCRITA — foco no tecido, não no clichê de corrida */}
              <h1 className="max-w-4xl text-[2.45rem] font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                O tecido que acompanha cada passada. O short que dispensa explicação.{" "}
                <span className="metal-text">AMÍ.</span>
              </h1>

              <div className="mt-6 max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(214,217,222,0.14),transparent_32%),linear-gradient(135deg,#050608,#0d2747_58%,#020305)]">
                  {SHORT_PHOTO_URL ? (
                    <Image
                      alt="Foto do calção masculino de corrida AMÍ"
                      className="h-full w-full object-cover"
                      height={720}
                      src={SHORT_PHOTO_URL}
                      width={960}
                    />
                  ) : (
                    <div className="grid h-full place-items-center p-6 text-center">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Foto do short</p>
                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-300">
                          Espaço reservado para a imagem principal do calção de corrida.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Lançamento</p>
                    <p className="mt-1 text-xl font-black text-white">25/05 - 08:00</p>
                  </div>
                  <p className="text-right text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    {launchCountdown.isFinished ? "Pedidos abertos" : "Contagem regressiva"}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    ["Dias", launchCountdown.days],
                    ["Horas", launchCountdown.hours],
                    ["Min", launchCountdown.minutes],
                    ["Seg", launchCountdown.seconds]
                  ].map(([label, value]) => (
                    <div className="rounded-xl border border-white/10 bg-black/28 p-3 text-center" key={label}>
                      <p className="text-2xl font-black tabular-nums text-white">
                        {launchCountdown.isReady ? String(value).padStart(2, "0") : "--"}
                      </p>
                      <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-zinc-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton className="w-full sm:w-auto" href="#pre-venda">
                  Quero acesso antecipado <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <SecondaryButton className="w-full sm:w-auto" href={whatsappUrl(preorderMessage)}>
                  <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
                </SecondaryButton>
              </div>

              {/* <div className="mt-6 grid grid-cols-3 gap-1">
                {[
                  ["Tecido", "Premium"],
                  ["Cores", "2"],
                  ["Produção", "Limitada"]
                ].map(([label, value]) => (
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3" key={label}>
                    <p className="text-[0.65rem] uppercase tracking-[0.14em] text-zinc-500">{label}</p>
                    <p className="mt-1 text-sm font-black text-zinc-100">{value}</p>
                  </div>
                ))}
              </div> */}

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="rounded-2xl border border-white/10 bg-midnight/45 p-6 sm:p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-500">Tecido premium</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight">Gramatura 40% acima do padrão comum do mercado.
                  </h3>
                  <p className="mt-4 leading-7 text-zinc-300">
                    Mais corpo no tecido, mais segurança na passada e performance máxima para treino, prova e rotina.
                  </p>
                </article>

                <div className="grid gap-3 sm:grid-cols-3">
                  {fabricSpecs.map((spec) => (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5" key={spec.label}>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{spec.label}</p>
                      <p className="mt-3 text-3xl font-black text-white">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[32rem] lg:mr-0" id="pre-venda" ref={preorderSectionRef}>
              <div className="absolute inset-x-10 top-8 h-64 rounded-full bg-blue-950/40 blur-3xl" />
              <div className="metal-surface relative overflow-hidden rounded-[1.5rem] p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <Image
                      alt="Logo Amí Fitness - Corredores metálica"
                      className="h-full w-full object-cover"
                      height={180}
                      priority
                      src="/amimen.png"
                      width={180}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Drop 01</p>
                    <h2 className="mt-1 text-2xl font-black leading-tight">Calção masculino de corrida</h2>
                    <p className="mt-1 text-sm text-zinc-400">Preto.</p>
                  </div>
                </div>
                <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 p-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Carrossel do produto</p>
                      {/* <p className="mt-1 text-sm font-bold text-white">
                        {currentProductSlide.title} · {currentProductSlide.badge}
                      </p> */}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Ver ângulo anterior"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:bg-white/[0.12]"
                        onClick={() => setActiveProductSlide((current) => (current === 0 ? productSlides.length - 1 : current - 1))}
                        type="button"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        aria-label="Ver próximo ângulo"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-200 transition hover:bg-white/[0.12]"
                        onClick={() => setActiveProductSlide((current) => (current + 1) % productSlides.length)}
                        type="button"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <ShortMockup slide={currentProductSlide} />

                  <div className="border-t border-white/10 p-3">
                    {/* <p className="text-sm leading-6 text-zinc-400">{currentProductSlide.caption}</p> */}
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {productSlides.map((slide, index) => (
                        <button
                          aria-label={`Ver ${slide.title}`}
                          className={`rounded-xl border p-2 text-center transition ${activeProductSlide === index
                            ? "border-white/35 bg-white/[0.1]"
                            : "border-white/10 bg-white/[0.035] hover:bg-white/[0.07]"
                            }`}
                          key={slide.title}
                          onClick={() => setActiveProductSlide(index)}
                          type="button"
                        >
                          <span className="block text-[0.62rem] font-black uppercase tracking-[0.1em] text-zinc-500">
                            {index + 1}
                          </span>
                          <span className="mt-1 block truncate text-[0.62rem] font-bold text-zinc-100 sm:text-xs">{slide.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {preorderForm}
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10" id="video-fundador">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-zinc-500">COMUNIDADE</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Regis W. fundador da WBarber Runners.</h2>
            <p className="mt-5 max-w-xl leading-7 text-zinc-400">
              Uma visão direta de quem corre, lidera comunidade e testou a proposta do calção masculino AMÍ na prática.
            </p>
            <PrimaryButton className="mt-7 w-full sm:w-auto" href="#pre-venda">
              Quero entrar na lista <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </div>

          <div className="metal-surface mx-auto w-full max-w-[24rem] overflow-hidden rounded-[1.5rem] p-3 lg:mr-0">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.1rem] border border-white/10 bg-black">
              {founderVideoUrl ? (
                <video className="h-full w-full object-cover" controls playsInline preload="metadata" src={founderVideoUrl}>
                  Seu navegador não suporta vídeo.
                </video>
              ) : (
                <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(214,217,222,0.16),transparent_30%),linear-gradient(135deg,#050608,#0d2747_55%,#020305)] p-6 text-center">
                  <div>
                    <PlayCircle className="mx-auto h-14 w-14 text-white/90" strokeWidth={1.5} />
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Espaço do vídeo</p>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-300">
                      Adicione aqui o vídeo do Regis W., fundador da WBarber Runners, falando das vantagens do short.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE PRODUTO — títulos reescritos com foco técnico */}
      <section className="px-5 py-16 sm:px-8 lg:px-10" id="produto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-zinc-500">Produto</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-5" key={title}>
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-midnight text-zinc-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* SEÇÃO DE GRUPOS — "comunidade fundadora" no lugar de "parceria ativa" */}
      <section className="px-5 py-16 sm:px-8 lg:px-10" id="grupos">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(13,39,71,0.55),rgba(5,6,8,0.92)_48%,rgba(86,22,128,0.26))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:p-8">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="grid min-h-40 place-items-center rounded-2xl border bg-white p-5 sm:w-52">
                <Image
                  alt="Logo WBarber Studio"
                  className="h-auto w-full max-w-44"
                  height={170}
                  src="/runnersW.jpeg"
                  width={220}
                />
              </div>

              <div className="flex-1">
                <p className="inline-flex rounded-full border border-white/15 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-black">
                  Comunidade fundadora
                </p>
                <h3 className="mt-5 text-3xl font-black leading-tight">WBarber Runners entra no lançamento.</h3>
                <p className="mt-4 leading-7 text-zinc-300">
                  Membros da WBarber Runners recebem o calção com adesivo exclusivo do grupo, sem custo adicional.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Benefício</p>
                    <p className="mt-1 text-sm font-bold text-white">Adesivo exclusivo do grupo</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Exclusivo</p>
                    <p className="mt-1 text-sm font-bold text-white">Primeira produção AMÍ</p>
                  </div>
                </div>

                <a
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-white/20 sm:w-auto"
                  href={WBARBER_CHANNEL_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MessageCircle className="h-4 w-4" />
                  Entrar na comunidade
                </a>
              </div>
            </div>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 sm:p-8">
            <Users className="h-8 w-8 text-zinc-200" />
            <h2 className="mt-5 text-3xl font-black">Parceria para grupos de corrida</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              A AMÍ está abrindo parcerias com grupos de corrida para criar condições especiais, ativações exclusivas e peças com identidade do grupo.
            </p>
          </article>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <Flag className="h-8 w-8 text-zinc-200" />
            <h2 className="mt-5 text-3xl font-black">Tem um grupo de corrida?</h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
              Se você coordena ou participa de um grupo de corrida e quer uma parceria especial com a AMÍ, chama a gente no WhatsApp. Podemos criar uma condição exclusiva para o seu grupo.
            </p>
          </div>
          <SecondaryButton className="mt-7 w-full shrink-0 lg:mt-0 lg:w-auto" href={whatsappUrl(partnershipMessage)}>
            Quero parceria para meu grupo <MoveRight className="h-4 w-4" />
          </SecondaryButton>
        </div>
      </section>

      {/* SEÇÃO FINAL — escassez reescrita com linguagem de manufatura */}
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <Sparkles className="mx-auto h-8 w-8 text-zinc-200" />
          <h2 className="mt-5 text-4xl font-black sm:text-5xl">Primeira produção. Quantidade fechada.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-400">
            A AMÍ não faz reposição imediata. A entrada na lista garante prioridade no atendimento e acesso à condição especial antes da abertura geral dos pedidos.
          </p>
          <PrimaryButton className="mt-8 w-full sm:w-auto" href="#pre-venda">
            Quero acesso antecipado + 10% off <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/45 px-5 py-12 text-zinc-200 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="metal-text text-3xl font-black tracking-normal">AMÍ FITNESS</h3>
              {/* Tagline no footer — a melhor linha do código original promovida */}
              <p className="hidden max-w-sm text-sm leading-6 text-zinc-400 md:block">
                Desenhado em Fortaleza. Feito para qualquer rota.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a
                aria-label="Instagram AMÍ"
                className="text-zinc-300 transition-colors hover:text-white"
                href={INSTAGRAM_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="h-6 w-6" />
              </a>
              {/* <a
                aria-label="TikTok AMÍ"
                className="text-zinc-300 transition-colors hover:text-white"
                href={TIKTOK_URL}
              >
                <Music2 className="h-6 w-6" />
              </a> */}
              <a
                aria-label="WhatsApp AMÍ"
                className="text-zinc-300 transition-colors hover:text-white"
                href={whatsappUrl(preorderMessage)}
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>

            <nav className="hidden flex-col space-y-2 text-right text-sm font-semibold text-zinc-400 md:flex">
              {footerLinks.map((link) => (
                <a className="transition-colors hover:text-white" href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-sm text-zinc-500">
            <div className="hidden items-center gap-2 md:flex">
              <MapPin className="h-4 w-4 text-zinc-300" />
              <span>Fortaleza — CE</span>
            </div>

            <div className="flex items-center gap-2 text-xs opacity-80 md:hidden">
              <MapPin className="h-3 w-3 text-zinc-300" />
              <span>Fortaleza — CE</span>
            </div>

            <p className="text-center opacity-80">© 2026 AMÍ Fitness — Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
