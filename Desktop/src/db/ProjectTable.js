
var tbProjects =  [
        {
            id: 1,
            admin_cpf: '123.123.123.12',
            project: 'SACT',
            area: 'Informática',
            integrantes: 'Maria, Kleython, Adelberto',
            turma: 'CI',
        },
        {
            id: 2,
            admin_cpf: '123.123.123.12',
            project: 'SACT',
            area: 'Eletronica',
            integrantes: 'Maria, Kleython, Adelberto',
            turma: 'AE',
        },
         {
            id: 3,
            admin_cpf: '123.123.123.12',
            project: 'SACT',
            area: 'Informática',
            integrantes: 'Maria, Kleython, Adelberto',
            turma: 'BI',
        },
        {
            id: 4,
            admin_cpf: '123.123.123.12',
            project: 'SACT',
            area: 'Mecatronica',
            integrantes: 'Maria, Kleython, Adelberto',
            turma: 'BM',
        },
    ];



export function tables() {
    return tbProjects;
}

export function insert(proj) {
    tbProjects = tbProjects.concat(proj);
}


export const header = [
    "Projeto",
    "Área de Atuação",
    "Integrantes",
    "Turma"
]

export const name = "Projetos"

export const types = [
    "project", "area", "integrantes", "turma"
]

export const key = "id"
