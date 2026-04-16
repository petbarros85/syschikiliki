
"use client";
import { useState } from "react";

export default function SistemaBuffet() {
  const [screen, setScreen] = useState("dashboard");

  return (
    <div style={{display:"flex", minHeight:"100vh", fontFamily:"Arial"}}>

      <aside style={{width:250, background:"#111", color:"#fff", padding:20}}>
        <h2>Sistema Buffet</h2>
        <div style={{marginTop:20}}>
          <button onClick={()=>setScreen("dashboard")}>Dashboard</button><br/>
          <button onClick={()=>setScreen("clientes")}>Clientes</button><br/>
          <button onClick={()=>setScreen("fornecedores")}>Fornecedores</button><br/>
          <button onClick={()=>setScreen("contratos")}>Contratos</button>
        </div>
      </aside>

      <main style={{flex:1, padding:20}}>
        {screen === "dashboard" && <h1>Dashboard</h1>}
        {screen === "clientes" && <h1>Clientes</h1>}
        {screen === "fornecedores" && <h1>Fornecedores</h1>}
        {screen === "contratos" && <h1>Contratos</h1>}
      </main>

    </div>
  );
}
