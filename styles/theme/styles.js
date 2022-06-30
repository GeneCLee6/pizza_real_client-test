import { theme as chakraTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
	...chakraTheme.fonts,
	body: `"Open Sans", -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif`,
	heading: `"Barlow Condensed", -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif`,
	mono: `"Barlow Condensed", -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif`,
};

const colors = {
	brand: {
		deepblue: '#2e58a6',
		skyblue: '#01a0c6',
		milkywhite: '#f2f2f2',
		dark: '#0b0146',
		lightgold: '#f3c668',
		gold: '#c79810',
		deepgold: '#996c29',
		red: '#f62121',
	},
};

const breakpoints = createBreakpoints({
	sm: '30em',
	md: '48em',
});

const globalStyle = {
	fonts,
	colors,
	breakpoints,
};

export default globalStyle;
