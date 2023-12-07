 setTimeout(videovisible, 2000)

    function videovisible() {
        document.getElementById('loading').style.display = 'none'
    }
    document.addEventListener("DOMContentLoaded", () => {
        const e = document.querySelector("video"),
            n = e.getElementsByTagName("source")[0].src,
            o = {};
        if (Hls.isSupported()) {
            var config = {
                maxMaxBufferLength: 100,
            };
            const t = new Hls(config);
            t.loadSource(n), t.on(Hls.Events.MANIFEST_PARSED, function(n, l) {
                const s = t.levels.map(e => e.height);
                o.quality = {
                    default: s[0],
                    options: s,
                    forced: !0,
                    onChange: e => (function(e) {
                        window.hls.levels.forEach((n, o) => {
                            n.height === e && (window.hls.currentLevel = o)
                        })
                    })(e)
                };
                new Plyr(e, o)
            }), t.attachMedia(e), window.hls = t
        } else {
            new Plyr(e, o)
        }
    });