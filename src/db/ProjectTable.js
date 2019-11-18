
export function tablesProject() {
    return tbProjects;


}
export function insertProject(proj) {
    tbProjects = tbProjects.concat(proj);
}

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