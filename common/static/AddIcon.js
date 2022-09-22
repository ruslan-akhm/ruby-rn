import * as React from "react";
import { SvgXml } from "react-native-svg";
import Colors from "../../constants/Colors";

const iconColor = Colors.primary;

const xml = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 7.25H1" stroke=${iconColor} stroke-linecap="round"/>
<path d="M7.25 13.5V1" stroke=${iconColor} stroke-linecap="round"/>
</svg>
`;

const AddIcon = () => {
	return <SvgXml xml={xml} width="100%" height="100%" />;
};

export default AddIcon;
