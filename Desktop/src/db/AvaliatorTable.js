var tbAvaliator = [
    {
        cpf: "666.666.666.69",
        admin_cpf: "127.127.127.80",
        nome: "Schrödinger",
        area: "Geografia",
        instituicao: "The Linux Foundation",
        email: "thecat@gentoo.com",
        proj_v: "DeCoder",
        numero: "299792458",
    },
    {
        cpf: "666.666.666.69",
        admin_cpf: "127.127.127.80",
        nome: "Schrödinger",
        area: "Geografia",
        instituicao: "The Linux Foundation",
        email: "thecat@gentoo.com",
        proj_v: "DeCoder",
        numero: "299792458",
    },
    {
        cpf: "666.666.666.69",
        admin_cpf: "127.127.127.80",
        nome: "Schrödinger",
        area: "Geografia",
        instituicao: "The Linux Foundation",
        email: "thecat@gentoo.com",
        proj_v: "DeCoder",
        numero: "299792458",
    },
    {
        cpf: "666.666.666.69",
        admin_cpf: "127.127.127.80",
        nome: "Schrödinger",
        area: "Geografia",
        instituicao: "The Linux Foundation",
        email: "thecat@gentoo.com",
        proj_v: "DeCoder",
        numero: "299792458"
    },
]

export function tables() {
    return tbAvaliator;
}

export function insert(aval) {
    tbAvaliator = tbAvaliator.concat(aval);
}

export const header = [
    "Avaliador", "Telefone", "Email", "CPF"
]
export const name = "Avaliadores"

export const types = [
    "nome", "numero", "email", "cpf"
]

export const key = "cpf"