import axios from "axios";
import { alignPropType } from "react-bootstrap/esm/types";
import AppRoutes from "../AppRoutes";

export const api = axios.create({
  // baseURL: "http://10.3.1.214:3333",
  baseURL: process.env.REACT_APP_BACKEND,
  strictSSL: false,
});

export const apiCEP = axios.create({
  baseURL: "https://viacep.com.br",
});

export const verificaCEP = async (N_cep) => {
  const cepValido = await apiCEP.get(`/ws/${N_cep}/json`);
  return cepValido;
};
export const createSession = async (cpf, chave) => {
  //console.log({ cpf, chave });
  return api.post(
    "/logar",
    { cpf, chave },
    { headers: { "Access-Control-Allow-Origin": true } },
  );
};

export const permite_acesso = async (Npagina, Nunidade) => {
  console.log("npagina", Npagina);
  const resultado = await api.post("/permite_acesso", {
    pagina: Npagina,
    unidade: Nunidade,
  });
  console.log("resultado1", resultado.data);
  if (resultado.data === true) return true;
  else return false;
};

export const envia_CC = async (n_id) => {
  const resultado = await api.post("/sendCC", { id: n_id });
  return resultado;
};

export const lista_proventos = async (n_cpf) => {
  console.log("recebi_cpf:", n_cpf);
  const resultado = await api.post("/lista_proventos", { cpf: n_cpf });
  return resultado.data;
};

export const busca_foto = async (n_cpf) => {
  const resultado = await api.post("/fotofunc", { cpf: n_cpf });
  return resultado;
};

export const lista_funcionarios = async () => {
  const resultado = await api.post("/lista_funcionarios");
  return resultado.data;
};

export const consulta_funcionario = async (n_cpf) => {
  const resultado = await api.post("/consulta_funcionario", { cpf: n_cpf });
  return resultado.data;
};

export const salva_funcionario = async (n_cpf) => {
  const resultado = await api.post("/salva_funcionario", { cpf: n_cpf });
  return resultado.data;
};

export const lista_matriculas = async (n_cpf) => {
  const resultado = await api.post("/lista_matricula", { cpf: n_cpf });
  return resultado.data;
};

export const adiciona_matricula = async (n_cpf, n_matricula) => {
  const resultado = await api.post("/adiciona_matricula", {
    cpf: n_cpf,
    matricula: n_matricula,
  });
  return resultado.data;
};

export const remove_matricula = async (n_cpf, n_matricula) => {
  const resultado = await api.post("/apaga_matricula", {
    cpf: n_cpf,
    matricula: n_matricula,
  });
  return resultado.data;
};

export const gravar_chave = async (Ntoken, Nchave) => {
  const resultado = await api.post("/grava_chave", {
    token: Ntoken,
    chave: Nchave,
  });
  return resultado;
};

export const validaToken = async (N_token) => {
  const resultado = await api.post("/valida_token", {
    token: N_token,
  });
  return resultado;
};

export const enviar_reset = async (Ncpf) => {
  const resultado = await api.post("/reset_senha", {
    cpf: Ncpf,
  });
};

export const uploadArq = async (Nmes, Nano, Ntipo, Narq) => {
  const restulado = await api.post("/upload_arq", {
    mes_ref: Nmes,
    ano_ref: Nano,
    tipo_doc: Ntipo,
    arquivo: Narq,
  });
};

export const contaDocs = async () => {
  const resultado = await api.get("/proventos_cadastrados");
  return resultado.data;
};

export const listaDocs = async (Nmes, Nano, Ntipo, Nnome) => {
  console.log("X", Nmes, Nano, Ntipo, Nnome);
  const resultado = await api.post("/proventos_usuarios", {
    mes_ref: Nmes,
    ano_ref: Nano,
    tipo_doc: Ntipo,
    nome: Nnome,
  });
  return resultado.data;
};

/*
export const lista_unidadeCPF = async (n_cpf) => {
  const resultado = await api.post("/lista_unidadeCPF", { cpf: n_cpf });
  return resultado.data;
};

export const lista_usuario = async (Nunidade) => {
  const resultado = await api.post("/lista_usuarios", { unidade: Nunidade });
  return resultado.data;
};

export const dados_usuario = async (n_cpf) => {
  const resultado = await api.post("/dados_usuario", { cpf: n_cpf });
  return resultado.data;
};

export const grava_usuario = async ({ dados }) => {
  const resultado = await api.post("/gravar_usuario", { dados });
  return resultado;
};

export const lista_unidades = async () => {
  const resultado = await api.post("/lista_unidades");
  return resultado.data;
};

export const lista_perfil_usuario = async (Ncpf, Nunidade) => {
  const resultado = await api.post("/perfil_usuario", {
    cpf: Ncpf,
    unidade: Nunidade,
  });
  return resultado.data;
};

export const atualiza_perfil_usuario = async (Ncpf, Ncod, Nuni, Nstatus) => {
  const resultado = await api.post("/atualiza_perfil", {
    cpf: Ncpf,
    cod_perfil: Ncod,
    unidade: Nuni,
    marcado: Nstatus,
  });
  return resultado;
};

export const gravar_chave = async (Ntoken, Nchave) => {
  const resultado = await api.post("/grava_chave", {
    token: Ntoken,
    chave: Nchave,
  });
  return resultado;
};

export const enviar_reset = async (Nemail) => {
  const resultado = await api.post("/reset_senha", {
    email: Nemail,
  });
};

export const lista_Pessoas = async () => {
  const resultado = await api.get("/lista_Pessoa");
  return resultado;
};

export const grava_Pessoa = async (dados) => {
  const resultado = await api.post("/gravar_pessoa", dados);
  return resultado;
};

export const grava_email = async (dados) => {
  const resultado = await api.post("/gravar_email", dados);
  return resultado;
};

export const grava_telefone = async (dados) => {
  const resultado = await api.post("/gravar_telefone", dados);
  return resultado;
};

export const grava_endereco = async (dados) => {
  const resultado = await api.post("/gravar_endereco", dados);
  return resultado;
};

export const constulta_Pessoa = async (nid) => {
  const resultado = await api.get(`/consulta_pessoa/${nid}`);
  return resultado;
};

export const atualiza_pessoa = async (nid, dados) => {
  const resultado = await api.post(`/atualiza_pessoa/${nid}`, dados);
  return resultado;
};

export const atualiza_endereco = async (nid, dados) => {
  const resultado = await api.post(`/atualiza_endereco/${nid}`, dados);
  return resultado;
};

export const constulta_Email = async (nid) => {
  const resultado = await api.get(`/consulta_email/${nid}`);
  return resultado;
};

export const remove_email = async (nid) => {
  const resultado = await api.delete(`/apaga_email/${nid}`);
  return resultado;
};

export const constulta_Telefone = async (nid) => {
  const resultado = await api.get(`/consulta_telefone/${nid}`);
  return resultado;
};

export const remove_telefone = async (nid) => {
  const resultado = await api.delete(`/apaga_telefone/${nid}`);
  return resultado;
};

export const constulta_endereco = async (nid) => {
  const resultado = await api.get(`/consulta_endereco/${nid}`);
  return resultado;
};



export const pegarStatus = async () => {
  return api.get("/status");
};

export const novoAcesso = async (N_email) => {
  return api.post("/acesso", { email: N_email });
};

export const sendMail = async (opcao) => {
  return api.post(
    "/sendmail",
    { opcao },
    { headers: { "Access-Control-Allow-Origin": true } }
  );
};

export const consultaCpf = async (N_CPF) => {
  return api.post("/consultaCpfPsmce", { cpf: N_CPF });
};

export const validaToken = async (N_token) => {
  const emailValido = await api.get(`/validaToken/${N_token}`);
  return emailValido.data.email;
};

export const confirmaToken = async (N_token) => {
  const emailValido = await api.get(`/validaToken/${N_token}`);
  return emailValido;
};

export const DadosCPFSMCE = async (N_CPF) => {
  const resultado = await api.post("/consultaCpfPsmce", { cpf: N_CPF });
  return resultado;
};

export const gravarNovaPessoa = async ({ dados, token }) => {
  const resultado = await api.post("/confirmar", { dados, token });
  return resultado;
};

export const gerarChave = async (token) => {
  const resultado = await api.post("/gerarChave", token);
  return resultado;
};

export const resetChave = async (email) => {
  const resultado = await api.post("/ResetChave", email);
  return resultado;
};

export const existeCadastro = async (n_email) => {
  const resultado = await api.post(
    "/emailemPessoa",
    { email: n_email },
    { headers: { "Access-Control-Allow-Origin": true } }
  );
  return resultado.data;
};

export const consultaPessoa = async (n_cpf) => {
  const resultado = await api.post("/consultaCpfPessoa", { cpf: n_cpf });
  return resultado.data;
};

export const consultaAluno = async (n_mat) => {
  const resultado = await api.post("/dadosAluno", { matricula: n_mat });
  // console.log("dmat", n_mat);
  return resultado.data;
};

export const consultaPendenciaCpf = async (n_cpf) => {
  const resultado = await api.post("/pendenciaCpf", { cpf: n_cpf });
  if (resultado.data.length === 0) {
    return false;
  } else {
    return true;
  }
};

export const listaMatriculasCPF = async (n_cpf) => {
  const resultado = await api.get(`/cadastro/${n_cpf}`);
  return resultado.data;
};

export const buscardadosAluno = async (n_matricula) => {
  const resultado = await api.post("/dadosAluno", { matricula: n_matricula });
  return resultado.data;
};

export const gravaPessoa = async ({ dados }) => {
  const resultado = await api.post("/gravarCpf", { dados });
  return resultado;
};

export const buscarDadosContrato = async (n_matricula) => {
  const resultado = await api.post("/dadosContrato", {
    matricula: n_matricula,
  });
  return resultado.data;
};

export const gravaAluno = async ({ dados }) => {
  const resultado = await api.post("/gravarAluno", { dados });
  return resultado;
};

export const gravaContrato = async ({ dados }) => {
  const resultado = await api.post("/gravarContrato", { dados });
  return resultado;
};

export const buscaPlano = async (n_matricula) => {
  const resultado = await api.post("/dadosPlano", { matricula: n_matricula });
  return resultado.data;
};

export const mostrarPDFContrato = async (n_matricula) => {
  const resultado = await api.post("/contratoPdf", { matricula: n_matricula });
  return resultado.data;
};

export const consultaAgenda = async (n_dia, n_unidade) => {
  const resultado = await api.post("/consultaAgenda", {
    dia: n_dia,
    unidade: n_unidade,
  });
  return resultado.data;
};

export const gravaAgenda = async (n_dia, n_unidade, n_matricula) => {
  console.log("apiM", n_matricula);

  const resultado = await api.post("/AtualizaAgenda", {
    dia: n_dia,
    unidade: n_unidade,
    matricula: n_matricula,
  });
  return resultado.data;
};

export const enviarPDFContrato = async (n_matricula) => {
  const resultado = await api.post("/sendPDF", { matricula: n_matricula });
  return resultado.data;
};

export const verificaAgenda = async (n_matricula) => {
  const resultado = await api.post("/verificaAgenda", {
    matricula: n_matricula,
  });
  return resultado.data;
};

export const buscaUnidade = async (n_matricula) => {
  const resultado = await api.post("/unidade", { matricula: n_matricula });
  return resultado.data;
};

export const buscaFoto = async (n_matricula) => {
  const resultado = await api.post("/fotoAluno", { matricula: n_matricula });
  return resultado.data;
};
*/
