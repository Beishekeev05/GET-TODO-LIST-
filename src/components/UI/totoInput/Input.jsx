import styled from "styled-components";
import PropTypes from "prop-types";

function Input({ type, value, onChange, placeholder }) {
	return (
		<InputStyled
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
}

export default Input;

const InputStyled = styled.input`
	font-size: 20px;
	.inputEdit {
		outline: none;
		margin: 0 10px;
	}
`;

Input.propTypes = {
	type: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};
