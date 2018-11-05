/**
 * Copyright (c) 2017-Present, Gaurav D. Sharma
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import FadeInView from './FadeInView';
import HashMerger from './HashMerger';

class FloatingTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: this.props.text, isFocused: false, isValid: false };
		this.onFocus = this.onFocus.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.styles = HashMerger(this.defaultStyles(), this.customStyles());
	}

	isValid(text) {
		if (!!text || !!this.state.text) {
			const t = text || this.state.text;
			const regex = this.props.regex;
			if (regex && regex instanceof RegExp) {
				return regex.test(t);
			} else if (this.props.onValidationCheck) {
				return this.props.onValidationCheck(t);
			}
		}
		return false;
	}

	text() {
		return this.state.text;
	}

	focus() {
		this.txtInput.focus();
	}

	onFocus() {
		this.setState({ isFocused: true });
	}

	onChangeText(text) {
		const isValid = this.isValid(text);
		this.setState({ text, isValid }, () => this.props.onChangeText(text, isValid));
	}

	onBlur() {
		this.setState({ isFocused: false, isValid: this.isValid() });
	}

	onSubmit() {
		this.props.onSubmit(this.text());
	}

	renderHeader(styles) {
		if (this.state.isFocused) {
			return (
				<FadeInView style={styles.headerView}>
					<Text style={styles.headerText}>{this.props.headerText}</Text>
				</FadeInView>
			);
		}
	}

	renderInput(styles) {
		return (
			<View style={[styles.textInputContainer, this.textInputContainerBorderColor(styles)]}>
				<TextInput
					mode="outline"
					ref={o => (this.txtInput = o)}
					label={this.props.label}
					value={this.state.text}
					placeholder={this.props.placeholder}
					onFocus={this.onFocus}
					onChangeText={this.onChangeText}
					onBlur={this.onBlur}
					onSubmitEditing={this.onSubmit}
					underlineColor="transparent"
					theme={styles.textInputTheme}
					{...this.props.textInputProps}
				/>
			</View>
		);
	}

	renderFooter(styles) {
		if (this.state.isFocused && !!this.state.text)
			return (
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						{this.state.isValid ? this.props.footerValidText : this.props.footerErrorText}
					</Text>
				</View>
			);
	}

	render() {
		const styles = this.styleSheet();
		return (
			<View style={[styles.container, this.props.style]}>
				{this.renderHeader(styles)}
				{this.renderInput(styles)}
				{this.renderFooter(styles)}
			</View>
		);
	}

	textInputContainerBorderColor(styles) {
		const { inactive, valid, invalid } = styles.textInputContainerBorderColor;
		const borderColor = !!this.state.text ? (this.state.isValid ? valid : invalid) : inactive;
		return { borderColor };
	}

	styleSheet() {
		return this.styles;
	}

	customStyles() {
		return null;
	}

	defaultStyles() {
		return {
			container: {},
			textInputContainer: {
				backgroundColor: 'white',
				borderWidth: 1,
				borderRadius: 4
			},
			headerView: {
				alignItems: 'center'
			},
			headerText: {
				width: '100%',
				padding: 2,
				color: 'black'
			},
			footerView: {},
			footerText: {
				width: '100%',
				padding: 2,
				color: 'black'
			},
			textInputContainerBorderColor: {
				inactive: 'gray',
				valid: 'green',
				invalid: 'tomato'
			},
			textInputTheme: {
				colors: {
					primary: '#00BCD4',
					activeColor: 'transparent'
				}
			}
		};
	}
}

FloatingTextInput.propTypes = {
	style: PropTypes.object, // main container view style
	textInputProps: PropTypes.object, // react-native-paper textInput props existing/new props can be change/add.
	text: PropTypes.string, // insert default value initially
	placeholder: PropTypes.string, // default value till text don't exist
	label: PropTypes.string, // floating text
	headerText: PropTypes.string, // floating text showing in header
	footerValidText: PropTypes.string, // bottom text visible if focused and text is valid
	footerErrorText: PropTypes.string, // bottom text visible if focused and text is invalid
	onValidationCheck: PropTypes.func, // if regex exist this method won't call
	regex: PropTypes.instanceOf(RegExp), // regex to validate text, if not available onValidationCheck will call
	onChangeText: PropTypes.func, // it will return when return key pressed
	onSubmit: PropTypes.func // it will return when return key pressed
};

FloatingTextInput.defaultProps = {
	style: null,
	textInputProps: null,
	text: '',
	placeholder: null,
	label: null,
	headerText: null,
	footerValidText: null,
	footerErrorText: null,
	onValidationCheck: () => true,
	regex: null,
	onChangeText: (text, valid) => null,
	onSubmit: text => null
};

export default FloatingTextInput;
