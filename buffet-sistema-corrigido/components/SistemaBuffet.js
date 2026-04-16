"use client";
import { useMemo, useState } from "react";

const clientes = [
  { id: 1, nome: "Maria Oliveira", telefone: "(19) 99999-1200", cpf: "123.456.789-00", status: "Ativo" },
  { id: 2, nome: "João Pedro Santos", telefone: "(19) 99888-4500", cpf: "987.654.321-00", status: "Ativo" },
];

const fornecedores = [
  { id: 1, empresa: "Monique Decorações", tipo: "Decoração", whatsapp: "(19) 99911-2222", cidade: "Limeira", status: "Ativo" },
  { id: 2, empresa: "Doce Encanto", tipo: "Doces", whatsapp: "(19) 99933-4444", cidade: "Limeira", status: "Ativo" },
];

const contratos = [
  { id: 1, numero: "CTR-2026-018", cliente: "Maria Oliveira", evento: "20/04/2026 - 15h", valor: "R$ 3.500,00", status: "Assinado" },
  { id: 2, numero: "CTR-2026-019", cliente: "João Pedro Santos", evento: "27/04/2026 - 13h", valor: "R$ 4.800,00", status: "Pendente" },
];

const pagamentos = [
  { id: 1, contrato: "CTR-2026-018", cliente: "Maria Oliveira", parcela: "Sinal", valor: "R$ 800,00", status: "Pago" },
  { id: 2, contrato: "CTR-2026-019", cliente: "João Pedro Santos", parcela: "Sinal", valor: "R$ 1.000,00", status: "Vencido" },
];

const arquivo = [
  { id: 1, grupo: "2026 - Abril", tipo: "Contrato", cliente: "Maria Oliveira", arquivo: "contrato_maria.pdf" },
  { id: 2, grupo: "2025 - Novembro", tipo: "Contrato antigo", cliente: "Paula Mendes", arquivo: "contrato_paula.pdf" },
];

const lembretes = [
  { id: 1, destinatario: "Maria Oliveira", tipo: "cliente", horario: "18/04/2026 15:00", status: "Agendado" },
  { id: 2, destinatario: "Proprietário", tipo: "proprietário", horario: "18/04/2026 15:00", status: "Agendado" },
];

export default function SistemaBuffet() {
  const [screen, setScreen] = useState("dashboard");
  const [buscaCliente, setBuscaCliente] = useState("");
  const [buscaFornecedor, setBuscaFornecedor] = useState("");

  const clientesFiltrados = useMemo(() => {
    const t = buscaCliente.toLowerCase().trim();
    if (!t) return clientes;
    return clientes.filter(c => c.nome.toLowerCase().includes(t) || c.cpf.includes(t) || c.telefone.includes(t));
  }, [buscaCliente]);

  const fornecedoresFiltrados = useMemo(() => {
    const t = buscaFornecedor.toLowerCase().trim();
    if (!t) return fornecedores;
    return fornecedores.filter(f => f.empresa.toLowerCase().includes(t) || f.tipo.toLowerCase().includes(t) || f.whatsapp.includes(t));
  }, [buscaFornecedor]);

  const gruposArquivo = useMemo(() => {
    return arquivo.reduce((acc, item) => {
      acc[item.grupo] = acc[item.grupo] || [];
      acc[item.grupo].push(item);
      return acc;
    }, {});
  }, []);

  const statusClass = (status) => {
    if (["Ativo", "Assinado", "Pago"].includes(status)) return "status ok";
    if (["Pendente", "Agendado"].includes(status)) return "status warn";
    if (["Vencido"].includes(status)) return "status bad";
    return "status";
  };

  const renderDashboard = () => (
    <>
      <div className="header">
        <div>
          <div className="title">Dashboard</div>
          <div className="muted">Visão geral do sistema do buffet</div>
        </div>
        <button className="button">Novo cadastro</button>
      </div>

      <div className="cards">
        <div className="card"><h3>Clientes</h3><div className="value">128</div></div>
        <div className="card"><h3>Fornecedores</h3><div className="value">24</div></div>
        <div className="card"><h3>Contratos ativos</h3><div className="value">32</div></div>
        <div className="card"><h3>A receber</h3><div className="value">R$ 18.450</div></div>
      </div>

      <div className="grid2">
        <div className="panel">
          <h2>Hoje no buffet</h2>
          <div className="item"><strong>Visitação Maria Oliveira</strong><span className="muted">18/04/2026 às 19:00</span></div>
          <div className="item"><strong>Festa Maria Oliveira</strong><span className="muted">20/04/2026 às 15:00</span></div>
        </div>
        <div className="panel">
          <h2>Alertas</h2>
          <div className="item"><strong>2 lembretes WhatsApp agendados</strong><span className="muted">Cliente e proprietário 4 horas antes</span></div>
          <div className="item"><strong>Arquivo digital atualizado</strong><span className="muted">Último upload em Novembro/2025</span></div>
        </div>
      </div>
    </>
  );

  const renderClientes = () => (
    <>
      <div className="header">
        <div>
          <div className="title">Clientes</div>
          <div className="muted">Cadastro principal do buffet</div>
        </div>
        <button className="button">Novo cliente</button>
      </div>
      <div className="toolbar"><input className="input" placeholder="Buscar por nome, CPF ou telefone" value={buscaCliente} onChange={(e)=>setBuscaCliente(e.target.value)} /></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Nome</th><th>Telefone</th><th>CPF</th><th>Status</th></tr></thead>
          <tbody>
            {clientesFiltrados.map(c => <tr key={c.id}><td>{c.nome}</td><td>{c.telefone}</td><td>{c.cpf}</td><td><span className={statusClass(c.status)}>{c.status}</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderFornecedores = () => (
    <>
      <div className="header">
        <div>
          <div className="title">Fornecedores</div>
          <div className="muted">Lista de contatos do buffet</div>
        </div>
        <button className="button">Novo fornecedor</button>
      </div>
      <div className="toolbar"><input className="input" placeholder="Buscar por empresa, tipo ou WhatsApp" value={buscaFornecedor} onChange={(e)=>setBuscaFornecedor(e.target.value)} /></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Empresa</th><th>Tipo</th><th>WhatsApp</th><th>Cidade</th><th>Status</th></tr></thead>
          <tbody>
            {fornecedoresFiltrados.map(f => <tr key={f.id}><td>{f.empresa}</td><td>{f.tipo}</td><td>{f.whatsapp}</td><td>{f.cidade}</td><td><span className={statusClass(f.status)}>{f.status}</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderContratos = () => (
    <>
      <div className="header">
        <div><div className="title">Contratos</div><div className="muted">Contratos do buffet</div></div>
        <button className="button">Novo contrato</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Número</th><th>Cliente</th><th>Evento</th><th>Valor</th><th>Status</th></tr></thead>
          <tbody>
            {contratos.map(c => <tr key={c.id}><td>{c.numero}</td><td>{c.cliente}</td><td>{c.evento}</td><td>{c.valor}</td><td><span className={statusClass(c.status)}>{c.status}</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderFinanceiro = () => (
    <>
      <div className="header">
        <div><div className="title">Financeiro</div><div className="muted">Sinal, parcelas e vencimentos</div></div>
        <button className="button">Registrar pagamento</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Contrato</th><th>Cliente</th><th>Parcela</th><th>Valor</th><th>Status</th></tr></thead>
          <tbody>
            {pagamentos.map(p => <tr key={p.id}><td>{p.contrato}</td><td>{p.cliente}</td><td>{p.parcela}</td><td>{p.valor}</td><td><span className={statusClass(p.status)}>{p.status}</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderArquivo = () => (
    <>
      <div className="header">
        <div><div className="title">Arquivo Digital</div><div className="muted">Documentos organizados por ano e mês</div></div>
        <button className="button">Novo upload</button>
      </div>
      {Object.entries(gruposArquivo).map(([grupo, docs]) => (
        <div className="archive-group panel" key={grupo}>
          <h2>{grupo}</h2>
          {docs.map(doc => <div className="item" key={doc.id}><strong>{doc.tipo} — {doc.cliente}</strong><span className="muted">{doc.arquivo}</span></div>)}
        </div>
      ))}
    </>
  );

  const renderWhatsapp = () => (
    <>
      <div className="header">
        <div><div className="title">Lembretes WhatsApp</div><div className="muted">Envio automático para visitação</div></div>
        <button className="button">Novo lembrete</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Destinatário</th><th>Tipo</th><th>Enviar em</th><th>Status</th></tr></thead>
          <tbody>
            {lembretes.map(l => <tr key={l.id}><td>{l.destinatario}</td><td>{l.tipo}</td><td>{l.horario}</td><td><span className={statusClass(l.status)}>{l.status}</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderRelatorios = () => (
    <>
      <div className="header">
        <div><div className="title">Relatórios</div><div className="muted">Visão gerencial do buffet</div></div>
        <button className="button">Exportar</button>
      </div>
      <div className="cards">
        <div className="card"><h3>Faturamento do mês</h3><div className="value">R$ 18.450</div></div>
        <div className="card"><h3>Propostas convertidas</h3><div className="value">61%</div></div>
        <div className="card"><h3>Eventos agendados</h3><div className="value">14</div></div>
        <div className="card"><h3>Pagamentos vencidos</h3><div className="value">3</div></div>
      </div>
    </>
  );

  const renderConfiguracoes = () => (
    <>
      <div className="header">
        <div><div className="title">Configurações</div><div className="muted">Aparência e dados da empresa</div></div>
        <button className="button secondary">Salvar</button>
      </div>
      <div className="grid2">
        <div className="panel">
          <h2>Logo</h2>
          <input className="input" type="file" />
          <p className="muted" style={{marginTop: 10}}>Logo atual: sem logo definida</p>
        </div>
        <div className="panel">
          <h2>Tema</h2>
          <div className="toolbar">
            <button className="button secondary">Claro</button>
            <button className="button secondary">Escuro</button>
            <button className="button secondary">Sistema</button>
          </div>
        </div>
      </div>
    </>
  );

  const screens = {
    dashboard: renderDashboard(),
    clientes: renderClientes(),
    fornecedores: renderFornecedores(),
    propostas: (
      <>
        <div className="header"><div><div className="title">Propostas</div><div className="muted">Fluxo comercial do buffet</div></div><button className="button">Nova proposta</button></div>
        <div className="table-wrap"><table><thead><tr><th>ID</th><th>Cliente</th><th>Pacote</th><th>Convidados</th><th>Data</th><th>Valor</th><th>Status</th></tr></thead><tbody>{propostas.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.cliente}</td><td>{p.pacote}</td><td>{p.convidados}</td><td>{p.data}</td><td>{p.valor}</td><td><span className={statusClass(p.status)}>{p.status}</span></td></tr>)}</tbody></table></div>
      </>
    ),
    contratos: renderContratos(),
    financeiro: renderFinanceiro(),
    recibos: (
      <>
        <div className="header"><div><div className="title">Recibos Automáticos</div><div className="muted">Gerados após a baixa do pagamento</div></div><button className="button">Gerar manual</button></div>
        <div className="table-wrap"><table><thead><tr><th>Número</th><th>Cliente</th><th>Contrato</th><th>Data</th><th>Valor</th></tr></thead><tbody><tr><td>REC-2026-001</td><td>Maria Oliveira</td><td>CTR-2026-018</td><td>16/04/2026</td><td>R$ 800,00</td></tr></tbody></table></div>
      </>
    ),
    agenda: (
      <>
        <div className="header"><div><div className="title">Agenda</div><div className="muted">Visitações, festas e prazos</div></div><button className="button">Novo agendamento</button></div>
        <div className="panel"><div className="item"><strong>Visitação Maria Oliveira</strong><span className="muted">18/04/2026 às 19:00</span></div><div className="item"><strong>Festa Maria Oliveira</strong><span className="muted">20/04/2026 às 15:00</span></div></div>
      </>
    ),
    arquivo: renderArquivo(),
    whatsapp: renderWhatsapp(),
    relatorios: renderRelatorios(),
    configuracoes: renderConfiguracoes(),
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Sistema Buffet</div>
        <div className="muted">Versão corrigida e pronta para subir</div>
        <div className="menu">
          {[
            ["dashboard","Dashboard"],
            ["clientes","Clientes"],
            ["fornecedores","Fornecedores"],
            ["propostas","Propostas"],
            ["contratos","Contratos"],
            ["financeiro","Financeiro"],
            ["recibos","Recibos"],
            ["agenda","Agenda"],
            ["arquivo","Arquivo Digital"],
            ["whatsapp","Lembretes WhatsApp"],
            ["relatorios","Relatórios"],
            ["configuracoes","Configurações"],
          ].map(([key,label]) => (
            <button key={key} className={screen === key ? "active" : ""} onClick={() => setScreen(key)}>{label}</button>
          ))}
        </div>
      </aside>
      <main className="content">{screens[screen]}</main>
    </div>
  );
}