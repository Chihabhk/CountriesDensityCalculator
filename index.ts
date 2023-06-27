const fs = require("fs");
const path = "./countries.txt";
const content = fs.readFileSync(path, { encoding: "utf8" }); //flag?
const lines = content.split("\n").slice(1);

interface countryInfo {
    countryName: string;
    density: number;
}
const countriesByDensity: countryInfo[] = [];

lines.forEach((line: string) => {
    const countryData = line.replace(/,/g, "");
    if (!countryData) return;
    const populationAndArea = countryData.match(/\d+\s\d+/);
    if (!populationAndArea) return;

    const countryName = countryData.replace(/\d/g, "").trim();

    const population = parseFloat(populationAndArea[0].split(" ")[0]);
    const area = parseFloat(populationAndArea[0].split(" ")[1]);
    if (!area || area === 0) return;

    const density = parseFloat((population / area).toFixed(2));
    countriesByDensity.push({ countryName, density });
});
countriesByDensity.sort((a, b) => b.density - a.density);
const countriesCSV = countriesByDensity
    .map((country) => `${country.countryName}, ${country.density}`)
    .join("\n");
fs.writeFileSync("./countries.csv", countriesCSV);

console.log(fs.readFileSync("./countries.csv", "utf-8"));
