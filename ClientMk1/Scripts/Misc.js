﻿$(function () {

    // these default equivalents were obtained from a table of equivalents
    // provided by sugar.js sorting alogrithms:
    // https://sugarjs.com/docs/#/ArraySorting
    /*
    $.tablesorter.characterEquivalents = {
      'a' : '\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5', // áàâãäąå
      'A' : '\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5', // ÁÀÂÃÄĄÅ
      'c' : '\u00e7\u0107\u010d', // çćč
      'C' : '\u00c7\u0106\u010c', // ÇĆČ
      'e' : '\u00e9\u00e8\u00ea\u00eb\u011b\u0119', // éèêëěę
      'E' : '\u00c9\u00c8\u00ca\u00cb\u011a\u0118', // ÉÈÊËĚĘ
      'i' : '\u00ed\u00ec\u0130\u00ee\u00ef\u0131', // íìİîïı
      'I' : '\u00cd\u00cc\u0130\u00ce\u00cf', // ÍÌİÎÏ
      'o' : '\u00f3\u00f2\u00f4\u00f5\u00f6\u014d', // óòôõöō
      'O' : '\u00d3\u00d2\u00d4\u00d5\u00d6\u014c', // ÓÒÔÕÖŌ
      'ss': '\u00df', // ß (s sharp)
      'SS': '\u1e9e', // ẞ (Capital sharp s)
      'u' : '\u00fa\u00f9\u00fb\u00fc\u016f', // úùûüů
      'U' : '\u00da\u00d9\u00db\u00dc\u016e' // ÚÙÛÜŮ
    };
    */
    // modify the above defaults as follows
    $.extend($.tablesorter.characterEquivalents, {
        "ae": "\u00e6", // expanding characters æ Æ
        "AE": "\u00c6",
        "oe": "\u00f6\u0153", // œ Œ
        "OE": "\u00d6\u0152",
        "d": "\u00f0",  // Eth (ð Ð)
        "D": "\u00d0",
        "o": "\u00f3\u00f2\u00f4\u00f5", // remove ö because it's in the oe now
        "O": "\u00d3\u00d2\u00d4\u00d5"  // remove Ö because it's in the OE now
    });

    $("#myTable").tablesorter({
        theme: 'blue',
        // Enable use of the characterEquivalents reference
        sortLocaleCompare: true,
        // maintain a stable sort (First Name column)
        sortStable: true,
        // if false, upper case sorts BEFORE lower case
        ignoreCase: true
    });
});