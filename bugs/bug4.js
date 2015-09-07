var postcss = require('postcss');

function shouldSetZeroBasis(basisValue) {
    if (!basisValue) {
        return false;
    }
    return basisValue === '0' || basisValue.replace(/\s/g, '') === '0px';
}

function properBasis(basis) {
    if (shouldSetZeroBasis(basis)) {
        return '0%';
    }
    return basis;
}

module.exports = function(decl) {
    if (decl.prop === 'flex') {
        if(decl.value === 'none'){
            return;
        }
        var values = postcss.list.space(decl.value);
        var flexGrow = values[0];
        var flexShrink = values[1];
        var flexBasis = values[2] || 'auto';
        decl.value = flexGrow + ' ' + (flexShrink || '1') + ' ' + properBasis(flexBasis);
    }
};
