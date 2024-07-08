!/**
 * Highcharts JS v11.4.6 (2024-07-08)
 *
 * 3D features for Highcharts JS
 *
 * License: www.highcharts.com/license
 */
function(t) {
    "object" == typeof module && module.exports ? (t.default = t,
    module.exports = t) : "function" == typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function(e) {
        return t(e),
        t.Highcharts = e,
        t
    }) : t("undefined" != typeof Highcharts ? Highcharts : void 0)
}(function(t) {
    "use strict";
    var e = t ? t._modules : {};
    function i(e, i, s, o) {
        e.hasOwnProperty(i) || (e[i] = o.apply(null, s),
        "function" == typeof CustomEvent && t.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{
            detail: {
                path: i,
                module: e[i]
            }
        })))
    }
    i(e, "Core/Math3D.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t, e) {
        let {deg2rad: i} = t
          , {pick: s} = e;
        function o(t, e, o, a) {
            let n = e.options.chart.options3d
              , l = s(a, !!o && e.inverted)
              , h = {
                x: e.plotWidth / 2,
                y: e.plotHeight / 2,
                z: n.depth / 2,
                vd: s(n.depth, 1) * s(n.viewDistance, 0)
            }
              , p = e.scale3d || 1
              , c = i * n.beta * (l ? -1 : 1)
              , d = i * n.alpha * (l ? -1 : 1)
              , x = {
                cosA: Math.cos(d),
                cosB: Math.cos(-c),
                sinA: Math.sin(d),
                sinB: Math.sin(-c)
            };
            return o || (h.x += e.plotLeft,
            h.y += e.plotTop),
            t.map(function(t) {
                var e, i, s;
                let o = (e = (l ? t.y : t.x) - h.x,
                i = (l ? t.x : t.y) - h.y,
                s = (t.z || 0) - h.z,
                {
                    x: x.cosB * e - x.sinB * s,
                    y: -x.sinA * x.sinB * e + x.cosA * i - x.cosB * x.sinA * s,
                    z: x.cosA * x.sinB * e + x.sinA * i + x.cosA * x.cosB * s
                })
                  , a = r(o, h, h.vd);
                return a.x = a.x * p + h.x,
                a.y = a.y * p + h.y,
                a.z = o.z * p + h.z,
                {
                    x: l ? a.y : a.x,
                    y: l ? a.x : a.y,
                    z: a.z
                }
            })
        }
        function r(t, e, i) {
            let s = i > 0 && i < Number.POSITIVE_INFINITY ? i / (t.z + e.z + i) : 1;
            return {
                x: t.x * s,
                y: t.y * s
            }
        }
        function a(t) {
            let e = 0, i, s;
            for (i = 0; i < t.length; i++)
                s = (i + 1) % t.length,
                e += t[i].x * t[s].y - t[s].x * t[i].y;
            return e / 2
        }
        return {
            perspective: o,
            perspective3D: r,
            pointCameraDistance: function(t, e) {
                let i = e.options.chart.options3d
                  , o = {
                    x: e.plotWidth / 2,
                    y: e.plotHeight / 2,
                    z: s(i.depth, 1) * s(i.viewDistance, 0) + i.depth
                };
                return Math.sqrt(Math.pow(o.x - s(t.plotX, t.x), 2) + Math.pow(o.y - s(t.plotY, t.y), 2) + Math.pow(o.z - s(t.plotZ, t.z), 2))
            },
            shapeArea: a,
            shapeArea3D: function(t, e, i) {
                return a(o(t, e, i))
            }
        }
    }),
    i(e, "Core/Chart/Chart3D.js", [e["Core/Color/Color.js"], e["Core/Defaults.js"], e["Core/Math3D.js"], e["Core/Utilities.js"]], function(t, e, i, s) {
        var o;
        let {parse: r} = t
          , {defaultOptions: a} = e
          , {perspective: n, shapeArea3D: l} = i
          , {addEvent: h, isArray: p, merge: c, pick: d, wrap: x} = s;
        return function(t) {
            function e(t) {
                this.is3d() && "scatter" === t.options.type && (t.options.type = "scatter3d")
            }
            function i() {
                if (this.chart3d && this.is3d()) {
                    let t = this.renderer
                      , e = this.options.chart.options3d
                      , i = this.chart3d.get3dFrame()
                      , s = this.plotLeft
                      , o = this.plotLeft + this.plotWidth
                      , a = this.plotTop
                      , n = this.plotTop + this.plotHeight
                      , l = e.depth
                      , h = s - (i.left.visible ? i.left.size : 0)
                      , p = o + (i.right.visible ? i.right.size : 0)
                      , c = a - (i.top.visible ? i.top.size : 0)
                      , d = n + (i.bottom.visible ? i.bottom.size : 0)
                      , x = 0 - (i.front.visible ? i.front.size : 0)
                      , y = l + (i.back.visible ? i.back.size : 0)
                      , f = this.hasRendered ? "animate" : "attr";
                    this.chart3d.frame3d = i,
                    this.frameShapes || (this.frameShapes = {
                        bottom: t.polyhedron().add(),
                        top: t.polyhedron().add(),
                        left: t.polyhedron().add(),
                        right: t.polyhedron().add(),
                        back: t.polyhedron().add(),
                        front: t.polyhedron().add()
                    }),
                    this.frameShapes.bottom[f]({
                        class: "highcharts-3d-frame highcharts-3d-frame-bottom",
                        zIndex: i.bottom.frontFacing ? -1e3 : 1e3,
                        faces: [{
                            fill: r(i.bottom.color).brighten(.1).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: h,
                                y: d,
                                z: y
                            }],
                            enabled: i.bottom.visible
                        }, {
                            fill: r(i.bottom.color).brighten(.1).get(),
                            vertexes: [{
                                x: s,
                                y: n,
                                z: l
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }],
                            enabled: i.bottom.visible
                        }, {
                            fill: r(i.bottom.color).brighten(-.1).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: h,
                                y: d,
                                z: y
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }],
                            enabled: i.bottom.visible && !i.left.visible
                        }, {
                            fill: r(i.bottom.color).brighten(-.1).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }],
                            enabled: i.bottom.visible && !i.right.visible
                        }, {
                            fill: r(i.bottom.color).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }],
                            enabled: i.bottom.visible && !i.front.visible
                        }, {
                            fill: r(i.bottom.color).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: y
                            }, {
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }],
                            enabled: i.bottom.visible && !i.back.visible
                        }]
                    }),
                    this.frameShapes.top[f]({
                        class: "highcharts-3d-frame highcharts-3d-frame-top",
                        zIndex: i.top.frontFacing ? -1e3 : 1e3,
                        faces: [{
                            fill: r(i.top.color).brighten(.1).get(),
                            vertexes: [{
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: h,
                                y: c,
                                z: x
                            }],
                            enabled: i.top.visible
                        }, {
                            fill: r(i.top.color).brighten(.1).get(),
                            vertexes: [{
                                x: s,
                                y: a,
                                z: 0
                            }, {
                                x: o,
                                y: a,
                                z: 0
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }, {
                                x: s,
                                y: a,
                                z: l
                            }],
                            enabled: i.top.visible
                        }, {
                            fill: r(i.top.color).brighten(-.1).get(),
                            vertexes: [{
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: h,
                                y: c,
                                z: x
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }, {
                                x: s,
                                y: a,
                                z: l
                            }],
                            enabled: i.top.visible && !i.left.visible
                        }, {
                            fill: r(i.top.color).brighten(-.1).get(),
                            vertexes: [{
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }, {
                                x: o,
                                y: a,
                                z: 0
                            }],
                            enabled: i.top.visible && !i.right.visible
                        }, {
                            fill: r(i.top.color).get(),
                            vertexes: [{
                                x: h,
                                y: c,
                                z: x
                            }, {
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: o,
                                y: a,
                                z: 0
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }],
                            enabled: i.top.visible && !i.front.visible
                        }, {
                            fill: r(i.top.color).get(),
                            vertexes: [{
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: s,
                                y: a,
                                z: l
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }],
                            enabled: i.top.visible && !i.back.visible
                        }]
                    }),
                    this.frameShapes.left[f]({
                        class: "highcharts-3d-frame highcharts-3d-frame-left",
                        zIndex: i.left.frontFacing ? -1e3 : 1e3,
                        faces: [{
                            fill: r(i.left.color).brighten(.1).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }, {
                                x: h,
                                y: d,
                                z: y
                            }],
                            enabled: i.left.visible && !i.bottom.visible
                        }, {
                            fill: r(i.left.color).brighten(.1).get(),
                            vertexes: [{
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: s,
                                y: a,
                                z: l
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }, {
                                x: h,
                                y: c,
                                z: x
                            }],
                            enabled: i.left.visible && !i.top.visible
                        }, {
                            fill: r(i.left.color).brighten(-.1).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: y
                            }, {
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: h,
                                y: c,
                                z: x
                            }, {
                                x: h,
                                y: d,
                                z: x
                            }],
                            enabled: i.left.visible
                        }, {
                            fill: r(i.left.color).brighten(-.1).get(),
                            vertexes: [{
                                x: s,
                                y: a,
                                z: l
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }],
                            enabled: i.left.visible
                        }, {
                            fill: r(i.left.color).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: h,
                                y: c,
                                z: x
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }],
                            enabled: i.left.visible && !i.front.visible
                        }, {
                            fill: r(i.left.color).get(),
                            vertexes: [{
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: h,
                                y: d,
                                z: y
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }, {
                                x: s,
                                y: a,
                                z: l
                            }],
                            enabled: i.left.visible && !i.back.visible
                        }]
                    }),
                    this.frameShapes.right[f]({
                        class: "highcharts-3d-frame highcharts-3d-frame-right",
                        zIndex: i.right.frontFacing ? -1e3 : 1e3,
                        faces: [{
                            fill: r(i.right.color).brighten(.1).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }, {
                                x: p,
                                y: d,
                                z: x
                            }],
                            enabled: i.right.visible && !i.bottom.visible
                        }, {
                            fill: r(i.right.color).brighten(.1).get(),
                            vertexes: [{
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: o,
                                y: a,
                                z: 0
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }, {
                                x: p,
                                y: c,
                                z: y
                            }],
                            enabled: i.right.visible && !i.top.visible
                        }, {
                            fill: r(i.right.color).brighten(-.1).get(),
                            vertexes: [{
                                x: o,
                                y: a,
                                z: 0
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }],
                            enabled: i.right.visible
                        }, {
                            fill: r(i.right.color).brighten(-.1).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: p,
                                y: d,
                                z: y
                            }],
                            enabled: i.right.visible
                        }, {
                            fill: r(i.right.color).get(),
                            vertexes: [{
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }, {
                                x: o,
                                y: a,
                                z: 0
                            }],
                            enabled: i.right.visible && !i.front.visible
                        }, {
                            fill: r(i.right.color).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }],
                            enabled: i.right.visible && !i.back.visible
                        }]
                    }),
                    this.frameShapes.back[f]({
                        class: "highcharts-3d-frame highcharts-3d-frame-back",
                        zIndex: i.back.frontFacing ? -1e3 : 1e3,
                        faces: [{
                            fill: r(i.back.color).brighten(.1).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: h,
                                y: d,
                                z: y
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }],
                            enabled: i.back.visible && !i.bottom.visible
                        }, {
                            fill: r(i.back.color).brighten(.1).get(),
                            vertexes: [{
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }, {
                                x: s,
                                y: a,
                                z: l
                            }],
                            enabled: i.back.visible && !i.top.visible
                        }, {
                            fill: r(i.back.color).brighten(-.1).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: y
                            }, {
                                x: h,
                                y: c,
                                z: y
                            }, {
                                x: s,
                                y: a,
                                z: l
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }],
                            enabled: i.back.visible && !i.left.visible
                        }, {
                            fill: r(i.back.color).brighten(-.1).get(),
                            vertexes: [{
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }],
                            enabled: i.back.visible && !i.right.visible
                        }, {
                            fill: r(i.back.color).get(),
                            vertexes: [{
                                x: s,
                                y: a,
                                z: l
                            }, {
                                x: o,
                                y: a,
                                z: l
                            }, {
                                x: o,
                                y: n,
                                z: l
                            }, {
                                x: s,
                                y: n,
                                z: l
                            }],
                            enabled: i.back.visible
                        }, {
                            fill: r(i.back.color).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: y
                            }, {
                                x: p,
                                y: d,
                                z: y
                            }, {
                                x: p,
                                y: c,
                                z: y
                            }, {
                                x: h,
                                y: c,
                                z: y
                            }],
                            enabled: i.back.visible
                        }]
                    }),
                    this.frameShapes.front[f]({
                        class: "highcharts-3d-frame highcharts-3d-frame-front",
                        zIndex: i.front.frontFacing ? -1e3 : 1e3,
                        faces: [{
                            fill: r(i.front.color).brighten(.1).get(),
                            vertexes: [{
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }],
                            enabled: i.front.visible && !i.bottom.visible
                        }, {
                            fill: r(i.front.color).brighten(.1).get(),
                            vertexes: [{
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: h,
                                y: c,
                                z: x
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }, {
                                x: o,
                                y: a,
                                z: 0
                            }],
                            enabled: i.front.visible && !i.top.visible
                        }, {
                            fill: r(i.front.color).brighten(-.1).get(),
                            vertexes: [{
                                x: h,
                                y: c,
                                z: x
                            }, {
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }],
                            enabled: i.front.visible && !i.left.visible
                        }, {
                            fill: r(i.front.color).brighten(-.1).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: p,
                                y: c,
                                z: x
                            }, {
                                x: o,
                                y: a,
                                z: 0
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }],
                            enabled: i.front.visible && !i.right.visible
                        }, {
                            fill: r(i.front.color).get(),
                            vertexes: [{
                                x: o,
                                y: a,
                                z: 0
                            }, {
                                x: s,
                                y: a,
                                z: 0
                            }, {
                                x: s,
                                y: n,
                                z: 0
                            }, {
                                x: o,
                                y: n,
                                z: 0
                            }],
                            enabled: i.front.visible
                        }, {
                            fill: r(i.front.color).get(),
                            vertexes: [{
                                x: p,
                                y: d,
                                z: x
                            }, {
                                x: h,
                                y: d,
                                z: x
                            }, {
                                x: h,
                                y: c,
                                z: x
                            }, {
                                x: p,
                                y: c,
                                z: x
                            }],
                            enabled: i.front.visible
                        }]
                    })
                }
            }
            function s() {
                this.styledMode && [{
                    name: "darker",
                    slope: .6
                }, {
                    name: "brighter",
                    slope: 1.4
                }].forEach(function(t) {
                    this.renderer.definition({
                        tagName: "filter",
                        attributes: {
                            id: "highcharts-" + t.name
                        },
                        children: [{
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncR",
                                attributes: {
                                    type: "linear",
                                    slope: t.slope
                                }
                            }, {
                                tagName: "feFuncG",
                                attributes: {
                                    type: "linear",
                                    slope: t.slope
                                }
                            }, {
                                tagName: "feFuncB",
                                attributes: {
                                    type: "linear",
                                    slope: t.slope
                                }
                            }]
                        }]
                    })
                }, this)
            }
            function o() {
                let t = this.options;
                this.is3d() && (t.series || []).forEach(function(e) {
                    "scatter" === (e.type || t.chart.type || t.chart.defaultSeriesType) && (e.type = "scatter3d")
                })
            }
            function y() {
                let t = this.options.chart.options3d;
                if (this.chart3d && this.is3d()) {
                    t && (t.alpha = t.alpha % 360 + (t.alpha >= 0 ? 0 : 360),
                    t.beta = t.beta % 360 + (t.beta >= 0 ? 0 : 360));
                    let e = this.inverted
                      , i = this.clipBox
                      , s = this.margin;
                    i[e ? "y" : "x"] = -(s[3] || 0),
                    i[e ? "x" : "y"] = -(s[0] || 0),
                    i[e ? "height" : "width"] = this.chartWidth + (s[3] || 0) + (s[1] || 0),
                    i[e ? "width" : "height"] = this.chartHeight + (s[0] || 0) + (s[2] || 0),
                    this.scale3d = 1,
                    !0 === t.fitToPlot && (this.scale3d = this.chart3d.getScale(t.depth)),
                    this.chart3d.frame3d = this.chart3d.get3dFrame()
                }
            }
            function f() {
                this.is3d() && (this.isDirtyBox = !0)
            }
            function u() {
                this.chart3d && this.is3d() && (this.chart3d.frame3d = this.chart3d.get3dFrame())
            }
            function z() {
                this.chart3d || (this.chart3d = new v(this))
            }
            function b(t) {
                return this.is3d() || t.apply(this, [].slice.call(arguments, 1))
            }
            function g(t) {
                let e, i = this.series.length;
                if (this.is3d())
                    for (; i--; )
                        (e = this.series[i]).translate(),
                        e.render();
                else
                    t.call(this)
            }
            function m(t) {
                t.apply(this, [].slice.call(arguments, 1)),
                this.is3d() && (this.container.className += " highcharts-3d-chart")
            }
            t.defaultOptions = {
                chart: {
                    options3d: {
                        enabled: !1,
                        alpha: 0,
                        beta: 0,
                        depth: 100,
                        fitToPlot: !0,
                        viewDistance: 25,
                        axisLabelPosition: null,
                        frame: {
                            visible: "default",
                            size: 1,
                            bottom: {},
                            top: {},
                            left: {},
                            right: {},
                            back: {},
                            front: {}
                        }
                    }
                }
            },
            t.compose = function(r, n) {
                let l = r.prototype
                  , d = n.prototype;
                l.is3d = function() {
                    return !!this.options.chart.options3d?.enabled
                }
                ,
                l.propsRequireDirtyBox.push("chart.options3d"),
                l.propsRequireUpdateSeries.push("chart.options3d"),
                d.matrixSetter = function() {
                    let t;
                    if (this.pos < 1 && (p(this.start) || p(this.end))) {
                        let e = this.start || [1, 0, 0, 1, 0, 0]
                          , i = this.end || [1, 0, 0, 1, 0, 0];
                        t = [];
                        for (let s = 0; s < 6; s++)
                            t.push(this.pos * i[s] + (1 - this.pos) * e[s])
                    } else
                        t = this.end;
                    this.elem.attr(this.prop, t, null, !0)
                }
                ,
                c(!0, a, t.defaultOptions),
                h(r, "init", z),
                h(r, "addSeries", e),
                h(r, "afterDrawChartBox", i),
                h(r, "afterGetContainer", s),
                h(r, "afterInit", o),
                h(r, "afterSetChartSize", y),
                h(r, "beforeRedraw", f),
                h(r, "beforeRender", u),
                x(l, "isInsidePlot", b),
                x(l, "renderSeries", g),
                x(l, "setClassName", m)
            }
            ;
            class v {
                constructor(t) {
                    this.chart = t
                }
                get3dFrame() {
                    let t = this.chart
                      , e = t.options.chart.options3d
                      , i = e.frame
                      , s = t.plotLeft
                      , o = t.plotLeft + t.plotWidth
                      , r = t.plotTop
                      , a = t.plotTop + t.plotHeight
                      , h = e.depth
                      , p = function(e) {
                        let i = l(e, t);
                        return i > .5 ? 1 : i < -.5 ? -1 : 0
                    }
                      , c = p([{
                        x: s,
                        y: a,
                        z: h
                    }, {
                        x: o,
                        y: a,
                        z: h
                    }, {
                        x: o,
                        y: a,
                        z: 0
                    }, {
                        x: s,
                        y: a,
                        z: 0
                    }])
                      , x = p([{
                        x: s,
                        y: r,
                        z: 0
                    }, {
                        x: o,
                        y: r,
                        z: 0
                    }, {
                        x: o,
                        y: r,
                        z: h
                    }, {
                        x: s,
                        y: r,
                        z: h
                    }])
                      , y = p([{
                        x: s,
                        y: r,
                        z: 0
                    }, {
                        x: s,
                        y: r,
                        z: h
                    }, {
                        x: s,
                        y: a,
                        z: h
                    }, {
                        x: s,
                        y: a,
                        z: 0
                    }])
                      , f = p([{
                        x: o,
                        y: r,
                        z: h
                    }, {
                        x: o,
                        y: r,
                        z: 0
                    }, {
                        x: o,
                        y: a,
                        z: 0
                    }, {
                        x: o,
                        y: a,
                        z: h
                    }])
                      , u = p([{
                        x: s,
                        y: a,
                        z: 0
                    }, {
                        x: o,
                        y: a,
                        z: 0
                    }, {
                        x: o,
                        y: r,
                        z: 0
                    }, {
                        x: s,
                        y: r,
                        z: 0
                    }])
                      , z = p([{
                        x: s,
                        y: r,
                        z: h
                    }, {
                        x: o,
                        y: r,
                        z: h
                    }, {
                        x: o,
                        y: a,
                        z: h
                    }, {
                        x: s,
                        y: a,
                        z: h
                    }])
                      , b = !1
                      , g = !1
                      , m = !1
                      , v = !1;
                    [].concat(t.xAxis, t.yAxis, t.zAxis).forEach(function(t) {
                        t && (t.horiz ? t.opposite ? g = !0 : b = !0 : t.opposite ? v = !0 : m = !0)
                    });
                    let M = function(t, e, i) {
                        let s = ["size", "color", "visible"]
                          , o = {};
                        for (let e = 0; e < s.length; e++) {
                            let i = s[e];
                            for (let e = 0; e < t.length; e++)
                                if ("object" == typeof t[e]) {
                                    let s = t[e][i];
                                    if (null != s) {
                                        o[i] = s;
                                        break
                                    }
                                }
                        }
                        let r = i;
                        return !0 === o.visible || !1 === o.visible ? r = o.visible : "auto" === o.visible && (r = e > 0),
                        {
                            size: d(o.size, 1),
                            color: d(o.color, "none"),
                            frontFacing: e > 0,
                            visible: r
                        }
                    }
                      , S = {
                        axes: {},
                        bottom: M([i.bottom, i.top, i], c, b),
                        top: M([i.top, i.bottom, i], x, g),
                        left: M([i.left, i.right, i.side, i], y, m),
                        right: M([i.right, i.left, i.side, i], f, v),
                        back: M([i.back, i.front, i], z, !0),
                        front: M([i.front, i.back, i], u, !1)
                    };
                    if ("auto" === e.axisLabelPosition) {
                        let e = function(t, e) {
                            return t.visible !== e.visible || t.visible && e.visible && t.frontFacing !== e.frontFacing
                        }
                          , i = [];
                        e(S.left, S.front) && i.push({
                            y: (r + a) / 2,
                            x: s,
                            z: 0,
                            xDir: {
                                x: 1,
                                y: 0,
                                z: 0
                            }
                        }),
                        e(S.left, S.back) && i.push({
                            y: (r + a) / 2,
                            x: s,
                            z: h,
                            xDir: {
                                x: 0,
                                y: 0,
                                z: -1
                            }
                        }),
                        e(S.right, S.front) && i.push({
                            y: (r + a) / 2,
                            x: o,
                            z: 0,
                            xDir: {
                                x: 0,
                                y: 0,
                                z: 1
                            }
                        }),
                        e(S.right, S.back) && i.push({
                            y: (r + a) / 2,
                            x: o,
                            z: h,
                            xDir: {
                                x: -1,
                                y: 0,
                                z: 0
                            }
                        });
                        let l = [];
                        e(S.bottom, S.front) && l.push({
                            x: (s + o) / 2,
                            y: a,
                            z: 0,
                            xDir: {
                                x: 1,
                                y: 0,
                                z: 0
                            }
                        }),
                        e(S.bottom, S.back) && l.push({
                            x: (s + o) / 2,
                            y: a,
                            z: h,
                            xDir: {
                                x: -1,
                                y: 0,
                                z: 0
                            }
                        });
                        let p = [];
                        e(S.top, S.front) && p.push({
                            x: (s + o) / 2,
                            y: r,
                            z: 0,
                            xDir: {
                                x: 1,
                                y: 0,
                                z: 0
                            }
                        }),
                        e(S.top, S.back) && p.push({
                            x: (s + o) / 2,
                            y: r,
                            z: h,
                            xDir: {
                                x: -1,
                                y: 0,
                                z: 0
                            }
                        });
                        let c = [];
                        e(S.bottom, S.left) && c.push({
                            z: (0 + h) / 2,
                            y: a,
                            x: s,
                            xDir: {
                                x: 0,
                                y: 0,
                                z: -1
                            }
                        }),
                        e(S.bottom, S.right) && c.push({
                            z: (0 + h) / 2,
                            y: a,
                            x: o,
                            xDir: {
                                x: 0,
                                y: 0,
                                z: 1
                            }
                        });
                        let d = [];
                        e(S.top, S.left) && d.push({
                            z: (0 + h) / 2,
                            y: r,
                            x: s,
                            xDir: {
                                x: 0,
                                y: 0,
                                z: -1
                            }
                        }),
                        e(S.top, S.right) && d.push({
                            z: (0 + h) / 2,
                            y: r,
                            x: o,
                            xDir: {
                                x: 0,
                                y: 0,
                                z: 1
                            }
                        });
                        let x = function(e, i, s) {
                            if (0 === e.length)
                                return null;
                            if (1 === e.length)
                                return e[0];
                            let o = n(e, t, !1)
                              , r = 0;
                            for (let t = 1; t < o.length; t++)
                                s * o[t][i] > s * o[r][i] ? r = t : s * o[t][i] == s * o[r][i] && o[t].z < o[r].z && (r = t);
                            return e[r]
                        };
                        S.axes = {
                            y: {
                                left: x(i, "x", -1),
                                right: x(i, "x", 1)
                            },
                            x: {
                                top: x(p, "y", -1),
                                bottom: x(l, "y", 1)
                            },
                            z: {
                                top: x(d, "y", -1),
                                bottom: x(c, "y", 1)
                            }
                        }
                    } else
                        S.axes = {
                            y: {
                                left: {
                                    x: s,
                                    z: 0,
                                    xDir: {
                                        x: 1,
                                        y: 0,
                                        z: 0
                                    }
                                },
                                right: {
                                    x: o,
                                    z: 0,
                                    xDir: {
                                        x: 0,
                                        y: 0,
                                        z: 1
                                    }
                                }
                            },
                            x: {
                                top: {
                                    y: r,
                                    z: 0,
                                    xDir: {
                                        x: 1,
                                        y: 0,
                                        z: 0
                                    }
                                },
                                bottom: {
                                    y: a,
                                    z: 0,
                                    xDir: {
                                        x: 1,
                                        y: 0,
                                        z: 0
                                    }
                                }
                            },
                            z: {
                                top: {
                                    x: m ? o : s,
                                    y: r,
                                    xDir: m ? {
                                        x: 0,
                                        y: 0,
                                        z: 1
                                    } : {
                                        x: 0,
                                        y: 0,
                                        z: -1
                                    }
                                },
                                bottom: {
                                    x: m ? o : s,
                                    y: a,
                                    xDir: m ? {
                                        x: 0,
                                        y: 0,
                                        z: 1
                                    } : {
                                        x: 0,
                                        y: 0,
                                        z: -1
                                    }
                                }
                            }
                        };
                    return S
                }
                getScale(t) {
                    let e = this.chart, i = e.plotLeft, s = e.plotWidth + i, o = e.plotTop, r = e.plotHeight + o, a = i + e.plotWidth / 2, l = o + e.plotHeight / 2, h = {
                        minX: Number.MAX_VALUE,
                        maxX: -Number.MAX_VALUE,
                        minY: Number.MAX_VALUE,
                        maxY: -Number.MAX_VALUE
                    }, p, c = 1;
                    return p = [{
                        x: i,
                        y: o,
                        z: 0
                    }, {
                        x: i,
                        y: o,
                        z: t
                    }],
                    [0, 1].forEach(function(t) {
                        p.push({
                            x: s,
                            y: p[t].y,
                            z: p[t].z
                        })
                    }),
                    [0, 1, 2, 3].forEach(function(t) {
                        p.push({
                            x: p[t].x,
                            y: r,
                            z: p[t].z
                        })
                    }),
                    (p = n(p, e, !1)).forEach(function(t) {
                        h.minX = Math.min(h.minX, t.x),
                        h.maxX = Math.max(h.maxX, t.x),
                        h.minY = Math.min(h.minY, t.y),
                        h.maxY = Math.max(h.maxY, t.y)
                    }),
                    i > h.minX && (c = Math.min(c, 1 - Math.abs((i + a) / (h.minX + a)) % 1)),
                    s < h.maxX && (c = Math.min(c, (s - a) / (h.maxX - a))),
                    o > h.minY && (c = h.minY < 0 ? Math.min(c, (o + l) / (-h.minY + o + l)) : Math.min(c, 1 - (o + l) / (h.minY + l) % 1)),
                    r < h.maxY && (c = Math.min(c, Math.abs((r - l) / (h.maxY - l)))),
                    c
                }
            }
            t.Additions = v
        }(o || (o = {})),
        o
    }),
    i(e, "Series/Area3D/Area3DSeries.js", [e["Core/Globals.js"], e["Core/Math3D.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t, e, i, s) {
        let {composed: o} = t
          , {perspective: r} = e
          , {line: {prototype: a}} = i.seriesTypes
          , {pushUnique: n, wrap: l} = s;
        function h(t) {
            let e = t.apply(this, [].slice.call(arguments, 1));
            if (!this.chart.is3d())
                return e;
            let i = a.getGraphPath
              , s = this.options
              , o = Math.round(this.yAxis.getThreshold(s.threshold))
              , n = [];
            if (this.rawPointsX)
                for (let t = 0; t < this.points.length; t++)
                    n.push({
                        x: this.rawPointsX[t],
                        y: s.stacking ? this.points[t].yBottom : o,
                        z: this.zPadding
                    });
            let l = this.chart.options.chart.options3d;
            n = r(n, this.chart, !0).map(t=>({
                plotX: t.x,
                plotY: t.y,
                plotZ: t.z
            })),
            this.group && l && l.depth && l.beta && (this.markerGroup && (this.markerGroup.add(this.group),
            this.markerGroup.attr({
                translateX: 0,
                translateY: 0
            })),
            this.group.attr({
                zIndex: Math.max(1, l.beta > 270 || l.beta < 90 ? l.depth - Math.round(this.zPadding || 0) : Math.round(this.zPadding || 0))
            })),
            n.reversed = !0;
            let h = i.call(this, n, !0, !0);
            if (h[0] && "M" === h[0][0] && (h[0] = ["L", h[0][1], h[0][2]]),
            this.areaPath) {
                let t = this.areaPath.splice(0, this.areaPath.length / 2).concat(h);
                t.xMap = this.areaPath.xMap,
                this.areaPath = t
            }
            return this.graphPath = e,
            e
        }
        return {
            compose: function(t) {
                n(o, "Area3DSeries") && l(t.prototype, "getGraphPath", h)
            }
        }
    }),
    i(e, "Core/Axis/Axis3DDefaults.js", [], function() {
        return {
            labels: {
                position3d: "offset",
                skew3d: !1
            },
            title: {
                position3d: null,
                skew3d: null
            }
        }
    }),
    i(e, "Core/Axis/Tick3DComposition.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t, e) {
        let {composed: i} = t
          , {addEvent: s, extend: o, pushUnique: r, wrap: a} = e;
        function n(t) {
            let e = this.axis.axis3D;
            e && o(t.pos, e.fix3dPosition(t.pos))
        }
        function l(t) {
            let e = this.axis.axis3D
              , i = t.apply(this, [].slice.call(arguments, 1));
            if (e) {
                let t = i[0]
                  , s = i[1];
                if ("M" === t[0] && "L" === s[0]) {
                    let i = [e.fix3dPosition({
                        x: t[1],
                        y: t[2],
                        z: 0
                    }), e.fix3dPosition({
                        x: s[1],
                        y: s[2],
                        z: 0
                    })];
                    return this.axis.chart.renderer.toLineSegments(i)
                }
            }
            return i
        }
        return {
            compose: function(t) {
                r(i, "Axis.Tick3D") && (s(t, "afterGetLabelPosition", n),
                a(t.prototype, "getMarkPath", l))
            }
        }
    }),
    i(e, "Core/Axis/Axis3DComposition.js", [e["Core/Axis/Axis3DDefaults.js"], e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Math3D.js"], e["Core/Axis/Tick3DComposition.js"], e["Core/Utilities.js"]], function(t, e, i, s, o, r) {
        let {defaultOptions: a} = e
          , {deg2rad: n} = i
          , {perspective: l, perspective3D: h, shapeArea: p} = s
          , {addEvent: c, merge: d, pick: x, wrap: y} = r;
        function f() {
            let t = this.chart
              , e = this.options;
            t.is3d && t.is3d() && "colorAxis" !== this.coll && (e.tickWidth = x(e.tickWidth, 0),
            e.gridLineWidth = x(e.gridLineWidth, 1))
        }
        function u(t) {
            this.chart.is3d() && "colorAxis" !== this.coll && t.point && (t.point.crosshairPos = this.isXAxis ? t.point.axisXpos : this.len - t.point.axisYpos)
        }
        function z() {
            this.axis3D || (this.axis3D = new S(this))
        }
        function b(t) {
            return this.chart.is3d() && "colorAxis" !== this.coll ? [] : t.apply(this, [].slice.call(arguments, 1))
        }
        function g(t) {
            if (!this.chart.is3d() || "colorAxis" === this.coll)
                return t.apply(this, [].slice.call(arguments, 1));
            let e = arguments
              , i = e[1]
              , s = e[2]
              , o = []
              , r = this.getPlotLinePath({
                value: i
            })
              , a = this.getPlotLinePath({
                value: s
            });
            if (r && a)
                for (let t = 0; t < r.length; t += 2) {
                    let e = r[t]
                      , i = r[t + 1]
                      , s = a[t]
                      , n = a[t + 1];
                    "M" === e[0] && "L" === i[0] && "M" === s[0] && "L" === n[0] && o.push(e, i, n, ["L", s[1], s[2]], ["Z"])
                }
            return o
        }
        function m(t) {
            let e = this.axis3D
              , i = this.chart
              , s = t.apply(this, [].slice.call(arguments, 1));
            if ("colorAxis" === this.coll || !i.chart3d || !i.is3d() || null === s)
                return s;
            let o = i.options.chart.options3d, r = this.isZAxis ? i.plotWidth : o.depth, a = i.chart3d.frame3d, n = s[0], h = s[1], p, c = [];
            return "M" === n[0] && "L" === h[0] && (p = [e.swapZ({
                x: n[1],
                y: n[2],
                z: 0
            }), e.swapZ({
                x: n[1],
                y: n[2],
                z: r
            }), e.swapZ({
                x: h[1],
                y: h[2],
                z: 0
            }), e.swapZ({
                x: h[1],
                y: h[2],
                z: r
            })],
            this.horiz ? (this.isZAxis ? (a.left.visible && c.push(p[0], p[2]),
            a.right.visible && c.push(p[1], p[3])) : (a.front.visible && c.push(p[0], p[2]),
            a.back.visible && c.push(p[1], p[3])),
            a.top.visible && c.push(p[0], p[1]),
            a.bottom.visible && c.push(p[2], p[3])) : (a.front.visible && c.push(p[0], p[2]),
            a.back.visible && c.push(p[1], p[3]),
            a.left.visible && c.push(p[0], p[1]),
            a.right.visible && c.push(p[2], p[3])),
            c = l(c, this.chart, !1)),
            i.renderer.toLineSegments(c)
        }
        function v(t, e) {
            let {chart: i, gridGroup: s, tickPositions: o, ticks: r} = this;
            if (this.categories && i.frameShapes && i.is3d() && s && e && e.label) {
                let t, a, n;
                let l = s.element.childNodes[0].getBBox()
                  , p = i.frameShapes.left.getBBox()
                  , c = i.options.chart.options3d
                  , d = {
                    x: i.plotWidth / 2,
                    y: i.plotHeight / 2,
                    z: c.depth / 2,
                    vd: x(c.depth, 1) * x(c.viewDistance, 0)
                }
                  , y = o.indexOf(e.pos)
                  , f = r[o[y - 1]]
                  , u = r[o[y + 1]];
                return f?.label?.xy && (a = h({
                    x: f.label.xy.x,
                    y: f.label.xy.y,
                    z: null
                }, d, d.vd)),
                u && u.label && u.label.xy && (n = h({
                    x: u.label.xy.x,
                    y: u.label.xy.y,
                    z: null
                }, d, d.vd)),
                t = h(t = {
                    x: e.label.xy.x,
                    y: e.label.xy.y,
                    z: null
                }, d, d.vd),
                Math.abs(a ? t.x - a.x : n ? n.x - t.x : l.x - p.x)
            }
            return t.apply(this, [].slice.call(arguments, 1))
        }
        function M(t) {
            let e = t.apply(this, [].slice.call(arguments, 1));
            return this.axis3D ? this.axis3D.fix3dPosition(e, !0) : e
        }
        class S {
            static compose(e, i) {
                if (o.compose(i),
                !e.keepProps.includes("axis3D")) {
                    d(!0, a.xAxis, t),
                    e.keepProps.push("axis3D"),
                    c(e, "init", z),
                    c(e, "afterSetOptions", f),
                    c(e, "drawCrosshair", u);
                    let i = e.prototype;
                    y(i, "getLinePath", b),
                    y(i, "getPlotBandPath", g),
                    y(i, "getPlotLinePath", m),
                    y(i, "getSlotWidth", v),
                    y(i, "getTitlePosition", M)
                }
            }
            constructor(t) {
                this.axis = t
            }
            fix3dPosition(t, e) {
                let i = this.axis
                  , s = i.chart;
                if ("colorAxis" === i.coll || !s.chart3d || !s.is3d())
                    return t;
                let o = n * s.options.chart.options3d.alpha, r = n * s.options.chart.options3d.beta, a = x(e && i.options.title.position3d, i.options.labels.position3d), h = x(e && i.options.title.skew3d, i.options.labels.skew3d), c = s.chart3d.frame3d, d = s.plotLeft, y = s.plotWidth + d, f = s.plotTop, u = s.plotHeight + f, z = 0, b = 0, g, m = {
                    x: 0,
                    y: 1,
                    z: 0
                }, v = !1;
                if (t = i.axis3D.swapZ({
                    x: t.x,
                    y: t.y,
                    z: 0
                }),
                i.isZAxis) {
                    if (i.opposite) {
                        if (null === c.axes.z.top)
                            return {};
                        b = t.y - f,
                        t.x = c.axes.z.top.x,
                        t.y = c.axes.z.top.y,
                        g = c.axes.z.top.xDir,
                        v = !c.top.frontFacing
                    } else {
                        if (null === c.axes.z.bottom)
                            return {};
                        b = t.y - u,
                        t.x = c.axes.z.bottom.x,
                        t.y = c.axes.z.bottom.y,
                        g = c.axes.z.bottom.xDir,
                        v = !c.bottom.frontFacing
                    }
                } else if (i.horiz) {
                    if (i.opposite) {
                        if (null === c.axes.x.top)
                            return {};
                        b = t.y - f,
                        t.y = c.axes.x.top.y,
                        t.z = c.axes.x.top.z,
                        g = c.axes.x.top.xDir,
                        v = !c.top.frontFacing
                    } else {
                        if (null === c.axes.x.bottom)
                            return {};
                        b = t.y - u,
                        t.y = c.axes.x.bottom.y,
                        t.z = c.axes.x.bottom.z,
                        g = c.axes.x.bottom.xDir,
                        v = !c.bottom.frontFacing
                    }
                } else if (i.opposite) {
                    if (null === c.axes.y.right)
                        return {};
                    z = t.x - y,
                    t.x = c.axes.y.right.x,
                    t.z = c.axes.y.right.z,
                    g = {
                        x: (g = c.axes.y.right.xDir).z,
                        y: g.y,
                        z: -g.x
                    }
                } else {
                    if (null === c.axes.y.left)
                        return {};
                    z = t.x - d,
                    t.x = c.axes.y.left.x,
                    t.z = c.axes.y.left.z,
                    g = c.axes.y.left.xDir
                }
                if ("chart" === a)
                    ;
                else if ("flap" === a) {
                    if (i.horiz) {
                        let t = Math.sin(o)
                          , e = Math.cos(o);
                        i.opposite && (t = -t),
                        v && (t = -t),
                        m = {
                            x: g.z * t,
                            y: e,
                            z: -g.x * t
                        }
                    } else
                        g = {
                            x: Math.cos(r),
                            y: 0,
                            z: Math.sin(r)
                        }
                } else if ("ortho" === a) {
                    if (i.horiz) {
                        let t = Math.sin(o)
                          , e = Math.cos(o)
                          , i = {
                            x: Math.sin(r) * e,
                            y: -t,
                            z: -e * Math.cos(r)
                        }
                          , s = 1 / Math.sqrt((m = {
                            x: g.y * i.z - g.z * i.y,
                            y: g.z * i.x - g.x * i.z,
                            z: g.x * i.y - g.y * i.x
                        }).x * m.x + m.y * m.y + m.z * m.z);
                        v && (s = -s),
                        m = {
                            x: s * m.x,
                            y: s * m.y,
                            z: s * m.z
                        }
                    } else
                        g = {
                            x: Math.cos(r),
                            y: 0,
                            z: Math.sin(r)
                        }
                } else
                    i.horiz ? m = {
                        x: Math.sin(r) * Math.sin(o),
                        y: Math.cos(o),
                        z: -Math.cos(r) * Math.sin(o)
                    } : g = {
                        x: Math.cos(r),
                        y: 0,
                        z: Math.sin(r)
                    };
                t.x += z * g.x + b * m.x,
                t.y += z * g.y + b * m.y,
                t.z += z * g.z + b * m.z;
                let M = l([t], i.chart)[0];
                if (h) {
                    0 > p(l([t, {
                        x: t.x + g.x,
                        y: t.y + g.y,
                        z: t.z + g.z
                    }, {
                        x: t.x + m.x,
                        y: t.y + m.y,
                        z: t.z + m.z
                    }], i.chart)) && (g = {
                        x: -g.x,
                        y: -g.y,
                        z: -g.z
                    });
                    let e = l([{
                        x: t.x,
                        y: t.y,
                        z: t.z
                    }, {
                        x: t.x + g.x,
                        y: t.y + g.y,
                        z: t.z + g.z
                    }, {
                        x: t.x + m.x,
                        y: t.y + m.y,
                        z: t.z + m.z
                    }], i.chart);
                    M.matrix = [e[1].x - e[0].x, e[1].y - e[0].y, e[2].x - e[0].x, e[2].y - e[0].y, M.x, M.y],
                    M.matrix[4] -= M.x * M.matrix[0] + M.y * M.matrix[2],
                    M.matrix[5] -= M.x * M.matrix[1] + M.y * M.matrix[3]
                }
                return M
            }
            swapZ(t, e) {
                let i = this.axis;
                if (i.isZAxis) {
                    let s = e ? 0 : i.chart.plotLeft;
                    return {
                        x: s + t.z,
                        y: t.y,
                        z: t.x - s
                    }
                }
                return t
            }
        }
        return S
    }),
    i(e, "Core/Series/Series3D.js", [e["Core/Globals.js"], e["Core/Math3D.js"], e["Core/Series/Series.js"], e["Core/Utilities.js"]], function(t, e, i, s) {
        let {composed: o} = t
          , {perspective: r} = e
          , {addEvent: a, extend: n, isNumber: l, merge: h, pick: p, pushUnique: c} = s;
        class d extends i {
            static compose(t) {
                c(o, "Core.Series3D") && (a(t, "afterTranslate", function() {
                    this.chart.is3d() && this.translate3dPoints()
                }),
                n(t.prototype, {
                    translate3dPoints: d.prototype.translate3dPoints
                }))
            }
            translate3dPoints() {
                let t, e;
                let i = this
                  , s = i.options
                  , o = i.chart
                  , a = p(i.zAxis, o.options.zAxis[0])
                  , n = []
                  , h = []
                  , c = s.stacking ? l(s.stack) ? s.stack : 0 : i.index || 0;
                i.zPadding = c * (s.depth || 0 + (s.groupZPadding || 1)),
                i.data.forEach(t=>{
                    a && a.translate ? (e = a.logarithmic && a.val2lin ? a.val2lin(t.z) : t.z,
                    t.plotZ = a.translate(e),
                    t.isInside = !!t.isInside && e >= a.min && e <= a.max) : t.plotZ = i.zPadding,
                    t.axisXpos = t.plotX,
                    t.axisYpos = t.plotY,
                    t.axisZpos = t.plotZ,
                    n.push({
                        x: t.plotX,
                        y: t.plotY,
                        z: t.plotZ
                    }),
                    h.push(t.plotX || 0)
                }
                ),
                i.rawPointsX = h;
                let d = r(n, o, !0);
                i.data.forEach((e,i)=>{
                    t = d[i],
                    e.plotX = t.x,
                    e.plotY = t.y,
                    e.plotZ = t.z
                }
                )
            }
        }
        return d.defaultOptions = h(i.defaultOptions),
        d
    }),
    i(e, "Core/Renderer/SVG/SVGElement3D.js", [e["Core/Color/Color.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Utilities.js"]], function(t, e, i) {
        let {parse: s} = t
          , {Element: o} = e.getRendererType().prototype
          , {defined: r, pick: a} = i;
        class n extends o {
            constructor() {
                super(...arguments),
                this.parts = ["front", "top", "side"],
                this.pathType = "cuboid"
            }
            initArgs(t) {
                let e = this.renderer
                  , i = e[this.pathType + "Path"](t)
                  , s = i.zIndexes;
                for (let t of this.parts) {
                    let o = {
                        class: "highcharts-3d-" + t,
                        zIndex: s[t] || 0
                    };
                    e.styledMode && ("top" === t ? o.filter = "url(#highcharts-brighter)" : "side" === t && (o.filter = "url(#highcharts-darker)")),
                    this[t] = e.path(i[t]).attr(o).add(this)
                }
                this.attr({
                    "stroke-linejoin": "round",
                    zIndex: s.group
                }),
                this.forcedSides = i.forcedSides
            }
            singleSetterForParts(t, e, i, s, o, r) {
                let a = {}
                  , n = [null, null, s || "attr", o, r]
                  , l = i && i.zIndexes;
                if (i) {
                    for (let e of (l && l.group && this.attr({
                        zIndex: l.group
                    }),
                    Object.keys(i)))
                        a[e] = {},
                        a[e][t] = i[e],
                        l && (a[e].zIndex = i.zIndexes[e] || 0);
                    n[1] = a
                } else
                    a[t] = e,
                    n[0] = a;
                return this.processParts.apply(this, n)
            }
            processParts(t, e, i, s, o) {
                for (let r of this.parts)
                    e && (t = a(e[r], !1)),
                    !1 !== t && this[r][i](t, s, o);
                return this
            }
            destroy() {
                return this.processParts(null, null, "destroy"),
                super.destroy()
            }
            attr(t, e, i, s) {
                if ("string" == typeof t && void 0 !== e) {
                    let i = t;
                    (t = {})[i] = e
                }
                return t.shapeArgs || r(t.x) ? this.singleSetterForParts("d", null, this.renderer[this.pathType + "Path"](t.shapeArgs || t)) : super.attr(t, void 0, i, s)
            }
            animate(t, e, i) {
                if (r(t.x) && r(t.y)) {
                    let s = this.renderer[this.pathType + "Path"](t)
                      , o = s.forcedSides;
                    this.singleSetterForParts("d", null, s, "animate", e, i),
                    this.attr({
                        zIndex: s.zIndexes.group
                    }),
                    o === this.forcedSides || (this.forcedSides = o,
                    this.renderer.styledMode || this.fillSetter(this.fill))
                } else
                    super.animate(t, e, i);
                return this
            }
            fillSetter(t) {
                return this.forcedSides = this.forcedSides || [],
                this.singleSetterForParts("fill", null, {
                    front: t,
                    top: s(t).brighten(this.forcedSides.indexOf("top") >= 0 ? 0 : .1).get(),
                    side: s(t).brighten(this.forcedSides.indexOf("side") >= 0 ? 0 : -.1).get()
                }),
                this.color = this.fill = t,
                this
            }
        }
        return n.types = {
            base: n,
            cuboid: n
        },
        n
    }),
    i(e, "Core/Renderer/SVG/SVGRenderer3D.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Math3D.js"], e["Core/Renderer/SVG/SVGElement3D.js"], e["Core/Utilities.js"]], function(t, e, i, s, o, r) {
        var a;
        let {animObject: n} = t
          , {parse: l} = e
          , {charts: h, deg2rad: p} = i
          , {perspective: c, shapeArea: d} = s
          , {defined: x, extend: y, merge: f, pick: u} = r
          , z = Math.cos
          , b = Math.sin
          , g = Math.PI
          , m = 4 * (Math.sqrt(2) - 1) / 3 / (g / 2);
        function v(t, e, i, s, o, r, a, n) {
            let l = r - o
              , h = [];
            return r > o && r - o > Math.PI / 2 + 1e-4 ? h = (h = h.concat(v(t, e, i, s, o, o + Math.PI / 2, a, n))).concat(v(t, e, i, s, o + Math.PI / 2, r, a, n)) : r < o && o - r > Math.PI / 2 + 1e-4 ? h = (h = h.concat(v(t, e, i, s, o, o - Math.PI / 2, a, n))).concat(v(t, e, i, s, o - Math.PI / 2, r, a, n)) : [["C", t + i * Math.cos(o) - i * m * l * Math.sin(o) + a, e + s * Math.sin(o) + s * m * l * Math.cos(o) + n, t + i * Math.cos(r) + i * m * l * Math.sin(r) + a, e + s * Math.sin(r) - s * m * l * Math.cos(r) + n, t + i * Math.cos(r) + a, e + s * Math.sin(r) + n]]
        }
        return function(t) {
            function e(t, e) {
                let i = [];
                for (let e of t)
                    i.push(["L", e.x, e.y]);
                return t.length && (i[0][0] = "M",
                e && i.push(["Z"])),
                i
            }
            function s(t) {
                let e = []
                  , i = !0;
                for (let s of t)
                    e.push(i ? ["M", s.x, s.y] : ["L", s.x, s.y]),
                    i = !i;
                return e
            }
            function r(t) {
                let e = this
                  , i = e.Element.prototype
                  , s = e.createElement("path");
                return s.vertexes = [],
                s.insidePlotArea = !1,
                s.enabled = !0,
                s.attr = function(t) {
                    if ("object" == typeof t && (x(t.enabled) || x(t.vertexes) || x(t.insidePlotArea))) {
                        this.enabled = u(t.enabled, this.enabled),
                        this.vertexes = u(t.vertexes, this.vertexes),
                        this.insidePlotArea = u(t.insidePlotArea, this.insidePlotArea),
                        delete t.enabled,
                        delete t.vertexes,
                        delete t.insidePlotArea;
                        let i = h[e.chartIndex]
                          , s = c(this.vertexes, i, this.insidePlotArea)
                          , o = e.toLinePath(s, !0)
                          , r = d(s);
                        t.d = o,
                        t.visibility = this.enabled && r > 0 ? "inherit" : "hidden"
                    }
                    return i.attr.apply(this, arguments)
                }
                ,
                s.animate = function(t) {
                    if ("object" == typeof t && (x(t.enabled) || x(t.vertexes) || x(t.insidePlotArea))) {
                        this.enabled = u(t.enabled, this.enabled),
                        this.vertexes = u(t.vertexes, this.vertexes),
                        this.insidePlotArea = u(t.insidePlotArea, this.insidePlotArea),
                        delete t.enabled,
                        delete t.vertexes,
                        delete t.insidePlotArea;
                        let i = h[e.chartIndex]
                          , s = c(this.vertexes, i, this.insidePlotArea)
                          , o = e.toLinePath(s, !0)
                          , r = d(s)
                          , a = this.enabled && r > 0 ? "visible" : "hidden";
                        t.d = o,
                        this.attr("visibility", a)
                    }
                    return i.animate.apply(this, arguments)
                }
                ,
                s.attr(t)
            }
            function a(t) {
                let e = this
                  , i = e.Element.prototype
                  , s = e.g()
                  , o = s.destroy;
                return this.styledMode || s.attr({
                    "stroke-linejoin": "round"
                }),
                s.faces = [],
                s.destroy = function() {
                    for (let t = 0; t < s.faces.length; t++)
                        s.faces[t].destroy();
                    return o.call(this)
                }
                ,
                s.attr = function(t, o, r, a) {
                    if ("object" == typeof t && x(t.faces)) {
                        for (; s.faces.length > t.faces.length; )
                            s.faces.pop().destroy();
                        for (; s.faces.length < t.faces.length; )
                            s.faces.push(e.face3d().add(s));
                        for (let i = 0; i < t.faces.length; i++)
                            e.styledMode && delete t.faces[i].fill,
                            s.faces[i].attr(t.faces[i], null, r, a);
                        delete t.faces
                    }
                    return i.attr.apply(this, arguments)
                }
                ,
                s.animate = function(t, o, r) {
                    if (t && t.faces) {
                        for (; s.faces.length > t.faces.length; )
                            s.faces.pop().destroy();
                        for (; s.faces.length < t.faces.length; )
                            s.faces.push(e.face3d().add(s));
                        for (let e = 0; e < t.faces.length; e++)
                            s.faces[e].animate(t.faces[e], o, r);
                        delete t.faces
                    }
                    return i.animate.apply(this, arguments)
                }
                ,
                s.attr(t)
            }
            function m(t, e) {
                let i = new o.types[t](this,"g");
                return i.initArgs(e),
                i
            }
            function M(t) {
                return this.element3d("cuboid", t)
            }
            function S(t) {
                let e = t.x || 0, i = t.y || 0, s = t.z || 0, o = t.height || 0, r = t.width || 0, a = t.depth || 0, n = h[this.chartIndex], l = n.options.chart.options3d.alpha, p = [], x, y = 0, f = [{
                    x: e,
                    y: i,
                    z: s
                }, {
                    x: e + r,
                    y: i,
                    z: s
                }, {
                    x: e + r,
                    y: i + o,
                    z: s
                }, {
                    x: e,
                    y: i + o,
                    z: s
                }, {
                    x: e,
                    y: i + o,
                    z: s + a
                }, {
                    x: e + r,
                    y: i + o,
                    z: s + a
                }, {
                    x: e + r,
                    y: i,
                    z: s + a
                }, {
                    x: e,
                    y: i,
                    z: s + a
                }];
                f = c(f, n, t.insidePlotArea);
                let u = t=>0 === o && t > 1 && t < 6 ? {
                    x: f[t].x,
                    y: f[t].y + 10,
                    z: f[t].z
                } : f[0].x === f[7].x && t >= 4 ? {
                    x: f[t].x + 10,
                    y: f[t].y,
                    z: f[t].z
                } : 0 === a && t < 2 || t > 5 ? {
                    x: f[t].x,
                    y: f[t].y,
                    z: f[t].z + 10
                } : f[t]
                  , z = t=>f[t]
                  , b = (t,e,i)=>{
                    let s = t.map(z)
                      , o = e.map(z)
                      , r = t.map(u)
                      , a = e.map(u)
                      , n = [[], -1];
                    return 0 > d(s) ? n = [s, 0] : 0 > d(o) ? n = [o, 1] : i && (p.push(i),
                    n = 0 > d(r) ? [s, 0] : 0 > d(a) ? [o, 1] : [s, 0]),
                    n
                }
                  , g = (x = b([3, 2, 1, 0], [7, 6, 5, 4], "front"))[0]
                  , m = x[1]
                  , v = (x = b([1, 6, 7, 0], [4, 5, 2, 3], "top"))[0]
                  , M = x[1]
                  , S = (x = b([1, 2, 5, 6], [0, 7, 4, 3], "side"))[0]
                  , A = x[1];
                return 1 === A ? y += 1e6 * (n.plotWidth - e) : A || (y += 1e6 * e),
                y += 10 * (!M || l >= 0 && l <= 180 || l < 360 && l > 357.5 ? n.plotHeight - i : 10 + i),
                1 === m ? y += 100 * s : m || (y += 100 * (1e3 - s)),
                {
                    front: this.toLinePath(g, !0),
                    top: this.toLinePath(v, !0),
                    side: this.toLinePath(S, !0),
                    zIndexes: {
                        group: Math.round(y)
                    },
                    forcedSides: p,
                    isFront: m,
                    isTop: M
                }
            }
            function A(t) {
                let e = this.g()
                  , s = this.Element.prototype
                  , o = ["x", "y", "r", "innerR", "start", "end", "depth"];
                function r(t) {
                    let e = {}, i = !1, s;
                    for (s in t = f(t))
                        -1 !== o.indexOf(s) && (e[s] = t[s],
                        delete t[s],
                        i = !0);
                    return !!i && [e, t]
                }
                for (let i of ((t = f(t)).alpha = (t.alpha || 0) * p,
                t.beta = (t.beta || 0) * p,
                e.top = this.path(),
                e.side1 = this.path(),
                e.side2 = this.path(),
                e.inn = this.path(),
                e.out = this.path(),
                e.onAdd = function() {
                    let t = e.parentGroup
                      , i = e.attr("class");
                    for (let s of (e.top.add(e),
                    ["out", "inn", "side1", "side2"]))
                        e[s].attr({
                            class: i + " highcharts-3d-side"
                        }).add(t)
                }
                ,
                ["addClass", "removeClass"]))
                    e[i] = function() {
                        let t = arguments;
                        for (let s of ["top", "out", "inn", "side1", "side2"])
                            e[s][i].apply(e[s], t)
                    }
                    ;
                for (let i of (e.setPaths = function(t) {
                    let i = e.renderer.arc3dPath(t)
                      , s = 100 * i.zTop;
                    e.attribs = t,
                    e.top.attr({
                        d: i.top,
                        zIndex: i.zTop
                    }),
                    e.inn.attr({
                        d: i.inn,
                        zIndex: i.zInn
                    }),
                    e.out.attr({
                        d: i.out,
                        zIndex: i.zOut
                    }),
                    e.side1.attr({
                        d: i.side1,
                        zIndex: i.zSide1
                    }),
                    e.side2.attr({
                        d: i.side2,
                        zIndex: i.zSide2
                    }),
                    e.zIndex = s,
                    e.attr({
                        zIndex: s
                    }),
                    t.center && (e.top.setRadialReference(t.center),
                    delete t.center)
                }
                ,
                e.setPaths(t),
                e.fillSetter = function(t) {
                    let e = l(t).brighten(-.1).get();
                    return this.fill = t,
                    this.side1.attr({
                        fill: e
                    }),
                    this.side2.attr({
                        fill: e
                    }),
                    this.inn.attr({
                        fill: e
                    }),
                    this.out.attr({
                        fill: e
                    }),
                    this.top.attr({
                        fill: t
                    }),
                    this
                }
                ,
                ["opacity", "translateX", "translateY", "visibility"]))
                    e[i + "Setter"] = function(t, i) {
                        for (let s of (e[i] = t,
                        ["out", "inn", "side1", "side2", "top"]))
                            e[s].attr(i, t)
                    }
                    ;
                return e.attr = function(t) {
                    let i, o;
                    return "object" == typeof t && (o = r(t)) && (i = o[0],
                    arguments[0] = o[1],
                    y(e.attribs, i),
                    e.setPaths(e.attribs)),
                    s.attr.apply(e, arguments)
                }
                ,
                e.animate = function(t, o, a) {
                    let l, h;
                    let p = this.attribs
                      , c = "data-" + Math.random().toString(26).substring(2, 9);
                    delete t.center,
                    delete t.z,
                    delete t.alpha,
                    delete t.beta;
                    let d = n(u(o, this.renderer.globalAnimation));
                    return d.duration && (l = r(t),
                    e[c] = 0,
                    t[c] = 1,
                    e[c + "Setter"] = i.noop,
                    l && (h = l[0],
                    d.step = function(t, e) {
                        let i = t=>p[t] + (u(h[t], p[t]) - p[t]) * e.pos;
                        e.prop === c && e.elem.setPaths(f(p, {
                            x: i("x"),
                            y: i("y"),
                            r: i("r"),
                            innerR: i("innerR"),
                            start: i("start"),
                            end: i("end"),
                            depth: i("depth")
                        }))
                    }
                    ),
                    o = d),
                    s.animate.call(this, t, o, a)
                }
                ,
                e.destroy = function() {
                    return this.top.destroy(),
                    this.out.destroy(),
                    this.inn.destroy(),
                    this.side1.destroy(),
                    this.side2.destroy(),
                    s.destroy.call(this)
                }
                ,
                e.hide = function() {
                    this.top.hide(),
                    this.out.hide(),
                    this.inn.hide(),
                    this.side1.hide(),
                    this.side2.hide()
                }
                ,
                e.show = function(t) {
                    this.top.show(t),
                    this.out.show(t),
                    this.inn.show(t),
                    this.side1.show(t),
                    this.side2.show(t)
                }
                ,
                e
            }
            function P(t) {
                let e = t.x || 0
                  , i = t.y || 0
                  , s = t.start || 0
                  , o = (t.end || 0) - 1e-5
                  , r = t.r || 0
                  , a = t.innerR || 0
                  , n = t.depth || 0
                  , l = t.alpha || 0
                  , h = t.beta || 0
                  , p = Math.cos(s)
                  , c = Math.sin(s)
                  , d = Math.cos(o)
                  , x = Math.sin(o)
                  , y = r * Math.cos(h)
                  , f = r * Math.cos(l)
                  , u = a * Math.cos(h)
                  , m = a * Math.cos(l)
                  , M = n * Math.sin(h)
                  , S = n * Math.sin(l)
                  , A = [["M", e + y * p, i + f * c]];
                (A = A.concat(v(e, i, y, f, s, o, 0, 0))).push(["L", e + u * d, i + m * x]),
                (A = A.concat(v(e, i, u, m, o, s, 0, 0))).push(["Z"]);
                let P = h > 0 ? Math.PI / 2 : 0
                  , D = l > 0 ? 0 : Math.PI / 2
                  , C = s > -P ? s : o > -P ? -P : s
                  , j = o < g - D ? o : s < g - D ? g - D : o
                  , k = 2 * g - D
                  , L = [["M", e + y * z(C), i + f * b(C)]];
                L = L.concat(v(e, i, y, f, C, j, 0, 0)),
                o > k && s < k ? (L.push(["L", e + y * z(j) + M, i + f * b(j) + S]),
                (L = L.concat(v(e, i, y, f, j, k, M, S))).push(["L", e + y * z(k), i + f * b(k)]),
                (L = L.concat(v(e, i, y, f, k, o, 0, 0))).push(["L", e + y * z(o) + M, i + f * b(o) + S]),
                (L = L.concat(v(e, i, y, f, o, k, M, S))).push(["L", e + y * z(k), i + f * b(k)]),
                L = L.concat(v(e, i, y, f, k, j, 0, 0))) : o > g - D && s < g - D && (L.push(["L", e + y * Math.cos(j) + M, i + f * Math.sin(j) + S]),
                (L = L.concat(v(e, i, y, f, j, o, M, S))).push(["L", e + y * Math.cos(o), i + f * Math.sin(o)]),
                L = L.concat(v(e, i, y, f, o, j, 0, 0))),
                L.push(["L", e + y * Math.cos(j) + M, i + f * Math.sin(j) + S]),
                (L = L.concat(v(e, i, y, f, j, C, M, S))).push(["Z"]);
                let I = [["M", e + u * p, i + m * c]];
                (I = I.concat(v(e, i, u, m, s, o, 0, 0))).push(["L", e + u * Math.cos(o) + M, i + m * Math.sin(o) + S]),
                (I = I.concat(v(e, i, u, m, o, s, M, S))).push(["Z"]);
                let w = [["M", e + y * p, i + f * c], ["L", e + y * p + M, i + f * c + S], ["L", e + u * p + M, i + m * c + S], ["L", e + u * p, i + m * c], ["Z"]]
                  , T = [["M", e + y * d, i + f * x], ["L", e + y * d + M, i + f * x + S], ["L", e + u * d + M, i + m * x + S], ["L", e + u * d, i + m * x], ["Z"]]
                  , X = Math.atan2(S, -M)
                  , G = Math.abs(o + X)
                  , Z = Math.abs(s + X)
                  , Y = Math.abs((s + o) / 2 + X);
                function R(t) {
                    return (t %= 2 * Math.PI) > Math.PI && (t = 2 * Math.PI - t),
                    t
                }
                G = R(G),
                Z = R(Z);
                let E = 1e5 * (Y = R(Y))
                  , F = 1e5 * Z
                  , O = 1e5 * G;
                return {
                    top: A,
                    zTop: 1e5 * Math.PI + 1,
                    out: L,
                    zOut: Math.max(E, F, O),
                    inn: I,
                    zInn: Math.max(E, F, O),
                    side1: w,
                    zSide1: .99 * O,
                    side2: T,
                    zSide2: .99 * F
                }
            }
            t.compose = function(t) {
                let i = t.prototype;
                i.element3d || y(i, {
                    Element3D: o,
                    arc3d: A,
                    arc3dPath: P,
                    cuboid: M,
                    cuboidPath: S,
                    element3d: m,
                    face3d: r,
                    polyhedron: a,
                    toLinePath: e,
                    toLineSegments: s
                })
            }
        }(a || (a = {})),
        a
    }),
    i(e, "Core/Axis/ZAxis.js", [e["Core/Axis/Axis.js"], e["Core/Defaults.js"], e["Core/Utilities.js"]], function(t, e, i) {
        let {defaultOptions: s} = e
          , {addEvent: o, merge: r, pick: a, splat: n} = i;
        function l(t) {
            return new p(this,t)
        }
        function h() {
            let t = this.options.zAxis = n(this.options.zAxis || {});
            this.is3d() && (this.zAxis = [],
            t.forEach(t=>{
                this.addZAxis(t).setScale()
            }
            ))
        }
        class p extends t {
            constructor() {
                super(...arguments),
                this.isZAxis = !0
            }
            static compose(t) {
                let e = t.prototype;
                e.addZAxis || (s.zAxis = r(s.xAxis, {
                    offset: 0,
                    lineWidth: 0
                }),
                e.addZAxis = l,
                e.collectionsWithInit.zAxis = [e.addZAxis],
                e.collectionsWithUpdate.push("zAxis"),
                o(t, "afterGetAxes", h))
            }
            init(t, e) {
                this.isZAxis = !0,
                super.init(t, e, "zAxis")
            }
            getSeriesExtremes() {
                this.hasVisibleSeries = !1,
                this.dataMin = this.dataMax = this.ignoreMinPadding = this.ignoreMaxPadding = void 0,
                this.stacking && this.stacking.buildStacks(),
                this.series.forEach(t=>{
                    if (t.reserveSpace()) {
                        let e = t.options.threshold;
                        this.hasVisibleSeries = !0,
                        this.positiveValuesOnly && e <= 0 && (e = void 0);
                        let i = t.zData;
                        i.length && (this.dataMin = Math.min(a(this.dataMin, i[0]), Math.min.apply(null, i)),
                        this.dataMax = Math.max(a(this.dataMax, i[0]), Math.max.apply(null, i)))
                    }
                }
                )
            }
            setAxisSize() {
                let t = this.chart;
                super.setAxisSize(),
                this.width = this.len = t.options.chart.options3d && t.options.chart.options3d.depth || 0,
                this.right = t.chartWidth - this.width - this.left
            }
        }
        return p
    }),
    i(e, "Series/Column3D/Column3DComposition.js", [e["Core/Globals.js"], e["Core/Math3D.js"], e["Core/Utilities.js"]], function(t, e, i) {
        let {composed: s} = t
          , {perspective: o} = e
          , {addEvent: r, extend: a, pick: n, pushUnique: l, wrap: h} = i;
        function p() {
            let t = this.chart, e = this.options, i = e.depth, s = (e.stacking ? e.stack || 0 : this.index) * (i + (e.groupZPadding || 1)), r = this.borderWidth % 2 ? .5 : 0, n;
            for (let l of (t.inverted && !this.yAxis.reversed && (r *= -1),
            !1 !== e.grouping && (s = 0),
            s += e.groupZPadding || 1,
            this.points))
                if (l.outside3dPlot = null,
                null !== l.y) {
                    let e;
                    let h = a({
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }, l.shapeArgs || {})
                      , p = [["x", "width"], ["y", "height"]]
                      , c = l.tooltipPos;
                    for (let t of p)
                        if ((e = h[t[0]] - r) < 0 && (h[t[1]] += h[t[0]] + r,
                        h[t[0]] = -r,
                        e = 0),
                        e + h[t[1]] > this[t[0] + "Axis"].len && 0 !== h[t[1]] && (h[t[1]] = this[t[0] + "Axis"].len - h[t[0]]),
                        0 !== h[t[1]] && (h[t[0]] >= this[t[0] + "Axis"].len || h[t[0]] + h[t[1]] <= r)) {
                            for (let t in h)
                                h[t] = "y" === t ? -9999 : 0;
                            l.outside3dPlot = !0
                        }
                    if ("roundedRect" === l.shapeType && (l.shapeType = "cuboid"),
                    l.shapeArgs = a(h, {
                        z: s,
                        depth: i,
                        insidePlotArea: !0
                    }),
                    n = {
                        x: h.x + h.width / 2,
                        y: h.y,
                        z: s + i / 2
                    },
                    t.inverted && (n.x = h.height,
                    n.y = l.clientX || 0),
                    l.axisXpos = n.x,
                    l.axisYpos = n.y,
                    l.axisZpos = n.z,
                    l.plot3d = o([n], t, !0, !1)[0],
                    c) {
                        let e = o([{
                            x: c[0],
                            y: c[1],
                            z: s + i / 2
                        }], t, !0, !1)[0];
                        l.tooltipPos = [e.x, e.y]
                    }
                }
            this.z = s
        }
        function c() {
            if (this.chart.is3d()) {
                let t = this.options
                  , e = t.grouping
                  , i = t.stacking
                  , s = this.yAxis.options.reversedStacks
                  , o = 0;
                if (!(void 0 !== e && !e)) {
                    let e;
                    let r = function(t, e) {
                        let i = t.series, s = {
                            totalStacks: 0
                        }, o, r = 1;
                        return i.forEach(function(t) {
                            s[o = n(t.options.stack, e ? 0 : i.length - 1 - t.index)] ? s[o].series.push(t) : (s[o] = {
                                series: [t],
                                position: r
                            },
                            r++)
                        }),
                        s.totalStacks = r + 1,
                        s
                    }(this.chart, i)
                      , a = t.stack || 0;
                    for (e = 0; e < r[a].series.length && r[a].series[e] !== this; e++)
                        ;
                    o = 10 * (r.totalStacks - r[a].position) + (s ? e : -e),
                    this.xAxis.reversed || (o = 10 * r.totalStacks - o)
                }
                t.depth = t.depth || 25,
                this.z = this.z || 0,
                t.zIndex = o
            }
        }
        function d(t, ...e) {
            return this.series.chart.is3d() ? this.graphic && "g" !== this.graphic.element.nodeName : t.apply(this, e)
        }
        function x(t) {
            if (this.chart.is3d()) {
                let t = arguments
                  , e = t[1]
                  , i = this.yAxis
                  , s = this.yAxis.reversed;
                if (e)
                    for (let t of this.points)
                        null === t.y || (t.height = t.shapeArgs.height,
                        t.shapey = t.shapeArgs.y,
                        t.shapeArgs.height = 1,
                        s || (t.stackY ? t.shapeArgs.y = t.plotY + i.translate(t.stackY) : t.shapeArgs.y = t.plotY + (t.negative ? -t.height : t.height)));
                else {
                    for (let t of this.points)
                        null !== t.y && (t.shapeArgs.height = t.height,
                        t.shapeArgs.y = t.shapey,
                        t.graphic && t.graphic[t.outside3dPlot ? "attr" : "animate"](t.shapeArgs, this.options.animation));
                    this.drawDataLabels()
                }
            } else
                t.apply(this, [].slice.call(arguments, 1))
        }
        function y(t, e, i, s, o, r) {
            return "dataLabelsGroup" !== e && "markerGroup" !== e && this.chart.is3d() && (this[e] && delete this[e],
            r && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(r)),
            this[e] = this.chart.columnGroup,
            this.chart.columnGroup.attr(this.getPlotBox()),
            this[e].survive = !0,
            "group" === e && (arguments[3] = "visible"))),
            t.apply(this, Array.prototype.slice.call(arguments, 1))
        }
        function f(t) {
            let e = t.apply(this, [].slice.call(arguments, 1));
            return this.chart.is3d && this.chart.is3d() && (e.stroke = this.options.edgeColor || e.fill,
            e["stroke-width"] = n(this.options.edgeWidth, 1)),
            e
        }
        function u(t, e, i) {
            let s = this.chart.is3d && this.chart.is3d();
            s && (this.options.inactiveOtherPoints = !0),
            t.call(this, e, i),
            s && (this.options.inactiveOtherPoints = !1)
        }
        function z(t, e) {
            if (this.chart.is3d())
                for (let t of this.points)
                    t.visible = t.options.visible = e = void 0 === e ? !n(this.visible, t.visible) : e,
                    this.options.data[this.data.indexOf(t)] = t.options,
                    t.graphic && t.graphic.attr({
                        visibility: e ? "visible" : "hidden"
                    });
            t.apply(this, Array.prototype.slice.call(arguments, 1))
        }
        function b(t) {
            t.apply(this, [].slice.call(arguments, 1)),
            this.chart.is3d() && this.translate3dShapes()
        }
        function g(t, e, i, s, r) {
            let a = this.chart;
            if (s.outside3dPlot = e.outside3dPlot,
            a.is3d() && this.is("column")) {
                let t = this.options
                  , i = n(s.inside, !!this.options.stacking)
                  , l = a.options.chart.options3d
                  , h = e.pointWidth / 2 || 0
                  , p = {
                    x: r.x + h,
                    y: r.y,
                    z: this.z + t.depth / 2
                };
                a.inverted && (i && (r.width = 0,
                p.x += e.shapeArgs.height / 2),
                l.alpha >= 90 && l.alpha <= 270 && (p.y += e.shapeArgs.width)),
                p = o([p], a, !0, !1)[0],
                r.x = p.x - h,
                r.y = e.outside3dPlot ? -9e9 : p.y
            }
            t.apply(this, [].slice.call(arguments, 1))
        }
        function m(t) {
            return !arguments[2].outside3dPlot && t.apply(this, [].slice.call(arguments, 1))
        }
        function v(t, e) {
            let i = t.apply(this, [].slice.call(arguments, 1))
              , s = this.axis.chart
              , {width: r} = e;
            if (s.is3d() && this.base) {
                let t = +this.base.split(",")[0]
                  , e = s.series[t]
                  , a = s.options.chart.options3d;
                if (e && "column" === e.type) {
                    let t = {
                        x: i.x + (s.inverted ? i.height : r / 2),
                        y: i.y,
                        z: e.options.depth / 2
                    };
                    s.inverted && (i.width = 0,
                    a.alpha >= 90 && a.alpha <= 270 && (t.y += r)),
                    t = o([t], s, !0, !1)[0],
                    i.x = t.x - r / 2,
                    i.y = t.y
                }
            }
            return i
        }
        return {
            compose: function(t, e) {
                if (l(s, "Column3D")) {
                    let i = t.prototype
                      , s = e.prototype
                      , {column: o, columnRange: a} = t.types;
                    if (h(i, "alignDataLabel", g),
                    h(i, "justifyDataLabel", m),
                    h(s, "getStackBox", v),
                    o) {
                        let t = o.prototype
                          , e = t.pointClass.prototype;
                        t.translate3dPoints = ()=>void 0,
                        t.translate3dShapes = p,
                        r(t, "afterInit", c),
                        h(e, "hasNewShapeType", d),
                        h(t, "animate", x),
                        h(t, "plotGroup", y),
                        h(t, "pointAttribs", f),
                        h(t, "setState", u),
                        h(t, "setVisible", z),
                        h(t, "translate", b)
                    }
                    if (a) {
                        let t = a.prototype;
                        h(t.pointClass.prototype, "hasNewShapeType", d),
                        h(t, "plotGroup", y),
                        h(t, "pointAttribs", f),
                        h(t, "setState", u),
                        h(t, "setVisible", z)
                    }
                }
            }
        }
    }),
    i(e, "Series/Pie3D/Pie3DPoint.js", [e["Core/Series/SeriesRegistry.js"]], function(t) {
        let {pie: {prototype: {pointClass: e}}} = t.seriesTypes;
        return class extends e {
            haloPath() {
                return this.series?.chart.is3d() ? [] : super.haloPath.apply(this, arguments)
            }
        }
    }),
    i(e, "Series/Pie3D/Pie3DSeries.js", [e["Core/Globals.js"], e["Series/Pie3D/Pie3DPoint.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t, e, i, s) {
        let {composed: o, deg2rad: r} = t
          , {pie: a} = i.seriesTypes
          , {extend: n, pick: l, pushUnique: h} = s;
        class p extends a {
            static compose(t) {
                h(o, "Pie3D") && (t.types.pie = p)
            }
            addPoint() {
                super.addPoint.apply(this, arguments),
                this.chart.is3d() && this.update(this.userOptions, !0)
            }
            animate(t) {
                if (this.chart.is3d()) {
                    let e = this.center, i = this.group, s = this.markerGroup, o = this.options.animation, r;
                    !0 === o && (o = {}),
                    t ? (i.oldtranslateX = l(i.oldtranslateX, i.translateX),
                    i.oldtranslateY = l(i.oldtranslateY, i.translateY),
                    r = {
                        translateX: e[0],
                        translateY: e[1],
                        scaleX: .001,
                        scaleY: .001
                    },
                    i.attr(r),
                    s && (s.attrSetters = i.attrSetters,
                    s.attr(r))) : (r = {
                        translateX: i.oldtranslateX,
                        translateY: i.oldtranslateY,
                        scaleX: 1,
                        scaleY: 1
                    },
                    i.animate(r, o),
                    s && s.animate(r, o))
                } else
                    super.animate.apply(this, arguments)
            }
            getDataLabelPosition(t, e) {
                let i = super.getDataLabelPosition(t, e);
                if (this.chart.is3d()) {
                    let e = this.chart.options.chart.options3d
                      , s = t.shapeArgs
                      , o = s.r
                      , a = (s.alpha || e?.alpha) * r
                      , n = (s.beta || e?.beta) * r
                      , l = (s.start + s.end) / 2
                      , h = i.connectorPosition
                      , p = -o * (1 - Math.cos(a)) * Math.sin(l)
                      , c = o * (Math.cos(n) - 1) * Math.cos(l);
                    for (let t of [i?.natural, h.breakAt, h.touchingSliceAt])
                        t.x += c,
                        t.y += p
                }
                return i
            }
            pointAttribs(t) {
                let e = super.pointAttribs.apply(this, arguments)
                  , i = this.options;
                return this.chart.is3d() && !this.chart.styledMode && (e.stroke = i.edgeColor || t.color || this.color,
                e["stroke-width"] = l(i.edgeWidth, 1)),
                e
            }
            translate() {
                if (super.translate.apply(this, arguments),
                !this.chart.is3d())
                    return;
                let t = this.options
                  , e = t.depth || 0
                  , i = this.chart.options.chart.options3d
                  , s = i.alpha
                  , o = i.beta
                  , a = t.stacking ? (t.stack || 0) * e : this._i * e;
                for (let i of (a += e / 2,
                !1 !== t.grouping && (a = 0),
                this.points)) {
                    let n = i.shapeArgs;
                    i.shapeType = "arc3d",
                    n.z = a,
                    n.depth = .75 * e,
                    n.alpha = s,
                    n.beta = o,
                    n.center = this.center;
                    let l = (n.end + n.start) / 2;
                    i.slicedTranslation = {
                        translateX: Math.round(Math.cos(l) * t.slicedOffset * Math.cos(s * r)),
                        translateY: Math.round(Math.sin(l) * t.slicedOffset * Math.cos(s * r))
                    }
                }
            }
            drawTracker() {
                if (super.drawTracker.apply(this, arguments),
                this.chart.is3d()) {
                    for (let t of this.points)
                        if (t.graphic)
                            for (let e of ["out", "inn", "side1", "side2"])
                                t.graphic && (t.graphic[e].element.point = t)
                }
            }
        }
        return n(p.prototype, {
            pointClass: e
        }),
        p
    }),
    i(e, "Series/Scatter3D/Scatter3DPoint.js", [e["Series/Scatter/ScatterSeries.js"], e["Core/Utilities.js"]], function(t, e) {
        let {pointClass: i} = t.prototype
          , {defined: s} = e;
        return class extends i {
            applyOptions() {
                return super.applyOptions.apply(this, arguments),
                s(this.z) || (this.z = 0),
                this
            }
        }
    }),
    i(e, "Series/Scatter3D/Scatter3DSeriesDefaults.js", [], function() {
        return {
            tooltip: {
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>"
            }
        }
    }),
    i(e, "Series/Scatter3D/Scatter3DSeries.js", [e["Core/Math3D.js"], e["Series/Scatter3D/Scatter3DPoint.js"], e["Series/Scatter3D/Scatter3DSeriesDefaults.js"], e["Series/Scatter/ScatterSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t, e, i, s, o, r) {
        let {pointCameraDistance: a} = t
          , {extend: n, merge: l} = r;
        class h extends s {
            pointAttribs(t) {
                let e = super.pointAttribs.apply(this, arguments);
                return this.chart.is3d() && t && (e.zIndex = a(t, this.chart)),
                e
            }
        }
        return h.defaultOptions = l(s.defaultOptions, i),
        n(h.prototype, {
            axisTypes: ["xAxis", "yAxis", "zAxis"],
            directTouch: !0,
            parallelArrays: ["x", "y", "z"],
            pointArrayMap: ["x", "y", "z"],
            pointClass: e
        }),
        o.registerSeriesType("scatter3d", h),
        h
    }),
    i(e, "masters/highcharts-3d.src.js", [e["Core/Globals.js"], e["Core/Chart/Chart3D.js"], e["Series/Area3D/Area3DSeries.js"], e["Core/Axis/Axis3DComposition.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Series/Series3D.js"], e["Core/Axis/Stacking/StackItem.js"], e["Core/Renderer/SVG/SVGRenderer3D.js"], e["Core/Axis/ZAxis.js"], e["Series/Column3D/Column3DComposition.js"], e["Series/Pie3D/Pie3DSeries.js"]], function(t, e, i, s, o, r, a, n, l, h, p) {
        return i.compose(t.seriesTypes.area),
        s.compose(t.Axis, t.Tick),
        e.compose(t.Chart, t.Fx),
        h.compose(t.Series, a),
        p.compose(t.Series),
        r.compose(t.Series),
        n.compose(o.getRendererType()),
        l.compose(t.Chart),
        t
    })
});
