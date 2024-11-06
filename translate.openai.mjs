import { OpenAI } from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';

const model = 'gpt-4o';

/** 
 * Instructions for the translator. 
 * 
 * @param {string[]} terms Terms to be added to the instructions.
 */
const buildInstructions = (terms) => [
  'Keep all frontmatter keys in the original language, translate title and description.',
  'Do not translate JSON keys, inline code, component names and keys.',
  'For mermaid diagrams, translate the text inside the diagram, but keep the diagram type and structure.',
  'Do not translate proper nouns, e.g. "OAuth", "JWT".',
  `Whenever seeing one of the following terms, including in title, you must add the untranslated term in parentheses after the translated term, e.g. "认证 (Authentication)": ${terms.join(', ')}.`,
  'Prefer using "你" instead of "您" in Chinese.',
  'Make sure there is a space between the CJK and non-CJK characters.',
  'Respond with the translated content only.',
];

export class OpenAiTranslate {
  httpProxy = process.env.HTTP_PROXY;
  openai = new OpenAI({
    httpAgent: this.httpProxy ? new HttpsProxyAgent(this.httpProxy) : undefined,
  });
  /** @type {string} */
  instructions;

  /** @param {string[]} terms to be added to the instructions. */
  constructor(terms) {
    if (this.httpProxy) {
      console.log(`Using HTTP proxy: ${this.httpProxy}`);
    }

    if (!Array.isArray(terms)) {
      throw new TypeError('Expected `terms` to be an array');
    }
    this.instructions = buildInstructions(terms).map((instruction) => `- ${instruction}`).join('\n');
  }

  /** 
   * @param {string} content The content to translate.
   * @param {string} target The target locale.
   * @param {import('listr2').ListrTaskWrapper} task The task wrapper to update the task status.
   * @returns {Promise<string>} Translated content.
   */
  async translate(content, target, task) {
    const stream = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: [
            `You are a assistant translator and will receive a MDX file. Translate it to locale "${target}". Detailed instructions are as follows:`,
          ]
            .concat(this.instructions)
            .join('\n'),
        },
        {
          role: 'user',
          content: content,
        },
      ],
      stream: true,
    });

    if (task) {
      task.output = 'Waiting for response...';
    } else {
      console.log('Waiting for response...');
    }

    // Extract the translated content from the stream.
    let count = 0;
    let result = '';
    for await (const chunk of stream) {
      const choice0 = chunk.choices[0];
      result += choice0?.delta.content ?? '';

      if (task) {
        task.output = `Receiving response (${++count} chunks)`;
      } else {
        console.log(`Receiving response (${++count} chunks)`);
      }

      if (choice0?.finish_reason && choice0.finish_reason !== 'stop') {
        throw new Error(
          `Invalid response from OpenAI, expected \`stop\` but got \`${choice0.finish_reason}\``
        );
      }
    }

    return result;
  }
}
