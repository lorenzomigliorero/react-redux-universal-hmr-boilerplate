import { connect } from 'react-redux';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { isEmpty } from 'lodash/lang';

import { Row, Col } from '@/components/Grid/';
import Box from '@/components/Box';
import Media from '@/components/Media';
import Image from '@/components/Image';
import SvgInline from '@/components/SvgInline';

import { actions } from '@/state/Images';

class Home extends Component {

	static fetchData(match, dispatch) {

		return dispatch(new actions.fetchImages());

	}

	static getBoxChildrenTag(children) {

		let tag;

		switch (children.type) {

		case ('media'):
			tag = <Media src={children.src} />;
			break;
		case ('svginline'):
			tag = <SvgInline src={children.src} />;
			break;
		default: 
			tag = <Image src={children.src} />;
		}

		return tag;

	}

	componentWillMount() {

		if (isEmpty(this.props.images)) {

			this.constructor.fetchData(null, this.props.dispatch);
			
		}

	}

	render() {

		return (
			<div>
				<Helmet
					title='Home'
				/>
				
				<h2>Home</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi corrupti sequi earum nulla sed eos eligendi dolorum possimus dolores beatae ad nihil labore a, expedita aspernatur non cupiditate fugit fugiat.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum optio facilis ad magnam consectetur eveniet dignissimos dolorum harum tempora ducimus modi labore, dicta cumque, numquam velit repellendus dolor officia molestiae!
				</p>

				<h3>Static assets loaders example:</h3>
						
				<Row>

					{this.props.images.map((image, i) => (

						<Col sm={4} md key={i}>
							<Box header={image.header}>
								{this.constructor.getBoxChildrenTag(image)}
							</Box>
						</Col>

					))}

				</Row>

			</div>
		);

	}	

};

const mapStateToProps = (state) => {

	return {

		images: state.images.all

	};

};

export default connect(
	
	mapStateToProps

)(Home);