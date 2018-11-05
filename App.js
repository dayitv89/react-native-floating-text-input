/**
 * Copyright (c) 2017-Present, Gaurav D. Sharma
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StatusBar } from 'react-native';

import { FloatingTextInput, Forms } from './src/';

const violetColor = '#00BCD4';

export default class FormDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isFormValid: false };
		this.isFormValid = this.isFormValid.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getBtnContainerProps = this.getBtnContainerProps.bind(this);
	}

	componentDidMount() {
		this.isFormValid();
	}

	isFormValid() {
		let error = null;
		Forms.validate('signUp').some(i => {
			if (this[i.key] && !this[i.key].isValid()) {
				error = i;
				return true;
			}
			return false;
		});
		if (error) {
			this.setState({ isFormValid: false });
			return false;
		}
		this.setState({ isFormValid: true });
		return true;
	}

	onSubmit() {
		if (this.isFormValid()) {
			let params = {};
			Forms.fields('signUp').map(i => {
				if (this[i.key].isValid()) {
					const text = this[i.key].text();
					switch (i.key) {
						case 'fullName':
							{
								const [firstName, ...lastName] = text.split(' ');
								params['first_name'] = firstName;
								params['last_name'] = lastName.join(' ');
							}
							break;
						case 'email':
							params['email'] = text;
							break;
						case 'password':
							params['password'] = text;
							break;
						case 'inviteCode':
							params['invite_code'] = text;
							break;
					}
				}
			});
			console.warn('submit this form as ' + JSON.stringify(params, null, 2));
		}
	}

	getBtnContainerProps() {
		if (this.state.isFormValid) {
			return {
				style: { opacity: 1 },
				pointerEvents: 'auto'
			};
		}
		return {
			style: { opacity: 0.4 },
			pointerEvents: 'none'
		};
	}

	render() {
		return (
			<View style={{ backgroundColor: 'white', flex: 1 }}>
				<StatusBar barStyle="light-content" />
				<View
					style={{
						backgroundColor: violetColor,
						alignItems: 'center',
						justifyContent: 'center',
						height: 64,
						paddingTop: 20
					}}
				>
					<Text style={{ color: 'white' }}>SIGN UP</Text>
				</View>
				<Text style={{ backgroundColor: '#EEEEEE', padding: 5, fontSize: 10 }}>
					We have exciting rewards, offers and ordering for you dude. You are just 3 step ahead to this wonderful
					experience.
				</Text>
				<ScrollView style={{ padding: 20 }}>
					{Forms.fields('signUp').map(c => {
						const isLastElement = !c.nextKey;
						return (
							<FloatingTextInput
								{...c}
								ref={o => (this[c.key] = o)}
								onChangeText={this.isFormValid}
								onSubmit={() => {
									if (isLastElement) {
										this.onSubmit();
									} else {
										this[c.nextKey].focus();
									}
								}}
								textInputProps={{ ...c.textInputProps, returnKeyType: isLastElement ? 'done' : 'next' }}
								style={{ marginBottom: isLastElement ? 0 : 15 }}
							/>
						);
					})}
					<View {...this.getBtnContainerProps()}>
						<TouchableOpacity
							onPress={this.onSubmit}
							style={{
								margin: 20,
								padding: 20,
								borderRadius: 4,
								backgroundColor: violetColor,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Text style={{ color: 'white' }}>Tap to Signup</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}
