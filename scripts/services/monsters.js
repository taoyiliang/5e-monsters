"use strict";

define([
	"scripts/data",
	"scripts/misc",
	"scripts/monster",
], function (data, miscLib, monsterLib) {
	return ["metaInfo", function (metaInfo) {
		var i, j, m, source,
			all = [],
			byId = {},
			byCr = {};

		window.metaInfo = metaInfo;

		for ( i = 0; i < data.monsters.length; i++ ) {
			m = new monsterLib.Monster(data.monsters[i]);

			all.push(m);
			byId[m.id] = m;

			if ( ! m.special ) {
				if ( ! byCr[m.cr.string] ) {
					byCr[m.cr.string] = [];
				}

				byCr[m.cr.string].push(m);
			}

			// TODO: CP from addMonster. Is this actually used?
			// if (args.tags) {
			// 	register(miscLib.tags, args.tags);
			// }
		}

		for ( i = 0; i < data.sources.length; i++ ) {
			source = data.sources[i];

			miscLib.sources.push(source.name);
			miscLib.sourceFilters[source.name] = source.initialState;

			for ( j = 0; j < source.contents.length; j++ ) {
				m = source.contents[j];
				byId[m[0]].sources.push({
					name: source.name,
					page: m[1],
					url: m[2]
				});
			}
		}
		
		all.sort(function (a, b) {
			return (a.name > b.name) ? 1 : -1;
		});

		return {
			all: all,
			byCr: byCr,
			byId: byId,
			check: monsterLib.checkMonster,
		};
	}];

});
