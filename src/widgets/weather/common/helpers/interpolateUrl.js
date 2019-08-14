'use strict';

export default function (url, params) {

    if (url !== undefined && url !== null && typeof url !== 'string') {
        throw new Error('url must be a string');
    }

    const result = [];

    // eslint-disable-next-line no-unexpected-multiline,no-unused-vars
    (url || '').split('/:').forEach(function (segment, i, arr) {
        if (i === 0) {
            return result.push(segment);
        } else {
            const segmentMatch = segment.match(/(\w+)(?:[ ])?(.*)/);
            const key = segmentMatch[1];
            const objKey = i === 1 ? `${key}=` : `&${key}=`;

            if (params[key] !== undefined) {
                result.push(objKey + params[key]);
            } else {
                result.push(objKey + params);
            }

            result.push(segmentMatch[2] || '');
        }
    });

    return result.join('');
}
