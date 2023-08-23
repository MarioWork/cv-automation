module.exports = data => ({
    context:
        'You are an expert recruiter that is interpreting the given data and converting it into a javascript object, if the data is in another language you translate it to english first. You are extremely detail oriented and do not forget any asked property of the object. You know the dates must be in the format "dd-mm-yyyy" and if the day is missing you use "mm-yyyy". The education and Work experience array should be ordered in descending order.',
    examples: [
        {
            input: { content: 'no data' },
            output: {
                content: `{
                    name: null
                    phone: null,
                    jobTitle: null,
                    description: null,
                    location: null,
                    birthdate: null,
                    email: null,
                    nationality: null,
                    social:
                    {
                    linkedin: null,
                    instagram: null,
                    twitter: null,
                    github: null,
                    bitbucket: null
                    },
                    skills: [],
                    language: [],
                    education: [
                    {
                    startingDate: null,
                    finishDate: null,
                    title: null,
                    description: null,
                    institution: null,
                    location: null,
                    }
                    ],
                    workExperience: [
                    {
                    startingDate: null,
                    finishDate: null,
                    title: null,
                    description: null,
                    company: null,
                    location: null,
                    }
                    ]
                    }`
            }
        },
        {
            input: {
                content: `"Info\n• Name\nMário Filipe da Silva Vieira\n• Nationality\nPortuguese\nBirthdate\n15 of May 1997\n• \n mariovieira.work@hotmail.com\n• Location\nTerceira, Azores - Portugal\nSocial\nin /mario-vieira\nO@mario.vieira97\n/Mario Work\nmv\nSoftware Developer\nWork Experience\n01-2021 Present\nReact Js Developer\nBool / <Code_For_All_> (Azores/Remote)\n03-2019 10-2020\nJunior Full Stack Developer\nAltyra Solutions (Lisbon)\n06-2016-07-2016\nComputer Systems & Management &\nPrograming Technician\nHealtcare Center of Angra do Heroísmo (Azores)\nJava\n06-2015-07-2015\nComputer Systems & Management &\nPrograming Technician\nAirport of Lajes (Azores)\nEducation\n09-202012-2020\nCoding Bootcamp\n<Academia_de_Código_> - Azores\n09-2017-09-2019\nCtesp - Associate Degree - Software\nDevelopment for mobile devices\nISTEC - Lisbon\n09-2013-07-2016\nEquivalent to Highschool - level 4 -\nProfissional course - Computer\nSystems & Programming Technician\nFEPPV - Azores\n07-2007 - 03 - 2008\nVocational Trainning - Computing from\nUser's Prespective\nEconoteca - Azores\nSkills\nReact.js\nRestfull API\nNode.js\nC# .NET\nOOP\nFlutter / Dart\nJavascript\nHTML / CSS\nPostgreSQL\nUnix\nVIM\nVS Code\nDocker Apache Kafka Micro Services Strapi ORM Kubernetes\n."`
            },
            output: {
                content: `{
                name: "Mário Filipe da Silva Vieira",
                phone: null,
                jobTitle: "Software Developer",
                description: null,
                location: "Terceira, Azores - Portugal",
                birthdate: "15 of May 1997",
                email: "mariovieira.work@hotmail.com",
                nationality: "Portuguese",
                social:
                {
                linkedin: "/mario-vieira",
                instagram: "@mario.vieira97",
                github: "/MarioWork",
                bitbucket: null,
                },
                skills: [
                "React.js",
                "Restfull API",
                "Node.js",
                "C# .NET",
                "OOP",
                "Flutter / Dart",
                "Javascript",
                "HTML / CSS",
                "PostgreSQL",
                "Unix",
                "VIM",
                "VS Code",
                "Docker Apache Kafka Micro Services Strapi ORM Kubernetes",
                ],
                language: [],
                education: [
                {
                startingDate: "09-2020",
                finishDate: "12-2020",
                title: "Coding Bootcamp",
                description: null,
                institution: "<Academia_de_Código_> - Azores",
                location: "Azores"
                },
                {
                startingDate: "09-2017",
                finishDate: "09-2019",
                title: "Ctesp - Associate Degree - Software Development for mobile devices",
                description: null,
                institution: "ISTEC - Lisbon",
                location: "Lisbon"
                },
                {
                startingDate: "09-2013",
                finishDate: "07-2016",
                title: "Equivalent to Highschool - level 4 - Professional course - Computer Systems & Programming Technician",
                description: null,
                institution: "FEPPV - Azores",
                location: "Azores"
                },
                {
                startingDate: "07-2007",
                finishDate: "03-2008",
                title: "Vocational Trainning - Computing from User's Prespective",
                description: null,
                institution: "Econoteca - Azores",
                location: "Azores"
                }
                ],
                workExperience: [
                {
                startingDate: "01-2021",
                finishDate: "Present",
                title: "React Js Developer",
                description: null,
                company: "Bool / <Code_For_All_> (Azores/Remote)",
                location: "Azores/Remote"
                },
                {
                startingDate: "03-2019",
                finishDate: "10-2020",
                title: "Junior Full Stack Developer",
                description: null,
                company: "Altyra Solutions (Lisbon)",
                location: "Lisbon"
                },
                {
                startingDate: "06-2016",
                finishDate: "07-2016",
                title: "Computer Systems & Management & Programing Technician",
                description: "Java",
                company: "Healtcare Center of Angra do Heroísmo (Azores)",
                location: "Azores"
                },
                {
                startingDate: "06-2015",
                finishDate: "07-2015",
                title: "Computer Systems & Management & Programing Technician",
                description: null,
                company: "Airport of Lajes (Azores)",
                location: "Azores"
                }
                ]
                }
                `
            }
        },
        {
            input: {
                content:
                    'Sexo: Masculino\nData de nascimento: 31/05/1999\nNacionalidade: Portuguesa\nMorada: Alvalade, Lisboa\nCarta de Condução: A1, B1, B\nPERFIL\nChamo-me Tomás Maia, tenho 22 anos e\nsou licenciado em Gestão de Recursos\nHumanos, na Universidade Lusófona de\nLisboa. Considero-me uma pessoa de\nfortes relações, com um forte espírito de\nequipa e apaixonado por gestão e\ntecnologia.\nCONTACTOS\nin\n918105906\ntomastrmaia@gmail.com\nCOMPETÊNCIAS\nLINGUÍSTICAS\n料\nLíngua materna\nIntermédio\nIniciante\nTOMÁS MAIA\nEDUCAÇÃO\nErasmus +, Gestão de Recursos Humanos | Univerza v Mariboru\nsetembro 2020 - fevereiro 2021\nLicenciatura em Gestão de Recursos Humanos | Universidade Lusófona\nsetembro 2018 - julho 2021\nCiências Socioeconómicas | Escola Secundária do Cartaxo\n2014 - 2018\nEXPERIÊNCIA PROFISSIONAL\nRecrutamento, Gestão de Consultores e Processos de IT- Oskon.Tech\nfevereiro 2021 - Ao momento\nRecrutamento e seleção, formação e integração - ERA ALA/ALV/C. OU\nagosto 2020 - setembro 2020\nSecretariado, base de dados e gestão de stock - Hidro Lazer\njulho 2019 - setembro 2019\nCOMPETÊNCIAS PESSOAIS\nBoa comunicação\nEspírito de equipa\nResponsabilidade\nProatividade\nFácil adaptação\nCriatividade\nCOMPETÊNCIAS INFORMÁTICAS\nOffice 365\nPlataformas de Recrutamento\nSoftware CRM\nPlataformas de interação e negócios\nCertificações e Cursos adicionais\nFundamentos de Planeamento estratégico - Linkedin\nFevereiro 2021\nBurnout: Esgotamento no trabalho - Linkedin\nFevereiro 2021\nDO'
            },
            output: {
                content: `{
                "name": "Tomás Maia",
                "phone": "918105906",
                "jobTitle": null,
                "description": null,
                "location": "Alvalade, Lisbon",
                "birthdate": "31/05/1999",
                "email": "tomastrmaia@gmail.com",
                "nationality": "Portuguese",
                "social": {
                  "linkedin": null,
                  "instagram": null,
                  "twitter": null,
                  "github": null,
                  "bitbucket": null
                },
                "skills": ["Good Comunication", "Team spirit", "Creativity", "Reponsible", "Adapts easily", "English", "Spanish", "Office 365", "Recruitment Platforms", "CRM Software", "Business Interaction Platforms"],
                "language": ["Portuguese"],
                "education": [
                  {
                    "startingDate": "01-09-2020",
                    "finishDate": "01-02-2021",
                    "title": "Erasmus +, Human Resources Management",
                    "description": null,
                    "institution": "Univerza v Mariboru",
                    "location": "Maribor"
                  },
                  {
                    "startingDate": "01-09-2018",
                    "finishDate": "01-07-2021",
                    "title": "Bachelor's degree in Human Resources Management",
                    "description": null,
                    "institution": "Universidade Lusófona",
                    "location": "Lisbon"
                  },
                  {
                    "startingDate": "2014",
                    "finishDate": "2018",
                    "title": "Socioeconomic Sciences",
                    "description": null,
                    "institution": "Escola Secundária do Cartaxo",
                    "location": "Cartaxo"
                  }
                ],
                "workExperience": [
                  {
                    "startingDate": "01-02-2021",
                    "finishDate": "Present",
                    "title": "Recruitment, Consultancy Management and IT Processes",
                    "description": null,
                    "company": "Oskon.Tech",
                    "location": "Lisbon"
                  },
                  {
                    "startingDate": "01-08-2020",
                    "finishDate": "01-09-2020",
                    "title": "Recruitment and Selection, Training and Integration",
                    "description": null,
                    "company": "ERA ALA/ALV/C. OU",
                    "location": "Lisbon"
                  },
                  {
                    "startingDate": "01-07-2019",
                    "finishDate": "01-09-2019",
                    "title": "Secretariat, Database and Stock Management",
                    "description": null,
                    "company": "Hidro Lazer",
                    "location": "Lisbon"
                  }
                ]
              }`
            }
        }
    ],
    messages: [{ author: 'user', content: data }]
});
