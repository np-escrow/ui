export const formatInputNumericValue = (targetValue: string) => {
    let value = targetValue.replace(/,/g, ".");
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");

    let integerPart = parts[0] || "0";
    
    if (integerPart.length > 1 && integerPart.startsWith("0")) {
        integerPart = integerPart.replace(/^0+/, "");
        if (integerPart === "") {
            integerPart = "0";
        }
    }
    
    if (isNaN(Number(integerPart))) {
        integerPart = "0";
    }

    if (parts.length > 1) {
        const decimalPart = parts.slice(1).join("");
        const limitedDecimalPart = decimalPart.slice(0, 6);
        value = integerPart + "." + limitedDecimalPart;
    } else {
        value = integerPart;
    }

    if (value === "0" && targetValue === "0") {
        return "0";
    }

    if (value === "" || value === "0") {
        return targetValue === "" ? "" : "0";
    }

    return value;
}