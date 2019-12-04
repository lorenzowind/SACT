var tbAdmin = [
    {
        nome: "Ricardo",
        area: "Informática",
        cpf: "666.666.666.69",
        ra: "692451",
        senha: 0x123cdf21341234,
    },
    {
        nome: "Mirel",
        area: "Informática",
        cpf: "666.666.667.69",
        ra: "692451",
        senha: 0x123cdf21341234,
    },
]

export function tables() {
    return tbAdmin;
}

export function insert(admin) {
    tbAdmin.puch(admin);
}

export const name = "Administradores"

export const header = [
    "Nome", "Área de Atuação", "CPF", "RA"
]

export const types = [
    "nome", "area", "cpf", "ra"
]

export const key = "cpf"
