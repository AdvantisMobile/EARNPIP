import * as Yup from "yup";
import strings from '../../../global/messages'
const loginValidations = Yup.object().shape({
	email: Yup
		.string()
		.email(strings.invalidEmailAdress)
		.required(strings.required),
	password: Yup
		.string()
		.required(strings.required)
});
module.exports = loginValidations;

