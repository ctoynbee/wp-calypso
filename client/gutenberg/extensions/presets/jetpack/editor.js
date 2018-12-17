/** @format */

/**
 * Internal dependencies
 */
import './shared/public-path';
import './editor-shared/block-category'; // Register the Jetpack category
import extensionSlugsJson from './index.json';
import { isEnabled } from 'config';

const extensionSlugs = [
	...extensionSlugsJson.production,
	...( isEnabled( 'jetpack/blocks/beta' ) ? extensionSlugsJson.beta : [] ),
];

export async function getExtensions() {
	const promises = extensionSlugs.map( slug =>
		import( /* webpackMode: "eager" */ '../../' + slug ).then(
			( { childBlocks, name, settings } ) => ( {
				childBlocks,
				name,
				settings,
			} )
		)
	);

	return await Promise.all( promises );
}
