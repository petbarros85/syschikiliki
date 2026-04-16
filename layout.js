export const metadata = {
  title: "Sistema Buffet",
  description: "Gestão completa do buffet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
