import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

const supabaseUrl = env.SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Crea un cliente de Supabase solo si hay URL y clave.
 * No lanzamos errores en el ámbito del módulo: SvelteKit importa este archivo
 * durante el build y un `throw` aquí rompería el despliegue si las variables
 * de entorno todavía no están disponibles.
 * @param {string | undefined} key
 * @returns {import('@supabase/supabase-js').SupabaseClient | null}
 */
function crearCliente(key) {
	if (!supabaseUrl || !key) return null;

	return createClient(supabaseUrl, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		}
	});
}

/**
 * Cliente público de Supabase. Respeta las políticas RLS.
 * Solo debe usarse en el servidor ($lib/server).
 * @type {import('@supabase/supabase-js').SupabaseClient | null}
 */
export const supabase = crearCliente(anonKey ?? serviceRoleKey);

/**
 * Cliente con permisos de administrador (service role).
 * Omite RLS, así que nunca debe exponerse al navegador.
 * @type {import('@supabase/supabase-js').SupabaseClient | null}
 */
export const supabaseAdmin = crearCliente(serviceRoleKey);

/**
 * Devuelve un mensaje con las variables de entorno que faltan.
 * @returns {string | null}
 */
export function variablesSupabaseFaltantes() {
	if (!supabaseUrl) {
		return 'Falta la variable de entorno SUPABASE_URL';
	}

	if (!anonKey && !serviceRoleKey) {
		return 'Falta NEXT_PUBLIC_SUPABASE_ANON_KEY (o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) en las variables de entorno';
	}

	return null;
}

/**
 * Comprueba que el proyecto de Supabase responde correctamente.
 * @returns {Promise<{ ok: boolean, mensaje: string }>}
 */
export async function verificarConexionSupabase() {
	const faltantes = variablesSupabaseFaltantes();

	if (faltantes) {
		return { ok: false, mensaje: faltantes };
	}

	try {
		if (supabaseAdmin) {
			const { error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
			if (error) throw error;
		} else {
			const respuesta = await fetch(`${supabaseUrl}/auth/v1/health`, {
				headers: { apikey: anonKey ?? '' }
			});

			if (!respuesta.ok) {
				throw new Error(`Supabase respondió con estado ${respuesta.status}`);
			}
		}

		return { ok: true, mensaje: 'Conexión con Supabase correcta' };
	} catch (error) {
		return {
			ok: false,
			mensaje: error instanceof Error ? error.message : 'Error desconocido al conectar con Supabase'
		};
	}
}
