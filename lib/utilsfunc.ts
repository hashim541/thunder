
export function isBase64Image(imageData: string) {
    const base64Regex = /^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,/;
    return base64Regex.test(imageData);
}
  
export function formatDateString(dateInput: string | number) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    // Convert input to a Date object
    const date = new Date(dateInput);
    const formattedDate = date.toLocaleDateString(undefined, options);

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate} - ${time}`;
}

export function getDateRange() {
    const today = new Date();
    const startDate = today;
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 30);

    return {
        startDate,
        endDate
    };
}

interface RGB {
    r: number;
    g: number;
    b: number;
}

export function getContrastingColor(hex: string): string {
    const rgb = hexToRgb(hex);
    const luminance = calculateLuminance(rgb);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

function hexToRgb(hex: string): RGB {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}
  
function calculateLuminance({ r, g, b }: RGB): number {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
  
  
  