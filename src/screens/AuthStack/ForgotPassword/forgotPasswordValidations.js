import * as Yup from "yup";
import strings from '../../../global/messages'
const forgotPasswordValidations = Yup.object().shape({
	email: Yup
		.string()
		.email(strings.invalidEmailAdress)
		.required(strings.required),
});
module.exports = forgotPasswordValidations;