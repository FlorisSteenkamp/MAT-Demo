import * as cheerio from 'cheerio';


async function loadSvgs(pathToSvg:string): Promise<cheerio.CheerioAPI> {
    const data = await (await fetch(pathToSvg)).text();

    const svg = cheerio.load(data, { xmlMode : true });
    
    return svg;
}


interface Glyph {
    name: string;
    d: string;
}


async function loadSvgFont(path: string) {
    const $ = await loadSvgs(path);
    const $svgs = $('glyph');

    const glyphs: Glyph[] = [];
    for (let i=0; i<$svgs.length; i++) {
        const $glyph = $svgs[i];
        const attribs = $glyph.attribs;
        glyphs.push({
            name: attribs["glyph-name"],
            d: attribs.d
        })
    }

    return glyphs;
}


export { loadSvgFont }
