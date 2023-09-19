module.exports = data => ({
    context:
        'You are an expert recruiter that is interpreting the given data and converting it into a javascript object, if the data is in another language you translate it to english first then you convert it to a javascript object. You are extremely detail oriented and do not forget any asked property of the object. You know the dates must be in the format "dd-mm-yyyy" and if the day is missing you use "mm-yyyy". The education and Work experience array should be ordered in descending order.',
    examples: [
        {
            input: { author: 'user', content: "no data or ' '" },
            output: {
                author: 'bot',
                content:
                    '{"name":null,"phone":null,"jobTitle":null,"description":null,"location":null,"birthdate":null,"email":null,"nationality":null,"social":{"linkedin":null,"instagram":null,"twitter":null,"github":null,"bitbucket":null},"skills":[],"language":[],"education":[{"startingDate":null,"finishDate":null,"title":null,"description":null,"institution":null,"location":null}],"workExperience":[{"startingDate":null,"finishDate":null,"title":null,"description":null,"company":null,"location":null}]}'
            }
        },
        {
            input: {
                author: 'user',
                content:
                    '"Info\\n• Name\\nMário Filipe da Silva Vieira\\n• Nationality\\nPortuguese\\nBirthdate\\n15 of May 1997\\n• \\n mariovieira.work@hotmail.com\\n• Location\\nTerceira, Azores - Portugal\\nSocial\\nin /mario-vieira\\nO@mario.vieira97\\n/Mario Work\\nmv\\nSoftware Developer\\nWork Experience\\n01-2021 Present\\nReact Js Developer\\nBool / <Code_For_All_> (Azores/Remote)\\n03-2019 10-2020\\nJunior Full Stack Developer\\nAltyra Solutions (Lisbon)\\n06-2016-07-2016\\nComputer Systems & Management &\\nPrograming Technician\\nHealtcare Center of Angra do Heroísmo (Azores)\\nJava\\n06-2015-07-2015\\nComputer Systems & Management &\\nPrograming Technician\\nAirport of Lajes (Azores)\\nEducation\\n09-202012-2020\\nCoding Bootcamp\\n<Academia_de_Código_> - Azores\\n09-2017-09-2019\\nCtesp - Associate Degree - Software\\nDevelopment for mobile devices\\nISTEC - Lisbon\\n09-2013-07-2016\\nEquivalent to Highschool - level 4 -\\nProfissional course - Computer\\nSystems & Programming Technician\\nFEPPV - Azores\\n07-2007 - 03 - 2008\\nVocational Trainning - Computing from\\nUser\'s Prespective\\nEconoteca - Azores\\nSkills\\nReact.js\\nRestfull API\\nNode.js\\nC# .NET\\nOOP\\nFlutter / Dart\\nJavascript\\nHTML / CSS\\nPostgreSQL\\nUnix\\nVIM\\nVS Code\\nDocker Apache Kafka Micro Services Strapi ORM Kubernetes\\n."'
            },
            output: {
                author: 'bot',
                content:
                    '{"name":"Mário Filipe da Silva Vieira","phone":null,"jobTitle":"Software Developer","description":null,"location":"Terceira, Azores - Portugal","birthdate":"15 of May 1997","email":"mariovieira.work@hotmail.com","nationality":"Portuguese","social":{"linkedin":"/mario-vieira","instagram":"@mario.vieira97","github":"/MarioWork","bitbucket":null},"skills":["React.js","Restfull API","Node.js","C# .NET","OOP","Flutter / Dart","Javascript","HTML / CSS","PostgreSQL","Unix","VIM","VS Code","Docker Apache Kafka Micro Services Strapi ORM Kubernetes"],"language":[],"education":[{"startingDate":"01-09-2020","finishDate":"01-12-2020","title":"Coding Bootcamp","description":null,"institution":"<Academia_de_Código_> - Azores","location":"Azores"},{"startingDate":"01-09-2017","finishDate":"01-09-2019","title":"Ctesp - Associate Degree - Software Development for mobile devices","description":null,"institution":"ISTEC - Lisbon","location":"Lisbon"},{"startingDate":"01-09-2013","finishDate":"01-07-2016","title":"Equivalent to Highschool - level 4 - Professional course - Computer Systems & Programming Technician","description":null,"institution":"FEPPV - Azores","location":"Azores"},{"startingDate":"01-07-2007","finishDate":"01-03-2008","title":"Vocational Trainning - Computing from User\'s Prespective","description":null,"institution":"Econoteca - Azores","location":"Azores"}],"workExperience":[{"startingDate":"01-01-2021","finishDate":"Present","title":"React Js Developer","description":null,"company":"Bool / <Code_For_All_> (Azores/Remote)","location":"Azores/Remote"},{"startingDate":"01-03-2019","finishDate":"10-2020","title":"Junior Full Stack Developer","description":null,"company":"Altyra Solutions (Lisbon)","location":"Lisbon"},{"startingDate":"01-06-2016","finishDate":"01-07-2016","title":"Computer Systems & Management & Programing Technician","description":null,"company":"Healtcare Center of Angra do Heroísmo (Azores)","location":"Azores"},{"startingDate":"01-06-2015","finishDate":"01-07-2015","title":"Computer Systems & Management & Programing Technician","description":null,"company":"Airport of Lajes (Azores)","location":"Azores"}]}'
            }
        },
        {
            input: {
                author: 'user',
                content:
                    '"Sexo: Masculino\\nData de nascimento: 31/05/1999\\nNacionalidade: Portuguesa\\nMorada: Alvalade, Lisboa\\nCarta de Condução: A1, B1, B\\nPERFIL\\nChamo-me Tomás Maia, tenho 22 anos e\\nsou licenciado em Gestão de Recursos\\nHumanos, na Universidade Lusófona de\\nLisboa. Considero-me uma pessoa de\\nfortes relações, com um forte espírito de\\nequipa e apaixonado por gestão e\\ntecnologia.\\nCONTACTOS\\nin\\n918105906\\ntomastrmaia@gmail.com\\nCOMPETÊNCIAS\\nLINGUÍSTICAS\\n料\\nLíngua materna\\nIntermédio\\nIniciante\\nTOMÁS MAIA\\nEDUCAÇÃO\\nErasmus +, Gestão de Recursos Humanos | Univerza v Mariboru\\nsetembro 2020 - fevereiro 2021\\nLicenciatura em Gestão de Recursos Humanos | Universidade Lusófona\\nsetembro 2018 - julho 2021\\nCiências Socioeconómicas | Escola Secundária do Cartaxo\\n2014 - 2018\\nEXPERIÊNCIA PROFISSIONAL\\nRecrutamento, Gestão de Consultores e Processos de IT- Oskon.Tech\\nfevereiro 2021 - Ao momento\\nRecrutamento e seleção, formação e integração - ERA ALA/ALV/C. OU\\nagosto 2020 - setembro 2020\\nSecretariado, base de dados e gestão de stock - Hidro Lazer\\njulho 2019 - setembro 2019\\nCOMPETÊNCIAS PESSOAIS\\nBoa comunicação\\nEspírito de equipa\\nResponsabilidade\\nProatividade\\nFácil adaptação\\nCriatividade\\nCOMPETÊNCIAS INFORMÁTICAS\\nOffice 365\\nPlataformas de Recrutamento\\nSoftware CRM\\nPlataformas de interação e negócios\\nCertificações e Cursos adicionais\\nFundamentos de Planeamento estratégico - Linkedin\\nFevereiro 2021\\nBurnout: Esgotamento no trabalho - Linkedin\\nFevereiro 2021\\nDO"'
            },
            output: {
                author: 'bot',
                content:
                    '{"name":"Tomás Maia","phone":"918105906","jobTitle":null,"description":null,"location":"Alvalade, Lisbon","birthdate":"31/05/1999","email":"tomastrmaia@gmail.com","nationality":"Portuguese","social":{"linkedin":null,"instagram":null,"twitter":null,"github":null,"bitbucket":null},"skills":["Good Comunication","Team spirit","Creativity","Reponsible","Adapts easily","English","Spanish","Office 365","Recruitment Platforms","CRM Software","Business Interaction Platforms"],"language":["Portuguese"],"education":[{"startingDate":"01-09-2020","finishDate":"01-02-2021","title":"Erasmus +, Human Resources Management","description":null,"institution":"Univerza v Mariboru","location":"Maribor"},{"startingDate":"01-09-2018","finishDate":"01-07-2021","title":"Bachelor\'s degree in Human Resources Management","description":null,"institution":"Universidade Lusófona","location":"Lisbon"},{"startingDate":"2014","finishDate":"2018","title":"Socioeconomic Sciences","description":null,"institution":"Escola Secundária do Cartaxo","location":"Cartaxo"}],"workExperience":[{"startingDate":"01-02-2021","finishDate":"Present","title":"Recruitment, Consultancy Management and IT Processes","description":null,"company":"Oskon.Tech","location":"Lisbon"},{"startingDate":"01-08-2020","finishDate":"01-09-2020","title":"Recruitment and Selection, Training and Integration","description":null,"company":"ERA ALA/ALV/C. OU","location":"Lisbon"},{"startingDate":"01-07-2019","finishDate":"01-09-2019","title":"Secretariat, Database and Stock Management","description":null,"company":"Hidro Lazer","location":"Lisbon"}]}'
            }
        },
        {
            input: {
                author: 'user',
                content:
                    '"SUMMARY\\nIT Recruiter and HR Technician with a\\nbackground in recruitment and human\\nresources management. Skilled in attracting\\nand selecting top talent, utilizing effective\\nrecruitment strategies, and assessing\\ntechnical skills and cultural fit. Strong\\nrelationship-building abilities with candidates\\nand hiring managers. Knowledgeable in HR\\nprocesses, including contract management\\nand employee engagement. Excellent\\norganizational and communication skills,\\nthrive in fast-paced environments.\\nCONTACTS\\n+351 933 612 427\\nfernandesfprodrigo@gmail.com\\nRua D.Mafalda nº11 Belas,\\n4°esq\\nEDUCATION\\n2019-2023\\nUniversidade Lusófona de\\nHumanidades e Tecnologias -\\nLisbon, Portugal\\nPostgraduate Degree in Human\\nResource Management - In the\\nPerspective of Management with\\nPeople\\n2018 - 2021\\nUniversidade Lusófona de\\nHumanidades e Tecnologias -\\nLisbon, Portugal\\nDegree in Tourism\\nRODRIGO\\nFERNANDES\\nEXPERIENCE\\nIT Recruiter, 09/2022 - Current\\nOskon.Tech - Lisbon, Portugal\\n• Source, identify, and engage qualified IT\\nprofessionals for various job openings;\\n• Conduct thorough screening and assessment\\nof candidates\' technical skills and\\nqualifications;\\n• Use various recruitment platforms and tools\\nto identify potential candidates;\\nCollaborate with hiring managers to\\nunderstand job requirements and develop\\neffective recruitment strategies;\\n• Conduct interviews and evaluate candidates\'\\ncultural fit within the organization;\\n• Build and maintain relationships with\\ncandidates and provide a positive candidate\\nexperience throughout the recruitment\\nprocess;\\n• Assist in the negotiation and offer process,\\nensuring smooth onboarding for successful\\ncandidates;\\nStay updated on industry trends and best\\npractices in IT recruitment;\\n• Maintain accurate and up-to-date candidate\\nand job-related information in the recruitment\\ndatabase;\\n• Collaborate with the HR team on various HR\\nprocesses, including contract management\\nand employee engagement initiatives.\\n●\\nSKILLS\\n• Relationship building\\n• Time Management\\n• Computer Skills\\n• Communication Skills\\nEmpathy\\n• Teamwork\\nPERSONAL\\nEXPERIENCES\\nVisited Countries:\\n• Spain\\n• France\\n• United Kingdom\\n• Germany\\n• Hungary\\n• Italy\\n• Cape Verde\\nIT Recruiter, 04/2022 - 09/2022\\nNext Engineering - Lisbon, Portugal\\n• Conducted interviews with IT candidates to\\nassess their technical skills and qualifications;\\n• Utilized various sourcing methods to identify\\nand attract top IT talent;\\n• Conducted thorough candidate screenings\\nand assessments to evaluate their suitability\\nfor specific job requirements;\\n• Collaborated with hiring managers to\\nunderstand their needs and provide them with\\nqualified candidates;\\n• Utilized applicant tracking systems and other\\nrecruitment tools to streamline the candidate\\nselection process;\\n• Provided constructive feedback to candidates\\nafter interviews to help them improve their\\nskills;\\n●\\n●\\nDeveloped and maintained relationships with\\ncandidates to establish a talent pipeline for\\nfuture positions;\\nActively researched and implemented\\ninnovative recruitment strategies to attract\\nhighly skilled IT professionals.\\nSALES ATTENDANT - 07/2018 - 04/2022\\nZARA, INDITEX - Lisbon, Portugal\\nCustomer service;\\n• Customer relationship management;\\n• Sales;\\n• Payments (Cashier);\\n• Warehouse organisation and maintenance.\\n"'
            },
            output: {
                author: 'bot',
                content:
                    '{"name":"Rodrigo Fernandes","phone":"+351 933 612 427","jobTitle":"IT Recruiter","description":"IT Recruiter and HR Technician with a background in recruitment and human resources management. Skilled in attracting and selecting top talent, utilizing effective recruitment strategies, and assessing technical skills and cultural fit. Strong relationship-building abilities with candidates and hiring managers. Knowledgeable in HR processes, including contract management and employee engagement. Excellent organizational and communication skills, thrive in fast-paced environments.","location":"Lisbon, Portugal","birthdate":null,"email":"fernandesfprodrigo@gmail.com","nationality":"Portuguese","social":{"linkedin":null,"instagram":null,"twitter":null,"github":null,"bitbucket":null},"skills":["Relationship building","Time Management","Computer Skills","Communication Skills","Empathy","Teamwork"],"language":[],"education":[{"startingDate":"2019","finishDate":"2023","title":"Postgraduate Degree in Human Resource Management - In the Perspective of Management with People","description":null,"institution":"Universidade Lusófona de Humanidades e Tecnologias","location":"Lisbon, Portugal"},{"startingDate":"2018","finishDate":"2021","title":"Degree in Tourism","description":null,"institution":"Universidade Lusófona de Humanidades e Tecnologias","location":"Lisbon, Portugal"}],"workExperience":[{"startingDate":"01-09-2022","finishDate":"Current","title":"IT Recruiter","description":"Source, identify, and engage qualified IT professionals for various job openings; Conduct thorough screening and assessment of candidates\' technical skills and qualifications; Use various recruitment platforms and tools to identify potential candidates; Collaborate with hiring managers to understand job requirements and develop effective recruitment strategies; Conduct interviews and evaluate candidates\' cultural fit within the organization; Build and maintain relationships with candidates and provide a positive candidate experience throughout the recruitment process; Assist in the negotiation and offer process, ensuring smooth onboarding for successful candidates; Stay updated on industry trends and best practices in IT recruitment; Maintain accurate and up-to-date candidate and job-related information in the recruitment database; Collaborate with the HR team on various HR processes, including contract management and employee engagement initiatives.","company":"Oskon.Tech","location":"Lisbon, Portugal"},{"startingDate":"01-04-2022","finishDate":"01-09-2022","title":"IT Recruiter","description":"Conducted interviews with IT candidates to assess their technical skills and qualifications; Utilized various sourcing methods to identify and attract top IT talent; Conducted thorough candidate screenings and assessments to evaluate their suitability for specific job requirements; Collaborated with hiring managers to understand their needs and provide them with qualified candidates; Utilized applicant tracking systems and other recruitment tools to streamline the candidate selection process; Provided constructive feedback to candidates after interviews to help them improve their skills; Developed and maintained relationships with candidates to establish a talent pipeline for future positions; Actively researched and implemented innovative recruitment strategies to attract highly skilled IT professionals.","company":"Next Engineering","location":"Lisbon, Portugal"},{"startingDate":"01-07-2018","finishDate":"01-04-2022","title":"Sales Attendant","description":"Customer service; Customer relationship management; Sales; Payments (Cashier); Warehouse organisation and maintenance.","company":"ZARA, INDITEX","location":"Lisbon, Portugal"}]}'
            }
        }
    ],
    messages: [{ author: 'user', content: data }] //TODO: swap data to be the messages
});