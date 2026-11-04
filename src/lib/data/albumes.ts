export type CancionAlbum = {
	titulo: string;
	duracion: string;
};

export type AlbumInfo = {
	titulo: string;
	fecha: string;
	descripcion: string;
	imagen: string;
	canciones: CancionAlbum[];
};

/**
 * Álbum de estudio más reciente de cada artista del directorio.
 * Datos y portadas obtenidos de Deezer / Wikipedia (noviembre de 2026).
 */
export const albumesPorArtista: Record<string, AlbumInfo> = {
	'Michael Jackson': {
		titulo: 'XSCAPE',
		fecha: '9 DE MAYO DE 2014',
		descripcion:
			'Álbum póstumo que reúne ocho grabaciones inéditas de Michael Jackson, recuperadas de sus archivos y actualizadas por productores como Timbaland, Rodney Jerkins y Stargate.',
		imagen:
			'https://cdn-images.dzcdn.net/images/cover/8d0164d7161ac43452ec58201e56e3a4/500x500-000000-80-0-0.jpg',
		canciones: [
			{ titulo: 'Love Never Felt So Good', duracion: '3:56' },
			{ titulo: 'Chicago', duracion: '4:05' },
			{ titulo: 'Loving You', duracion: '3:16' },
			{ titulo: 'A Place with No Name', duracion: '5:35' },
			{ titulo: 'Slave to the Rhythm', duracion: '4:14' },
			{ titulo: 'Do You Know Where Your Children Are', duracion: '4:37' },
			{ titulo: 'Blue Gangsta', duracion: '4:15' },
			{ titulo: 'Xscape', duracion: '4:07' }
		]
	},
	'Bad Bunny': {
		titulo: 'DeBÍ TiRAR MáS FOToS',
		fecha: '5 DE ENERO DE 2025',
		descripcion:
			'Sexto álbum de estudio de Bad Bunny, una carta de amor a Puerto Rico que mezcla reggaetón, salsa y plena con letras sobre la nostalgia, la identidad y la memoria.',
		imagen:
			'https://cdn-images.dzcdn.net/images/cover/d98eaccfbb945bdf68241d6de7fe6a49/500x500-000000-80-0-0.jpg',
		canciones: [
			{ titulo: 'NUEVAYoL', duracion: '3:03' },
			{ titulo: 'VOY A LLeVARTE PA PR', duracion: '2:36' },
			{ titulo: 'BAILE INoLVIDABLE', duracion: '6:07' },
			{ titulo: 'PERFuMITO NUEVO', duracion: '3:20' },
			{ titulo: 'WELTiTA', duracion: '3:07' },
			{ titulo: 'VeLDÁ', duracion: '3:55' },
			{ titulo: 'EL CLúB', duracion: '3:42' },
			{ titulo: 'KETU TeCRÉ', duracion: '4:10' },
			{ titulo: 'BOKeTE', duracion: '3:35' },
			{ titulo: 'KLOuFRENS', duracion: '3:19' },
			{ titulo: 'TURiSTA', duracion: '3:10' },
			{ titulo: 'CAFé CON RON', duracion: '3:48' },
			{ titulo: 'PIToRRO DE COCO', duracion: '3:26' },
			{ titulo: 'LO QUE LE PASÓ A HAWAii', duracion: '3:49' },
			{ titulo: 'EoO', duracion: '3:24' },
			{ titulo: 'DtMF', duracion: '3:57' },
			{ titulo: 'LA MuDANZA', duracion: '3:33' }
		]
	},
	'Lana Del Rey': {
		titulo: 'Did You Know That There’s a Tunnel Under Ocean Blvd',
		fecha: '24 DE MARZO DE 2023',
		descripcion:
			'Noveno álbum de estudio de Lana Del Rey, un viaje introspectivo de pop barroco y folk con arreglos cinematográficos, coros y letras profundamente confesionales.',
		imagen:
			'https://cdn-images.dzcdn.net/images/cover/0ae53c84250981214bcb7ca39f8c2195/500x500-000000-80-0-0.jpg',
		canciones: [
			{ titulo: 'The Grants', duracion: '4:57' },
			{
				titulo: 'Did You Know That There’s a Tunnel Under Ocean Blvd',
				duracion: '4:45'
			},
			{ titulo: 'Sweet', duracion: '3:35' },
			{ titulo: 'A&W', duracion: '7:13' },
			{ titulo: 'Judah Smith Interlude', duracion: '4:36' },
			{ titulo: 'Candy Necklace', duracion: '5:14' },
			{ titulo: 'Jon Batiste Interlude', duracion: '3:33' },
			{ titulo: 'Kintsugi', duracion: '6:18' },
			{ titulo: 'Fingertips', duracion: '5:48' },
			{ titulo: 'Paris, Texas', duracion: '3:26' },
			{
				titulo:
					'Grandfather Please Stand on the Shoulders of My Father While He’s Deep-Sea Fishing',
				duracion: '4:00'
			},
			{ titulo: 'Let the Light In', duracion: '4:38' },
			{ titulo: 'Margaret', duracion: '5:39' },
			{ titulo: 'Fishtail', duracion: '4:02' },
			{ titulo: 'Peppers', duracion: '4:08' },
			{ titulo: 'Taco Truck x VB', duracion: '5:53' }
		]
	},
	'Billie Eilish': {
		titulo: 'HIT ME HARD AND SOFT',
		fecha: '17 DE MAYO DE 2024',
		descripcion:
			'Tercer álbum de estudio de Billie Eilish, producido por Finneas. Un recorrido de pop alternativo con letras íntimas sobre el amor, la fama y el autodescubrimiento.',
		imagen:
			'https://cdn-images.dzcdn.net/images/cover/5d284b31cb9ddeb1a0c79aede5a94e1c/500x500-000000-80-0-0.jpg',
		canciones: [
			{ titulo: 'SKINNY', duracion: '3:40' },
			{ titulo: 'LUNCH', duracion: '3:00' },
			{ titulo: 'CHIHIRO', duracion: '5:03' },
			{ titulo: 'BIRDS OF A FEATHER', duracion: '3:30' },
			{ titulo: 'WILDFLOWER', duracion: '4:21' },
			{ titulo: 'THE GREATEST', duracion: '4:54' },
			{ titulo: 'L’AMOUR DE MA VIE', duracion: '5:34' },
			{ titulo: 'THE DINER', duracion: '3:06' },
			{ titulo: 'BITTERSUITE', duracion: '4:58' },
			{ titulo: 'BLUE', duracion: '5:43' }
		]
	},
	Radiohead: {
		titulo: 'A Moon Shaped Pool',
		fecha: '8 DE MAYO DE 2016',
		descripcion:
			'Noveno álbum de estudio de Radiohead, una obra atmosférica de rock alternativo y electrónica introspectiva producida por su colaborador habitual Nigel Godrich.',
		imagen:
			'https://cdn-images.dzcdn.net/images/cover/e9232e4391ed1206cc0bd6ab17822177/500x500-000000-80-0-0.jpg',
		canciones: [
			{ titulo: 'Burn the Witch', duracion: '3:40' },
			{ titulo: 'Daydreaming', duracion: '6:24' },
			{ titulo: 'Decks Dark', duracion: '4:41' },
			{ titulo: 'Desert Island Disk', duracion: '3:44' },
			{ titulo: 'Ful Stop', duracion: '6:07' },
			{ titulo: 'Glass Eyes', duracion: '2:52' },
			{ titulo: 'Identikit', duracion: '4:26' },
			{ titulo: 'The Numbers', duracion: '5:45' },
			{ titulo: 'Present Tense', duracion: '5:06' },
			{
				titulo: 'Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief',
				duracion: '5:03'
			},
			{ titulo: 'True Love Waits', duracion: '4:43' }
		]
	},
	Rihanna: {
		titulo: 'ANTI',
		fecha: '28 DE ENERO DE 2016',
		descripcion:
			'Octavo álbum de estudio de Rihanna, un giro hacia el R&B alternativo y el pop experimental con colaboraciones de Drake y SZA y una producción más minimalista.',
		imagen:
			'https://cdn-images.dzcdn.net/images/cover/37c8008f5bf6b7368fa849a5d5e9b013/500x500-000000-80-0-0.jpg',
		canciones: [
			{ titulo: 'Consideration', duracion: '2:41' },
			{ titulo: 'James Joint', duracion: '1:12' },
			{ titulo: 'Kiss It Better', duracion: '4:13' },
			{ titulo: 'Work', duracion: '3:39' },
			{ titulo: 'Desperado', duracion: '3:06' },
			{ titulo: 'Woo', duracion: '3:55' },
			{ titulo: 'Needed Me', duracion: '3:11' },
			{ titulo: 'Yeah, I Said It', duracion: '2:13' },
			{ titulo: 'Same Ol’ Mistakes', duracion: '6:37' },
			{ titulo: 'Never Ending', duracion: '3:22' },
			{ titulo: 'Love on the Brain', duracion: '3:44' },
			{ titulo: 'Higher', duracion: '2:00' },
			{ titulo: 'Close to You', duracion: '3:43' }
		]
	}
};
