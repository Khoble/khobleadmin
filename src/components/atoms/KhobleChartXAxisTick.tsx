export default function KhobleChartAxisTick({ x, y, textColor, payload, tickWidth }: any) {
    // Objects used to calculate the tick width:
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    //  Variables used across all functions:
    const font = getCanvasFont();
    const tickText = payload.value;
    
    // Calculate the width of the tick text with the font being used:
    function getTextWidth(text: any) {
        if (context) {
            context.font = font;
            const metrics = context.measureText(text);
            return metrics.width;
        }
        return 0
    }

    // Find the font being used by the component and formats it so that the tick width can later be calculated: 
    function getCanvasFont(el = document.body) {
        // Extract css properies from an element:
        function getCssStyle(element: any, prop: any) {
            return window.getComputedStyle(element, null).getPropertyValue(prop);
        }
        
        const fontWeight = getCssStyle(el, 'font-weight');
        const fontSize = getCssStyle(el, 'font-size');
        const fontFamily = getCssStyle(el, 'font-family');

        return `${fontWeight} ${fontSize} ${fontFamily}`;
    }

    // Clip the text so that it fits the tick width, adding a custom text suffix at the end:
    function getAdjustedText() {
        const textSuffix = "…";
        const textSuffixWidth = getTextWidth(textSuffix);

        var textSubstring = "";
        var textSubstringWidth = 0;
        var nextCharIndex = 0;
        
        while (nextCharIndex < tickText.length && textSubstringWidth + getTextWidth(tickText[nextCharIndex]) + textSuffixWidth < tickWidth) {
            textSubstring+=tickText[nextCharIndex]; // Add another char to the text substring
            textSubstringWidth+=getTextWidth(tickText[nextCharIndex]); // Update the current substring width
            nextCharIndex++; // Update the index of the next char
        }
        
        return textSubstring+textSuffix // Return cropped text + textSuffix
    }

    // Log the name tick text, followed by its width compared to the width of the tick. This is very useful to visually debug when while resizing the chart component
    // console.log(payload.value+": "+getTextWidth(payload.value)+" / "+tickWidth);

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                dy={16}
                textAnchor="middle"
                fill={textColor}
            >
                {getTextWidth(tickText) <= tickWidth? // Does current tick text fit inside the tick width?
                    tickText // When true
                    : 
                    getAdjustedText() // When false
                }
            </text>
        </g>
    )
}