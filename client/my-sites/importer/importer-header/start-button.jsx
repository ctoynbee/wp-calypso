/** @format */
/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
import React from 'react';
import { flow } from 'lodash';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Button from 'components/forms/form-button';
import { startImport } from 'state/imports/actions';
import { recordTracksEvent } from 'state/analytics/actions';

class StartButton extends React.PureComponent {
	static displayName = 'StartButton';

	static propTypes = {
		importerStatus: PropTypes.shape( {
			type: PropTypes.string.isRequired,
		} ),
		site: PropTypes.shape( {
			ID: PropTypes.number.isRequired,
		} ),
	};

	handleClick = () => {
		const {
			importerStatus: { type },
			site: { ID: siteId },
		} = this.props;

		this.props.startImport( siteId, type );
		this.props.recordTracksEvent( 'calypso_importer_main_start_clicked', {
			blog_id: siteId,
			importer_id: type,
		} );
	};

	render() {
		const { translate } = this.props;

		return (
			<Button
				className="importer-header__action-button"
				isPrimary={ false }
				onClick={ this.handleClick }
			>
				{ translate( 'Start Import', { context: 'verb' } ) }
			</Button>
		);
	}
}

export default flow(
	connect(
		null,
		{ recordTracksEvent, startImport }
	),
	localize
)( StartButton );
