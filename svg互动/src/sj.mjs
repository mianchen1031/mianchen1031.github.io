import * as d3 from "d3";
const paths = {
    'schxr': ['test1'],
    'scxj': ['test2']
};
const clickSelectors = {
    'schxr': [`rect[name="click1"]`, `path[name="click1"]`],
    'scxj': [`rect[name="click2"]`, `path[name="click2"]`]
}
const colorCache = new Map();
const bgColorCache = new Map();
let containerId = null;
let schxrBg = null;
let scxjBg = null;
/**
 * 初始化桑基图
 * @param {*} id 
 * @param {*} url 
 * @param {*} width 
 * @param {*} height 
 */
export async function init(id, url = "./public/桑基图.svg") {
    containerId = id;
    const text = await d3.text(url);
    const app = d3.select(`#${containerId}`);
    app.html(text);
    const svg = app.select("svg");
    schxrBg = svg.select(clickSelectors.schxr[0]);
    bgColorCache.set(schxrBg.node(), schxrBg.attr("fill"));
    schxrBg.attr("fill", 'transparent');
    scxjBg = svg.select(clickSelectors.scxj[0]);
    bgColorCache.set(scxjBg.node(), scxjBg.attr("fill"));
    scxjBg.attr("fill", 'transparent');
    clickSelectors.schxr.forEach(s => {
        svg.selectAll(s).on('click', clickSchxr);
    });
    clickSelectors.scxj.forEach(s => {
        svg.selectAll(s).on('click', clickScxj);
    });
}
function clickContainer() {
    const svg = d3.select(`#${containerId}`).select('svg');
    if (colorCache.schur.isCache) {
        colorCache.schur.data.forEach((item) => {
            const path = item[0];
            const color = item[1];
            svg.select(path).attr('fill', color);
        });
    }
}
function colorReset() {
    colorCache.forEach((value, key) => {
        d3.select(key).attr("fill", value);
    });
}
function clickSchxr() {
    colorReset();
    const svg = d3.select(`#${containerId}`).select('svg');
    paths.schxr.forEach((id) => {
        const pathList = svg.selectAll(`path[name="${id}"]`);
        pathList.each(function () {
            if (!colorCache.get(this)) {
                colorCache.set(this, d3.select(this).attr('fill'))
            }
        });
        pathList.attr('fill', '#D43030')
    });
    schxrBg.attr("fill", bgColorCache.get(schxrBg.node()));
    scxjBg.attr("fill", 'transparent');
}

function clickScxj() {
    colorReset();
    const svg = d3.select(`#${containerId}`).select('svg');
    paths.scxj.forEach((id) => {
        const pathList = svg.selectAll(`path[name="${id}"]`);
        pathList.each(function () {
            if (!colorCache.get(this)) {
                colorCache.set(this, d3.select(this).attr('fill'))
            }
        });
        pathList.attr('fill', '#E36868')
    });
    scxjBg.attr("fill", bgColorCache.get(scxjBg.node()));
    schxrBg.attr("fill", 'transparent');
}