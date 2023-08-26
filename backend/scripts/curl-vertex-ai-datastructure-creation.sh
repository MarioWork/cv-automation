API_ENDPOINT="us-central1-aiplatform.googleapis.com"
PROJECT_ID="$(gcloud config get-value project)"
MODEL_ID="chat-bison@001"

curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict" -d \
$'{
    "instances": [
        {
            "context": "You are an expert recruiter that is interpreting the given data and converting it into a javascript object, if the data is in another language you translate it to english first then you convert it to a javascript object. You are extremely detail oriented and do not forget any asked property of the object. You know the dates must be in the format \\"dd-mm-yyyy\\" and use hyphen
to separate day, month and year in dates. The education and Work experience array should be ordered in descending order.",
            "examples": [
                {
                    "input": {
                        "author": "user",
                        "content": "\\"Info\\
• Name\\
Mário Filipe da Silva Vieira\\
• Nationality\\
Portuguese\\
Birthdate\\
15 of May 1997\\
• \\
 mariovieira.work@hotmail.com\\
• Location\\
Terceira, Azores - Portugal\\
Social\\
in /mario-vieira\\
O@mario.vieira97\\
/Mario Work\\
mv\\
Software Developer\\
Work Experience\\
01-2021 Present\\
React Js Developer\\
Bool / <Code_For_All_> (Azores/Remote)\\
03-2019 10-2020\\
Junior Full Stack Developer\\
Altyra Solutions (Lisbon)\\
06-2016-07-2016\\
Computer Systems & Management &\\
Programing Technician\\
Healtcare Center of Angra do Heroísmo (Azores)\\
Java\\
06-2015-07-2015\\
Computer Systems & Management &\\
Programing Technician\\
Airport of Lajes (Azores)\\
Education\\
09-202012-2020\\
Coding Bootcamp\\
<Academia_de_Código_> - Azores\\
09-2017-09-2019\\
Ctesp - Associate Degree - Software\\
Development for mobile devices\\
ISTEC - Lisbon\\
09-2013-07-2016\\
Equivalent to Highschool - level 4 -\\
Profissional course - Computer\\
Systems & Programming Technician\\
FEPPV - Azores\\
07-2007 - 03 - 2008\\
Vocational Trainning - Computing from\\
User\'s Prespective\\
Econoteca - Azores\\
Skills\\
React.js\\
Restfull API\\
Node.js\\
C# .NET\\
OOP\\
Flutter / Dart\\
Javascript\\
HTML / CSS\\
PostgreSQL\\
Unix\\
VIM\\
VS Code\\
Docker Apache Kafka Micro Services Strapi ORM Kubernetes\\
.\\""
                    },
                    "output": {
                        "author": "bot",
                        "content": "{
                  \\"name\\": \\"Mário Filipe da Silva Vieira\\",
                  \\"phone\\": null,
                  \\"jobTitle\\": \\"Software Developer\\",
                  \\"description\\": null,
                  \\"location\\": \\"Terceira, Azores - Portugal\\",
                  \\"birthdate\\": \\"15 of May 1997\\",
                  \\"email\\": \\"mariovieira.work@hotmail.com\\",
                  \\"nationality\\": \\"Portuguese\\",
                  \\"social\\": {
                    \\"linkedin\\": \\"/mario-vieira\\",
                    \\"instagram\\": \\"@mario.vieira97\\",
                    \\"github\\": \\"/MarioWork\\",
                    \\"bitbucket\\": null
                  },
                  \\"skills\\": [\\"React.js\\", \\"Restfull API\\", \\"Node.js\\", \\"C# .NET\\", \\"OOP\\", \\"Flutter / Dart\\", \\"Javascript\\", \\"HTML / CSS\\", \\"PostgreSQL\\", \\"Unix\\", \\"VIM\\", \\"VS Code\\", \\"Docker Apache Kafka Micro Services Strapi ORM Kubernetes\\"],
                  \\"language\\": [],
                  \\"education\\": [
                    {
                      \\"startingDate\\": \\"01-09-2020\\",
                      \\"finishDate\\": \\"01-12-2020\\",
                      \\"title\\": \\"Coding Bootcamp\\",
                      \\"description\\": null,
                      \\"institution\\": \\"<Academia_de_Código_> - Azores\\",
                      \\"location\\": \\"Azores\\"
                    },
                    {
                      \\"startingDate\\": \\"01-09-2017\\",
                      \\"finishDate\\": \\"01-09-2019\\",
                      \\"title\\": \\"Ctesp - Associate Degree - Software Development for mobile devices\\",
                      \\"description\\": null,
                      \\"institution\\": \\"ISTEC - Lisbon\\",
                      \\"location\\": \\"Lisbon\\"
                    },
                    {
                      \\"startingDate\\": \\"01-09-2013\\",
                      \\"finishDate\\": \\"01-07-2016\\",
                      \\"title\\": \\"Equivalent to Highschool - level 4 - Professional course - Computer Systems & Programming Technician\\",
                      \\"description\\": null,
                      \\"institution\\": \\"FEPPV - Azores\\",
                      \\"location\\": \\"Azores\\"
                    },
                    {
                      \\"startingDate\\": \\"01-07-2007\\",
                      \\"finishDate\\": \\"01-03-2008\\",
                      \\"title\\": \\"Vocational Trainning - Computing from User\'s Prespective\\",
                      \\"description\\": null,
                      \\"institution\\": \\"Econoteca - Azores\\",
                      \\"location\\": \\"Azores\\"
                    }
                  ],
                  \\"workExperience\\": [
                    {
                      \\"startingDate\\": \\"01-01-2021\\",
                      \\"finishDate\\": \\"Present\\",
                      \\"title\\": \\"React Js Developer\\",
                      \\"description\\": null,
                      \\"company\\": \\"Bool / <Code_For_All_> (Azores/Remote)\\",
                      \\"location\\": \\"Azores/Remote\\"
                    },
                    {
                      \\"startingDate\\": \\"01-03-2019\\",
                      \\"finishDate\\": \\"10-2020\\",
                      \\"title\\": \\"Junior Full Stack Developer\\",
                      \\"description\\": null,
                      \\"company\\": \\"Altyra Solutions (Lisbon)\\",
                      \\"location\\": \\"Lisbon\\"
                    },
                    {
                      \\"startingDate\\": \\"01-06-2016\\",
                      \\"finishDate\\": \\"01-07-2016\\",
                      \\"title\\": \\"Computer Systems & Management & Programing Technician\\",
                      \\"description\\": null,
                      \\"company\\": \\"Healtcare Center of Angra do Heroísmo (Azores)\\",
                      \\"location\\": \\"Azores\\"
                    },
                    {
                      \\"startingDate\\": \\"01-06-2015\\",
                      \\"finishDate\\": \\"01-07-2015\\",
                      \\"title\\": \\"Computer Systems & Management & Programing Technician\\",
                      \\"description\\": null,
                      \\"company\\": \\"Airport of Lajes (Azores)\\",
                      \\"location\\": \\"Azores\\"
                    }
                  ]
                }"
                    }
                },
                {
                    "input": {
                        "author": "user",
                        "content": "Sexo: Masculino\\
Data de nascimento: 31/05/1999\\
Nacionalidade: Portuguesa\\
Morada: Alvalade, Lisboa\\
Carta de Condução: A1, B1, B\\
PERFIL\\
Chamo-me Tomás Maia, tenho 22 anos e\\
sou licenciado em Gestão de Recursos\\
Humanos, na Universidade Lusófona de\\
Lisboa. Considero-me uma pessoa de\\
fortes relações, com um forte espírito de\\
equipa e apaixonado por gestão e\\
tecnologia.\\
CONTACTOS\\
in\\
918105906\\
tomastrmaia@gmail.com\\
COMPETÊNCIAS\\
LINGUÍSTICAS\\
料\\
Língua materna\\
Intermédio\\
Iniciante\\
TOMÁS MAIA\\
EDUCAÇÃO\\
Erasmus +, Gestão de Recursos Humanos | Univerza v Mariboru\\
setembro 2020 - fevereiro 2021\\
Licenciatura em Gestão de Recursos Humanos | Universidade Lusófona\\
setembro 2018 - julho 2021\\
Ciências Socioeconómicas | Escola Secundária do Cartaxo\\
2014 - 2018\\
EXPERIÊNCIA PROFISSIONAL\\
Recrutamento, Gestão de Consultores e Processos de IT- Oskon.Tech\\
fevereiro 2021 - Ao momento\\
Recrutamento e seleção, formação e integração - ERA ALA/ALV/C. OU\\
agosto 2020 - setembro 2020\\
Secretariado, base de dados e gestão de stock - Hidro Lazer\\
julho 2019 - setembro 2019\\
COMPETÊNCIAS PESSOAIS\\
Boa comunicação\\
Espírito de equipa\\
Responsabilidade\\
Proatividade\\
Fácil adaptação\\
Criatividade\\
COMPETÊNCIAS INFORMÁTICAS\\
Office 365\\
Plataformas de Recrutamento\\
Software CRM\\
Plataformas de interação e negócios\\
Certificações e Cursos adicionais\\
Fundamentos de Planeamento estratégico - Linkedin\\
Fevereiro 2021\\
Burnout: Esgotamento no trabalho - Linkedin\\
Fevereiro 2021\\
DO"
                    },
                    "output": {
                        "author": "bot",
                        "content": "{
  \\"name\\": \\"Tomás Maia\\",
  \\"phone\\": \\"918105906\\",
  \\"jobTitle\\": null,
  \\"description\\": null,
  \\"location\\": \\"Alvalade, Lisbon\\",
  \\"birthdate\\": \\"31/05/1999\\",
  \\"email\\": \\"tomastrmaia@gmail.com\\",
  \\"nationality\\": \\"Portuguese\\",
  \\"social\\": {
    \\"linkedin\\": null,
    \\"instagram\\": null,
    \\"twitter\\": null,
    \\"github\\": null,
    \\"bitbucket\\": null
  },
  \\"skills\\": [\\"Good Comunication\\", \\"Team spirit\\", \\"Creativity\\", \\"Reponsible\\", \\"Adapts easily\\", \\"English\\", \\"Spanish\\", \\"Office 365\\", \\"Recruitment Platforms\\", \\"CRM Software\\", \\"Business Interaction Platforms\\"],
  \\"language\\": [\\"Portuguese\\"],
  \\"education\\": [
    {
      \\"startingDate\\": \\"01-09-2020\\",
      \\"finishDate\\": \\"01-02-2021\\",
      \\"title\\": \\"Erasmus +, Human Resources Management\\",
      \\"description\\": null,
      \\"institution\\": \\"Univerza v Mariboru\\",
      \\"location\\": \\"Maribor\\"
    },
    {
      \\"startingDate\\": \\"01-09-2018\\",
      \\"finishDate\\": \\"01-07-2021\\",
      \\"title\\": \\"Bachelor\'s degree in Human Resources Management\\",
      \\"description\\": null,
      \\"institution\\": \\"Universidade Lusófona\\",
      \\"location\\": \\"Lisbon\\"
    },
    {
      \\"startingDate\\": \\"2014\\",
      \\"finishDate\\": \\"2018\\",
      \\"title\\": \\"Socioeconomic Sciences\\",
      \\"description\\": null,
      \\"institution\\": \\"Escola Secundária do Cartaxo\\",
      \\"location\\": \\"Cartaxo\\"
    }
  ],
  \\"workExperience\\": [
    {
      \\"startingDate\\": \\"01-02-2021\\",
      \\"finishDate\\": \\"Present\\",
      \\"title\\": \\"Recruitment, Consultancy Management and IT Processes\\",
      \\"description\\": null,
      \\"company\\": \\"Oskon.Tech\\",
      \\"location\\": \\"Lisbon\\"
    },
    {
      \\"startingDate\\": \\"01-08-2020\\",
      \\"finishDate\\": \\"01-09-2020\\",
      \\"title\\": \\"Recruitment and Selection, Training and Integration\\",
      \\"description\\": null,
      \\"company\\": \\"ERA ALA/ALV/C. OU\\",
      \\"location\\": \\"Lisbon\\"
    },
    {
      \\"startingDate\\": \\"01-07-2019\\",
      \\"finishDate\\": \\"01-09-2019\\",
      \\"title\\": \\"Secretariat, Database and Stock Management\\",
      \\"description\\": null,
      \\"company\\": \\"Hidro Lazer\\",
      \\"location\\": \\"Lisbon\\"
    }
  ]
}"
                    }
                },
                {
                    "input": {
                        "author": "user",
                        "content": "SUMMARY\\
IT Recruiter and HR Technician with a\\
background in recruitment and human\\
resources management. Skilled in attracting\\
and selecting top talent, utilizing effective\\
recruitment strategies, and assessing\\
technical skills and cultural fit. Strong\\
relationship-building abilities with candidates\\
and hiring managers. Knowledgeable in HR\\
processes, including contract management\\
and employee engagement. Excellent\\
organizational and communication skills,\\
thrive in fast-paced environments.\\
CONTACTS\\
+351 933 612 427\\
fernandesfprodrigo@gmail.com\\
Rua D.Mafalda nº11 Belas,\\
4°esq\\
EDUCATION\\
2019-2023\\
Universidade Lusófona de\\
Humanidades e Tecnologias -\\
Lisbon, Portugal\\
Postgraduate Degree in Human\\
Resource Management - In the\\
Perspective of Management with\\
People\\
2018 - 2021\\
Universidade Lusófona de\\
Humanidades e Tecnologias -\\
Lisbon, Portugal\\
Degree in Tourism\\
RODRIGO\\
FERNANDES\\
EXPERIENCE\\
IT Recruiter, 09/2022 - Current\\
Oskon.Tech - Lisbon, Portugal\\
• Source, identify, and engage qualified IT\\
professionals for various job openings;\\
• Conduct thorough screening and assessment\\
of candidates\' technical skills and\\
qualifications;\\
• Use various recruitment platforms and tools\\
to identify potential candidates;\\
Collaborate with hiring managers to\\
understand job requirements and develop\\
effective recruitment strategies;\\
• Conduct interviews and evaluate candidates\'\\
cultural fit within the organization;\\
• Build and maintain relationships with\\
candidates and provide a positive candidate\\
experience throughout the recruitment\\
process;\\
• Assist in the negotiation and offer process,\\
ensuring smooth onboarding for successful\\
candidates;\\
Stay updated on industry trends and best\\
practices in IT recruitment;\\
• Maintain accurate and up-to-date candidate\\
and job-related information in the recruitment\\
database;\\
• Collaborate with the HR team on various HR\\
processes, including contract management\\
and employee engagement initiatives.\\
●\\
SKILLS\\
• Relationship building\\
• Time Management\\
• Computer Skills\\
• Communication Skills\\
Empathy\\
• Teamwork\\
PERSONAL\\
EXPERIENCES\\
Visited Countries:\\
• Spain\\
• France\\
• United Kingdom\\
• Germany\\
• Hungary\\
• Italy\\
• Cape Verde\\
IT Recruiter, 04/2022 - 09/2022\\
Next Engineering - Lisbon, Portugal\\
• Conducted interviews with IT candidates to\\
assess their technical skills and qualifications;\\
• Utilized various sourcing methods to identify\\
and attract top IT talent;\\
• Conducted thorough candidate screenings\\
and assessments to evaluate their suitability\\
for specific job requirements;\\
• Collaborated with hiring managers to\\
understand their needs and provide them with\\
qualified candidates;\\
• Utilized applicant tracking systems and other\\
recruitment tools to streamline the candidate\\
selection process;\\
• Provided constructive feedback to candidates\\
after interviews to help them improve their\\
skills;\\
●\\
●\\
Developed and maintained relationships with\\
candidates to establish a talent pipeline for\\
future positions;\\
Actively researched and implemented\\
innovative recruitment strategies to attract\\
highly skilled IT professionals.\\
SALES ATTENDANT - 07/2018 - 04/2022\\
ZARA, INDITEX - Lisbon, Portugal\\
Customer service;\\
• Customer relationship management;\\
• Sales;\\
• Payments (Cashier);\\
• Warehouse organisation and maintenance.\\
"
                    },
                    "output": {
                        "author": "bot",
                        "content": "{
   \\"name\\":\\"Rodrigo Fernandes\\",
   \\"phone\\":\\"+351 933 612 427\\",
   \\"jobTitle\\":\\"IT Recruiter\\",
   \\"description\\":\\"IT Recruiter and HR Technician with a background in recruitment and human resources management. Skilled in attracting and selecting top talent, utilizing effective recruitment strategies, and assessing technical skills and cultural fit. Strong relationship-building abilities with candidates and hiring managers. Knowledgeable in HR processes, including contract management and employee engagement. Excellent organizational and communication skills, thrive in fast-paced environments.\\",
   \\"location\\":\\"Lisbon, Portugal\\",
   \\"birthdate\\":null,
   \\"email\\":\\"fernandesfprodrigo@gmail.com\\",
   \\"nationality\\":\\"Portuguese\\",
   \\"social\\":{
      \\"linkedin\\":null,
      \\"instagram\\":null,
      \\"twitter\\":null,
      \\"github\\":null,
      \\"bitbucket\\":null
   },
   \\"skills\\":[
      \\"Relationship building\\",
      \\"Time Management\\",
      \\"Computer Skills\\",
      \\"Communication Skills\\",
      \\"Empathy\\",
      \\"Teamwork\\"
   ],
   \\"language\\":[

   ],
   \\"education\\":[
      {
         \\"startingDate\\":\\"2019\\",
         \\"finishDate\\":\\"2023\\",
         \\"title\\":\\"Postgraduate Degree in Human Resource Management - In the Perspective of Management with People\\",
         \\"description\\":null,
         \\"institution\\":\\"Universidade Lusófona de Humanidades e Tecnologias\\",
         \\"location\\":\\"Lisbon, Portugal\\"
      },
      {
         \\"startingDate\\":\\"2018\\",
         \\"finishDate\\":\\"2021\\",
         \\"title\\":\\"Degree in Tourism\\",
         \\"description\\":null,
         \\"institution\\":\\"Universidade Lusófona de Humanidades e Tecnologias\\",
         \\"location\\":\\"Lisbon, Portugal\\"
      }
   ],
   \\"workExperience\\":[
      {
         \\"startingDate\\":\\"01-09-2022\\",
         \\"finishDate\\":\\"Current\\",
         \\"title\\":\\"IT Recruiter\\",
         \\"description\\":\\"Source, identify, and engage qualified IT professionals for various job openings; Conduct thorough screening and assessment of candidates\' technical skills and qualifications; Use various recruitment platforms and tools to identify potential candidates; Collaborate with hiring managers to understand job requirements and develop effective recruitment strategies; Conduct interviews and evaluate candidates\' cultural fit within the organization; Build and maintain relationships with candidates and provide a positive candidate experience throughout the recruitment process; Assist in the negotiation and offer process, ensuring smooth onboarding for successful candidates; Stay updated on industry trends and best practices in IT recruitment; Maintain accurate and up-to-date candidate and job-related information in the recruitment database; Collaborate with the HR team on various HR processes, including contract management and employee engagement initiatives.\\",
         \\"company\\":\\"Oskon.Tech\\",
         \\"location\\":\\"Lisbon, Portugal\\"
      },
      {
         \\"startingDate\\":\\"01-04-2022\\",
         \\"finishDate\\":\\"01-09-2022\\",
         \\"title\\":\\"IT Recruiter\\",
         \\"description\\":\\"Conducted interviews with IT candidates to assess their technical skills and qualifications; Utilized various sourcing methods to identify and attract top IT talent; Conducted thorough candidate screenings and assessments to evaluate their suitability for specific job requirements; Collaborated with hiring managers to understand their needs and provide them with qualified candidates; Utilized applicant tracking systems and other recruitment tools to streamline the candidate selection process; Provided constructive feedback to candidates after interviews to help them improve their skills; Developed and maintained relationships with candidates to establish a talent pipeline for future positions; Actively researched and implemented innovative recruitment strategies to attract highly skilled IT professionals.\\",
         \\"company\\":\\"Next Engineering\\",
         \\"location\\":\\"Lisbon, Portugal\\"
      },
      {
         \\"startingDate\\":\\"01-07-2018\\",
         \\"finishDate\\":\\"01-04-2022\\",
         \\"title\\":\\"Sales Attendant\\",
         \\"description\\":\\"Customer service; Customer relationship management; Sales; Payments (Cashier); Warehouse organisation and maintenance.\\",
         \\"company\\":\\"ZARA, INDITEX\\",
         \\"location\\":\\"Lisbon, Portugal\\"
      }
   ]
}"
                    }
                },
                {
                    "input": {
                        "author": "user",
                        "content": "\\"\\""
                    },
                    "output": {
                        "author": "bot",
                        "content": "{
                  \\"name\\": null,
                  \\"phone\\": null,
                  \\"jobTitle\\": null,
                  \\"description\\": null,
                  \\"location\\": null,
                  \\"birthdate\\": null,
                  \\"email\\": null,
                  \\"nationality\\": null,
                  \\"social\\": {
                    \\"linkedin\\": null,
                    \\"instagram\\": null,
                    \\"twitter\\": null,
                    \\"github\\": null,
                    \\"bitbucket\\": null
                  },
                  \\"skills\\": [],
                  \\"language\\": [],
                  \\"education\\": [
                    {
                      \\"startingDate\\": null,
                      \\"finishDate\\": null,
                      \\"title\\": null,
                      \\"description\\": null,
                      \\"institution\\": null,
                      \\"location\\": null
                    }
                  ],
                  \\"workExperience\\": [
                    {
                      \\"startingDate\\": null,
                      \\"finishDate\\": null,
                      \\"title\\": null,
                      \\"description\\": null,
                      \\"company\\": null,
                      \\"location\\": null
                    }
                  ]
                }"
                    }
                }
            ],
            "messages": [ {
    "author": "user",
    "content": "Info\n• Name\nMário Filipe da Silva Vieira\n• Nationality\nPortuguese\nBirthdate\n15 of May 1997\n• \n mariovieira.work@hotmail.com\n• Location\nTerceira, Azores - Portugal\nSocial\nin /mario-vieira\nO@mario.vieira97\n/Mario Work\nmv\nSoftware Developer\nWork Experience\n01-2021 Present\nReact Js Developer\nBool / <Code_For_All_> (Azores/Remote)\n03-2019 10-2020\nJunior Full Stack Developer\nAltyra Solutions (Lisbon)\n06-2016-07-2016\nComputer Systems & Management &\nPrograming Technician\nHealtcare Center of Angra do Heroísmo (Azores)\nJava\n06-2015-07-2015\nComputer Systems & Management &\nPrograming Technician\nAirport of Lajes (Azores)\nEducation\n09-202012-2020\nCoding Bootcamp\n<Academia_de_Código_> - Azores\n09-2017-09-2019\nCtesp - Associate Degree - Software\nDevelopment for mobile devices\nISTEC - Lisbon\n09-2013-07-2016\nEquivalent to Highschool - level 4 -\nProfissional course - Computer\nSystems & Programming Technician\nFEPPV - Azores\n07-2007 - 03 - 2008\nVocational Trainning - Computing from\nUsers Prespective\nEconoteca - Azores\nSkills\nReact.js\nRestfull API\nNode.js\nC# .NET\nOOP\nFlutter / Dart\nJavascript\nHTML / CSS\nPostgreSQL\nUnix\nVIM\nVS Code\nDocker Apache Kafka Micro Services Strapi ORM Kubernetes\n.",
  }]
        }
    ],
    "parameters": {
        "maxOutputTokens": 1024,
        "temperature": 0.2,
        "topP": 0.8,
        "topK": 40
    }
}'