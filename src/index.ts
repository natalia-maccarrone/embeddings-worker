import { InferenceClient } from '@huggingface/inference';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed.` }), { status: 405 });
		}

		try {
			const data: string[] = await request.json();

			const inferenceClient = new InferenceClient(env.HF_TOKEN);

			const embeddings = await inferenceClient.featureExtraction({
				model: 'sentence-transformers/all-MiniLM-L6-v2',
				inputs: data,
			});

			return new Response(JSON.stringify(embeddings));
		} catch (error: any) {
			return new Response(JSON.stringify({ error: error.message }), { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
