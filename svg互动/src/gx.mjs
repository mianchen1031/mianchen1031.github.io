import * as d3 from "d3";
const paths = {
    a: ['test11'],
    b: ['test22'],
    c: ['test33'],
}
const colorCache = new Map();
let containerId = null;
/**
 * 初始化关系图
 * @param {*} id 
 * @param {*} url 
 * @param {*} width 
 * @param {*} height 
 */
export async function init(id, url = "./public/关系图.svg") {
    containerId = id;
    const text = await d3.text(url);
    const app = d3.select(`#${containerId}`)
    app.html(text);
    const svg = app.select("svg");
    //svg.attr("width", width).attr("height", height);
    //svg.select("#container").on('click', clickContainer);
    svg.selectAll(`circle[name="click11"]`).on('click', click11);
    svg.selectAll(`circle[name="click22"]`).on('click', click22);
    svg.selectAll(`ellipse[name="click33"]`).on('click', click33);
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
function click11() {
    colorReset();
    const svg = d3.select(`#${containerId}`).select('svg');
    paths.a.forEach((id) => {
        const pathList = svg.selectAll(`circle[name="${id}"]`);
        pathList.each(function () {
            if (!colorCache.get(this)) {
                colorCache.set(this, d3.select(this).attr('fill'))
            }
        });
        pathList.attr('fill', '#FFC300')
    });
}

function click22() {
    colorReset();
    const svg = d3.select(`#${containerId}`).select('svg');
    paths.b.forEach((id) => {
        const pathList = svg.selectAll(`circle[name="${id}"]`);
        pathList.each(function () {
            if (!colorCache.get(this)) {
                colorCache.set(this, d3.select(this).attr('fill'))
            }
        });
        pathList.attr('fill', '#FFC300')
    });
}

function click33() {
    colorReset();
    const svg = d3.select(`#${containerId}`).select('svg');
    paths.c.forEach((id) => {
        const pathList = svg.selectAll(`circle[name="${id}"]`);
        pathList.each(function () {
            if (!colorCache.get(this)) {
                colorCache.set(this, d3.select(this).attr('fill'))
            }
        });
        pathList.attr('fill', '#FFC300')
    });
}