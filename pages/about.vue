<script setup lang="ts">
useHead({
  link: [{ rel: "stylesheet", href: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" }],
});

const educationData = [
  {
    title: "Deep Learning Foundations",
    startDate: "01/2017",
    endDate: "08/2017",
    school: {
      name: "Udacity",
      url: "https://www.udacity.com",
    },
    body: "A nanodegree program at Udacity",
    items: [
      'The <a href="https://www.udacity.com/course/deep-learning-nanodegree-foundation--nd101" target="_blank" class="text-sky-500 hover:text-sky-400">program syllabus</a> include: Neural Networks, Convolutional Neural Networks, Recurrent Neural Networks, Generative Adversarial Networks',
      'The 5 projects I built during the program - <a href="https://github.com/nirgn975/DLND" target="_blank" class="text-sky-500 hover:text-sky-400">GitHub</a>',
      '<a href="education/nd101.pdf" class="text-sky-500 hover:text-sky-400" download>Completion certificate</a>',
    ],
  },
  {
    title: "Bachelor's degree in Computer Science and Business Administration",
    startDate: " 06/2011",
    endDate: "06/2016",
    school: {
      name: "The Open University of Israel",
      url: "https://www.linkedin.com/edu/school?id=162040&trk=edu-cp-title",
    },
    body: "",
    items: [
      "Seminar paper in Business Ethics course (grade: 85)",
      'Final project was in Java: <a href="https://github.com/nirgn975/Book4You" target="_blank" class="text-sky-500 hover:text-sky-400">GitHub Repo</a> (grade: 95)',
      "GPA: 76",
    ],
  },
  {
    title: "High School diploma",
    startDate: "01/2004",
    endDate: "01/2008",
    school: {
      name: "Ora Modi'im High School",
      url: "https://oramodiim.tik-tak.net",
    },
    body: "Majoring in computer science at Ora Modi'im High School",
    items: ["GPA: 82"],
  },
];

const skillsData = [
  {
    category: "Architecture",
    items: [
      {
        name: "Microservices",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 512 512'><path d='M418.4 157.9c35.3-8.3 61.6-40 61.6-77.9c0-44.2-35.8-80-80-80c-43.4 0-78.7 34.5-80 77.5L136.2 151.1C121.7 136.8 101.9 128 80 128c-44.2 0-80 35.8-80 80s35.8 80 80 80c12.2 0 23.8-2.7 34.1-7.6L259.7 407.8c-2.4 7.6-3.7 15.8-3.7 24.2c0 44.2 35.8 80 80 80s80-35.8 80-80c0-27.7-14-52.1-35.4-66.4l37.8-207.7zM156.3 232.2c2.2-6.9 3.5-14.2 3.7-21.7l183.8-73.5c3.6 3.5 7.4 6.7 11.6 9.5L317.6 354.1c-5.5 1.3-10.8 3.1-15.8 5.5L156.3 232.2z'/></svg>",
      },
      {
        name: "RESTful APIs",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='20' viewBox='0 0 640 512'><path d='M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z'/></svg>",
      },
      { name: "GraphQL", code: "devicon-graphql-plain" },
      {
        name: "Data Structures & Algorithms",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'><path d='M416 32H384c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32 14.3 32 32v37.5c0 25.5 10.1 49.9 28.1 67.9L498.7 256l-22.6 22.6c-18 18-28.1 42.4-28.1 67.9V384c0 17.7-14.3 32-32 32H384c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c53 0 96-43 96-96V346.5c0-8.5 3.4-16.6 9.4-22.6l45.3-45.3c12.5-12.5 12.5-32.8 0-45.3l-45.3-45.3c-6-6-9.4-14.1-9.4-22.6V128c0-53-43-96-96-96zM160 32c-53 0-96 43-96 96v37.5c0 8.5-3.4 16.6-9.4 22.6L9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l45.3 45.3c6 6 9.4 14.1 9.4 22.6V384c0 53 43 96 96 96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V346.5c0-25.5-10.1-49.9-28.1-67.9L77.3 256l22.6-22.6c18-18 28.1-42.4 28.1-67.9V128c0-17.7 14.3-32 32-32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H160z'/></svg>",
      },
      {
        name: "SasS / PasS",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 512 512'><path d='M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm384 0c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24z'/></svg>",
      },
      {
        name: "TDD (Test Driven Development)",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'><path d='M142.4 21.9c5.6 16.8-3.5 34.9-20.2 40.5L96 71.1V192c0 53 43 96 96 96s96-43 96-96V71.1l-26.1-8.7c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l26.1 8.7C334.4 19.1 352 43.5 352 71.1V192c0 77.2-54.6 141.6-127.3 156.7C231 404.6 278.4 448 336 448c61.9 0 112-50.1 112-112V265.3c-28.3-12.3-48-40.5-48-73.3c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V336c0 97.2-78.8 176-176 176c-92.9 0-168.9-71.9-175.5-163.1C87.2 334.2 32 269.6 32 192V71.1c0-27.5 17.6-52 43.8-60.7l26.1-8.7c16.8-5.6 34.9 3.5 40.5 20.2zM480 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64z'/></svg>",
      },
      {
        name: "Webhook",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'><path d='M208 128c0-44.2 35.8-80 80-80s80 35.8 80 80c0 10.7-2.1 20.8-5.8 30l44.5 18c6-14.9 9.3-31.1 9.3-48.1C416 57.3 358.7 0 288 0S160 57.3 160 128c0 37.1 15.8 70.5 41 93.9L129.7 336c-.6 0-1.1 0-1.7 0c-26.5 0-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48c0-8.1-2-15.8-5.6-22.5l82.8-132.5 12.7-20.3-20.3-12.7C223 181.7 208 156.6 208 128zm81.7 48l82.8 132.5 12.7 20.4 20.4-12.8c12.3-7.7 26.8-12.1 42.4-12.1c44.2 0 80 35.8 80 80s-35.8 80-80 80c-22.2 0-42.2-9-56.8-23.6l-34.1 33.8C380.3 497.5 412.5 512 448 512c70.7 0 128-57.3 128-128s-57.3-128-128-128c-16.3 0-31.9 3.1-46.3 8.6L330.4 150.5c3.6-6.7 5.6-14.4 5.6-22.5c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48c.6 0 1.1 0 1.7 0zM448 432c26.5 0 48-21.5 48-48s-21.5-48-48-48c-17.8 0-33.3 9.7-41.6 24H232 208v24c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-39.7 28.9-72.7 66.8-78.9L107 257.7C46.3 267.7 0 320.4 0 384c0 70.7 57.3 128 128 128c62.5 0 114.5-44.8 125.8-104H406.4c8.3 14.3 23.8 24 41.6 24z'/></svg>",
      },
    ],
  },
  {
    category: "FrontEnd",
    items: [
      { name: "HTML", code: "devicon-html5-plain" },
      { name: "CSS / SCSS (Bootstrap, UIkit, Tailwind CSS, Material Design)", code: "devicon-css3-plain" },
      { name: "JavaScript (jQuery, Ajax)", code: "devicon-javascript-plain" },
      { name: "Angular (cli, ngrx, material)", code: "devicon-angularjs-plain" },
      { name: "Vue (vue router, pinia)", code: "devicon-vuejs-plain" },
      { name: "Tailwindcss", code: "devicon-tailwindcss-plain" },
    ],
  },
  {
    category: "BackEnd",
    items: [
      { name: "Java", code: "devicon-java-plain" },
      { name: "Spring", code: "devicon-spring-plain" },
      { name: "Node.js", code: "devicon-nodejs-plain" },
      { name: "TypeScript", code: "devicon-typescript-plain" },
      { name: "Express.js", code: "devicon-express-original" },
      { name: "NestJS", code: "devicon-nestjs-plain" },
      { name: "Python", code: "devicon-python-plain" },
      { name: "Django", code: "devicon-django-plain" },
      { name: "Flask", code: "devicon-flask-original" },
      { name: "Golang", code: "devicon-go-original-wordmark" },
    ],
  },
  {
    category: "Tests",
    items: [
      { name: "Mocha", code: "devicon-mocha-plain" },
      { name: "Jest", code: "devicon-jest-plain" },
      { name: "Vitest", code: "" },
    ],
  },
  {
    category: "Platforms",
    items: [
      { name: "Linux", code: "devicon-linux-plain" },
      { name: "Git", code: "devicon-git-plain" },
      { name: "GitHub", code: "devicon-github-original" },
    ],
  },
  {
    category: "Jamstack",
    items: [
      { name: "Markdown", code: "devicon-markdown-original" },
      {
        name: "Jekyll",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 512 512'><path d='M10.2 460.4L0 511.4l51-10.2 109-21.8L420.7 218.7l-16-16-96-96-16-16L32 351.4l-21.8 109zM315.3 68.1l16 16 96 96 16 16 34.7-34.7L512 127.4 478.1 93.5 417.9 33.4 384-.6 350.1 33.4 315.3 68.1zM99.9 351.4H112v48h48v12.1l-23.7 23.7-75.1 15 15-75.1 23.7-23.7zm226.7-176l-11.3 11.3-144 144L160 342.1l-22.6-22.6 11.3-11.3 144-144L304 152.8l22.6 22.6z'/></svg>",
      },
      { name: "Hugo", code: "devicon-hugo-plain" },
      {
        name: "Astro",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='14' viewBox='0 0 448 512'><path d='M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z'/></svg>",
      },
      { name: "Nuxt", code: "devicon-nuxtjs-plain" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Bash", code: "devicon-bash-plain" },
      { name: "Electron", code: "devicon-electron-original" },
      { name: "Ionic", code: "devicon-ionic-original" },
      { name: "Gulp", code: "devicon-gulp-plain" },
      {
        name: "Yeoman",
        code: "<svg fill='#a3a3a3' width='20' height='20' viewBox='0 0 14 14' role='img' focusable='false' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'><path d='m 7.3637204,6.4490191 -0.030219,-0.082774 c -0.00701,0.0039 -0.014453,0.0079 -0.021898,0.01139 l 0.052116,0.07095 z m 0.2216045,-0.176934 -0.05781,-0.06613 c -0.00526,0.0066 -0.011387,0.01226 -0.016642,0.0184 l 0.074452,0.04774 z m 0.1427729,-0.245692 -0.077956,-0.04073 c -0.00263,0.0079 -0.00569,0.01577 -0.00832,0.02321 l 0.086277,0.01752 z m 0.044233,-0.28029 -0.088029,-0.01007 c 4.38e-4,0.0083 0.00131,0.01664 0.00131,0.02496 l 0.086715,-0.01489 z m -0.059562,-0.277662 -0.085401,0.02234 c 0.0035,0.0074 0.00657,0.01533 0.00963,0.02277 l 0.075766,-0.04511 z m -1.160577,0.928023 0.060438,-0.0635 c -0.00701,-0.0048 -0.013139,-0.01007 -0.019708,-0.01489 l -0.040292,0.07839 z m 0.5404347,0.137956 0.00175,-0.08803 c -0.00832,0.0013 -0.016204,0.0031 -0.024525,0.0035 l 0.022774,0.08452 z m -0.283356,-0.01839 0.033723,-0.08146 c -0.00788,-0.0018 -0.016204,-0.0039 -0.024088,-0.0061 l -0.00964,0.08759 z M 6.61263,6.3329611 c 0.062189,0.04292 0.131824,0.07489 0.2067141,0.09547 l 0.03854,-0.352991 -0.2448161,0.257517 z m 0.7129884,-1.266124 -0.048175,0.07401 c 0.00745,0.0035 0.01489,0.007 0.022336,0.01095 l 0.025401,-0.08452 z m -0.9928408,0.312261 0.068759,0.05431 c 0.00394,-0.0074 0.00832,-0.01401 0.012701,-0.02102 l -0.081897,-0.03328 z m -0.095474,0.267152 0.083649,0.02584 c 0.00131,-0.0083 0.00219,-0.0162 0.00394,-0.02453 l -0.087591,-0.0013 z m 0.00788,0.283794 0.087153,-0.0061 c -0.00175,-0.0079 -0.00394,-0.01577 -0.00569,-0.02409 l -0.081897,0.03022 z m 1.311671,-0.698536 -0.071386,0.05168 c 0.00569,0.0057 0.010949,0.01226 0.016642,0.01839 l 0.054744,-0.07007 z m -1.2021826,0.960432 0.07927,-0.03723 c -0.00482,-0.007 -0.00876,-0.01402 -0.013139,-0.02102 l -0.066131,0.05825 z m 0.4883183,0.242626 c 0.050803,0.01182 0.1029191,0.01883 0.1572253,0.01883 0.02365,0 0.046861,-0.0013 0.070073,-0.0035 l -0.09197,-0.343356 -0.1353276,0.328027 z m 0.20759,-1.437801 -0.017956,0.08671 c 0.00832,4.38e-4 0.016642,4.38e-4 0.024963,0.0013 l -0.00657,-0.08759 z m -0.2820422,0.03372 0.014453,0.08672 c 0.00788,-0.0026 0.015766,-0.0053 0.023649,-0.0074 l -0.037664,-0.07927 z m -0.2505094,0.133576 0.044671,0.07533 c 0.00657,-0.0053 0.013139,-0.01007 0.019708,-0.01489 l -0.064379,-0.06044 z m 0.8154696,1.20262 c 0.067007,-0.03723 0.1265686,-0.08584 0.1773712,-0.142334 l -0.2982431,-0.191384 0.1208752,0.33372 z M 7.2086848,5.7986581 c 0,0.115181 -0.093284,0.208466 -0.2084659,0.208466 -0.1151818,0 -0.2084659,-0.09328 -0.2084659,-0.208466 0,-0.115182 0.093284,-0.208466 0.2084659,-0.208466 0.1151818,0 0.2084659,0.09328 0.2084659,0.208466 z m -0.8759072,0.125254 c 0.017518,0.07533 0.047737,0.146277 0.088029,0.20978 l 0.2662758,-0.234743 -0.3543045,0.02496 z m -0.011387,-0.251823 c -0.00438,0.0311 -0.00745,0.06306 -0.00745,0.09547 0,0.04511 0.00482,0.08934 0.013139,0.132262 L 6.6608049,5.7767601 6.3213908,5.6720891 Z m 0.2710933,0.645982 0.1629187,-0.314889 -0.3214579,0.151532 c 0.043357,0.06307 0.097226,0.117809 0.1585392,0.163357 z m 0.4077348,0.399851 c 0.5242305,0 0.9503599,-0.426129 0.9503599,-0.949921 0,-0.523793 -0.4265674,-0.950797 -0.9503599,-0.950797 -0.5237925,0 -0.9503593,0.426566 -0.9503593,0.950797 0,0.523792 0.4265668,0.949921 0.9503593,0.949921 z m 0,-1.739551 c 0.4353259,0 0.7891924,0.354304 0.7891924,0.789192 0,0.434888 -0.3543045,0.789192 -0.7891924,0.789192 -0.4348879,0 -0.7891924,-0.353866 -0.7891924,-0.789192 0,-0.435326 0.3543045,-0.789192 0.7891924,-0.789192 z m -0.5986826,0.455033 c -0.036788,0.06569 -0.062627,0.137956 -0.076642,0.214598 l 0.3551804,0.0057 -0.2785385,-0.220291 z m 3.1777915,4.304208 C 7.7705791,9.2873961 7.0002187,10.204909 7.0002187,10.204909 c -0.00876,0.917513 1.2464159,2.562028 2.7866989,2.760859 1.5402834,0.198831 2.5269924,-0.536493 2.5269924,-0.536493 0,0 -0.925834,-2.241446 -2.7345824,-2.6916629 z m -5.1582176,0 C 2.6123616,10.187391 1.6865277,12.429275 1.6865277,12.429275 c 0,0 0.9867094,0.735762 2.5269923,0.536493 1.5402828,-0.198831 2.7954578,-1.843346 2.7866987,-2.760859 0,0 -0.7703604,-0.9175129 -2.5791087,-0.4672969 z m 2.6737067,-3.291221 c 0.07708,-0.01051 0.1502181,-0.03416 0.216787,-0.06832 l -0.2093418,-0.286421 -0.00788,0.354742 z m -5.1315023,1.395758 10.0738096,0 0.311385,-0.934593 -1.479408,0 0.289926,-1.67561 0.385837,-2.231374 c 0,0 -1.019118,-2.000572 -4.5223097,-2.000572 -4.2582228,0 -4.5669801,2.000572 -4.5669801,2.000572 l 0.6757624,3.906984 -1.4798452,0 0.311385,0.934593 z m 5.0369043,-3.167718 c 0.6030621,0 1.0935699,0.490508 1.0935699,1.09357 0,0.602624 -0.4905078,1.092694 -1.0935699,1.092694 -0.6030621,0 -1.0935701,-0.490508 -1.0935701,-1.092694 0,-0.603062 0.490508,-1.09357 1.0935701,-1.09357 z m 0.6845215,1.061599 c -0.0035,-0.07795 -0.020146,-0.152846 -0.047737,-0.22248 l -0.3043777,0.181751 0.3521147,0.04029 z m -0.034598,0.249634 c 0.023212,-0.06832 0.035912,-0.141897 0.035912,-0.218101 0,-0.0022 -4.379e-4,-0.0044 -4.379e-4,-0.0066 l -0.3499249,0.06 0.3144506,0.164671 z m -0.122627,0.22029 c 0.048613,-0.05825 0.086715,-0.124816 0.1143059,-0.196641 l -0.3477351,-0.07051 0.2334292,0.267589 z m 0.099854,-0.715178 c -0.031095,-0.07007 -0.073576,-0.134014 -0.1252548,-0.189634 l -0.2176629,0.278977 0.3433556,-0.08978 z m -0.141897,-0.20759 c -0.05343,-0.05387 -0.1164957,-0.0981 -0.1852544,-0.131386 l -0.1024811,0.339414 0.2877355,-0.20759 z M 6.562704,5.2398261 c -0.058686,0.04861 -0.1086125,0.107298 -0.1480284,0.172554 l 0.3289032,0.133575 -0.1804369,-0.306129 z m 0.4694862,-0.156788 c -0.010949,-4.38e-4 -0.02146,-0.0018 -0.031971,-0.0018 -0.067445,0 -0.132262,0.01007 -0.1935755,0.02847 l 0.1532838,0.320582 0.0727,-0.34686 z m -0.2491956,0.03416 c -0.073138,0.02453 -0.1405831,0.06087 -0.2005827,0.107298 l 0.2583926,0.243065 -0.05781,-0.350363 z m 0.4944496,0.02321 C 7.2091228,5.1101951 7.1351086,5.0904871 7.0571529,5.0843551 l 0.027153,0.353429 0.1931375,-0.297371 z'/></svg>",
      },
      {
        name: "Vite",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='12' viewBox='0 0 384 512'><path d='M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z'/></svg>",
      },
      {
        name: "RabbitMQ",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 512 512'><path d='M321.4 128c4.8 0 9.6 .3 14.3 .9c1.1-24-2.6-47.9-10.9-70.1c7.6-17.8 18.6-34.2 32.7-48.3l4.6-4.6c3.7-3.7 8.8-5.8 14-5.8c9.2 0 17.2 6.4 19.3 15.4l1 4.4c9.8 42.4 1.8 86.5-21 122.4c5.5 3.1 10.7 6.6 15.6 10.6L425.8 181c14 11.4 22.2 28.6 22.2 46.7c0 33.3-27 60.3-60.3 60.3H352v25.8l61.7 154.3c6.6 16.4-1.4 35-17.8 41.6s-35-1.4-41.6-17.8l-39.4-98.6L265.6 448H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H208 160c-28.5 0-52.6-18.6-60.9-44.2C88.8 480.1 73.3 488 56 488c-30.9 0-56-25.1-56-56s25.1-56 56-56c17.4 0 33 8 43.3 20.5C114 317.7 176.8 255.9 256 242.7V193.4c0-10.9 2.7-21.2 7.4-30.2c-34.3-36.5-50.3-86.8-43.2-136.8l.7-4.9C222.7 9.2 233.2 0 245.7 0c6.6 0 12.9 2.6 17.6 7.3l3.1 3.1c31.8 31.5 47.9 74.8 45.4 118.4c3.1-.5 6.3-.7 9.6-.7zM368 224a16 16 0 1 0 0-32 16 16 0 1 0 0 32z'/></svg>",
      },
      {
        name: "Pub/Sub",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'><path d='M80.3 44C69.8 69.9 64 98.2 64 128s5.8 58.1 16.3 84c6.6 16.4-1.3 35-17.7 41.7s-35-1.3-41.7-17.7C7.4 202.6 0 166.1 0 128S7.4 53.4 20.9 20C27.6 3.6 46.2-4.3 62.6 2.3S86.9 27.6 80.3 44zM555.1 20C568.6 53.4 576 89.9 576 128s-7.4 74.6-20.9 108c-6.6 16.4-25.3 24.3-41.7 17.7S489.1 228.4 495.7 212c10.5-25.9 16.3-54.2 16.3-84s-5.8-58.1-16.3-84C489.1 27.6 497 9 513.4 2.3s35 1.3 41.7 17.7zM352 128c0 23.7-12.9 44.4-32 55.4V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V183.4c-19.1-11.1-32-31.7-32-55.4c0-35.3 28.7-64 64-64s64 28.7 64 64zM170.6 76.8C163.8 92.4 160 109.7 160 128s3.8 35.6 10.6 51.2c7.1 16.2-.3 35.1-16.5 42.1s-35.1-.3-42.1-16.5c-10.3-23.6-16-49.6-16-76.8s5.7-53.2 16-76.8c7.1-16.2 25.9-23.6 42.1-16.5s23.6 25.9 16.5 42.1zM464 51.2c10.3 23.6 16 49.6 16 76.8s-5.7 53.2-16 76.8c-7.1 16.2-25.9 23.6-42.1 16.5s-23.6-25.9-16.5-42.1c6.8-15.6 10.6-32.9 10.6-51.2s-3.8-35.6-10.6-51.2c-7.1-16.2 .3-35.1 16.5-42.1s35.1 .3 42.1 16.5z'/></svg>",
      },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", code: "devicon-postgresql-plain" },
      { name: "MongoDB", code: "devicon-mongodb-plain" },
      {
        name: "RethinkDB",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='14' viewBox='0 0 448 512'><path d='M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z'/></svg>",
      },
      { name: "Redis", code: "devicon-redis-plain" },
    ],
  },
  {
    category: "Clouds & Devops",
    items: [
      { name: "AWS", code: "devicon-amazonwebservices-original" },
      { name: "Docker", code: "devicon-docker-plain" },
      { name: "Kubernetes", code: "devicon-kubernetes-plain" },
      { name: "Digital Ocean", code: "devicon-digitalocean-plain" },
      { name: "Google Cloud Platform", code: "devicon-googlecloud-plain" },
      {
        name: "CI / CD",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 512 512'><path d='M320 488c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1s14.2 12.4 14.2 21.9v40h16c35.3 0 64-28.7 64-64V153.3C371.7 141 352 112.8 352 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V320c0 70.7-57.3 128-128 128H320v40zM456 80a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM192 24c0-9.5 5.6-18.1 14.2-21.9s18.8-2.3 25.8 4.1l80 72c5.1 4.6 7.9 11 7.9 17.8s-2.9 13.3-7.9 17.8l-80 72c-7 6.3-17.2 7.9-25.8 4.1s-14.2-12.4-14.2-21.9V128H176c-35.3 0-64 28.7-64 64V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-70.7 57.3-128 128-128h16V24zM56 432a24 24 0 1 0 48 0 24 24 0 1 0 -48 0z'/></svg>",
      },
      {
        name: "Load Balancing",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 512 512'><path d='M416 32l96 96-96 96H384V160H333.3l-96 96 96 96H384V288h32l96 96-96 96H384V416H320 306.7l-9.4-9.4L178.7 288H32 0V224H32 178.7L297.4 105.4l9.4-9.4H320h64V32h32z'/></svg>",
      },
      { name: "NGINX", code: "devicon-nginx-original" },
    ],
  },
  {
    category: "Others",
    items: [
      {
        name: "Doing Pen Testing By Night",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512'><path d='M432 64c-44.2 0-80 35.8-80 80v48h32c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H288V144C288 64.5 352.5 0 432 0s144 64.5 144 144v48c0 17.7-14.3 32-32 32s-32-14.3-32-32V144c0-44.2-35.8-80-80-80zM256 384c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h64z'/></svg>",
      },
      {
        name: "Coffee Drinker",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='20' viewBox='0 0 640 512'><path d='M96 64c0-17.7 14.3-32 32-32H448h64c70.7 0 128 57.3 128 128s-57.3 128-128 128H480c0 53-43 96-96 96H192c-53 0-96-43-96-96V64zM480 224h32c35.3 0 64-28.7 64-64s-28.7-64-64-64H480V224zM32 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z'/></svg>",
      },
      {
        name: "Open Source Contributer",
        code: "<svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' viewBox='0 0 512 512'><path d='M256 0c53 0 96 43 96 96v3.6c0 15.7-12.7 28.4-28.4 28.4H188.4c-15.7 0-28.4-12.7-28.4-28.4V96c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4H312c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6V240c0-8.8-7.2-16-16-16s-16 7.2-16 16V479.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96.3c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z'/></svg>",
      },
      { name: "Unix (Linux & Mac) User", code: "devicon-unix-original" },
      { name: "Love To Play With Arduino", code: "devicon-arduino-plain" },
      { name: "Done projects with Raspberry Pi", code: "devicon-raspberrypi-line" },
    ],
  },
];

const talksData = [
  {
    future: false,
    image: "/about/talks/pipenv-the-future-of-python-dependency-management.webp",
    title: "Pipenv: The future of Python dependency management",
    date: "4/12/17",
    meetupUrl: "https://www.meetup.com/PyWeb-IL/events/245071494",
    downloadUrl: "/about/talks/pipenv-the-future-of-python-dependency-management.pptx",
  },
  {
    future: false,
    image: "/about/talks/api-star.webp",
    title: "API Star - Next generation framework!",
    date: "6/11/17",
    meetupUrl: "https://www.meetup.com/PyWeb-IL/events/243985794",
    downloadUrl: "/about/talks/api-star.pptx",
  },
  {
    future: false,
    image: "/about/talks/404-sql-db-not-found.webp",
    title: "404 SQL DB not found. Meet RethinkDB",
    date: "11/8/16",
    meetupUrl: "https://www.meetup.com/RethinkDB-Israel-Meetup/events/217336482",
    downloadUrl: "/about/talks/404-sql-db-not-found.pptx",
  },
];

const workData = [
  {
    title: "Founder, CEO & CTO",
    startDate: "01/2022",
    endDate: "present",
    company: {
      name: "Freedom",
      url: "https://nir.galons.io",
    },
    body: "I'm self employed, independent, working on some hubby projects and for-profit ventures (like https://subwatch.co and https://convertedge.co).",
    items: [],
  },
  {
    title: "Lead Software Engineer (Team Leader)",
    startDate: "01/2020",
    endDate: "07/2021",
    company: {
      name: "Cognyte (formerly a Verint company)",
      url: "https://www.linkedin.com/company/cognyte",
    },
    body: "",
    items: [
      "WebintPro LTD was acquired by Cognyte (formerly a Verint company).",
      "Write a compelete data pipeline using RabbitMQ message broker.",
      "Rewrite the backend microservices from Express.js to NestJS.",
      "Build a CI/CD for an Electron desktop application using GitHub actions and GCP.",
    ],
  },
  {
    title: "Lead Software Engineer (Team Leader)",
    startDate: "02/2017",
    endDate: "12/2019",
    company: {
      name: "WebintPro Ltd",
      url: "https://www.linkedin.com/company/3296384",
    },
    body: "",
    items: [
      "Formed a team (4 full stack developers) to develop and maintains a system to fetch, analyze, and save big data from social networks.",
      "The backend services was written in Python with Sanic framework and Node.js with Express.js framework.",
      "The frontend dashboard was written in Angular using ngrx, material, and D3.js.",
      "Using Docker & Kubernetes for deployment on Google Cloud Platform, with a compelete CI/CD (tests, code reviews, dev environment, etc).",
      "Implements a Microservices architecture with Pub/Sub.",
      "Using Deep Learning methodologies to extract and analyze data. And save it in MongoDB, and Redis Databases.",
      "Created the project from scratch, build the team, manage it, doing code reviews, etc.",
    ],
  },
  {
    title: "Senior Full Stack Software Engineer",
    startDate: "12/2015",
    endDate: "01/2017",
    company: {
      name: "Gizra - Internet Solutions",
      url: "https://www.linkedin.com/company/1776824",
    },
    body: "",
    items: [
      "Developing a system to connect between companies on varies projects, tracking, and managing them, for the European Union.",
      "The Frontend is build with HTML5, CSS3, Bootstrap, JS, and jQuery. Backend written with Drupal in PHP and MySQL Database.",
      "Working with Git on GitHub, doing code reviews, and writing tests with Behat (runs on Travis-CI).",
      "Builds a Docker image for the system, and integrate continuous deployment methods.",
    ],
  },
  {
    title: "Lead Software Engineer, Volunteer",
    startDate: "10/2015",
    endDate: "01/2019",
    company: {
      name: "The Public Knowledge Workshop",
      url: "https://www.linkedin.com/company/2471778",
    },
    body: "",
    items: [
      'Take part in Hackita02 program and one of the founders of "Ways Of Time" project that enable the National Library of Israel to upload and geotag their geographic maps collection, and open them to the public (Python, Django, Leaflet, PostGIS, MDL).',
      'Lead developer of version 2.x of the "Open Pension" project. The project mission is to reveal what happens behind the Israeli pension market, while enabling the public to trace the money and expose corruption (Python, Django, Scrapy, PostgreSQL, Angular, ngrx, d3.js).',
      '<a href="https://github.com/nirgn975/WaysOfTime" target="_blank" class="text-sky-500 hover:text-sky-400">Ways Of Time Repo</a> | <a href="https://github.com/hasadna/open_pension" target="_blank" class="text-sky-500 hover:text-sky-400">Open Pension Website Repo</a> | <a href="https://github.com/hasadna/open_pension_scraper" target="_blank" class="text-sky-500 hover:text-sky-400">Open Pension Crawler Repo</a>',
    ],
  },
  {
    title: "Full Stack Software Engineer",
    startDate: "07/2015",
    endDate: "11/2015",
    company: {
      name: "Restart Group - IT | WEB | Mobile | People",
      url: "https://www.linkedin.com/company/2484049",
    },
    body: "",
    items: [
      "Part of a team that develops and maintains a financial system, from end to end, that handles thousands of transactions to offshore bank accounts.",
      "Implement a new Front-end design built with HTML5, CSS3, Bootstrap, JS and jQuery.",
      "Back-end written in PHP, and DB in MySQL.",
      "Implement new banks APIs.",
    ],
  },
  {
    title: "Internet Expert",
    startDate: "03/2011",
    endDate: "12/2012",
    company: {
      name: "Cellcom Israel, Ltd",
      url: "https://www.linkedin.com/company/162949",
    },
    body: "",
    items: [
      "Tier 2 customer Support Expert Team.",
      "Knowledge focal point for representatives at specialized Call centers.",
      "Handling top level customer escalations and Gold customers support.",
      "Experience working on UNIX-based switches with HP-UX, And with SAP & Amdocs systems.",
      "Responsible for converting two call centers (Haifa and Beer Sheva) to specialized centers (provide training, and supervision throughout the beginning of the activity until go-live operation).",
    ],
  },
  {
    title: "Internet Service Representitive",
    startDate: "11/2009",
    endDate: "02/2011",
    company: {
      name: "Cellcom Israel, Ltd",
      url: "https://www.linkedin.com/company/162949",
    },
    body: "",
    items: [
      "Tier 1 customer Support Team.",
      "Handling customer requirements and providing solutions on Internet, data and technical problems.",
      "Rated at the 10% of the Company's outstanding employees in 2010 and a leader in service in the internet and technical Customer Service Center in 2011.",
    ],
  },
  {
    title: "Military service (shortened for health reasons)",
    startDate: "03/2009",
    endDate: "10/2009",
    company: {
      name: "IDF (Israel Defense Forces)",
      url: "https://www.linkedin.com/company/israeldefenseforces",
    },
    body: "Administrative role in the logistics department at Sde Dov Air Force base.",
    items: [],
  },
];

let repos: Array<{ code: string; title: string; name?: string; description?: string; url?: string; stars?: string; forks?: string }> = [
  { code: "generator-jekyll-starter-kit", title: "Jekyll Starter Kit Generator" },
  { code: "stories-of-a-lifelong-student", title: "Stories Of A Lifelong Student" },
  { code: "devRes", title: "Developer Resume" },
  { code: "challenges", title: "Random Challenges Solutions" },
  { code: "angular-sanic-seed-project", title: "Angular Sanic Seed Project" },
  { code: "awesome-cyber-awesome", title: "Awesome Cyber Awesome" },
  { code: "elmctron", title: "Elmctron" },
];

for (const [index, repo] of repos.entries()) {
  const { data, pending, error } = await useFetch<Record<string, any>>(`https://api.github.com/repos/nirgn975/${repo.code}`);
  repos[index] = {
    ...repo,
    name: data.value?.name,
    description: data.value?.description,
    url: data.value?.html_url,
    stars: data.value?.stargazers_count,
    forks: data.value?.forks,
  };
}

repos = repos.sort((a, b) => Number(b.stars) - Number(a.stars));
</script>

<template>
  <section class="divide-y divide-zinc-300 dark:divide-zinc-700">
    <!-- About Me -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
          />
        </svg>
        <h2 class="font-medium text-3xl">About Me</h2>
      </div>
      <p class="mb-4">I'm a dedicated, quality-focused professional with a strong sense of responsibility, team spirit and good human skills.</p>
      <ul class="list-disc pl-6">
        <li>Active in the open source community.</li>
        <li>Broad system view with the ability to drill down to the fine details.</li>
        <li>Fast learning curve, adapting and embracing new technologies.</li>
      </ul>
    </div>

    <!-- Work -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"
          />
        </svg>
        <h2 class="font-medium text-3xl">Work</h2>
      </div>

      <div class="pt-4 pl-6">
        <div class="pt-4 pb-8 px-6 border-l-2 border-zinc-700 dark:border-zinc-400" v-for="(work, index) of workData" :key="index">
          <time
            class="relative before:h-5 before:w-5 before:absolute before:rounded-full before:border-2 before:border-zinc-700 dark:before:border-zinc-400 before:bg-zinc-50 dark:before:bg-zinc-800 before:-left-9 before:content-['']"
          >
            {{ work.startDate }} - {{ work.endDate }}
          </time>
          <h3 class="text-xl mt-2 mb-4">
            {{ work.title }} @
            <a :href="work.company.url" target="_blank" class="text-sky-500 hover:text-sky-400"> {{ work.company.name }} </a>
          </h3>
          <p>{{ work.body }}</p>
          <ul class="list-disc pl-6">
            <li v-for="(item, itemIndex) of work.items" :key="itemIndex">
              <p v-html="item"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"
          />
        </svg>
        <h2 class="font-medium text-3xl">Education</h2>
      </div>

      <div class="pt-4 pl-6">
        <div class="pt-4 pb-8 px-6 border-l-2 border-zinc-700 dark:border-zinc-400">
          <time
            class="relative before:h-5 before:w-5 before:absolute before:rounded-full before:border-2 before:border-zinc-700 dark:before:border-zinc-400 before:bg-zinc-50 dark:before:bg-zinc-800 before:-left-9 before:content-['']"
          >
            always - always
          </time>
          <h3 class="text-xl mt-2 mb-4">
            Self Learning @
            <a href="https://nir.galons.io" target="_blank" class="text-sky-500 hover:text-sky-400">Self Learning</a>
          </h3>
          <p>
            I'm very passionate about computers and technology, I always strive to learn more and keep myself up to date.<br />Here are some of the platforms I
            use do achive that goal:<br /><br />
            <a href="http://teamtreehouse.com/nirgalon" target="_blank" class="text-sky-500 hover:text-sky-400">Treehouse Profile</a> |
            <a href="https://www.codecademy.com/profiles/teraAce56031" target="_blank" class="text-sky-500 hover:text-sky-400">Codecademy Profile</a>
            <br />
          </p>
          <div class="flex justify-around items-center mt-4">
            <a href="https://www.codewars.com/users/nirgn" target="_blank">
              <img src="https://www.codewars.com/users/nirgn/badges/small" alt="codewars badge" />
            </a>
            <a href="https://stackexchange.com/users/2325549" target="_blank">
              <img src="https://stackexchange.com/users/flair/2325549.png" width="208" height="58" alt="stack exchange badge" />
            </a>
            <a href="https://tryhackme.com/p/nirgn975" target="_blank">
              <img src="https://tryhackme-badges.s3.amazonaws.com/nirgn975.png" alt="TryHackMe" />
            </a>
          </div>
        </div>

        <div class="pt-4 pb-8 px-6 border-l-2 border-zinc-700 dark:border-zinc-400" v-for="(education, index) of educationData" :key="index">
          <time
            class="relative before:h-5 before:w-5 before:absolute before:rounded-full before:border-2 before:border-zinc-700 dark:before:border-zinc-400 before:bg-zinc-50 dark:before:bg-zinc-800 before:-left-9 before:content-['']"
          >
            {{ education.startDate }} - {{ education.endDate }}
          </time>
          <h3 class="text-xl mt-2 mb-4">
            {{ education.title }} @
            <a :href="education.school.url" target="_blank" class="text-sky-500 hover:text-sky-400">{{ education.school.name }}</a>
          </h3>
          <p>{{ education.body }}</p>
          <ul class="list-disc pl-6">
            <li v-for="(item, itemIndex) of education.items" :key="itemIndex">
              <p v-html="item"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
          />
        </svg>
        <h2 class="font-medium text-3xl">Skills</h2>
      </div>

      <div class="mt-6" v-for="(skill, index) of skillsData" :key="index">
        <h3 class="text-xl my-2">{{ skill.category }}</h3>
        <div class="ml-4 flex flex-wrap gap-2">
          <span class="ml-4 flex items-center" v-for="(item, itemIndex) of skill.items" :key="itemIndex">
            <span v-if="item.code.includes('svg')" v-html="item.code" class="h-5 w-5 mr-1 fill-zinc-700 dark:fill-zinc-400"></span>
            <i v-else :class="[item.code, 'h-5 w-5 mr-1']" />
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
          />
        </svg>
        <h2 class="font-medium text-3xl">Some of my Projects</h2>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="flex flex-col bg-zinc-200 dark:bg-zinc-700 rounded-md" v-for="(repo, index) of repos" :key="index">
          <a :href="repo.url" target="_blank" class="p-4">
            <h3 class="text-lg font-medium">{{ repo.name }}</h3>
          </a>

          <a :href="repo.url" target="_blank"> <img :src="`/about/projects/${repo.code}.webp`" class="w-full" /> </a>

          <p class="p-4 flex-1">{{ repo.description }}</p>

          <div class="flex justify-between p-4 border-t border-zinc-700 dark:border-zinc-400">
            <span class="flex gap-1 items-center fill-zinc-700 dark:fill-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                <path
                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                />
              </svg>
              {{ repo.stars }}
            </span>
            <span class="flex gap-1 items-center fill-zinc-700 dark:fill-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path
                  d="M80 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32.4 97.2c28-12.4 47.6-40.5 47.6-73.2c0-44.2-35.8-80-80-80S0 35.8 0 80c0 32.8 19.7 61 48 73.3V358.7C19.7 371 0 399.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V272c26.7 20.1 60 32 96 32h86.7c12.3 28.3 40.5 48 73.3 48c44.2 0 80-35.8 80-80s-35.8-80-80-80c-32.8 0-61 19.7-73.3 48H208c-49.9 0-91-38.1-95.6-86.8zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM344 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                />
              </svg>
              {{ repo.forks }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Talks -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V288c0 35.3 28.7 64 64 64H256v34.7l-70.6 70.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 445.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L320 386.7V352H480c35.3 0 64-28.7 64-64V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512 64 32zM96 64H480V288H288 96V64z"
          />
        </svg>
        <h2 class="font-medium text-3xl">Talks</h2>
      </div>

      <div class="mt-4">
        <div class="flex flex-col md:flex-row" v-for="(talk, index) of talksData" :key="index">
          <img :src="talk.image" alt="Talk Thumbnail" class="my-2 rounded-md" />
          <div class="p-4">
            <h3 class="text-2xl">{{ talk.title }}</h3>
            <p class="pt-2">
              <time>{{ talk.date }}</time> |
              <span> <a :href="talk.meetupUrl" target="_blank" rel="noreferrer" class="text-sky-500 hover:text-sky-400"> Meetpup Page </a> | </span>
              <span>
                <a :href="talk.downloadUrl" target="_blank" rel="noreferrer" class="text-sky-500 hover:text-sky-400"> Download </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
