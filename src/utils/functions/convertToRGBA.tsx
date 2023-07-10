// Convert hex, rgb, and css-named colors to RGBA format:
export default function convertToRGBA(color: string, alpha = 1.0) {
    // Create a temporary element to handle color conversion
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
  
    // Get the computed color value
    const computedColor = tempElement.style.color;
  
    // Parse the color value to get RGB values
    const match = computedColor.match(/(\d+),\s*(\d+),\s*(\d+)/);
  
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  
    return null; // Return null if color conversion fails
  }