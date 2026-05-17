import "./globals.css";

export const metadata = {
  title: "Amí Fitness - Corredores | Pré-venda do calção de corrida",
  description:
    "Entre na pré-venda do novo calção masculino de corrida AMÍ e garanta 10% OFF + Carbo Gel no lançamento.",
  openGraph: {
    title: "Amí Fitness - Corredores | Pré-venda exclusiva",
    description:
      "Calção masculino de corrida AMÍ em pré-venda limitada com 10% OFF + Carbo Gel.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
