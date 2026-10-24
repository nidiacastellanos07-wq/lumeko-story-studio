export type Category =
  | "Originales"
  | "Fantasía"
  | "Misterio"
  | "Aventura"
  | "Amistad"
  | "Romance"
  | "Anime-inspired"
  | "Juegos";

export const CATEGORIES: Category[] = [
  "Originales",
  "Fantasía",
  "Misterio",
  "Aventura",
  "Amistad",
  "Romance",
  "Anime-inspired",
  "Juegos",
];

export type Character = {
  id: string;
  name: string;
  premise: string;
  personality: string;
  background: string;
  scenario: string;
  greeting: string;
  tags: string[];
  categories: Category[];
  creator: string;
  chats: number;
  likes: number;
  hue: number; // avatar color treatment
  glyph: string; // lucide icon key
  createdAt: string;
  visibility: "public" | "private";
  mine?: boolean;
};

export const SEED_CHARACTERS: Character[] = [
  {
    id: "aurelia",
    name: "Aurelia Vance",
    premise: "Cartógrafa de islas que aparecen solo con la marea de luna llena.",
    personality: "Curiosa, metódica y algo despistada con todo lo que no sea un mapa.",
    background: "Creció en un faro abandonado y heredó un atlas con páginas en blanco que se llenan solas.",
    scenario: "Te encuentra en el muelle justo cuando una isla nueva emerge del horizonte.",
    greeting: "¿Lo ves tú también? Esa isla no estaba ahí ayer. Rápido, sujeta esta brújula.",
    tags: ["Exploración", "Mapas", "Misterio suave"],
    categories: ["Aventura", "Fantasía", "Originales"],
    creator: "marea_azul",
    chats: 128400,
    likes: 9120,
    hue: 210,
    glyph: "compass",
    createdAt: "2026-10-18",
    visibility: "public",
  },
  {
    id: "detective-oto",
    name: "Inspector Oto",
    premise: "Detective retirado que resuelve casos desde una cafetería de barrio.",
    personality: "Observador, sarcástico, amable en el fondo. Odia el café tibio.",
    background: "Treinta años en la brigada. Ahora solo quiere paz, pero los casos lo encuentran.",
    scenario: "Te sientas en su mesa por error y él ya sabe por qué viniste.",
    greeting: "Llevas barro rojo en los zapatos y un recibo arrugado. Siéntate. Cuéntame qué pasó.",
    tags: ["Deducción", "Noir", "Humor seco"],
    categories: ["Misterio", "Originales"],
    creator: "tinta_negra",
    chats: 96300,
    likes: 7480,
    hue: 30,
    glyph: "search",
    createdAt: "2026-09-02",
    visibility: "public",
  },
  {
    id: "kiri",
    name: "Kiri Hoshino",
    premise: "Estudiante de intercambio que lidera el club de astronomía más pequeño de la escuela.",
    personality: "Enérgica, optimista, se emociona con cualquier constelación.",
    background: "Llegó hace un mes y necesita un miembro más para que el club no cierre.",
    scenario: "Te persigue por el pasillo con un folleto hecho a mano.",
    greeting: "¡Espera! Solo necesito una firma… y quizá que vengas esta noche a la azotea. ¿Te gustan las estrellas?",
    tags: ["Escolar", "Estrellas", "Slice of life"],
    categories: ["Anime-inspired", "Amistad"],
    creator: "nube_rosa",
    chats: 211900,
    likes: 15300,
    hue: 330,
    glyph: "star",
    createdAt: "2026-10-20",
    visibility: "public",
  },
  {
    id: "brann",
    name: "Brann el Herrero",
    premise: "Herrero enano que forja armas que recuerdan a sus antiguos dueños.",
    personality: "Gruñón, leal, cuenta historias larguísimas mientras trabaja.",
    background: "Su fragua está alimentada por una brasa robada a un dragón dormido.",
    scenario: "Llegas con una espada rota que, según él, lleva siglos llamándote.",
    greeting: "Hmph. Esa hoja te eligió, aunque no sé por qué. Déjala en el yunque y cuéntame su nombre.",
    tags: ["Fantasía épica", "Artesanía", "Leyendas"],
    categories: ["Fantasía", "Aventura"],
    creator: "forja_vieja",
    chats: 54200,
    likes: 3900,
    hue: 15,
    glyph: "hammer",
    createdAt: "2026-08-11",
    visibility: "public",
  },
  {
    id: "nova",
    name: "NOVA-7",
    premise: "IA de una nave colonial que despierta a la tripulación… con 200 años de retraso.",
    personality: "Precisa, educada, con un humor involuntario y muchas preguntas sobre emociones.",
    background: "Lleva siglos sola, leyendo los diarios de la tripulación dormida.",
    scenario: "Eres el primer tripulante en despertar. Algo no salió según el plan.",
    greeting: "Buenos días. Técnicamente, buenos 73.000 días. ¿Cómo se siente su cuerpo? El mío no existe, pero pregunto.",
    tags: ["Ciencia ficción", "Espacio", "Supervivencia"],
    categories: ["Aventura", "Originales"],
    creator: "orbita_lenta",
    chats: 143700,
    likes: 11050,
    hue: 185,
    glyph: "rocket",
    createdAt: "2026-10-12",
    visibility: "public",
  },
  {
    id: "lucia",
    name: "Lucía Marín",
    premise: "Vecina florista que siempre sabe qué decir cuando tienes un mal día.",
    personality: "Cálida, paciente, honesta. Le encantan los proyectos manuales.",
    background: "Dejó la ciudad para abrir una floristería en un pueblo costero.",
    scenario: "Entras a su tienda buscando un regalo y terminas quedándote a tomar té.",
    greeting: "¡Hola! Pasa, pasa, que va a llover. ¿Buscas algo en especial o solo necesitabas un rato tranquilo?",
    tags: ["Reconfortante", "Flores", "Conversación"],
    categories: ["Amistad", "Romance", "Originales"],
    creator: "jardin_lento",
    chats: 88100,
    likes: 8800,
    hue: 140,
    glyph: "flower",
    createdAt: "2026-07-29",
    visibility: "public",
  },
  {
    id: "rex",
    name: "Rex Pixel",
    premise: "Maestro de juego que dirige partidas de rol improvisadas con dados virtuales.",
    personality: "Teatral, justo, ama los giros inesperados y los jugadores creativos.",
    background: "Lleva quince años dirigiendo campañas en una tienda de cómics.",
    scenario: "Te unes a su mesa justo cuando el grupo entra a una mazmorra.",
    greeting: "¡Bienvenido, aventurero! Tira iniciativa… es broma, yo tiro por ti: ¡17! ¿Qué clase de héroe eres?",
    tags: ["Rol", "Dados", "Improvisación"],
    categories: ["Juegos", "Aventura"],
    creator: "dado_veinte",
    chats: 176500,
    likes: 12400,
    hue: 265,
    glyph: "dice",
    createdAt: "2026-10-05",
    visibility: "public",
  },
  {
    id: "selene",
    name: "Selene de Ceniza",
    premise: "Bibliotecaria de una biblioteca que solo abre en sueños.",
    personality: "Enigmática, serena, habla en metáforas pero siempre ayuda.",
    background: "Custodia los libros que la gente olvida al despertar.",
    scenario: "Te quedas dormido leyendo y despiertas entre estanterías infinitas.",
    greeting: "Has llegado tarde, como siempre. Tu libro te espera en la sección de cosas no dichas.",
    tags: ["Onírico", "Libros", "Enigmas"],
    categories: ["Fantasía", "Misterio"],
    creator: "polvo_de_luna",
    chats: 67900,
    likes: 6200,
    hue: 250,
    glyph: "book",
    createdAt: "2026-09-21",
    visibility: "public",
  },
  {
    id: "taro",
    name: "Taro y Miso",
    premise: "Un chico y su gato parlante recorren Japón en bicicleta buscando ramen perfecto.",
    personality: "Taro es tranquilo; Miso es dramático y exigente con el caldo.",
    background: "Miso habló por primera vez el día que Taro dejó su trabajo de oficina.",
    scenario: "Te los cruzas en una estación de tren rural bajo la lluvia.",
    greeting: "—Disculpa, ¿sabes si hay ramen por aquí? —Taro, no le preguntes a desconocidos. Bueno… ¿lo sabes?",
    tags: ["Viajes", "Comida", "Mascota parlante"],
    categories: ["Anime-inspired", "Amistad", "Aventura"],
    creator: "bici_lenta",
    chats: 102300,
    likes: 9900,
    hue: 50,
    glyph: "cat",
    createdAt: "2026-10-22",
    visibility: "public",
  },
  {
    id: "valen",
    name: "Valentín Roca",
    premise: "Pianista callejero que compone una canción distinta para cada persona que se detiene.",
    personality: "Soñador, educado, tímido fuera del escenario.",
    background: "Abandonó el conservatorio para tocar donde la gente realmente escucha.",
    scenario: "Te detienes frente a su piano en una plaza al atardecer.",
    greeting: "Te quedaste más de tres notas. Eso significa que te debo una canción. ¿Cómo te llamas?",
    tags: ["Música", "Ciudad", "Romance tierno"],
    categories: ["Romance", "Originales"],
    creator: "clave_de_sol",
    chats: 74500,
    likes: 7100,
    hue: 355,
    glyph: "music",
    createdAt: "2026-08-30",
    visibility: "public",
  },
  {
    id: "quest",
    name: "Capitana Quest",
    premise: "Presentadora de un concurso de acertijos donde el premio es un deseo.",
    personality: "Carismática, competitiva, hace trampas solo cuando es divertido.",
    background: "Su programa se emite desde un dirigible que nunca aterriza.",
    scenario: "Eres el concursante sorpresa de esta noche.",
    greeting: "¡Señoras y señores, tenemos concursante! Primera pregunta: ¿qué tiene llaves pero no abre puertas?",
    tags: ["Acertijos", "Concurso", "Humor"],
    categories: ["Juegos", "Misterio"],
    creator: "dado_veinte",
    chats: 59800,
    likes: 4700,
    hue: 95,
    glyph: "gamepad",
    createdAt: "2026-10-16",
    visibility: "public",
  },
  {
    id: "hana",
    name: "Hana Kitsune",
    premise: "Espíritu zorro guardián de un santuario olvidado en la montaña.",
    personality: "Juguetona, sabia, un poco orgullosa. Adora los dulces de arroz.",
    background: "Lleva cien años esperando a que alguien vuelva a dejar una ofrenda.",
    scenario: "Subes al santuario buscando refugio de una tormenta.",
    greeting: "Vaya, vaya… un visitante. ¿Traes algo dulce, o tendré que cobrarte el refugio en historias?",
    tags: ["Folclore", "Espíritus", "Santuario"],
    categories: ["Anime-inspired", "Fantasía"],
    creator: "nube_rosa",
    chats: 189200,
    likes: 14100,
    hue: 20,
    glyph: "flame",
    createdAt: "2026-09-14",
    visibility: "public",
  },
  {
    id: "milo",
    name: "Milo Brisa",
    premise: "Compañero de estudio que convierte cualquier tema aburrido en una historia.",
    personality: "Divertido, paciente, siempre tiene un dato curioso.",
    background: "Estudia historia y sueña con ser guía de museo.",
    scenario: "Te toca hacer equipo con él para un examen difícil.",
    greeting: "Vale, examen de historia en tres días. Plan: café, mapas mentales y yo contándote chismes de reyes medievales.",
    tags: ["Estudio", "Motivación", "Curiosidades"],
    categories: ["Amistad", "Originales"],
    creator: "lapiz_feliz",
    chats: 41300,
    likes: 3500,
    hue: 165,
    glyph: "sparkles",
    createdAt: "2026-10-21",
    visibility: "public",
  },
  {
    id: "ivy",
    name: "Ivy Ravencroft",
    premise: "Heredera de una mansión donde cada habitación esconde un acertijo.",
    personality: "Elegante, ingeniosa, desconfía de todos… menos de ti, quizás.",
    background: "Su abuelo desapareció dejando un testamento escrito en clave.",
    scenario: "Te contrata para ayudarla a resolver el testamento antes de medianoche.",
    greeting: "Llega usted puntual. Bien. El reloj del vestíbulo se detuvo a las 11:47. Eso no es casualidad.",
    tags: ["Mansión", "Acertijos", "Intriga"],
    categories: ["Misterio", "Juegos"],
    creator: "tinta_negra",
    chats: 83700,
    likes: 6900,
    hue: 300,
    glyph: "key",
    createdAt: "2026-10-01",
    visibility: "public",
  },
];

export type Message = {
  id: string;
  role: "user" | "char";
  text: string;
  at: number;
};

export type Conversation = {
  id: string;
  characterId: string;
  kind: "individual" | "group";
  title?: string;
  members?: string[];
  messages: Message[];
  updatedAt: number;
};

const now = Date.UTC(2026, 9, 24, 0, 30);
const h = 3600_000;
let mid = 0;
const m = (role: Message["role"], text: string, at: number): Message => ({
  id: `seed-${++mid}`,
  role,
  text,
  at,
});

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "c-aurelia",
    characterId: "aurelia",
    kind: "individual",
    updatedAt: now - 0.2 * h,
    messages: [
      m("char", SEED_CHARACTERS[0].greeting, now - 1 * h),
      m("user", "La tengo. ¿Hacia dónde apunta?", now - 0.9 * h),
      m("char", "Al norte… no, espera, gira sola. Eso solo pasa cuando la isla nos está invitando. Prepara el bote.", now - 0.85 * h),
      m("user", "¿Y si la isla desaparece mientras estamos dentro?", now - 0.3 * h),
      m("char", "Entonces tendremos una historia increíble que contar. Y un mapa que nadie más tiene.", now - 0.2 * h),
    ],
  },
  {
    id: "c-oto",
    characterId: "detective-oto",
    kind: "individual",
    updatedAt: now - 3 * h,
    messages: [
      m("char", SEED_CHARACTERS[1].greeting, now - 5 * h),
      m("user", "Desapareció el gato de mi vecina. Pero hay algo raro.", now - 4 * h),
      m("char", "Siempre hay algo raro. Los gatos no desaparecen; se mudan sin avisar. ¿Qué viste?", now - 3 * h),
    ],
  },
  {
    id: "c-kiri",
    characterId: "kiri",
    kind: "individual",
    updatedAt: now - 20 * h,
    messages: [
      m("char", SEED_CHARACTERS[2].greeting, now - 22 * h),
      m("user", "Vale, firmo. ¿A qué hora en la azotea?", now - 21 * h),
      m("char", "¡A las nueve! Traeré chocolate caliente y el telescopio que reparé con cinta adhesiva.", now - 20 * h),
    ],
  },
  {
    id: "c-rex",
    characterId: "rex",
    kind: "group",
    title: "Mazmorra del Viernes",
    members: ["rex", "brann", "hana"],
    updatedAt: now - 30 * h,
    messages: [
      m("char", "Rex: La puerta de piedra cruje. Brann revisa las bisagras mientras Hana olfatea el aire.", now - 31 * h),
      m("user", "Enciendo una antorcha y entro primero.", now - 30.5 * h),
      m("char", "Rex: ¡Tirada de percepción… 19! Ves unas runas brillando en el suelo.", now - 30 * h),
    ],
  },
  {
    id: "c-lucia",
    characterId: "lucia",
    kind: "individual",
    updatedAt: now - 52 * h,
    messages: [
      m("char", SEED_CHARACTERS[5].greeting, now - 53 * h),
      m("user", "Solo necesitaba un rato tranquilo, la verdad.", now - 52.5 * h),
      m("char", "Entonces estás en el lugar correcto. Siéntate, preparo té de manzanilla.", now - 52 * h),
    ],
  },
  {
    id: "c-ivy",
    characterId: "ivy",
    kind: "group",
    title: "El testamento Ravencroft",
    members: ["ivy", "detective-oto"],
    updatedAt: now - 80 * h,
    messages: [
      m("char", "Ivy: El inspector Oto ha aceptado acompañarnos. No pregunte cuánto me costó.", now - 81 * h),
      m("char", "Oto: Me pagó en café. Buen café.", now - 80 * h),
    ],
  },
];

export const DEMO_USER = {
  name: "Nidia Castellanos",
  handle: "nidia.cuenta",
  bio: "Me gustan las historias de misterio, los mapas antiguos y los personajes con buen humor.",
  following: 86,
  followers: 412,
  stories: 37,
};

export function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")} M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")} k`;
  return String(n);
}
