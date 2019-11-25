var tbAdmin = [
    {
        nome: "Micardo Rilos",
        area: "Pimbada Distribuida",
        cpf: "666.666.666.69",
        ra: "692451",
        senha: 0x123cdf21341234,
    },
    {
        nome: "Sirel Mina",
        area: "Aspiração Empreendedora",
        cpf: "666.666.667.69",
        ra: "692451",
        senha: 0x123cdf21341234,
    },
    {
        nome: "Mlauco Gaya",
        area: "Explosão Anti-Biba",
        cpf: "666.666.668.69",
        ra: "692451",
        senha: 0x123cdf21341234,
    },
    {
        nome: "Cearense",
        area: "Cabeçada de 3 minutos",
        cpf: "666.666.669.69",
        ra: "692451",
        senha: 0x123cdf21341234,
    },
    {
        nome: "Ubuntu",
        area: "Zueira Unlimited LTDA",
        cpf: "Maq",
        ra: "11",
        senha: 0x123cdf21341234,
    },
]

export function tables() {
    return tbAdmin;
}

export function insert(admin) {
    tbAdmin = tbAdmin.concat(admin);
}

export const name = "Administradores"

export const header = [
    "Nome", "Área de Atuação", "CPF", "RA"
]

export const types = [
    "nome", "area", "cpf", "ra"
]

export const key = "cpf"