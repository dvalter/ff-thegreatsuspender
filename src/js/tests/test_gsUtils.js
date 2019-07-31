/*global chrome, gsUtils, assertTrue */
var testSuites = typeof testSuites === 'undefined' ? [] : testSuites;
testSuites.push(
  (function() {
    'use strict';

    const tests = [
      // Test gsUtils.setTimeout
      async () => {
        const timeout = 500;
        const timeBefore = new Date().getTime();
        await gsUtils.setTimeout(timeout);
        const timeAfter = new Date().getTime();
        const isTimeAfterValid =
          timeAfter > timeBefore + timeout &&
          timeAfter < timeBefore + timeout + 200;

        return assertTrue(isTimeAfterValid);
      },

      // Test gsUtils.getRootUrl
      async () => {
        const rawUrl1 = 'https://searchengine.site';
        const isUrl1Valid =
          gsUtils.getRootUrl(rawUrl1, false, false) === 'searchengine.site' &&
          gsUtils.getRootUrl(rawUrl1, true, false) === 'searchengine.site' &&
          gsUtils.getRootUrl(rawUrl1, false, true) === 'https://searchengine.site' &&
          gsUtils.getRootUrl(rawUrl1, true, true) === 'https://searchengine.site';

        const rawUrl2 = 'https://searchengine.site/';
        const isUrl2Valid =
          gsUtils.getRootUrl(rawUrl2, false, false) === 'searchengine.site' &&
          gsUtils.getRootUrl(rawUrl2, true, false) === 'searchengine.site' &&
          gsUtils.getRootUrl(rawUrl2, false, true) === 'https://searchengine.site' &&
          gsUtils.getRootUrl(rawUrl2, true, true) === 'https://searchengine.site';

        const rawUrl3 =
          'https://searchengine.site/search?source=hp&ei=T2HWW9jfGoWJ5wKzt4WgBw&q=rabbits&oq=rabbits&gs_l=psy-ab.3..35i39k1l2j0i67k1l6j0i10k1j0i67k1.1353.2316.0.2448.9.7.0.0.0.0.120.704.4j3.7.0....0...1c.1.64.psy-ab..2.7.701.0..0.0.dk-gx_j1MUI';
        const isUrl3Valid =
          gsUtils.getRootUrl(rawUrl3, false, false) === 'searchengine.site' &&
          gsUtils.getRootUrl(rawUrl3, true, false) === 'searchengine.site/search' &&
          gsUtils.getRootUrl(rawUrl3, false, true) === 'https://searchengine.site' &&
          gsUtils.getRootUrl(rawUrl3, true, true) ===
            'https://searchengine.site/search';

        const rawUrl4 = 'www.searchengine.site';
        const isUrl4Valid =
          gsUtils.getRootUrl(rawUrl4, false, false) === 'www.searchengine.site' &&
          gsUtils.getRootUrl(rawUrl4, true, false) === 'www.searchengine.site' &&
          gsUtils.getRootUrl(rawUrl4, false, true) === 'www.searchengine.site' &&
          gsUtils.getRootUrl(rawUrl4, true, true) === 'www.searchengine.site';

        const rawUrl5 =
          'https://github.com/torvalds/linux/issues/478#issuecomment-430780678';
        const isUrl5Valid =
          gsUtils.getRootUrl(rawUrl5, false, false) === 'github.com' &&
          gsUtils.getRootUrl(rawUrl5, true, false) ===
            'github.com/torvalds/linux/issues/478' &&
          gsUtils.getRootUrl(rawUrl5, false, true) === 'https://github.com' &&
          gsUtils.getRootUrl(rawUrl5, true, true) ===
            'https://github.com/torvalds/linux/issues/478';

        const rawUrl6 = 'file:///Users/username/Downloads/session%20(63).txt';
        const isUrl6Valid =
          gsUtils.getRootUrl(rawUrl6, false, false) ===
            '/Users/username/Downloads' &&
          gsUtils.getRootUrl(rawUrl6, true, false) ===
            '/Users/username/Downloads/session%20(63).txt' &&
          gsUtils.getRootUrl(rawUrl6, false, true) ===
            'file:///Users/username/Downloads' &&
          gsUtils.getRootUrl(rawUrl6, true, true) ===
            'file:///Users/username/Downloads/session%20(63).txt';

        const rawUrl7 =
          'https://subdomain.domain.org/serverdir/web/#/report-home/a52338347w84781065p87884368';
        const isUrl7Valid =
          gsUtils.getRootUrl(rawUrl7, false, false) ===
            'subdomain.domain.org' &&
          gsUtils.getRootUrl(rawUrl7, true, false) ===
            'subdomain.domain.org/serverdir/web' &&
          gsUtils.getRootUrl(rawUrl7, false, true) ===
            'https://subdomain.domain.org' &&
          gsUtils.getRootUrl(rawUrl7, true, true) ===
            'https://subdomain.domain.org/serverdir/web';

        return assertTrue(
          isUrl1Valid &&
            isUrl2Valid &&
            isUrl3Valid &&
            isUrl4Valid &&
            isUrl5Valid &&
            isUrl6Valid &&
            isUrl7Valid
        );
      },

      // Test gsUtils.executeWithRetries
      async () => {
        const successPromiseFn = val => new Promise((r, j) => r(val));
        let result1;
        const timeBefore1 = new Date().getTime();
        try {
          result1 = await gsUtils.executeWithRetries(
            successPromiseFn,
            'a',
            3,
            500
          );
        } catch (e) {
          // do nothing
        }
        const timeAfter1 = new Date().getTime();
        const timeTaken1 = timeAfter1 - timeBefore1;
        const isTime1Valid = timeTaken1 >= 0 && timeTaken1 < 100;
        const isResult1Valid = result1 === 'a';

        const errorPromiseFn = val => new Promise((r, j) => j());
        let result2;
        const timeBefore2 = new Date().getTime();
        try {
          result2 = await gsUtils.executeWithRetries(
            errorPromiseFn,
            'b',
            3,
            500
          );
        } catch (e) {
          // do nothing
        }
        const timeAfter2 = new Date().getTime();
        const timeTaken2 = timeAfter2 - timeBefore2;
        const isTime2Valid = timeTaken2 >= 1500 && timeTaken2 < 1600;
        const isResult2Valid = result2 === undefined;

        return assertTrue(
          isResult1Valid && isTime1Valid && isResult2Valid && isTime2Valid
        );
      },
    ];

    return {
      name: 'gsUtils Library',
      tests,
    };
  })()
);
