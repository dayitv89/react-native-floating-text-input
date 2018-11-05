/**
 * Copyright (c) 2017-Present, Gaurav D. Sharma
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

class FadeInView extends React.Component {
	state = { fadeAnim: new Animated.Value(0) };

	componentDidMount() {
		Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 1000 }).start();
	}

	render() {
		return (
			<Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }}>{this.props.children}</Animated.View>
		);
	}
}

FadeInView.propTypes = {
	children: PropTypes.element.isRequired
};

export default FadeInView;
