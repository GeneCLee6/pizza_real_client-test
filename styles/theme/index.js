import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import { ButtonStyles as Button } from './components/button';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
const overrides = {
	...styles,
	components: {
		Button,
		Steps,
	},
};

export default extendTheme(overrides);
