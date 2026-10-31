import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

const supabaseUrl = env.SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
	throw new Error('Falta la variable de entorno SUPABASE_URL');
}

if (!anonKey && !serviceRoleKey) {
	throw new Error(
		'Falta NEXT_PUBLIC_SUPABASE_ANON_KEY (o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) en las variables de entorno'
	);
}

const url = supabaseUrl;

/**
 * Cliente público de Supabase. Respeta las políticas RLS.
 * Solo debe usarse en el servidor ($lib/server).
 */
export const supabase = createClient(url, anonKey ?? serviceRoleKey ?? '', {
	auth: {
		persistSession: false,
		autoRefreshToken: false
	}
});

/**
 * Cliente con permisos de administrador (service role).
 * Omite RLS, así que nunca debe exponerse al navegador.
 * @type {import('@supabase/supabase-js').SupabaseClient | null}
 */
export const supabaseAdmin = serviceRoleKey
	? createClient(url, serviceRoleKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false
			}
		})
	: null;

/**
 * Comprueba que el proyecto de Supabase responde correctamente.
 * @returns {Promise<{ ok: boolean, mensaje: string }>}
 */
export async function verificarConexionSupabase() {
	try {
		if (supabaseAdmin) {
			const { error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
			if (error) throw error;
		} else {
			const respuesta = await fetch(`${url}/auth/v1/health`, {
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
