import * as Yup from "yup";
import strings from '../../../global/messages'
const registerValidations = Yup.object().shape({
	email: Yup
		.string()
		.email(strings.invalidEmailAdress)
		.required(strings.required),
	password: Yup
		.string()
		.required(strings.required),
	passwordConfirm: Yup
		.string()
		.oneOf([Yup.ref('password')], `${strings.passwordNotMatch}.`)
		.required(strings.required),
});
module.exports = registerValidations;

