import * as React from "react";
import { SvgXml } from "react-native-svg";
import Colors from "../../constants/Colors";

const iconColor = Colors.blackText;

const xml = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 5H4.16667H17.5" stroke=${iconColor} stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66797 5.00033V3.33366C6.66797 2.89163 6.84356 2.46771 7.15612 2.15515C7.46869 1.84259 7.89261 1.66699 8.33464 1.66699H11.668C12.11 1.66699 12.5339 1.84259 12.8465 2.15515C13.159 2.46771 13.3346 2.89163 13.3346 3.33366V5.00033M15.8346 5.00033V16.667C15.8346 17.109 15.659 17.5329 15.3465 17.8455C15.0339 18.1581 14.61 18.3337 14.168 18.3337H5.83464C5.39261 18.3337 4.96868 18.1581 4.65612 17.8455C4.34356 17.5329 4.16797 17.109 4.16797 16.667V5.00033H15.8346Z" stroke=${iconColor} stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

const TrashLogo = () => {
	return <SvgXml xml={xml} width="100%" height="100%" />;
};

export default TrashLogo;
