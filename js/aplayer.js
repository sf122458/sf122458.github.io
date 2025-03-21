"use strict";

console.log(
    "\n %c MetingJS v1.2.0 %c https://github.com/metowolf/MetingJS \n",
    "color: #fadfa3; background: #030307; padding:5px 0;",
    "background: #fadfa3; padding:5px 0;"
);

var aplayers = [],
    loadMeting = function () {
        function a(a, t) {
            var e = {
                container: a,
                audio: t,
                mini: null,
                fixed: null,
                autoplay: !1,
                mutex: !0,
                lrcType: 3,
                listFolded: !1,
                preload: "auto",
                theme: "#2980b9",
                loop: "all",
                order: "list",
                volume: null,
                listMaxHeight: null,
                customAudioType: null,
                storageName: "metingjs",
            };
            if (t.length) {
                t[0].lrc || (e.lrcType = 0);
                var r = {};
                for (var s in e) {
                    var n = s.toLowerCase();
                    (a.dataset.hasOwnProperty(n) ||
                        a.dataset.hasOwnProperty(s) ||
                        null !== e[s]) &&
                        ((r[s] = a.dataset[n] || a.dataset[s] || e[s]),
                        "true" !== r[s] && "false" !== r[s] || (r[s] = "true" == r[s]));
                }
                aplayers.push(new APlayer(r));
                document.querySelector(".aplayer-icon-lrc").click();
            }
        }
        var t = "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r";
        "undefined" != typeof meting_api && (t = meting_api);
        for (var e = 0; e < aplayers.length; e++)
            if (!aplayers[e].container.classList.contains("no-destroy"))
                try {
                    aplayers[e].destroy();
                } catch (a) {
                    console.log(a);
                }
        aplayers = [];
        for (var r = document.querySelectorAll(".aplayer"), s = 0; s < r.length; s++) {
            (function () {
                var e = r[s];
                if (e.classList.contains("no-reload")) return "continue";
                if (e.classList.contains("no-destroy") && e.classList.add("no-reload"), e.dataset.id) {
                    var n = e.dataset.api || t;
                    (n = n.replace(":server", e.dataset.server)),
                        (n = n.replace(":type", e.dataset.type)),
                        (n = n.replace(":id", e.dataset.id)),
                        (n = n.replace(":auth", e.dataset.auth)),
                        (n = n.replace(":r", Math.random()));
                    var o = new XMLHttpRequest();
                    (o.onreadystatechange = function () {
                        if (4 === o.readyState && (o.status >= 200 && o.status < 300 || 304 === o.status)) {
                            var t = JSON.parse(o.responseText);
                            a(e, t);
                        }
                    }),
                        o.open("get", n, !0),
                        o.send(null);
                } else if (e.dataset.url) {
                    var l = [
                        {
                            name: e.dataset.name || e.dataset.title || "Audio name",
                            artist: e.dataset.artist || e.dataset.author || "Audio artist",
                            url: e.dataset.url,
                            cover: e.dataset.cover || e.dataset.pic,
                            lrc: e.dataset.lrc,
                            type: e.dataset.type || "auto",
                        },
                    ];
                    a(e, l);
                }
            })();
        }
    };

document.addEventListener("DOMContentLoaded", loadMeting, !1);