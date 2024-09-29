import { ImagePathRecognizer, UrlMatch } from './recognizer';
// import { acceptedExtensions } from '../util/acceptedExtensions';

export const siblingRecognizer: ImagePathRecognizer = {
    recognize: (lineIndex: number, line: string): UrlMatch[] => {
        // const excludedPathCharactersClause = '[^\\0\\s!$`&*()\\[\\]+\'":;\\\\]';
        const limitsStartClause = '\'"`<(\\['
        const limitsEndClause = '\'"`>)\\]'
        const extClause = `svg|png|jpeg|jpg|bmp|gif|ico|webp|avif`
        // const svgClause = `(?<=[${limitsStartClause}])[^${limitsStartClause}]*\.svg(?=[${limitsEndClause}])`
        // const pngClause = `(?<=[${limitsStartClause}])[^${limitsStartClause}]*\.png(?=[${limitsEndClause}])`
        // const jpeClause = `(?<=[${limitsStartClause}])[^${limitsStartClause}]*\.jpeg(?=[${limitsEndClause}])`
        // const jpgClause = `(?<=[${limitsStartClause}])[^${limitsStartClause}]*\.jpg(?=[${limitsEndClause}])`
        const regexClause = `(?<=[${limitsStartClause}])[^${limitsStartClause}]*\.(${extClause})(?=[${limitsEndClause}])`
        
        // export const acceptedExtensions = ['.svg', '.png', '.jpeg', '.jpg', '.bmp', '.gif', '.ico', '.webp', '.avif'];
        // const excludedPathCharactersClause = '[^\\0\\s!$`&*()\\[\\]+\'":;\\\\]';
        // let pattern: RegExp = new RegExp(
        //     `(${excludedPathCharactersClause}+[${acceptedExtensions.map((p) => `(\\${p})`).join('|')}])`,
        //     'ig',
        // );
        let pattern: RegExp = new RegExp(regexClause, 'ig');
        let match: RegExpExecArray;
        const result = [];
        while ((match = pattern.exec(line))) {
            if (match.length > 0) {
                const imagePath = match[0];
                result.push({
                    url: imagePath,
                    lineIndex,
                    start: match.index,
                    end: match.index + imagePath.length,
                });
            }
        }
        return result;
    },
};
