import { connect } from 'react-redux';
import { actions } from '@/state/List';
import List from '@/components/List';

const mapStateToProps = (state) => {

	return {

		list: state.list

	};

};

const mapDispatchToProps = (dispatch) => {

	return {

		addListItem: () => {
			
			dispatch(new actions.addListItem());
		
		},

		removeListItem(p) {

			dispatch(new actions.removeListItem(p));
		
		}

	};

};

export default connect(mapStateToProps, mapDispatchToProps)(List);