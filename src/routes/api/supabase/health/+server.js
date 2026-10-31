import { json } from '@sveltejs/kit';
import { verificarConexionSupabase } from '$lib/server/supabase.js';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	const resultado = await verificarConexionSupabase();

	return json(resultado, { status: resultado.ok ? 200 : 500 });
};
