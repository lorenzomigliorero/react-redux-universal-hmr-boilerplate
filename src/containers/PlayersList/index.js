import { connect } from 'react-redux';
import Players from 'state/Players';
import PlayersList from 'components/PlayersList';

const { actions } = Players;

const mapStateToProps = (state) => {

	return {

		players: state.players

	};

};

const mapDispatchToProps = (dispatch) => {

	return {

		addPlayer: () => {
			
			dispatch(new actions.addPlayer());
		
		},

		removePlayer(p) {

			dispatch(new actions.removePlayer(p));
		
		}

	};

};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);