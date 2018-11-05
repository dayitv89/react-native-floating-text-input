/**
 * Copyright (c) 2017-Present, Gaurav D. Sharma
 * All rights reserved.
 *
 * @flow
 */
'use strict';

let fields = {
	firstName: {
		key: 'firstName',
		label: 'First Name',
		placeholder: 'e.g. John',
		headerText: 'Hey Dude! What should I call you?',
		footerErrorText: '👎 Please enter a valid first name',
		footerValidText: '👍 looks good',
		regex: /^[a-zA-Z- .' \\s ]*$/
	},
	lastName: {
		key: 'lastName',
		label: 'Last Name',
		placeholder: 'e.g. Smith',
		headerText: "What's your surname?",
		footerErrorText: '👎 Please enter a valid last name',
		footerValidText: '👍 looks good',
		regex: /^[a-zA-Z- .' \\s ]*$/
	},
	fullName: {
		key: 'fullName',
		label: 'Full Name',
		placeholder: 'e.g. John Smith',
		headerText: 'Hey Dude! What should I call you?',
		footerErrorText: 'Your full name please 🙄',
		footerValidText: '😃 You have a nice name.',
		onValidationCheck: val =>
			!!val && val.split(' ').length >= 2 && val.split(' ')[1].length > 0 && /^[a-zA-Z- .' \\s ]*$/.test(val)
	},
	email: {
		key: 'email',
		label: 'Email',
		placeholder: 'e.g. someone@example.com',
		headerText: 'Where I can email you about new offers and account updates?',
		footerErrorText: '👎 Please enter a valid email ID',
		footerValidText: '👍 looks good',
		regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		textInputProps: { keyboardType: 'email-address' }
	},
	phone: {
		key: 'phone',
		label: 'Phone',
		placeholder: 'e.g. 9876543210',
		headerText: "Just last step my friend and we are good to go. I'll contact you when it will be needed.",
		footerErrorText: 'A valid phone number consist of 10 digits.',
		footerValidText: '✅ looks good',
		regex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
		textInputProps: { keyboardType: 'phone-pad' }
	},
	password: {
		key: 'password',
		label: 'Password',
		placeholder: 'Enter strong password',
		headerText: 'It will keep secret with us',
		footerErrorText: 'Valid password 6-16 consists of 6-16 characters',
		footerValidText: '✅ looks good',
		regex: /^.{6,16}$/,
		textInputProps: { secureTextEntry: true }
	},
	inviteCode: {
		key: 'inviteCode',
		label: 'Invite Code*',
		placeholder: 'e.g. John32S',
		headerText: 'Your friend and you will get rewarded. (*optional)',
		footerErrorText: 'Please enter a valid invite code',
		footerValidText: '✅ looks good',
		regex: /^.{6,16}$/
	},
	favLocation: {
		key: 'favLocation',
		label: 'Favorite Location',
		placeholder: 'e.g. Baker Street, New York',
		headerText: 'It will help you ordering, and finding the best offer for you.',
		footerErrorText: 'Please enter a valid favorite location',
		footerValidText: '✅ looks good',
		regex: /^.{1,100}$/
	}
};

let formDetails = {
	signUp: {
		show: ['fullName', 'email', 'password', 'inviteCode'],
		optional: ['inviteCode']
	},
	login: {
		show: ['email', 'password'],
		optional: []
	},
	profile: {
		show: ['fullName', 'email', 'phone', 'birthday', 'favLocation'],
		optional: []
	},
	inviteCode: {
		show: ['inviteCode'],
		optional: []
	}
};

export default class Forms {
	static getFormFields(keys) {
		return keys.map((k, index) => {
			let nextKey = null;
			if (index < keys.length - 1) {
				nextKey = this.getFields(keys[index + 1]).key;
			}
			return { ...this.getFields(k), nextKey };
		});
	}

	static fields(key) {
		return this.getFormFields(this.getDetails(key).show);
	}

	static validate(key) {
		return this.getFormFields(this.mandatoryFields(key));
	}

	static mandatoryFields(key) {
		const { show, optional } = this.getDetails(key);
		return show.filter(i => !optional.includes(i));
	}

	static getFields(key = null) {
		return key ? fields[key] : fields;
	}

	static updateFields(newFields) {
		fields = HashExtension.merge(fields, newFields);
	}

	static getDetails(key = null) {
		return key ? formDetails[key] : formDetails;
	}

	static updateDetails(newDetails) {
		formDetails = { ...formDetails, ...newDetails };
	}
}
