import type { Character } from "./data";

/**
 * Motor de respuestas DEMO local. No está conectado a ningún modelo de IA:
 * elige respuestas predefinidas según palabras clave y el personaje.
 */
const RULES: { test: RegExp; replies: ((c: Character) => string)[] }[] = [
  {
    test: /\b(hola|buenas|hey|saludos)\b/i,
    replies: [
      (c) => `¡Hola! Qué bueno verte por aquí. ${c.greeting.split(".")[0]}.`,
      () => "¡Hola de nuevo! Justo estaba pensando en dónde lo dejamos.",
    ],
  },
  {
    test: /\?/,
    replies: [
      (c) => `Buena pregunta. Desde mi punto de vista —ya sabes, ${c.personality.toLowerCase().split(",")[0]}— diría que sí, pero con cuidado.`,
      () => "Hmm… no tengo una respuesta exacta, pero tengo una idea. ¿Quieres oírla?",
      (c) => `Eso me recuerda algo de mi pasado: ${c.background.toLowerCase()}`,
    ],
  },
  {
    test: /\b(gracias|genial|perfecto|me gusta)\b/i,
    replies: [
      () => "No hay de qué. Me alegra que estemos en esto juntos.",
      () => "¡Eso me anima a seguir! ¿Continuamos?",
    ],
  },
  {
    test: /\b(triste|cansad|mal día|agotad)/i,
    replies: [
      () => "Oye, está bien no estar al cien. Tomemos esto con calma, ¿te parece?",
      () => "Gracias por contármelo. Podemos hacer una pausa en la historia y solo charlar.",
    ],
  },
];

const GENERIC: ((c: Character) => string)[] = [
  (c) => `*${c.name.split(" ")[0]} asiente despacio.* Entiendo. Entonces el siguiente paso es claro: seguimos adelante.`,
  () => "Interesante… eso cambia un poco el plan. Déjame pensar un segundo.",
  (c) => `*mira a su alrededor* ${c.scenario} Y ahora, contigo aquí, todo parece más posible.`,
  () => "Me gusta cómo piensas. Hagámoslo a tu manera, pero yo vigilo la retaguardia.",
  () => "¿Escuchaste eso? Creo que no estamos solos. Quédate cerca.",
];

export function demoReply(c: Character, userText: string, seed = Math.random()): string {
  const rule = RULES.find((r) => r.test.test(userText));
  const pool = rule ? rule.replies : GENERIC;
  return pool[Math.floor(seed * pool.length) % pool.length](c);
}

export const DEMO_LATENCY_MS = 900;
